<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Contract\HttpResponse;
use App\Http\Controllers\Controller;
use App\Http\Factories\Exceptions\PasswordResetInvalidToken;
use App\Http\Factories\PasswordResetFactory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PasswordResetUserController extends Controller
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
            $request->validate([
                'token' => ['required', 'string'],
                'password' => ['required', 'confirmed'],
            ]);

            $user = PasswordResetFactory::user($request->input('token'));

            $user->update([
                'password' => Hash::make($request->input('password')),
            ]);

            PasswordResetFactory::revokeByEmail($user->email);

            return HttpResponse::create()
                ->setData([])
                ->setStatus(200)
                ->setTitle('Sucesso!')
                ->setMessage('Senha alterada com sucesso!')
                ->toLaravel();
        } catch (PasswordResetInvalidToken $e) {
            return HttpResponse::create()
                ->setStatus(400)
                ->setMessage($e->getMessage())
                ->toLaravel();
        }
    }
}
