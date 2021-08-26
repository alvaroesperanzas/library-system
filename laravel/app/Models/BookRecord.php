<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookRecord extends Model
{
  use HasFactory;

  protected $table = 'books_records';

  protected $fillable = [
    'book_id',
    'user_id',
    'borrowed_at',
    'delivery_at'
  ];

  public function user() {
    return $this->belongsTo(User::class);
  }

  public function book() {
    return $this->belongsTo(Book::class);
  }
}
