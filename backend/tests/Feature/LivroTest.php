<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Livro;
use App\Models\Autor;
use App\Models\Assunto;

class LivroTest extends TestCase
{
    use RefreshDatabase;

    public function test_pode_listar_livros()
    {
        Livro::factory()->count(3)->create();

        $response = $this->getJson('/api/v1/livros');

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'data' => [
                         '*' => ['codl', 'titulo', 'editora', 'edicao', 'ano_publicacao', 'valor']
                     ]
                 ]);
    }

    public function test_pode_criar_livro_completo()
    {
        $autor = Autor::factory()->create();
        $assunto = Assunto::factory()->create();

        $dados = [
            'titulo' => 'Livro Teste',
            'editora' => 'Editora Teste',
            'edicao' => 1,
            'ano_publicacao' => '2024',
            'valor' => 50.00,
            'autores_ids' => [$autor->cod_au],
            'assuntos_ids' => [$assunto->cod_as]
        ];

        $response = $this->postJson('/api/v1/livros', $dados);

        $response->assertStatus(201)
                 ->assertJsonPath('data.titulo', 'Livro Teste');
        
        $this->assertDatabaseHas('livros', [
            'titulo' => 'Livro Teste',
            'editora' => 'Editora Teste'
        ]);

        // Verificar relacionamentos
        $livro = Livro::where('titulo', 'Livro Teste')->first();
        $this->assertTrue($livro->autores->contains($autor));
        $this->assertTrue($livro->assuntos->contains($assunto));
    }

    public function test_validacao_campos_obrigatorios()
    {
        $response = $this->postJson('/api/v1/livros', []);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors([
                     'titulo', 'editora', 'edicao', 'ano_publicacao', 'valor', 'autores_ids'
                 ]);
    }

    public function test_validacao_ano_publicacao_formato()
    {
        $dados = [
            'titulo' => 'Livro Teste',
            'editora' => 'Editora Teste',
            'edicao' => 1,
            'ano_publicacao' => '20XX',
            'valor' => 50.00,
            'autores_ids' => [1]
        ];

        $response = $this->postJson('/api/v1/livros', $dados);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['ano_publicacao']);
    }
}
