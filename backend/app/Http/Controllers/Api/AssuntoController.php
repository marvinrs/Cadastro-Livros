<?php

namespace App\Http\Controllers\Api;

use App\Models\Assunto;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\QueryException;

class AssuntoController extends BaseController
{
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Assunto::query();
            
            if ($request->has('search')) {
                $query->where('descricao', 'ilike', '%' . $request->search . '%');
            }
            
            $query->orderBy('descricao');

            if ($request->get('todos')) {
                $assuntos = $query->get();
                return $this->success($assuntos);
            }

            $assuntos = $query->paginate($request->get('per_page', 10));
            return response()->json($assuntos);
            
        } catch (\Exception $e) {
            return $this->error('Erro ao listar assuntos', $e->getMessage());
        }
    }

    public function todos(): JsonResponse
    {
        try {
            $assuntos = Assunto::orderBy('descricao')->get();
            return $this->success($assuntos);
        } catch (\Exception $e) {
            return $this->error('Erro ao listar assuntos', $e->getMessage());
        }
    }

    public function show($id): JsonResponse
    {
        try {
            $assunto = Assunto::with('livros')->findOrFail($id);
            return $this->success($assunto);
        } catch (\Exception $e) {
            return $this->notFound('Assunto não encontrado');
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'descricao' => 'required|string|max:20|unique:assuntos,descricao'
            ]);
            
            $assunto = Assunto::create($validated);
            return $this->success($assunto, 'Assunto criado com sucesso', 201);
        } catch (QueryException $e) {
            if ($e->getCode() == '23505') {
                return $this->error('Já existe um assunto com esta descrição');
            }
            return $this->error('Erro ao criar assunto');
        } catch (\Exception $e) {
            return $this->error('Erro ao criar assunto: ' . $e->getMessage());
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $assunto = Assunto::findOrFail($id);
            
            $validated = $request->validate([
                'descricao' => 'required|string|max:20|unique:assuntos,descricao,' . $id . ',cod_as'
            ]);
            
            $assunto->update($validated);
            return $this->success($assunto, 'Assunto atualizado com sucesso');
        } catch (\Exception $e) {
            return $this->notFound('Assunto não encontrado');
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            $assunto = Assunto::findOrFail($id);
            
            if ($assunto->livros()->count() > 0) {
                return $this->error('Não é possível excluir assunto com livros associados');
            }
            
            $assunto->delete();
            return $this->success(null, 'Assunto excluído com sucesso');
        } catch (\Exception $e) {
            return $this->notFound('Assunto não encontrado');
        }
    }
}
