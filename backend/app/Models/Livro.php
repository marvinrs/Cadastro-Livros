<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Livro extends Model
{
    use HasFactory;

    protected $table = 'livros';
    protected $primaryKey = 'codl';
    
    protected $fillable = [
        'titulo',
        'editora',
        'edicao',
        'ano_publicacao',
        'valor'
    ];

    protected $casts = [
        'edicao' => 'integer',
        'valor' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    protected $appends = ['valor_formatado'];

    public function autores(): BelongsToMany
    {
        return $this->belongsToMany(
            Autor::class,
            'livro_autor',
            'livro_codl',
            'autor_cod_au'
        );
    }

    public function assuntos(): BelongsToMany
    {
        return $this->belongsToMany(
            Assunto::class,
            'livro_assunto',
            'livro_codl',
            'assunto_cod_as'
        );
    }

    public function getValorFormatadoAttribute(): string
    {
        return 'R$ ' . number_format($this->valor, 2, ',', '.');
    }
}
