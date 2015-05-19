<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Student;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class StudentController extends Controller {

	public function all()
	{
		return Student::all();
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
