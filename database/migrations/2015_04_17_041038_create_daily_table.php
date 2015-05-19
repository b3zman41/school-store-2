<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDailyTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('daily', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('period');
            $table->double('start_cash');
            $table->double('start_check');
            $table->double('end_cash');
            $table->double('end_check');
            $table->integer('account_id');
            $table->timestamps();
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('daily');
	}

}
