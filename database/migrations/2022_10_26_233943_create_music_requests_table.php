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
        Schema::create('music_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->nullable(true)
                ->constrained('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignId('artist_id')
                ->nullable(true)
                ->constrained('artists')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignId('music_id')
                ->nullable(true)
                ->constrained('artists')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->boolean('choice_artist')->nullable(true);
            $table->boolean('is_payed')->default(false);
            $table->string('delivery_type')->nullable(true);
            $table->string('payment_status')->nullable(true);
            $table->string('payment_reference')->nullable(true);
            $table->string('status')->nullable(true);
            $table->timestampTz('payed_at')->nullable();
            $table->timestampTz('delivery_date')->nullable();
            $table->timestampTz('delivered_at')->nullable();
            $table->string('price_total')->notNullable();
            $table->jsonb('data')->nullable(true);
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
        Schema::dropIfExists('music_requests');
    }
};
