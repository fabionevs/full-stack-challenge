<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        User::updateOrCreate(
            ['email' => 'admin@wisejobs.com'],
            [
                'name' => 'Admin WiseJobs',
                'email' => 'admin@wisejobs.com',
                'password' => Hash::make('123456'),
                'is_admin' => true,
            ]
        );

        // Usuário comum
        User::updateOrCreate(
            ['email' => 'user@wisejobs.com'],
            [
                'name' => 'User WiseJobs',
                'email' => 'user@wisejobs.com',
                'password' => Hash::make('123456'),
                'is_admin' => false,
            ]
        );
    }
}
