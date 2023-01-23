<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersDefaultTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::firstOrCreate(
            ['email' => 'admin@meubemquere.com',],
            [
                'password' => Hash::make('password'),
                'role' => 'admin',
                'name' => 'Ateliê ADMIN',
            ]
        );
        User::firstOrCreate(
            ['email' => 'user@meubemquere.com',],
            [
                'password' => Hash::make('password'),
                'role' => 'user',
                'name' => 'Ateliê USER',
            ]
        );
    }
}
