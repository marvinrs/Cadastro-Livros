<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assuntos', function (Blueprint $table) {
            $table->id('cod_as');
            $table->string('descricao', 20)->unique();
            $table->timestamps();
            
            $table->index('descricao');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assuntos');
    }
};
