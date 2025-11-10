<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Cultures Routes
    Route::prefix('events')->group(function () {
        Route::get('cultures', [\App\Http\Controllers\Cultures\CultureController::class, 'index'])->name('cultures.index');
        Route::get('culture-categories', [\App\Http\Controllers\Cultures\CultureCategoryController::class, 'index'])->name('culture-categories.index');
        Route::get('culture-reviews', [\App\Http\Controllers\Cultures\CultureReviewController::class, 'index'])->name('culture-reviews.index');
    });

    // Events Routes
    Route::prefix('events')->group(function () {
        Route::get('list', [\App\Http\Controllers\Events\EventController::class, 'index'])->name('events.index');
        Route::get('categories', [\App\Http\Controllers\Events\EventCategoryController::class, 'index'])->name('event-categories.index');
        Route::get('schedule', [\App\Http\Controllers\Events\EventScheduleController::class, 'index'])->name('event-schedule.index');
    });

    // Store Routes
    Route::prefix('store')->group(function () {
        Route::get('products', [\App\Http\Controllers\Store\ProductController::class, 'index'])->name('products.index');
        Route::get('categories', [\App\Http\Controllers\Store\ProductCategoryController::class, 'index'])->name('product-categories.index');
        Route::get('orders', [\App\Http\Controllers\Store\OrderController::class, 'index'])->name('orders.index');
        Route::get('reports', [\App\Http\Controllers\Store\ReportController::class, 'index'])->name('reports.index');
    });

    // Users Routes
    Route::resource('users', \App\Http\Controllers\Users\UserController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('roles', \App\Http\Controllers\Users\RoleController::class)->only(['index', 'store', 'update', 'destroy']);
});

require __DIR__.'/settings.php';
