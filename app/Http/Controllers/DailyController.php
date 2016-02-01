<?php namespace App\Http\Controllers;

use App\Daily;
use App\DailyPerson;
use App\Http\Controllers\Controller;

use App\Sale;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DailyController extends Controller {

    public function all()
    {
        return Daily::with("sales")->with("students")->orderBy("created_at", "desc")->get();
    }

    public function getQuery(Request $request)
    {
        $period = $request->input("period");
        $month = $request->input("month");
        $year = $request->input("year");
        $order = $request->input("order");

        $query = Daily::with("sales")->with("students")->take(30);

        if(!is_null($period))
        {
            $query->where("period", $period);
        }

        if(!is_null($month))
        {
            $query->where(\DB::raw("MONTH(created_at)"), "=", $month);
        }

        if(!is_null($year))
        {
            $query->where(\DB::raw("YEAR(created_at)"), "=", $year);
        }

        if(!is_null($order))
        {
            $query->orderBy("created_at", $order);
        }

        return $query->get();
    }

    public function create(Request $request)
    {
        $validation = \Validator::make($request->all(), [
            "period" => "required|min:0|max:10",
            "start_cash" => "required",
            "start_check" => "required",
            "end_cash" => "required",
            "end_check" => "required",
            "presentStudents" => "required"
        ]);

        if($validation->fails())
        {
            return new Response($validation->errors(), 400);
        } else
        {
            $dailyArray = $request->all();
            $daily = Daily::create($dailyArray);

            $sales = array();
            $students = array();

            //Sales Iteration
            if(!is_null($dailyArray["sales"]))
            {
                foreach ($dailyArray["sales"] as $sale)
                {
                    $savedSale = Sale::create($sale);
                    array_push($sales, $savedSale);

                    $savedSale->item["count"] -= $savedSale["count"];
                    $savedSale->item->save();
                    $savedSale->save();
                }
            }

            //Present Students Iteration
            if(!is_null($dailyArray["presentStudents"]))
            {
                foreach ($dailyArray["presentStudents"] as $student)
                {
                    array_push($students, DailyPerson::create(["student_id" => $student["id"]]));
                }
            }

            $daily->sales()->saveMany($sales);
            $daily->students()->saveMany($students);
            $daily->account_id = $request->user->id;

            $daily->save();

            return Daily::with("sales")->find($daily->id);
        }
    }

    public function get($id = null)
    {
        if(is_null($id))
        {
            return Daily::with("sales")->with("students")->orderBy("created_at", "desc")->get();
        }

        return Daily::find($id);
    }

    public function delete($id)
    {
        $daily = Daily::find($id);

        $daily->delete();

        return $daily;
    }

}
