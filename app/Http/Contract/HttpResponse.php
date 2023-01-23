<?php

namespace App\Http\Contract;

class HttpResponse
{
    public const CREATED = 201;

    public const SUCCESS = 200;

    public $data;

    public $meta;

    public $statusCode = 0;

    public $message = null;

    public $title = null;

    function __construct($data = [])
    {
        foreach ($data as $key => $value) {
            $this->{$key} = $value;
        }
    }

    public static function create($data = [])
    {
        return new HttpResponse($data);
    }

    public function setData($data)
    {
        $this->data = $data;
        return $this;
    }

    public function setMessage($message)
    {
        $this->message = $message;
        return $this;
    }

    public function setTitle($title)
    {
        $this->title = $title;
        return $this;
    }

    public function setStatus($status)
    {
        $this->statusCode = $status;
        return $this;
    }

    public function setMeta($meta)
    {
        $this->meta = $meta;
        return $this;
    }

    public function toJson()
    {
        return [
            'data' => $this->data,
            'meta' => $this->meta,
            'message' => $this->message,
            'title' => $this->title,
        ];
    }

    public function toLaravel()
    {
        return response($this->toJson(), $this->statusCode, []);
    }
}
