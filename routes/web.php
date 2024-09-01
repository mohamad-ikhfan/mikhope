<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RouterMikrotikController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', 'dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('router')->group(function () {
        Route::get('/', [RouterMikrotikController::class, 'index'])->name('router.index');
        Route::post('/create', [RouterMikrotikController::class, 'store'])->name('router.store');
    });
});

Route::get('test', function () {
    //
});

require __DIR__ . '/auth.php';
