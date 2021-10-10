<?php

use App\Http\Controllers\Admin\CategoryController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['prefix' => 'modules'], function () {
    Route::resource('/categories', CategoryController::class);
});

Auth::routes();

Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('dashboard');
