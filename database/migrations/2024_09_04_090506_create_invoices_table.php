<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('inv_number');
            $table->foreignId('subscribed_id')->constrained('subscribeds')->onDelete('cascade');
            $table->date('date_of_use');
            $table->integer('day_of_use');
            $table->integer('total_day_of_use');
            $table->date('date_of_bill');
            $table->float('discount_bill');
            $table->float('total_bill');
            $table->dateTime('payemented_at')->nullable();
            $table->unsignedBigInteger('payemented_by')->nullable();
            $table->foreign('payemented_by')->references('id')->on('users')->onDelete('cascade');
            $table->dateTime('payment_accepted_at')->nullable();
            $table->unsignedBigInteger('payment_accepted_by')->nullable();
            $table->foreign('payment_accepted_by')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};