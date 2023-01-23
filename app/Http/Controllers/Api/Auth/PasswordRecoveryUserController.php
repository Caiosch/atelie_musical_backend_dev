<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Contract\HttpResponse;
use App\Http\Controllers\Controller;
use App\Http\Factories\PasswordResetFactory;
use App\Mail\PasswordRecoveryMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;

class PasswordRecoveryUserController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email', Rule::exists(User::class, 'email')],
        ]);

        $token = PasswordResetFactory::generate($request->input('email'));

        Mail::to('mathewsto51@gmail.com')->send(
            new PasswordRecoveryMail(url: config('app.client_url') . '/reset-password/' . $token)
        );

        return HttpResponse::create()
            ->setData([])
            ->setTitle('Sucesso!')
            ->setMessage('Verifique sua caixa de mensagem')
            ->setStatus(200)
            ->toLaravel();
        // dd($request->get('email'));

    }
}
