<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('livros', function (Blueprint $table) {
            $table->id('codl');
            $table->string('titulo', 40);
            $table->string('editora', 40);
            $table->integer('edicao');
            $table->string('ano_publicacao', 4);
            $table->decimal('valor', 10, 2);
            $table->timestamps();
            
            $table->index('titulo');
            $table->index('editora');
            $table->index('ano_publicacao');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('livros');
    }
};
