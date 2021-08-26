<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBooksRecordsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('books_records', function (Blueprint $table) {
      $table->engine = 'InnoDB';
      $table->id();
      $table->unsignedBigInteger('book_id');
      $table->unsignedBigInteger('user_id');
      $table->timestamp('borrowed_at')->nullable();
      $table->timestamp('delivered_at')->nullable();
      $table->timestamps();

      $table->foreign('book_id')
        ->references('id')
        ->on('books')
        ->onDelete('cascade');
    
      $table->foreign('user_id')
        ->references('id')
        ->on('users')
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
    Schema::dropIfExists('books_records');
  }
}
