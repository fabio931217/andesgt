<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('v1/task/list', 'TaskController@list');
Route::get('v1/task/show/{id}', 'TaskController@show');
Route::delete('v1/task/delete/{id}', 'TaskController@delete'); #destroy
Route::post('v1/task/update/{id}', 'TaskController@update'); #update
Route::post('v1/task/save', 'TaskController@save');  #store