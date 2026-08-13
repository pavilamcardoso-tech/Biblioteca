<?php

namespace App\Http\Controllers;

use App\Models\Emprestimo;
use App\Models\Livro;
use Illuminate\Http\Request;

class EmprestimoController extends Controller
{
    public function index()
    {
        return Emprestimo::with(['livro', 'leitor'])->get();
    }

    public function store(Request $request)
    {
        $dados = $request->validate([
            'livro_id' => 'required|exists:livros,id',
            'leitor_id' => 'required|exists:leitores,id',
            'data_prevista_devolucao' => 'required|date|after_or_equal:today',
        ]);

        $livro = Livro::findOrFail($dados['livro_id']);

        if ($livro->quantidade_disponivel < 1) {
            return response()->json([
                'mensagem' => 'Não há exemplares disponíveis deste livro no momento.',
            ], 422);
        }

        $emprestimo = Emprestimo::create([
            'livro_id' => $dados['livro_id'],
            'leitor_id' => $dados['leitor_id'],
            'data_emprestimo' => now()->toDateString(),
            'data_prevista_devolucao' => $dados['data_prevista_devolucao'],
        ]);

        $livro->decrement('quantidade_disponivel');

        return response()->json($emprestimo->load(['livro', 'leitor']), 201);
    }

    public function show(Emprestimo $emprestimo)
    {
        return $emprestimo->load(['livro', 'leitor']);
    }

    public function devolver(Emprestimo $emprestimo)
    {
        if ($emprestimo->data_devolucao) {
            return response()->json([
                'mensagem' => 'Este empréstimo já foi devolvido.',
            ], 422);
        }

        $emprestimo->update([
            'data_devolucao' => now()->toDateString(),
        ]);

        $emprestimo->livro->increment('quantidade_disponivel');

        return response()->json($emprestimo->load(['livro', 'leitor']));
    }

    public function destroy(Emprestimo $emprestimo)
    {
        if (!$emprestimo->data_devolucao) {
            $emprestimo->livro->increment('quantidade_disponivel');
        }

        $emprestimo->delete();

        return response()->json(['mensagem' => 'Empréstimo removido com sucesso']);
    }
}