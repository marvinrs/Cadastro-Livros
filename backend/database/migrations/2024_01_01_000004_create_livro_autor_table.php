<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('livro_autor', function (Blueprint $table) {
            $table->unsignedBigInteger('livro_codl');
            $table->unsignedBigInteger('autor_cod_au');

            $table->primary(['livro_codl', 'autor_cod_au']);

            $table->foreign('livro_codl')->references('codl')->on('livros')->onDelete('cascade');
            $table->foreign('autor_cod_au')->references('cod_au')->on('autores')->onDelete('cascade');

            $table->index(['livro_codl', 'autor_cod_au']);
        });
    }

    public function down(): void {
        Schema::dropIfExists('livro_autor');
    }
};
