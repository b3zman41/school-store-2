<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Item;
use Illuminate\Http\Request;

class ItemController extends Controller {

	public function all()
	{
		return Item::all();
	}

}
