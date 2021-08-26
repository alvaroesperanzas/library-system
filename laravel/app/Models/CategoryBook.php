<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryBook extends Model
{
  use HasFactory;

  protected $table = 'categories_books';

  protected $fillable = [
    'book_id',
    'category_id',
    'deleted_at'
  ];
}
