<?php

use Illuminate\Database\Seeder;
use App\Daily;

class DailyTableSeeder extends Seeder {

    public function run()
    {
        $faker = \Faker\Factory::create();

        foreach(range(1, 20) as $index)
        {
            Daily::create(array(
                "period" => rand(0, 11),
                "start_cash" => rand(0, 100),
                "start_check" => rand(0, 100),
                "end_cash" => rand(0, 100),
                "end_check" => rand(0, 100),
                "account_id" => 1
            ));
        }
    }

}