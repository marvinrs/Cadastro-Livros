<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('auditoria', function (Blueprint $table) {
            $table->id();
            $table->string('tabela', 50);
            $table->string('operacao', 10);
            $table->string('usuario', 50);
            $table->timestamp('data_hora')->useCurrent();
            $table->jsonb('dados_antigos')->nullable();
            $table->jsonb('dados_novos')->nullable();

            $table->index(['tabela', 'operacao']);
            $table->index('data_hora');
        });
    }

    public function down(): void {
        Schema::dropIfExists('auditoria');
    }
};
