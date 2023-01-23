<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Contract\HttpResponse;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\UnauthorizedException;

class UpdateUserController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, User $user)
    {
        $input = $request->all();
        $auth = $request->user();
        $isAdmin = $auth->role === User::ADMIN;
        $isAuthUser = $user->is($auth);

        if (!$isAdmin && !$isAuthUser) {
            throw new UnauthorizedException();
        }

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone_number' => ['nullable', 'integer'],
            'cpf' => ['nullable', 'integer'],
            'address_number' => ['nullable', 'string'],
            'address_country' => ['nullable', 'string'],
            'address_state' => ['nullable', 'string'],
            'address_city' => ['nullable', 'string'],
            'address_street' => ['nullable', 'string'],
            'address_complement' => ['nullable', 'string'],
        ]);

        $user->update([
            'name' => $input['name'] ?? $user->name,
        ]);

        $response = HttpResponse::create()
            ->setData([
                'user' => $user,
            ])
            ->setStatus(HttpResponse::SUCCESS)
            ->setTitle('Sucesso')
            ->setMessage($isAuthUser ? 'Perfil editado com sucesso!' : 'Usuário editado com sucesso!');

        return $response->toLaravel();
    }
}
