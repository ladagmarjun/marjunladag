<?php

use App\Http\Controllers\Admin\ExperienceController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\SkillController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\PortfolioController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

Route::get('/', [PortfolioController::class, 'home'])->name('home');

Route::get('/projects', [PortfolioController::class, 'projects'])->name('projects');

Route::get('/experience', [PortfolioController::class, 'experience'])->name('experience');

Route::post('/chat', [ChatController::class, 'chat'])->name('chat')->middleware('throttle:30,1');

// Serve uploaded files through the app so images work even on hosts without a
// working `public/storage` symlink (e.g. shared/cPanel). If the symlink exists,
// the web server serves the file directly and this route is never reached.
Route::get('/storage/{path}', function (string $path) {
    abort_unless(Storage::disk('public')->exists($path), 404);

    return Storage::disk('public')->response($path);
})->where('path', '.*')->name('storage.serve');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('projects', ProjectController::class)->except(['show']);
        Route::resource('skills', SkillController::class)->except(['show']);
        Route::resource('experiences', ExperienceController::class)->except(['show']);
    });
});

require __DIR__.'/settings.php';
