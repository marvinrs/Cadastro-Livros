<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('autores', function (Blueprint $table) {
            $table->id('cod_au');
            $table->string('nome', 40);
            $table->timestamps();
            
            $table->index('nome');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('autores');
    }
};
