<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Daily extends Model {

    protected $table = "daily";
	protected $fillable = ["period", "start_cash", "start_check", "end_cash", "end_check", "account_id", "comment"];

    public function sales()
    {
        return $this->hasMany("App\Sale", "form_id")->with("item");
    }

    public function students()
    {
        return $this->hasMany("App\DailyPerson", "daily_id")->with("student");
    }
}
