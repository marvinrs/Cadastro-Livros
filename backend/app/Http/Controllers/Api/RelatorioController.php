<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\LivrosExport;
use App\Exports\AutoresExport;
use App\Exports\AssuntosExport;

class RelatorioController extends BaseController
{
    public function livros(Request $request)
    {
        try {
            $formato = $request->get('formato', 'pdf');
            
            // Busca dados da view
            $dados = DB::table('vw_relatorio_livros')
                ->orderBy('nome_autor')
                ->orderBy('titulo')
                ->get();

            // Agrupa por autor
            $dadosAgrupados = $dados->groupBy('nome_autor');

            if ($formato === 'pdf') {
                return $this->gerarPDF($dadosAgrupados);
            } elseif ($formato === 'excel') {
                return $this->gerarExcel($dadosAgrupados);
            }

            return $this->error('Formato inválido. Use pdf ou excel.');
            
        } catch (\Exception $e) {
            return $this->error('Erro ao gerar relatório', $e->getMessage());
        }
    }

    public function dadosRelatorio(): JsonResponse
    {
        try {
            $dados = DB::table('vw_relatorio_livros')
                ->orderBy('nome_autor')
                ->orderBy('titulo')
                ->get();

            return $this->success($dados);
        } catch (\Exception $e) {
            return $this->error('Erro ao buscar dados do relatório', $e->getMessage());
        }
    }

    public function estatisticas(): JsonResponse
    {
        try {
            $estatisticas = DB::table('vw_estatisticas')->first();
            
            // Formata valores monetários
            if ($estatisticas) {
                $estatisticas->valor_medio_formatado = 'R$ ' . number_format($estatisticas->valor_medio, 2, ',', '.');
                $estatisticas->valor_total_formatado = 'R$ ' . number_format($estatisticas->valor_total, 2, ',', '.');
                $estatisticas->valor_maximo_formatado = 'R$ ' . number_format($estatisticas->valor_maximo, 2, ',', '.');
                $estatisticas->valor_minimo_formatado = 'R$ ' . number_format($estatisticas->valor_minimo, 2, ',', '.');
            }

            return $this->success($estatisticas);
        } catch (\Exception $e) {
            return $this->error('Erro ao buscar estatísticas', $e->getMessage());
        }
    }

    public function exportar(Request $request, $tipo)
    {
        try {
            $formato = $request->get('formato', 'csv');
            
            switch ($tipo) {
                case 'livros':
                    $export = new LivrosExport();
                    $filename = 'livros';
                    break;
                case 'autores':
                    $export = new AutoresExport();
                    $filename = 'autores';
                    break;
                case 'assuntos':
                    $export = new AssuntosExport();
                    $filename = 'assuntos';
                    break;
                default:
                    return $this->error('Tipo de exportação inválido');
            }

            $filename .= '_' . date('Y-m-d_H-i-s');

            if ($formato === 'csv') {
                return Excel::download($export, $filename . '.csv', \Maatwebsite\Excel\Excel::CSV);
            } elseif ($formato === 'excel') {
                return Excel::download($export, $filename . '.xlsx');
            }

            return $this->error('Formato inválido. Use csv ou excel.');
            
        } catch (\Exception $e) {
            return $this->error('Erro ao exportar dados', $e->getMessage());
        }
    }

    private function gerarPDF($dadosAgrupados)
    {
        $pdf = PDF::loadView('relatorios.livros', [
            'dadosAgrupados' => $dadosAgrupados,
            'dataGeracao' => now()->format('d/m/Y H:i:s'),
            'totalGeral' => DB::table('vw_estatisticas')->first()
        ]);

        $pdf->setPaper('A4', 'portrait');
        
        return $pdf->download('relatorio_livros_' . date('Y-m-d_H-i-s') . '.pdf');
    }

    private function gerarExcel($dadosAgrupados)
    {
        $filename = 'relatorio_livros_' . date('Y-m-d_H-i-s') . '.xlsx';
        
        return Excel::download(new class($dadosAgrupados) implements \Maatwebsite\Excel\Concerns\FromCollection, \Maatwebsite\Excel\Concerns\WithHeadings, \Maatwebsite\Excel\Concerns\WithMapping {
            private $dados;
            private $rowNumber = 0;
            
            public function __construct($dados)
            {
                $this->dados = $dados;
            }
            
            public function collection()
            {
                $rows = collect();
                
                foreach ($this->dados as $autor => $livros) {
                    // Adiciona linha do autor
                    $rows->push([
                        'autor' => $autor,
                        'titulo' => '',
                        'editora' => '',
                        'edicao' => '',
                        'ano' => '',
                        'valor' => '',
                        'assunto' => ''
                    ]);
                    
                    // Adiciona livros do autor
                    foreach ($livros as $livro) {
                        $rows->push([
                            'autor' => '',
                            'titulo' => $livro->titulo,
                            'editora' => $livro->editora,
                            'edicao' => $livro->edicao,
                            'ano' => $livro->ano_publicacao,
                            'valor' => $livro->valor,
                            'assunto' => $livro->assunto
                        ]);
                    }
                }
                
                return $rows;
            }
            
            public function headings(): array
            {
                return [
                    'Autor',
                    'Título',
                    'Editora',
                    'Edição',
                    'Ano',
                    'Valor',
                    'Assunto'
                ];
            }
            
            public function map($row): array
            {
                return [
                    $row['autor'],
                    $row['titulo'],
                    $row['editora'],
                    $row['edicao'],
                    $row['ano'],
                    $row['valor'] ? 'R$ ' . number_format($row['valor'], 2, ',', '.') : '',
                    $row['assunto']
                ];
            }
        }, $filename);
    }
}
