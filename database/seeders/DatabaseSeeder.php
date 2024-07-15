<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Zura',
            'email' => 'zura@gmail.com',
            'password' => Hash::make('123!@#'), 
            'email_verified_at' => time()
        ]);
        Project::factory()
        ->count(30)
        ->hasTasks(30)
        ->create();
    }
}
