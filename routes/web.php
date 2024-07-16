<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Auth/Login', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    });
});

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('/project', ProjectController::class);
    Route::resource('/task', TaskController::class);
    Route::resource('/user', UserController::class);
});

require __DIR__ . '/auth.php';
