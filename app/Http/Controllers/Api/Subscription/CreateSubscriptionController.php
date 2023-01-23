<?php

namespace App\Http\Controllers\Api\Subscription;

use App\Http\Contract\HttpResponse;
use App\Http\Controllers\Controller;
use App\Models\BasicSubcription;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CreateSubscriptionController extends Controller
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
            'name' => ['string', 'required'],
            'email' => ['string', 'required', 'email', Rule::unique('basic_subcriptions', 'email')],
            'phone_number' => ['string', 'optional'],
        ]);

        $subscription = BasicSubcription::create(array_merge(
            $input,
            ['type' => 'newsletter']
        ));

        return HttpResponse::create()
            ->setData([
                'subscription' => $subscription
            ])
            ->setStatus(201)
            ->setMessage('Você foi cadastrado em nossa newsletter 😊')
            ->setTitle('Parabéns!!')
            ->toLaravel();
    }
}
