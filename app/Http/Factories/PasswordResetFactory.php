<?php

namespace App\Http\Factories;

use App\Http\Factories\Exceptions\PasswordResetInvalidToken;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PasswordResetFactory
{
    private static function table()
    {
        return DB::table('password_resets');
    }

    public static function generate(string $email)
    {
        $token = Str::random(255);
        self::table()->insert([
            'email' => $email,
            'token' => $token,
        ]);

        return $token;
    }

    public static function user(string $token): User
    {
        $reset = self::table()->where('token', $token)->first();

        if (!$reset) {
            throw new PasswordResetInvalidToken();
        }

        $user = User::query()->where('email', $reset->email)->first();

        return $user;
    }

    public static function revokeByToken(string $token)
    {
        return self::table()->where('token', $token)->delete();
    }

    public static function revokeByEmail(string $email)
    {
        return self::table()->where('email', $email)->delete();
    }
}
