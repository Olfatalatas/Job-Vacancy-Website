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
    Schema::create('vacancies', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->string('position');
        $table->string('job_type');
        $table->integer('candidates_needed')->default(1);
        $table->date('expires_at');
        $table->string('location');
        $table->boolean('is_remote')->default(false); 
        $table->longText('description'); 
        $table->decimal('salary_min', 15, 2)->nullable(); 
        $table->decimal('salary_max', 15, 2)->nullable(); 
        $table->boolean('show_salary')->default(false); 
        $table->string('min_experience'); 
        $table->string('company_name')->default('Dicoding Indonesia'); 
        $table->string('company_logo')->nullable();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vacancies');
    }
};
