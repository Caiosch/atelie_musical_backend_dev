<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Contract\HttpResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    public function show(Request $request)
    {
        $response = HttpResponse::create()->setData([
            'user' => $request->user(),
        ])->setStatus(HttpResponse::SUCCESS);

        return $response->toLaravel();
    }
}
