<?php

namespace App\Http\Controllers\Api;

use App\Models\Livro;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class LivroController extends BaseController
{
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Livro::with(['autores', 'assuntos']);
            
            if ($request->has('search')) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('titulo', 'ilike', '%' . $search . '%')
                      ->orWhere('editora', 'ilike', '%' . $search . '%')
                      ->orWhereHas('autores', function ($qa) use ($search) {
                          $qa->where('nome', 'ilike', '%' . $search . '%');
                      });
                });
            }
            
            $livros = $query->orderBy('titulo')
                           ->paginate($request->get('per_page', 10));

            return response()->json($livros);
        } catch (\Exception $e) {
            return $this->error('Erro ao listar livros', $e->getMessage());
        }
    }

    public function show($id): JsonResponse
    {
        try {
            $livro = Livro::with(['autores', 'assuntos'])->findOrFail($id);
            return $this->success($livro);
        } catch (\Exception $e) {
            return $this->notFound('Livro não encontrado');
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'titulo' => 'required|string|max:40',
                'editora' => 'required|string|max:40',
                'edicao' => 'required|integer|min:1',
                'ano_publicacao' => 'required|string|size:4|regex:/^\d{4}$/',
                'valor' => 'required|numeric|min:0',
                'autores_ids' => 'required|array|min:1',
                'autores_ids.*' => 'required|integer|exists:autores,cod_au',
                'assuntos_ids' => 'nullable|array',
                'assuntos_ids.*' => 'required|integer|exists:assuntos,cod_as'
            ]);

            DB::beginTransaction();

            $livro = Livro::create($request->except(['autores_ids', 'assuntos_ids']));
            
            if ($request->has('autores_ids')) {
                $livro->autores()->sync($request->autores_ids);
            }
            
            if ($request->has('assuntos_ids')) {
                $livro->assuntos()->sync($request->assuntos_ids);
            }

            DB::commit();

            $livro->load(['autores', 'assuntos']);
            return $this->success($livro, 'Livro criado com sucesso', 201);
            
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->error('Erro ao criar livro', $e->getMessage());
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $validated = $request->validate([
                'titulo' => 'required|string|max:40',
                'editora' => 'required|string|max:40',
                'edicao' => 'required|integer|min:1',
                'ano_publicacao' => 'required|string|size:4|regex:/^\d{4}$/',
                'valor' => 'required|numeric|min:0',
                'autores_ids' => 'required|array|min:1',
                'autores_ids.*' => 'required|integer|exists:autores,cod_au',
                'assuntos_ids' => 'nullable|array',
                'assuntos_ids.*' => 'required|integer|exists:assuntos,cod_as'
            ]);

            DB::beginTransaction();

            $livro = Livro::findOrFail($id);
            $livro->update($request->except(['autores_ids', 'assuntos_ids']));
            
            if ($request->has('autores_ids')) {
                $livro->autores()->sync($request->autores_ids);
            }
            
            if ($request->has('assuntos_ids')) {
                $livro->assuntos()->sync($request->assuntos_ids);
            }

            DB::commit();

            $livro->load(['autores', 'assuntos']);
            return $this->success($livro, 'Livro atualizado com sucesso');
            
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->notFound('Livro não encontrado');
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            $livro = Livro::findOrFail($id);
            $livro->delete();
            return $this->success(null, 'Livro excluído com sucesso');
        } catch (\Exception $e) {
            return $this->notFound('Livro não encontrado');
        }
    }

    public function porAutor($autorId): JsonResponse
    {
        try {
            $livros = Livro::with(['autores', 'assuntos'])
                ->whereHas('autores', function ($query) use ($autorId) {
                    $query->where('cod_au', $autorId);
                })
                ->orderBy('titulo')
                ->get();

            return $this->success($livros);
        } catch (\Exception $e) {
            return $this->error('Erro ao buscar livros por autor');
        }
    }

    public function porAssunto($assuntoId): JsonResponse
    {
        try {
            $livros = Livro::with(['autores', 'assuntos'])
                ->whereHas('assuntos', function ($query) use ($assuntoId) {
                    $query->where('cod_as', $assuntoId);
                })
                ->orderBy('titulo')
                ->get();

            return $this->success($livros);
        } catch (\Exception $e) {
            return $this->error('Erro ao buscar livros por assunto');
        }
    }
}
