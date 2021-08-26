<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UsersController extends Controller
{
  public function list(Request $request) {
    $users = User::whereNull('deleted_at');

    if ($request->page) {
      $users = $users->paginate(10);
    } else {
      $users = $users->get();
    }
    
    return response()->json($users);
  }

  public function add(Request $request) {
    $validated = $request->validate([
      'name' => 'required',
      'email' => 'required|email',
    ]);

    $user = User::create($validated);

    return response()->json($user);
  }
}
