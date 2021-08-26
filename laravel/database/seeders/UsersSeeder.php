<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UsersSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    User::create([
      'name' => 'Alvaro Zetina',
      'email' => 'alvaro_za1@hotmail.com'
    ]);

    User::create([
      'name' => 'Jamie Jamerson',
      'email' => 'Jamie@hotmail.com'
    ]);
  }
}
