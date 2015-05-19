<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class DailyPerson extends Model {

	protected $table = "daily_people";
    protected $fillable = ["student_id"];

    public function student()
    {
        return $this->hasOne("App\Student", "id", "student_id");
    }
}
