<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AutorController;
use App\Http\Controllers\Api\AssuntoController;
use App\Http\Controllers\Api\LivroController;
use App\Http\Controllers\Api\RelatorioController;

// Rota de teste
Route::get('/test', function () {
    return response()->json(['message' => 'API funcionando!']);
});

// Rotas da API v1
Route::prefix('v1')->group(function () {
    // Autores
    Route::apiResource('autores', AutorController::class);
    Route::get('autores/todos', [AutorController::class, 'todos']);

    // Assuntos
    Route::apiResource('assuntos', AssuntoController::class);
    Route::get('assuntos/todos', [AssuntoController::class, 'todos']);

    // Livros
    Route::apiResource('livros', LivroController::class);
    Route::get('livros/autor/{autor}', [LivroController::class, 'porAutor']);
    Route::get('livros/assunto/{assunto}', [LivroController::class, 'porAssunto']);

    // Relatórios
    Route::prefix('relatorios')->group(function () {
        Route::get('livros', [RelatorioController::class, 'livros']);
        Route::get('livros/dados', [RelatorioController::class, 'dadosRelatorio']);
        Route::get('estatisticas', [RelatorioController::class, 'estatisticas']);
        Route::get('exportar/{tipo}', [RelatorioController::class, 'exportar']);
    });
});
