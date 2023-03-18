<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedUserController;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
                ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedUserController::class, 'create'])
                ->name('login');

    Route::post('login', [AuthenticatedUserController::class, 'store']);
});

Route::middleware('auth:api')->group(function () {
    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('logout', [AuthenticatedUserController::class, 'destroy'])
                ->name('logout');
});
