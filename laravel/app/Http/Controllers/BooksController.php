<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\BookRecord;
use App\Helpers\FilterHelper;

class BooksController extends Controller
{
  public function borrowed(Request $request) {
    $borrowed = BookRecord::with('user')
      ->with('book')
      ->whereNull('delivered_at')
      ->paginate(10);

    return response()->json($borrowed);
  }

  public function availableList(Request $request) {
    $books = Book::with('record')
      ->whereNull('deleted_at')
      ->get();
    
    return response()->json($books);
  }

  public function list(Request $request) {
    $books = Book::whereNull('deleted_at');
    $books = FilterHelper::appendFilters(
      $books,
      [['name', 'like'], ['author', 'like']],
      $request
    );

    if ($request->page) {
      $books = $books->paginate(10);
    } else {
      
      $books = $books->get();
    }
    
    return response()->json($books);
  }

  public function add(Request $request) {
    $validated = $request->validate([
      'name' => 'required',
      'author' => 'required',
      'publication_date' => 'required'
    ]);

    $book = Book::create($validated);

    return response()->json($book);
  }

  public function borrow(Request $request) {
    $validated = $request->validate([
      'user_id' => 'required',
      'book_id' => 'required',
    ]);

    $record = BookRecord::create([
      'user_id' => $request['user_id'],
      'book_id' => $request['book_id'],
      'borrowed_at' => now()
    ]);

    $books = Book::with('record')
      ->whereNull('deleted_at')
      ->get();

    return response()->json($books);
  }

  public function deliver(Request $request) {
    $validated = $request->validate([
      'record_id' => 'required',
    ]);

    $record = BookRecord::find($request->record_id);
    $record->delivered_at = now();
    $record->save();

    $books = Book::with('record')
      ->whereNull('deleted_at')
      ->get();

    return response()->json($books);
  }

  public function detail($id) {
    $book = Book::find($id);
    return response()->json($book);
  }

  public function edit(Request $request) {
    $book = Book::find($request->id);
    $book->update($request->all());
    return response()->json($book);
  }

  public function delete($id) {
    $book = Book::find($id);
    $book->deleted_at = now();
    $book->save();

    return response()->json($book);
  }
}
