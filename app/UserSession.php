<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class UserSession extends Model {

	protected $table = "sessions";

    public function setSessionTokenRandom()
    {
        $allChars = "abcdefghijklmnopqrstuvwxyz1234567890";

        $returnString = "";

        for ($i = 0; $i < 254; $i++)
        {
            $rand = rand(0, strlen($allChars)-1);

            $returnString .= $allChars[$rand];
        }

        $this->sessionToken = $returnString;
    }

}
