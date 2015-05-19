<?php namespace App\Http\Middleware;

use App\Http\Controllers\Auth\AuthController;
use Closure;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Response;

class Authenticate {

	/**
	 * The Guard implementation.
	 *
	 * @var Guard
	 */
	protected $auth;

	/**
	 * Create a new filter instance.
	 *
	 * @param  Guard  $auth
	 * @return void
	 */
	public function __construct(Guard $auth)
	{
		$this->auth = $auth;
	}

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

		if (is_null($user))
		{
			return new Response("No user found", 403);
		}

		$request->user = $user;

		return $next($request);
	}

}
