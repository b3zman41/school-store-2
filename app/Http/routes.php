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

Route::post('/auth/login', 'Auth\AuthController@login');
Route::get('/auth/logout', 'Auth\AuthController@logout');
Route::get('/auth', 'Auth\AuthController@index');

Route::get("/blog/", 'BlogController@all');
Route::get("/blog/post", 'BlogController@post');
Route::get("/blog/{id}/delete", "BlogController@deleteBlogPost");

//Daily
Route::get("/daily/", "DailyController@all");
Route::post("/daily/create", "DailyController@create");

//Student
Route::get("/student/", "StudentController@all");
Route::get("/student/periods", "StudentController@periods");

//Items
Route::get("/items/", "ItemController@all");

Route::get("public/{slug?}", function($slug = null, $secondSlug = null)
{
    if(!empty($slug))
    {
        return File::get(public_path() . "/" . $slug);
    }else return File::get(public_path() . "/index.html");
});
