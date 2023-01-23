<?php

namespace App\Http\Controllers\Api\Order;

use App\Contracts\{
    MusicRequestStatus,
    PaymentStatus
};
use App\Http\Contract\HttpResponse;
use App\Http\Controllers\Controller;
use App\Models\MusicRequest;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Srmklive\PayPal\Services\PayPal;

class CreateOrderController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $input = $request->validate([
            'requestId' => ['integer', 'required'],
            'provider' => ['required', Rule::in(['paypal', 'pagseguro'])]
        ]);

        $musicRequest = MusicRequest::find($input['requestId']);

        // if (!!$musicRequest->payment_status) {
        //     return [
        //         'request' => $musicRequest,
        //     ];
        // }

        if ($input['provider'] === 'paypal') {
            $provider = new Paypal();
            $provider->setAccessToken($provider->getAccessToken());

            $invoiceData = [
                'intent' => 'CAPTURE',
                'purchase_units' => [
                    [
                        'amount' => [
                            'currency_code' => 'BRL',
                            'value' => $musicRequest->price_total,
                        ]
                    ]
                ],
            ];
            $invoice = $provider->createOrder($invoiceData);
            $invoiceId = $invoice['id'];

            $musicRequest->update([
                'payment_reference' => "paypal:$invoiceId",
                'payment_status' => PaymentStatus::WAITING,
                'status' => MusicRequestStatus::WAITING_PAYMENT,
                'is_payed' => false,
            ]);

            return HttpResponse::create()
                ->setStatus(201)
                ->setTitle("Sucesso!")
                ->setMessage("Música solicitada com sucesso!")
                ->setData([
                    'external_data' => $invoice,
                    'request' => $musicRequest,
                    'checkout_url' => collect($invoice['links'])->filter(function ($item) {
                        return $item['rel'] === 'approve';
                    })->first()['href'],
                    // 'request' => $musicRequest,
                ])
                ->toLaravel();
        }
    }
}
