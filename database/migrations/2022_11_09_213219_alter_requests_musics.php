<?php

use App\Models\MusicRequest;
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
        Schema::table('music_requests', function (Blueprint $table) {
            $table->string('privacy')->nullable(true)->default('private');
            $table->boolean('is_main')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('music_requests', function (Blueprint $table) {
            $table->dropColumn('privacy');
        });
    }
};
