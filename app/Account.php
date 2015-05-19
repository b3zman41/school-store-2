<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Account extends Model {

	protected $table = "accounts";

    protected $hidden = array("password");

    public function blogs()
    {
        return $this->hasMany("App\Blog", "account_id");
    }

}
