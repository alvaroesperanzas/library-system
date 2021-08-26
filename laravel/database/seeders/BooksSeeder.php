<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Book;

class BooksSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    Book::create([
      'name' => 'Harry Potter 1',
      'author' => 'J. K. Rowling',
      'publication_date' => '1997-01-01',
    ]);
    Book::create([
      'name' => 'Harry Potter 2',
      'author' => 'J. K. Rowling',
      'publication_date' => '1998-01-01'

    ]);
    Book::create([
      'name' => 'Harry Potter 3',
      'author' => 'J. K. Rowling',
      'publication_date' => '1999-01-01'
    ]);
    Book::create([
      'name' => 'Harry Potter 4',
      'author' => 'J. K. Rowling',
      'publication_date' => '2000-01-01'
    ]);
    Book::create([
      'name' => 'Harry Potter 5',
      'author' => 'J. K. Rowling',
      'publication_date' => '2003-01-01'
    ]);
    Book::create([
      'name' => 'Harry Potter 6',
      'author' => 'J. K. Rowling',
      'publication_date' => '2005-01-01'
    ]);
    Book::create([
      'name' => 'Harry Potter 7',
      'author' => 'J. K. Rowling',
      'publication_date' => '2007-01-01'
    ]);
  }
}
