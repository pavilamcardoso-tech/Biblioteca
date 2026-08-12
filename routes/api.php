<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LivroController;
use App\Http\Controllers\EmprestimoController;

Route::apiResource('livros', LivroController::class);
Route::apiResource('emprestimos', EmprestimoController::class);