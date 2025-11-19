<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('/about', [\App\Http\Controllers\AboutController::class, 'index'])->name('about');
Route::get('/budaya', [\App\Http\Controllers\PublicCultureController::class, 'index'])->name('budaya.index');
Route::get('/budaya/{culture}', [\App\Http\Controllers\PublicCultureController::class, 'show'])->name('budaya.show');
Route::get('/event', [\App\Http\Controllers\PublicEventController::class, 'index'])->name('event.index');
Route::get('/event/{event}', [\App\Http\Controllers\PublicEventController::class, 'show'])->name('event.show');

// Kekayaan Nusantara Routes
Route::get('/kekayaan-nusantara/seni-tradisi', function () {
    return Inertia::render('kekayaan-nusantara/seni-tradisi', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('kekayaan-nusantara.seni-tradisi');

Route::get('/kekayaan-nusantara/bahasa-sastra', function () {
    return Inertia::render('kekayaan-nusantara/bahasa-sastra', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('kekayaan-nusantara.bahasa-sastra');

Route::get('/kekayaan-nusantara/musik-tari', function () {
    return Inertia::render('kekayaan-nusantara/musik-tari', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('kekayaan-nusantara.musik-tari');

Route::get('/kekayaan-nusantara/kuliner-nusantara', function () {
    return Inertia::render('kekayaan-nusantara/kuliner-nusantara', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('kekayaan-nusantara.kuliner-nusantara');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Cultures Routes
    Route::prefix('events')->group(function () {
        Route::resource('cultures', \App\Http\Controllers\Cultures\CultureController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::resource('culture-categories', \App\Http\Controllers\Cultures\CultureCategoryController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::get('culture-reviews', [\App\Http\Controllers\Cultures\CultureReviewController::class, 'index'])->name('culture-reviews.index');
    });

    // Events Routes
    Route::prefix('events')->group(function () {
        Route::resource('list', \App\Http\Controllers\Events\EventController::class)->parameters(['list' => 'event'])->names([
            'index' => 'events.index',
            'store' => 'events.store',
            'update' => 'events.update',
            'destroy' => 'events.destroy',
        ])->only(['index', 'store', 'update', 'destroy']);
        Route::resource('categories', \App\Http\Controllers\Events\EventCategoryController::class)->parameters(['categories' => 'eventCategory'])->names([
            'index' => 'event-categories.index',
            'store' => 'event-categories.store',
            'update' => 'event-categories.update',
            'destroy' => 'event-categories.destroy',
        ])->only(['index', 'store', 'update', 'destroy']);
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
