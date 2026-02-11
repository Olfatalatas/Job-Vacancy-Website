<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vacancy extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'position',
        'job_type',
        'candidates_needed',
        'expires_at',
        'location',
        'is_remote',
        'description',
        'salary_min',
        'salary_max',
        'show_salary',
        'min_experience',
        'company_name',
        'company_logo',
    ];

    protected $casts = [
        'expires_at' => 'date',
        'is_remote' => 'boolean',
        'show_salary' => 'boolean',
    ];
}