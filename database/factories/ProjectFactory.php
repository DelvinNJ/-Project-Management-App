<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $users = User::pluck('id')->toArray();
        return [
            "name" => fake()->sentence(),
            "description" => fake()->realText(),
            "due_date" => fake()->dateTimeBetween('now', '+1 years'),
            "status" => fake()->randomElement(['pending', 'in_progress']),
            "image_path" => fake()->imageUrl('600', '400'),
            "created_by" => fake()->randomElement($users),
            "updated_by" => fake()->randomElement($users),
        ];
    }
}
