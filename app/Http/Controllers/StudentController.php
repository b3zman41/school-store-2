<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Student;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class StudentController extends Controller {

    public function __construct()
    {
        $this->middleware('admin', ['only' => ['postDelete', 'postCreate',]]);
    }

    public function getIndex()
	{
		return Student::orderBy("name", "asc")->get();
	}

    public function postCreate(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            "name" =>  "required",
            "period" =>  "required"
        ]);

        if($validator->passes())
        {
            return Student::create($request->all());
        } else return response($validator->failed(), 400);
    }

    public function postEdit($id, Request $request)
    {
        $student = Student::find($id);

        if(!is_null($student))
        {
            $student->fill($request->all());
            $student->save();

            return $student;
        } else
        {
            return response("Student not found", 400);
        }
    }

    public function postDelete($id)
    {
        $student = Student::find($id);

        $student->delete();

        return $student;
    }

	public function periods()
	{
		$students = Student::all();

		$periods = array();

		foreach($students as $student)
		{

			$periods[$student->period][$student->id] = $student;
		}

		return new Response(json_encode($periods), 200);
	}

}
