<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Factories\HttpModelQuery;
use App\Models\User;
use Illuminate\Http\Request;

class FilterUserController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        return HttpModelQuery::make(User::class, $request);
    }
}
