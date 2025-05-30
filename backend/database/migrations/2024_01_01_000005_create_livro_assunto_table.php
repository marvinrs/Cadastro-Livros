<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('livro_assunto', function (Blueprint $table) {
            $table->unsignedBigInteger('livro_codl');
            $table->unsignedBigInteger('assunto_cod_as');

            $table->primary(['livro_codl', 'assunto_cod_as']);

            $table->foreign('livro_codl')->references('codl')->on('livros')->onDelete('cascade');
            $table->foreign('assunto_cod_as')->references('cod_as')->on('assuntos')->onDelete('cascade');

            $table->index(['livro_codl', 'assunto_cod_as']);
        });
    }

    public function down(): void {
        Schema::dropIfExists('livro_assunto');
    }
};
