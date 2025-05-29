<?php

namespace App\Exports;

use App\Models\Assunto;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class AssuntosExport implements FromCollection, WithHeadings, WithMapping
{
    public function collection()
    {
        return Assunto::withCount('livros')->get();
    }

    public function headings(): array
    {
        return [
            'Código',
            'Descrição',
            'Quantidade de Livros',
            'Criado em',
            'Atualizado em'
        ];
    }

    public function map($assunto): array
    {
        return [
            $assunto->cod_as,
            $assunto->descricao,
            $assunto->livros_count,
            $assunto->created_at->format('d/m/Y H:i:s'),
            $assunto->updated_at->format('d/m/Y H:i:s')
        ];
    }
}
