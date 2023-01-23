<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Contract\HttpResponse;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class RegisterController extends Controller
{
    public function store(Request $request)
    {
        $input = $request->all();
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => ['required', 'string', 'confirmed'],
        ]);

        $user = User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => Hash::make($input['password']),
        ]);

        $response = HttpResponse::create()
            ->setData([
                'user' => $user,
            ])
            ->setStatus(HttpResponse::CREATED)
            ->setTitle('Registro feito com sucesso!')
            ->setMessage("Bem-vindo $user->name");

        return $response->toLaravel();
    }
}
