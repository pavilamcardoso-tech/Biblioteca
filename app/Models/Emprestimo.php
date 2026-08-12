<?php

namespace App\Models;

use App\Models\User;
use App\Models\Livro;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Emprestimo extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'livro_id',
        'data_emprestimo',
        'data_devolucao',
        'status',
    ];

    protected $casts = [
        'data_emprestimo' => 'date',
        'data_devolucao' => 'date',
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function livro()
    {
        return $this->belongsTo(Livro::class);
    }
}