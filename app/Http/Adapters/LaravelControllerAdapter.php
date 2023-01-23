<?php

namespace App\Core\Protocol\Adapters;

use App\Core\Protocol\Contract\Controller;
use App\Core\Protocol\Contract\HttpRequest;
use Illuminate\Http\Request;

class LaravelControllerAdapter
{
    public static function adapt(Request $request, Controller $controller)
    {
        $result = $controller->execute(HttpRequest::fromLaravel($request));
        return $result->toJson();
    }
}
