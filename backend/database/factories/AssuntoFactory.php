<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AssuntoFactory extends Factory
{
    public function definition()
    {
        return [
            'descricao' => $this->faker->unique()->word(),
        ];
    }
}
