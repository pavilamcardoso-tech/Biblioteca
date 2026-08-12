<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LivroController;
use App\Http\Controllers\LeitorController;

Route::apiResource('livros', LivroController::class);
Route::apiResource('leitores', LeitorController::class);