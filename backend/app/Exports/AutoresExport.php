<?php

namespace App\Exports;

use App\Models\Autor;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class AutoresExport implements FromCollection, WithHeadings, WithMapping
{
    public function collection()
    {
        return Autor::withCount('livros')->get();
    }

    public function headings(): array
    {
        return [
            'Código',
            'Nome',
            'Quantidade de Livros',
            'Criado em',
            'Atualizado em'
        ];
    }

    public function map($autor): array
    {
        return [
            $autor->cod_au,
            $autor->nome,
            $autor->livros_count,
            $autor->created_at->format('d/m/Y H:i:s'),
            $autor->updated_at->format('d/m/Y H:i:s')
        ];
    }
}
