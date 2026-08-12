<?php

namespace App\Http\Controllers;

use App\Models\Livro;
use Illuminate\Http\Request;

class LivroController extends Controller
{
    // GET /api/livros -> lista todos os livros
    public function index()
    {
        return Livro::all();
    }

    // POST /api/livros -> cria um novo livro
    public function store(Request $request)
    {
        $dados = $request->validate([
            'titulo' => 'required|string|max:255',
            'autor' => 'required|string|max:255',
            'isbn' => 'required|string|unique:livros,isbn',
            'quantidade_total' => 'required|integer|min:1',
        ]);

        $dados['quantidade_disponivel'] = $dados['quantidade_total'];

        $livro = Livro::create($dados);

        return response()->json($livro, 201);
    }

    // GET /api/livros/{livro} -> mostra um livro específico
    public function show(Livro $livro)
    {
        return $livro;
    }

    // PUT/PATCH /api/livros/{livro} -> atualiza um livro
    public function update(Request $request, Livro $livro)
    {
        $dados = $request->validate([
            'titulo' => 'sometimes|required|string|max:255',
            'autor' => 'sometimes|required|string|max:255',
            'isbn' => 'sometimes|required|string|unique:livros,isbn,' . $livro->id,
            'quantidade_total' => 'sometimes|required|integer|min:1',
        ]);

        $livro->update($dados);

        return response()->json($livro);
    }

    // DELETE /api/livros/{livro} -> remove um livro
    public function destroy(Livro $livro)
    {
        $livro->delete();

        return response()->json(['mensagem' => 'Livro removido com sucesso']);
    }
}