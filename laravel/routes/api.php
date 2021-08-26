<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// actions
Route::get('/borrowed', 'BooksController@borrowed');
Route::post('/borrow-book', 'BooksController@borrow');
Route::post('/deliver-book', 'BooksController@deliver');
Route::get('/books-available', 'BooksController@availableList');

// Records
Route::get('/records/{id}', 'BooksController@records');

Route::get('/books', 'BooksController@list');
Route::get('/books/{id}', 'BooksController@detail');
Route::delete('/books/{id}', 'BooksController@delete');
Route::post('/books', 'BooksController@add');
Route::put('/books', 'BooksController@edit');

Route::get('/categories', 'CategoriesController@list');
Route::post('/categories', 'CategoriesController@add');
Route::get('/categories/{id}', 'CategoriesController@detail');
Route::delete('/categories/{id}', 'CategoriesController@delete');
Route::put('/categories', 'CategoriesController@edit');

Route::get('/users', 'UsersController@list');
Route::post('/users', 'UsersController@add');
Route::get('/users/{id}', 'UsersController@detail');
Route::delete('/users/{id}', 'UsersController@delete');
Route::put('/users', 'UsersController@edit');
