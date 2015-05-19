<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Sale extends Model {

	protected $table = "sales";
	protected $fillable = ["item_id", "count"];

	public function item()
	{
		return $this->hasOne("App\Item", "id", "item_id");
	}
}
