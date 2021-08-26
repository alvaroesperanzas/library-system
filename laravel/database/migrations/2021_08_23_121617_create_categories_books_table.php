<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriesBooksTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('categories_books', function (Blueprint $table) {
      $table->engine = 'InnoDB';
      $table->id();
      $table->unsignedBigInteger('book_id');
      $table->unsignedBigInteger('category_id');
      $table->timestamp('deleted_at')->nullable();
      $table->timestamps();

      $table->foreign('book_id')
        ->references('id')
        ->on('books')
        ->onDelete('cascade');
    
      $table->foreign('category_id')
        ->references('id')
        ->on('categories')
        ->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('categories_books');
  }
}
