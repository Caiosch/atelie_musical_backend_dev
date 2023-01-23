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
        Schema::create('artists', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->nullable();
            $table->string('full_name')->nullable(false);
            $table->string('voice_gender')->nullable(false);
            $table->string('phone_number')->nullable(true);
            $table->string('email')->nullable(true);
            $table->text('description')->nullable(true);
            $table->json('medias')->nullable(true);
            $table->string('social_youtube')->nullable(true);
            $table->string('social_tiktok')->nullable(true);
            $table->string('social_instagram')->nullable(true);
            $table->json('data')->nullable(true);
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
        Schema::dropIfExists('artists');
    }
};
