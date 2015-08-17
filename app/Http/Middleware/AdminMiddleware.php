<?php namespace App\Http\Middleware;

use App\Http\Controllers\Auth\AuthController;
use Closure;
use Log;

class AdminMiddleware {

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next)
	{
		$user = AuthController::userForRequest($request);

		if(!is_null($user) && strcasecmp($user['role'], 'ADMIN') == 0)
		{
            $request->user = $user;
            return $next($request);
		}

        return view("home");
	}

}
