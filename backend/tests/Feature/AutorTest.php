<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Autor;

class AutorTest extends TestCase
{
    use RefreshDatabase;

    public function test_pode_listar_autores()
    {
        Autor::factory()->count(3)->create();

        $response = $this->getJson('/api/v1/autores');

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'data' => [
                         '*' => ['cod_au', 'nome', 'created_at', 'updated_at']
                     ]
                 ]);
    }

    public function test_pode_criar_autor()
    {
        $dados = ['nome' => 'Novo Autor'];

        $response = $this->postJson('/api/v1/autores', $dados);

        $response->assertStatus(201)
                 ->assertJsonPath('data.nome', 'Novo Autor');
        
        $this->assertDatabaseHas('autores', $dados);
    }

    public function test_validacao_nome_obrigatorio()
    {
        $response = $this->postJson('/api/v1/autores', []);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['nome']);
    }

    public function test_pode_atualizar_autor()
    {
        $autor = Autor::factory()->create();
        $novosDados = ['nome' => 'Nome Atualizado'];

        $response = $this->putJson("/api/v1/autores/{$autor->cod_au}", $novosDados);

        $response->assertStatus(200)
                 ->assertJsonPath('data.nome', 'Nome Atualizado');
        
        $this->assertDatabaseHas('autores', $novosDados);
    }

    public function test_pode_excluir_autor()
    {
        $autor = Autor::factory()->create();

        $response = $this->deleteJson("/api/v1/autores/{$autor->cod_au}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('autores', ['cod_au' => $autor->cod_au]);
    }

    public function test_nao_pode_excluir_autor_com_livros()
    {
        $autor = Autor::factory()->hasLivros(1)->create();

        $response = $this->deleteJson("/api/v1/autores/{$autor->cod_au}");

        $response->assertStatus(400)
                 ->assertJsonPath('message', 'Não é possível excluir autor com livros associados');
    }
}
