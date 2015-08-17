<?php namespace App\Http\Controllers;

use App\Blog;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Controller;

use App\Http\Requests\BlogRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Validator;

class BlogController extends Controller {

    public function __construct()
    {
        $this->middleware("auth", ["except" => "all"]);
    }

    public function all()
    {
        return Blog::with("account")->orderBy("created_at", "desc")->get();
    }

    /**
     * @param Request $request
     * @return static
     */
    public function post(Request $request)
    {
        $validator = Validator::make($request->all(), ["text" => "required", "title" => "required"]);

        if($validator->fails())
        {
            return response($validator->errors(), 400);
        } else {

            $blog = Blog::create($request->all());
            $blog->account_id = $request->user->id;

            $request->user->blogs()->save($blog);

            return new Response($blog, 200);
        }
    }

    public function deleteBlogPost($id, Request $request)
    {
        $post = Blog::find($id);

        $user = AuthController::userForRequest($request);

        if($user->id == $post->account_id) {
            $post->delete();
        }

        return $post;
    }

}
