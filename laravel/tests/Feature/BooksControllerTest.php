<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Book;
use App\Models\BookRecord;

class BooksControllerTest extends TestCase
{
  /**
   * A basic test example.
   *
   * @return void
   */
  public function test_list_books()
  {
      $response = $this->get('/api/books');
      $response->assertStatus(200);
  }

  public function test_add_book() {
    $response = $this->post('/api/books', [
      'name' => 'Narnia',
      'author' => 'Author 1',
      'publication_date' => '1995-01-01'
    ]);
    $response->assertStatus(201);
  }

  public function test_borrow_book() {
    $user = User::create([
      'name' => 'Test User',
      'email' => 'test@gmail.com'
    ]);

    $book = Book::create([
      'name' => 'Narnia 2',
      'author' => 'Author 1',
      'publication_date' => '1995-01-01'
    ]);

    $response = $this->post('/api/borrow-book', [
      'user_id' => $user->id,
      'book_id' => $book->id,
    ]);
    $response->assertStatus(200);
  }

  public function test_deliver_book() {
    $user = User::create([
      'name' => 'Test User',
      'email' => 'test3@gmail.com'
    ]);

    $book = Book::create([
      'name' => 'Narnia 2',
      'author' => 'Author 1',
      'publication_date' => '1995-01-01'
    ]);

    $record = BookRecord::create([
      'user_id' => $user->id,
      'book_id' => $book->id,
      'borrowed_at' => now()
    ]);

    $response = $this->post('/api/deliver-book', [
      'record_id' => $record->id,
    ]);
    $response->assertStatus(200);
  }

  public function test_error_borrow_book_when_is_borrowed() {
    $user = User::create([
      'name' => 'Test User',
      'email' => 'test4@gmail.com'
    ]);

    $book = Book::create([
      'name' => 'Narnia 2',
      'author' => 'Author 1',
      'publication_date' => '1995-01-01'
    ]);

    $this->post('/api/borrow-book', [
      'user_id' => $user->id,
      'book_id' => $book->id,
    ]);

    $response = $this->post('/api/borrow-book', [
      'user_id' => $user->id,
      'book_id' => $book->id,
    ]);
    $response->assertStatus(400);
  }
}
