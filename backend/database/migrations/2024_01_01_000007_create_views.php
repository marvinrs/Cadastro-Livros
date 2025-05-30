<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void {
        DB::statement("
            CREATE OR REPLACE VIEW vw_relatorio_livros AS
            SELECT
                a.cod_au,
                a.nome AS nome_autor,
                l.codl,
                l.titulo,
                l.editora,
                l.edicao,
                l.ano_publicacao,
                l.valor,
                ass.descricao AS assunto
            FROM autores a
            INNER JOIN livro_autor la ON a.cod_au = la.autor_cod_au
            INNER JOIN livros l ON la.livro_codl = l.codl
            LEFT JOIN livro_assunto las ON l.codl = las.livro_codl
            LEFT JOIN assuntos ass ON las.assunto_cod_as = ass.cod_as
            ORDER BY a.nome, l.titulo
        ");

        DB::statement("
            CREATE OR REPLACE VIEW vw_estatisticas AS
            SELECT
                COUNT(DISTINCT l.codl) AS total_livros,
                COUNT(DISTINCT a.cod_au) AS total_autores,
                COUNT(DISTINCT ass.cod_as) AS total_assuntos,
                COALESCE(AVG(l.valor), 0) AS valor_medio,
                COALESCE(SUM(l.valor), 0) AS valor_total,
                COALESCE(MAX(l.valor), 0) AS valor_maximo,
                COALESCE(MIN(l.valor), 0) AS valor_minimo
            FROM livros l
            LEFT JOIN livro_autor la ON l.codl = la.livro_codl
            LEFT JOIN autores a ON la.autor_cod_au = a.cod_au
            LEFT JOIN livro_assunto las ON l.codl = las.livro_codl
            LEFT JOIN assuntos ass ON las.assunto_cod_as = ass.cod_as
        ");
    }

    public function down(): void {
        DB::statement('DROP VIEW IF EXISTS vw_estatisticas');
        DB::statement('DROP VIEW IF EXISTS vw_relatorio_livros');
    }
};
