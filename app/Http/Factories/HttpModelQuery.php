<?php

namespace App\Http\Factories;

use App\Http\Contract\HttpResponse;
use Illuminate\Http\Request;

abstract class HttpModelQuery
{
    public static function make($classNameOrQuery, Request $request, $collection = null)
    {
        $query = gettype($classNameOrQuery) === 'string' ? ($classNameOrQuery)::query() : $classNameOrQuery;
        $data = $query->orderBy('created_at', 'desc')->paginate(
            $request->get('limit', '20'),
        );
        return HttpResponse::create()
            ->setStatus(200)
            ->setData($collection ? new $collection($data->all()) : $data->all())
            ->setMeta(array_merge(
                $data->toArray(),
                ['data' => null]
            ))
            ->toLaravel();
    }
}
