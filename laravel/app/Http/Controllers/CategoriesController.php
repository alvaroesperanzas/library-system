<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\CategoryBook;

class CategoriesController extends Controller
{
  public function list(Request $request) {
    $categories = Category::whereNull('deleted_at')
      ->paginate(10);
    
    return response()->json($categories);
  }

  public function add(Request $request) {
    $validated = $request->validate([
      'name' => 'required',
      'description' => 'required',
      'books' => 'required'
    ]);
    
    $category = Category::create([
      'name' => $request->name,
      'description' => $request->description
    ]);

    $books = $request->books;
    foreach($books as $book) {
      if (!isset($book['remove'])) {
        CategoryBook::create([
          'book_id' => $book['id'],
          'category_id' => $category->id
        ]);
      }
    }

    return response()->json($category);
  }

  public function edit(Request $request) {
    $validated = $request->validate([
      'name' => 'required',
      'description' => 'required',
      'books' => 'required'
    ]);
    
    $category = Category::find($request->id);
    $category->update([
      'name' => $request->name,
      'description' => $request->description
    ]);

    $books = $request->books;
    foreach($books as $book) {
      if (isset($book['remove'])) {
        if(isset($book['pivot'])) {
          CategoryBook::destroy($book['pivot']['id']);
        }
      } else {
        if(!isset($book['pivot'])) {
          CategoryBook::create([
            'book_id' => $book['id'],
            'category_id' => $category->id
          ]);
        }
      }
    }

    return response()->json($category);
  }

  public function detail($id) {
    $category = Category::with('books')->find($id);
    return response()->json($category);
  }

  public function delete($id) {
    $category = Category::find($id);
    $category->deleted_at = now();
    $category->save();

    return response()->json($category);
  }
}
