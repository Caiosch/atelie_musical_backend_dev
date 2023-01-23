<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Contract\HttpResponse;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Rules\MatchOldPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ChangeUserPasswordController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $input = $request->all();
        $auth = $request->user();

        $request->validate([
            'current_password' => ['required', new MatchOldPassword],
            'new_password' => ['required', 'string', 'confirmed'],
        ]);

        User::find($auth->id)->update(['password' => Hash::make($input['new_password'])]);

        $response = HttpResponse::create()
            ->setData([
                'success' => true,
            ])
            ->setStatus(HttpResponse::SUCCESS)
            ->setTitle('Sucesso')
            ->setMessage('Senha alterada com sucesso!');

        return $response->toLaravel();
    }
}
