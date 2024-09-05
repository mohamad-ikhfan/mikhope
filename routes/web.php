<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\PacketController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RouterMikrotikController;
use App\Http\Controllers\SubscribedController;
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
        Route::post('store', [RouterMikrotikController::class, 'store'])->name('router.store');
        Route::put('update/{id}', [RouterMikrotikController::class, 'update'])->name('router.update');
        Route::delete('/{id}', [RouterMikrotikController::class, 'destroy'])->name('router.destroy');
    });

    Route::prefix('client')->group(function () {
        Route::get('/', [ClientController::class, 'index'])->name('client.index');
        Route::post('store', [ClientController::class, 'store'])->name('client.store');
        Route::put('update/{id}', [ClientController::class, 'update'])->name('client.update');
        Route::delete('/{id}', [ClientController::class, 'destroy'])->name('client.destroy');
    });

    Route::prefix('packet')->group(function () {
        Route::get('/', [PacketController::class, 'index'])->name('packet.index');
        Route::post('store', [PacketController::class, 'store'])->name('packet.store');
        Route::put('update/{id}', [PacketController::class, 'update'])->name('packet.update');
        Route::delete('/{id}', [PacketController::class, 'destroy'])->name('packet.destroy');
    });

    Route::prefix('subscribed')->group(function () {
        Route::get('/', [SubscribedController::class, 'index'])->name('subscribed.index');
        Route::post('store', [SubscribedController::class, 'store'])->name('subscribed.store');
        Route::put('update/{id}', [SubscribedController::class, 'update'])->name('subscribed.update');
        Route::delete('/{id}', [SubscribedController::class, 'destroy'])->name('subscribed.destroy');
    });

    Route::prefix('invoice')->group(function () {
        Route::get('/', [InvoiceController::class, 'index'])->name('invoice.index');
        Route::post('store', [InvoiceController::class, 'store'])->name('invoice.store');
        Route::put('update/{id}', [InvoiceController::class, 'update'])->name('invoice.update');
        Route::delete('/{id}', [InvoiceController::class, 'destroy'])->name('invoice.destroy');
        Route::patch('payment-accepted/{id}', [InvoiceController::class, 'paymentAccepted'])->name('invoice.payment-accepted');
    });
});

Route::get('test', function () {
    //
});

require __DIR__ . '/auth.php';