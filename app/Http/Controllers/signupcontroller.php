<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use item;
use DB;


class signupcontroller extends Controller
{
   public $signUpData = [];

   public function userDetails(Request $request)
   {
      $signUpData[0] = $request[0];
      $signUpData[1] = $request[1];
      $signUpData[2] = $request[2];
      $signUpData[3] = $request[3];

      if (DB::table('users')->where('name', $signUpData[0])->exists()) {
         $result = ["name already in use", false];
         return response()->json($result);
      }

      if (DB::table('users')->where('email', $signUpData[1])->exists()) {
         $result = ["email already registered", false];
         return response()->json($result);
      }

      $dataInserted = DB::table('users')->insert([
         'name' => $signUpData[0],
         'email' => $signUpData[1],
         'password' => $signUpData[2],
         'role' => $signUpData[3]
      ]);

      if ($dataInserted) {
         $result = ["signup successfull", true];
         return response()->json($result);
      }
   }

    //--------------------------------------------------------
   public function sendDetails(Request $request)
   {
      $signInData[0] = $request[0];
      $signInData[1] = $request[1];

      //$userData = DB::table('users')->get();
      //$uName = DB::table('users')->pluck('name');
      $user = DB::table('users')->where('name', $signInData[0])->first();
      
      if ($user != null){
         if ($user->name == $signInData[0] && $user->password == $signInData[1]){
            $userData=[true, $user->role];
            return response()->json($userData);
         }
         else if ($user->name != $signInData[0] || $user->password != $signInData[1]){
            $userData=[false, ""];
            return response()->json($userData);
         }
      }
      else{
         $userData=[false, ""];
         return response()->json($userData);
      }
   }

    //-------------------------------------------------------
   public function getAndSendData(Request $req)
   {
      foreach ($req->params as $postdata) {
         $getId = $postdata['updates'][0]['value'];
      }
      $users = DB::table('users')->where('id', $getId)->first();
      return response()->json($users);
   }
}

 /* $postdata = $req->params;
       $getId = $postdata['updates'][0]['value'];
       $userID = Item::find($getId); */