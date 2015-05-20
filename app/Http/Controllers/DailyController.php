<?php namespace App\Http\Controllers;

use App\Daily;
use App\DailyPerson;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Sale;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DailyController extends Controller {

    public function __construct()
    {
        $this->middleware("auth", ["only" => "create"]);
    }

    public function all()
    {
        return Daily::with("sales")->with("students")->orderBy("created_at", "desc")->get();
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
            $daily->save();

            $sales = array();
            $students = array();

            if(!is_null($dailyArray["sales"]))
            {
                foreach ($dailyArray["sales"] as $sale)
                {
                    array_push($sales, Sale::create($sale));
                }

                foreach ($dailyArray["presentStudents"] as $student)
                {
                    array_push($students, DailyPerson::create(["student_id" => $student["id"]]));
                }
            }

            $daily->sales()->saveMany($sales);
            $daily->students()->saveMany($students);
            $daily->account_id = $request->user->id;
            //$daily->push();

            return Daily::find($daily->id)->with("sales")->with("students")->get();
        }
    }

}
