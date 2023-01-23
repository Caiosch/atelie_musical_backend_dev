<?php

namespace App\Http\Factories\Exceptions;

class PasswordResetInvalidToken extends \Exception
{
    public function __construct()
    {
        parent::__construct('Password Invalid Token');
    }
}
