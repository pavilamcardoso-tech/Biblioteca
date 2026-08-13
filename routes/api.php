<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LivroController;
use App\Http\Controllers\LeitorController;
use App\Http\Controllers\EmprestimoController;

Route::apiResource('livros', LivroController::class);
Route::apiResource('leitores', LeitorController::class);

Route::apiResource('emprestimos', EmprestimoController::class)->except(['update']);
Route::patch('/emprestimos/{emprestimo}/devolver', [EmprestimoController::class, 'devolver']);