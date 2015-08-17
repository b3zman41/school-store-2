<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

//Default Route
Route::get("/", function()
{
    return File::get(public_path() . "/index.html");
});

//Auth
Route::post('/auth/login', 'Auth\AuthController@login');
Route::get('/auth/logout', 'Auth\AuthController@logout');
Route::get('/auth', 'Auth\AuthController@index');

//Daily
Route::get("/blog/", 'BlogController@all');
Route::get("/blog/post", 'BlogController@post');
Route::get("/blog/{id}/delete", "BlogController@deleteBlogPost");

//Daily
Route::get("/daily", ["middleware" => "admin", "uses" => "DailyController@all"]);
Route::get("/daily/query/", ["middleware" => "auth", "uses" => "DailyController@getQuery"]);
Route::get("/daily/{id}/", ["middleware" => "auth", "uses" => "DailyController@get"]);
Route::delete("/daily/{id}/", ["middleware" => "admin", "uses" => "DailyController@delete"]);
Route::post("/daily/create", ["middleware" => "auth", "uses" => "DailyController@create"]);

//Student
Route::post("/student/{id}/edit", "StudentController@postEdit");
Route::get("/student/periods", "StudentController@periods");
Route::controller("student", "StudentController");

//Items
Route::get("/items", "ItemController@all");
Route::post("/items", ["middleware" => "admin", "uses" => "ItemController@create"]);
Route::delete("/items/{id}", ["middleware" => "admin", "uses" => "ItemController@delete"]);
Route::put("/items/{id}", ["middleware" => "admin", "uses" => "ItemController@edit"]);

//Sales
Route::controllers([
    "sales" => "SalesController"
]);

Route::get("public/{slug?}", function($slug = null)
{
    if(!empty($slug))
    {
        return File::get(public_path() . "/" . $slug);
    }else return File::get(public_path() . "/index.html");
});
