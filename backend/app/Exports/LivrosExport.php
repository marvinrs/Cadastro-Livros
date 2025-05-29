<?php

namespace App\Exports;

use App\Models\Livro;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class LivrosExport implements FromCollection, WithHeadings, WithMapping
{
    public function collection()
    {
        return Livro::with(['autores', 'assuntos'])->get();
    }

    public function headings(): array
    {
        return [
            'Código',
            'Título',
            'Editora',
            'Edição',
            'Ano Publicação',
            'Valor',
            'Autores',
            'Assuntos',
            'Criado em',
            'Atualizado em'
        ];
    }

    public function map($livro): array
    {
        return [
            $livro->codl,
            $livro->titulo,
            $livro->editora,
            $livro->edicao,
            $livro->ano_publicacao,
            'R$ ' . number_format($livro->valor, 2, ',', '.'),
            $livro->autores->pluck('nome')->implode(', '),
            $livro->assuntos->pluck('descricao')->implode(', '),
            $livro->created_at->format('d/m/Y H:i:s'),
            $livro->updated_at->format('d/m/Y H:i:s')
        ];
    }
}
