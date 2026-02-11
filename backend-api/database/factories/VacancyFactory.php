<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vacancy>
 */
class VacancyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->jobTitle(),
            'position' => $this->faker->randomElement(['Developer', 'Designer', 'Product Manager']),
            'job_type' => $this->faker->randomElement(['Full-Time', 'Part-Time', 'Contract']),
            'candidates_needed' => $this->faker->numberBetween(1, 5),
            'expires_at' => $this->faker->dateTimeBetween('now', '+1 month'),
            'location' => $this->faker->city(),
            'is_remote' => $this->faker->boolean(),
            'description' => $this->faker->paragraphs(3, true),
            'salary_min' => $this->faker->numberBetween(5000000, 10000000),
            'salary_max' => $this->faker->numberBetween(11000000, 20000000),
            'show_salary' => $this->faker->boolean(),
            'min_experience' => $this->faker->randomElement(['Kurang dari 1 tahun', '1-3 tahun', '4-5 tahun']),
            'company_name' => 'Dicoding Indonesia',
            'company_logo' => 'https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/commons/new-ui-logo.png',
        ];
    }
}