<?php namespace App\Http\Controllers\Auth;

use App\Account;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\UserSession;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Log;

class AuthController extends Controller {

    public function index(Request $request)
    {
        $user = AuthController::userForRequest($request);

        if(!is_null($user))
        {
            return new Response($user, 200);
        }

        return new  Response("You are not signed in.", 403);
    }

	public function login(Request $request)
    {
        Log::info($request->all());

        if ($request->has("username", "password"))
        {
            $username = $request->input("username");
            $password = $request->input("password");

            $account = Account::where("username", $username)->where("password", $password)->first();

            if(!is_null($account))
            {
                UserSession::where("id", $account->id)->delete();

                $session = new UserSession();
                $session->user_id = $account->id;
                $session->setSessionTokenRandom();

                $session->save();

                return (new Response($account->toJson(), 200))->withCookie(cookie()->forever("sessionToken", $session->sessionToken));
            }else
            {
                return new Response("Invalid Username / Password", 403);
            }
        }else return new Response("Missing Username / Password", 400);
    }

    public function logout()
    {
        return (new Response("", 200))->withCookie(cookie()->forever("sessionToken", ""));
    }

    public static function userForRequest(Request $request) {
        $sessionToken = $request->cookie("sessionToken");

        if(!is_null($sessionToken))
        {
            $session = UserSession::where("sessionToken", $sessionToken)->first();

            if(!is_null($session))
            {
                $account = Account::where("id", $session->user_id)->first();

                if(!is_null($account))
                {
                    return $account;
                }
            }
        }

        return null;
    }

}
