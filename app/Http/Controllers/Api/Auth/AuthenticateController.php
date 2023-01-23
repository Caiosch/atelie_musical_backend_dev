<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Contract\HttpResponse;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticateController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'email' => ['required', 'string', 'max:255'],
            'password' => ['required', 'string', 'max:255'],
            'remember' => ['boolean'],
        ]);

        $isAuth = Auth::attempt($request->all(), $request->get('remember', false));
        if ($isAuth) {
            $user = User::query()->where('email', $request->get('email'))->firstOrFail();
            $response = HttpResponse::create()->setStatus(200)->setData([
                'user' => $user,
                'token' => $user->createToken('TOKEN_NAME')->plainTextToken,
            ]);

            return $response->toLaravel();
        }

        return HttpResponse::create()
            ->setStatus(401)->setData(null)->setMessage('Unauthorized')->toLaravel();
    }
}
