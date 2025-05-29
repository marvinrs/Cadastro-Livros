<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Autor extends Model
{
    use HasFactory;

    protected $table = 'autores';
    protected $primaryKey = 'cod_au';
    
    protected $fillable = [
        'nome'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function livros(): BelongsToMany
    {
        return $this->belongsToMany(
            Livro::class,
            'livro_autor',
            'autor_cod_au',
            'livro_codl'
        );
    }
}
