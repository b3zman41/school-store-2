<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Sale;
use DB;
use Illuminate\Http\Request;

class SalesController extends Controller {

    public function getIndex()
    {
        return Sale::all();
    }

    public function getQuery(Request $request)
    {

        $month = $request->input("month");
        $year = $request->input("year");
        $order = $request->input("order");

        $query = Sale::with("item")->take(50);

        if(!is_null($month))
        {
            $query->where(DB::raw("MONTH(created_at)"), "=", $month);
        }

        if(!is_null($year))
        {
            $query->where(DB::raw("YEAR(created_at)"), "=", $year);
        }

        if(!is_null($order))
        {
            $query->orderBy("created_at", $order);
        }

        return $query->get();
    }

}
