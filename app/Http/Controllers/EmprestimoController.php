<?php

namespace App\Http\Controllers;

use App\Models\Emprestimo;
use App\Models\Livro;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EmprestimoController extends Controller
{
    // GET /api/emprestimos
    // Lista todos os empréstimos
    public function index()
    {
        return Emprestimo::with(['usuario', 'livro'])->get();
    }

    // POST /api/emprestimos
    // Cria um novo empréstimo
    public function store(Request $request)
    {
        $dados = $request->validate([
            'user_id' => 'required|exists:users,id',
            'livro_id' => 'required|exists:livros,id',
        ]);

        $livro = Livro::findOrFail($dados['livro_id']);

        // Verifica se existem exemplares disponíveis
        if ($livro->quantidade_disponivel <= 0) {
            return response()->json([
                'mensagem' => 'Este livro não está disponível para empréstimo.'
            ], 422);
        }

        $emprestimo = DB::transaction(function () use ($dados, $livro) {

            $emprestimo = Emprestimo::create([
                'user_id' => $dados['user_id'],
                'livro_id' => $dados['livro_id'],
                'data_emprestimo' => now(),
                'status' => 'emprestado',
            ]);

            // Diminui a quantidade disponível
            $livro->decrement('quantidade_disponivel');

            return $emprestimo;
        });

        return response()->json(
            $emprestimo->load(['usuario', 'livro']),
            201
        );
    }

    // GET /api/emprestimos/{emprestimo}
    // Mostra um empréstimo específico
    public function show(Emprestimo $emprestimo)
    {
        return $emprestimo->load(['usuario', 'livro']);
    }

    // PUT/PATCH /api/emprestimos/{emprestimo}
    // Atualiza um empréstimo
    public function update(Request $request, Emprestimo $emprestimo)
    {
        $dados = $request->validate([
            'status' => 'required|in:emprestado,devolvido',
        ]);

        // Se o livro ainda está emprestado e está sendo devolvido
        if (
            $emprestimo->status === 'emprestado' &&
            $dados['status'] === 'devolvido'
        ) {
            DB::transaction(function () use ($emprestimo) {

                $emprestimo->update([
                    'status' => 'devolvido',
                    'data_devolucao' => now(),
                ]);

                // Devolve o exemplar para o estoque
                $emprestimo->livro->increment('quantidade_disponivel');
            });
        }

        return response()->json(
            $emprestimo->fresh()->load(['usuario', 'livro'])
        );
    }

    // DELETE /api/emprestimos/{emprestimo}
    // Remove um empréstimo
    public function destroy(Emprestimo $emprestimo)
    {
        $emprestimo->delete();

        return response()->json([
            'mensagem' => 'Empréstimo removido com sucesso.'
        ]);
    }
}