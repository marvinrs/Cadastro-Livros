<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Relatório de Livros por Autor</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            line-height: 1.6;
            color: #333;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
            background-color: #f8f9fa;
            border-bottom: 2px solid #dee2e6;
        }
        
        .header h1 {
            color: #495057;
            margin-bottom: 10px;
            font-size: 24px;
        }
        
        .header p {
            color: #6c757d;
            font-size: 14px;
        }
        
        .autor-section {
            margin-bottom: 30px;
            page-break-inside: avoid;
        }
        
        .autor-nome {
            background-color: #007bff;
            color: white;
            padding: 8px 15px;
            margin-bottom: 10px;
            font-weight: bold;
            font-size: 14px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        
        th {
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            padding: 8px;
            text-align: left;
            font-weight: bold;
        }
        
        td {
            border: 1px solid #dee2e6;
            padding: 8px;
        }
        
        tr:nth-child(even) {
            background-color: #f8f9fa;
        }
        
        .valor {
            text-align: right;
            white-space: nowrap;
        }
        
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #dee2e6;
            text-align: center;
            font-size: 10px;
            color: #6c757d;
        }
        
        .estatisticas {
            background-color: #e9ecef;
            padding: 15px;
            margin-top: 30px;
            border-radius: 5px;
        }
        
        .estatisticas h3 {
            margin-bottom: 10px;
            color: #495057;
        }
        
        .estatisticas p {
            margin: 5px 0;
        }
        
        @page {
            margin: 1cm;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Relatório de Livros por Autor</h1>
        <p>Gerado em: {{ $dataGeracao }}</p>
    </div>

    @foreach($dadosAgrupados as $autor => $livros)
        <div class="autor-section">
            <div class="autor-nome">{{ $autor }}</div>
            <table>
                <thead>
                    <tr>
                        <th style="width: 30%">Título</th>
                        <th style="width: 25%">Editora</th>
                        <th style="width: 10%">Edição</th>
                        <th style="width: 10%">Ano</th>
                        <th style="width: 15%">Valor</th>
                        <th style="width: 10%">Assunto</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($livros as $livro)
                        <tr>
                            <td>{{ $livro->titulo }}</td>
                            <td>{{ $livro->editora }}</td>
                            <td style="text-align: center">{{ $livro->edicao }}ª</td>
                            <td style="text-align: center">{{ $livro->ano_publicacao }}</td>
                            <td class="valor">R$ {{ number_format($livro->valor, 2, ',', '.') }}</td>
                            <td>{{ $livro->assunto ?? '-' }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    @endforeach

    @if($totalGeral)
        <div class="estatisticas">
            <h3>Resumo Geral</h3>
            <p><strong>Total de Livros:</strong> {{ $totalGeral->total_livros }}</p>
            <p><strong>Total de Autores:</strong> {{ $totalGeral->total_autores }}</p>
            <p><strong>Total de Assuntos:</strong> {{ $totalGeral->total_assuntos }}</p>
            <p><strong>Valor Médio:</strong> R$ {{ number_format($totalGeral->valor_medio, 2, ',', '.') }}</p>
            <p><strong>Valor Total:</strong> R$ {{ number_format($totalGeral->valor_total, 2, ',', '.') }}</p>
        </div>
    @endif

    <div class="footer">
        <p>Sistema de Cadastro de Livros - Relatório gerado automaticamente</p>
    </div>
</body>
</html>
