<?php

namespace App\Http\Controllers;

use App\Models\Leitor;
use Illuminate\Http\Request;

class LeitorController extends Controller
{
    public function index()
    {
        return Leitor::all();
    }

    public function store(Request $request)
    {
        $dados = $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'telefone' => 'nullable|string|max:20',
        ]);

        $leitor = Leitor::create($dados);

        return response()->json($leitor, 201);
    }

    public function show(Leitor $leitor)
    {
        return $leitor;
    }

    public function update(Request $request, Leitor $leitor)
    {
        $dados = $request->validate([
            'nome' => 'sometimes|required|string|max:255',
            'email' => 'nullable|email|max:255',
            'telefone' => 'nullable|string|max:20',
        ]);

        $leitor->update($dados);

        return response()->json($leitor);
    }

    public function destroy(Leitor $leitor)
    {
        $leitor->delete();

        return response()->json(['mensagem' => 'Leitor removido com sucesso']);
    }
}