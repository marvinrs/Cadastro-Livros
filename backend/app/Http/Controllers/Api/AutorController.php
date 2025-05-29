<?php

namespace App\Http\Controllers\Api;

use App\Models\Autor;
use App\Http\Requests\AutorRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\QueryException;

class AutorController extends BaseController
{
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Autor::query();
            
            if ($request->has('search')) {
                $query->where('nome', 'ilike', '%' . $request->search . '%');
            }
            
            $query->orderBy('nome');

            if ($request->get('todos')) {
                $autores = $query->get();
                return $this->success($autores);
            }

            $autores = $query->paginate($request->get('per_page', 10));
            return response()->json($autores);
            
        } catch (\Exception $e) {
            return $this->error('Erro ao listar autores', $e->getMessage());
        }
    }

    public function todos(): JsonResponse
    {
        try {
            $autores = Autor::orderBy('nome')->get();
            return $this->success($autores);
        } catch (\Exception $e) {
            return $this->error('Erro ao listar autores', $e->getMessage());
        }
    }

    public function show($id): JsonResponse
    {
        try {
            $autor = Autor::with('livros')->findOrFail($id);
            return $this->success($autor);
        } catch (\Exception $e) {
            return $this->notFound('Autor não encontrado');
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'nome' => 'required|string|max:40|unique:autores,nome'
            ]);
            
            $autor = Autor::create($validated);
            return $this->success($autor, 'Autor criado com sucesso', 201);
        } catch (QueryException $e) {
            if ($e->getCode() == '23505') {
                return $this->error('Já existe um autor com este nome');
            }
            return $this->error('Erro ao criar autor');
        } catch (\Exception $e) {
            return $this->error('Erro ao criar autor: ' . $e->getMessage());
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $autor = Autor::findOrFail($id);
            
            $validated = $request->validate([
                'nome' => 'required|string|max:40|unique:autores,nome,' . $id . ',cod_au'
            ]);
            
            $autor->update($validated);
            return $this->success($autor, 'Autor atualizado com sucesso');
        } catch (\Exception $e) {
            return $this->notFound('Autor não encontrado');
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            $autor = Autor::findOrFail($id);
            
            if ($autor->livros()->count() > 0) {
                return $this->error('Não é possível excluir autor com livros associados');
            }
            
            $autor->delete();
            return $this->success(null, 'Autor excluído com sucesso');
        } catch (\Exception $e) {
            return $this->notFound('Autor não encontrado');
        }
    }
}
