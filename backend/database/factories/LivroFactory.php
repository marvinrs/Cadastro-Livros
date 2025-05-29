<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class LivroFactory extends Factory
{
    public function definition()
    {
        return [
            'titulo' => $this->faker->sentence(3),
            'editora' => $this->faker->company(),
            'edicao' => $this->faker->numberBetween(1, 10),
            'ano_publicacao' => $this->faker->year(),
            'valor' => $this->faker->randomFloat(2, 10, 500),
        ];
    }
}
