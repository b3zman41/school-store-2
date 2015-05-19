<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model {

	protected $table = "blogs";
	protected $fillable = ["title", "text"];

	public function account()
	{
		return $this->belongsTo("App\Account", "account_id", "id");
	}
}
