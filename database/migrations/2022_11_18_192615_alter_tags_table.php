<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('app_tags', function (Blueprint $table) {
            $table->string('bg')->nullable(true)->default('#B36F28');
            $table->string('color')->nullable(true)->default('#F3DEA6');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('app_tags', function (Blueprint $table) {
            $table->dropColumn('privacy');
        });
    }
};
