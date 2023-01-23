<?php

namespace App\Http\Controllers\Api\Payment;

use App\Contracts\MusicRequestStatus;
use App\Contracts\PaymentStatus;
use App\Http\Contract\HttpResponse;
use App\Http\Controllers\Controller;
use App\Models\MusicRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class PaypalCallbackController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        try {

            $input = $request->all();
            $id = $input['id'];
            $musicRequest = MusicRequest::findOrFail($id);
            $transaction = $input['result']['purchase_units'][0]['payments']['captures'][0];
            $type = $transaction['status'];

            $data = Storage::put(
                "public/payment/$id.payment.json",
                json_encode([
                    'input' => $input,
                    'type' => $type,
                    'transaction' => $transaction,
                ])
            );

            switch ($type) {
                case PaymentStatus::PAYPAL_ORDER_APPROVED:
                    $this->approve($input, $musicRequest);
                    break;

                default:
                    $this->reject($input, $musicRequest);
                    break;
            }

            return HttpResponse::create()
                ->setData([
                    'success' => $data,
                ])
                ->setStatus(200)
                ->toLaravel();
        } catch (\Exception $e) {
            return HttpResponse::create()
                ->setData([
                    'success' => false,
                ])
                ->setStatus(400)
                ->toLaravel();
        }
    }

    public function approve(array $data, MusicRequest $musicRequest)
    {
        Log::info("Music [$musicRequest->id] payment approved", $data);
        $musicRequest->update([
            'status' => MusicRequestStatus::WAITING_IMAGES,
            'payment_status' => PaymentStatus::PAYED,
            'payed_at' => Carbon::now(),
        ]);
    }

    public function reject(array $data, MusicRequest $musicRequest)
    {
        Log::info("Music [$musicRequest->id] payment rejected", $data);
        $musicRequest->update([
            'status' => MusicRequestStatus::CANCELED,
            'payment_status' => PaymentStatus::CANCELED,
            'payed_at' => Carbon::now(),
        ]);
    }
}
