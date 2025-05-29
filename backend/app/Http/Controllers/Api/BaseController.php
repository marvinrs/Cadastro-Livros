<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class BaseController extends Controller
{
    protected function success($data = null, string $message = null, int $code = 200): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ], $code);
    }

    protected function error(string $message, $errors = null, int $code = 400): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors
        ], $code);
    }

    protected function notFound(string $message = 'Recurso não encontrado'): JsonResponse
    {
        return $this->error($message, null, 404);
    }

    protected function validationError($errors): JsonResponse
    {
        return $this->error('Dados inválidos', $errors, 422);
    }
}
