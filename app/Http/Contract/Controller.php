<?php

namespace App\Core\Protocol\Contract;

interface Controller
{
    public function execute(HttpRequest $request): HttpResponse;
}
