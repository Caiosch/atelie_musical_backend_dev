<?php

namespace App\Core\Protocol\Contract;

use Illuminate\Http\Request;

class HttpRequest
{
    public $headers = [];

    public $body = [];

    public $method = '';

    public $query = [];

    public static function create($data = [])
    {
        return new HttpRequest($data);
    }

    public static function fromLaravel(Request $request)
    {
        return HttpRequest::create([
            'query' => $request->query(),
            'headers' => $request->headers,
            'method' => $request->method(),
            'body' => $request->all(),
        ]);
    }

    function __construct($data = [])
    {
        foreach ($data as $key => $value) {
            $this->{$key} = $value;
        }
    }

    public function getBody()
    {
        return $this->body;
    }

    public function getHeaders()
    {
        return $this->headers;
    }

    public function getQuery()
    {
        return $this->query;
    }

    public function getMethod()
    {
        return $this->method;
    }
}
