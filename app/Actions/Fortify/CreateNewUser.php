<?php

namespace App\Actions\Fortify;

use App\Http\Contract\HttpResponse;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class CreateNewUser
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array  $input
     * @return \App\Models\User
     */
    public function create(array $input)
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
        ])->validate();

        $user = User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => Hash::make($input['password']),
        ]);

        return HttpResponse::create()
            ->setMessage("Usuário $user->name cadastrado com sucesso!")
            ->setTitle("Sucesso!")
            ->setStatus(201)
            ->setData([
                'user' => $user,
            ])->toLaravel();
    }
}
