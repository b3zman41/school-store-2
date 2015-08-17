<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Item;
use App\Sale;
use DB;
use Illuminate\Http\Request;

class ItemController extends Controller {

	public function all()
	{
		return Item::all();
	}

    public function create(Request $request)
    {
        $validator = \Validator::make($request->all(), array(
            "name" => "required",
            "price" => "required",
        ));

        if(!$validator->fails())
        {
            return Item::create($request->only(["name", "price", "count"]));
        } else
        {
            return response($validator->failed(), 400);
        }
    }

    public function delete($id)
    {
        $item = Item::find($id);

        $item->delete();

        return $item;
    }

    public function edit($id, Request $request)
    {
        $item = Item::find($id);

        $validator = \Validator::make($request->all(), array(
            "name" => "required",
            "price" => "required",
            "count" => "required"
        ));

        if(!is_null($item))
        {
            if(!$validator->fails())
            {
                $item->fill($request->all());

                $item->save();

                return response($item, 200);
            } else
            {
                return response($validator->failed(), 400);
            }
        } else
        {
            return response("Item not found", 404);
        }
    }

}
