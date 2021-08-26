<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
  use HasFactory;

  protected $table = 'books';

  protected $fillable = [
    'name',
    'author',
    'publication_date',
    'deleted_at'
  ];

  public function record() {
    return $this->hasOne(BookRecord::class)
      ->whereNull('delivered_at');
  }

  public function records() {
    return $this->hasMany(BookRecord::class)->orderBy('created_at', 'ASC');
  }
}
