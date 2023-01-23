<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Contract\HttpResponse;
use App\Http\Controllers\Controller;
use App\Models\User;

class ShowUserController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(User $user)
    {
        $user->load(['requests']);
        $response = HttpResponse::create()->setData([
            'user' => $user,
        ])->setStatus(200);

        return $response->toLaravel();
    }
}
