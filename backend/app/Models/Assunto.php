<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Assunto extends Model
{
    use HasFactory;

    protected $table = 'assuntos';
    protected $primaryKey = 'cod_as';
    
    protected $fillable = [
        'descricao'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function livros(): BelongsToMany
    {
        return $this->belongsToMany(
            Livro::class,
            'livro_assunto',
            'assunto_cod_as',
            'livro_codl'
        );
    }
}
