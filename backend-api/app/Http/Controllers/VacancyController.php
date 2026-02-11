<?php

namespace App\Http\Controllers;

use App\Models\Vacancy;
use Illuminate\Http\Request;

class VacancyController extends Controller
{
    // 1. LIST & SEARCH VACANCIES
    public function index(Request $request)
    {
        $query = Vacancy::query();

        // Logika Pencarian
        if ($request->has('title')) {
            $query->where('title', 'like', '%' . $request->title . '%');
        }

        // Urutkan dari yang terbaru
        $vacancies = $query->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $vacancies
        ]);
    }

    // 2. CREATE VACANCY
    public function store(Request $request)
    {
        // Validasi Input
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'position' => 'required|string',
            'job_type' => 'required|string',
            'candidates_needed' => 'required|integer|min:1',
            'expires_at' => 'required|date',
            'location' => 'required|string',
            'is_remote' => 'boolean',
            'description' => 'required|string',
            'salary_min' => 'nullable|numeric',
            'salary_max' => 'nullable|numeric',
            'show_salary' => 'boolean',
            'min_experience' => 'required|string',
        ]);

        // Default Data (Hardcode sesuai strategi kita)
        $validated['company_name'] = 'Dicoding Indonesia';
        $validated['company_logo'] = 'https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/commons/new-ui-logo.png';

        $vacancy = Vacancy::create($validated);

        return response()->json([
            'success' => true,
            'data' => $vacancy
        ], 201);
    }

    // 3. DETAIL VACANCY
    public function show($id)
    {
        $vacancy = Vacancy::find($id);

        if (!$vacancy) {
            return response()->json(['message' => 'Lowongan tidak ditemukan'], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $vacancy
        ]);
    }

    // 4. DELETE VACANCY (Untuk Dashboard)
    public function destroy($id)
    {
        $vacancy = Vacancy::find($id);
        
        if (!$vacancy) {
            return response()->json(['message' => 'Lowongan tidak ditemukan'], 404);
        }

        $vacancy->delete();

        return response()->json(['message' => 'Lowongan berhasil dihapus']);
    }

    // 5. UPDATE VACANCY
    public function update(Request $request, $id)
    {
        $vacancy = Vacancy::find($id);

        if (!$vacancy) {
            return response()->json(['message' => 'Lowongan tidak ditemukan'], 404);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'position' => 'required|string',
            'job_type' => 'required|string',
            'candidates_needed' => 'required|integer|min:1',
            'expires_at' => 'required|date',
            'location' => 'required|string',
            'is_remote' => 'boolean',
            'description' => 'required|string',
            'salary_min' => 'nullable|numeric',
            'salary_max' => 'nullable|numeric',
            'show_salary' => 'boolean',
            'min_experience' => 'required|string',
        ]);

        $vacancy->update($validated);

        return response()->json([
            'success' => true,
            'data' => $vacancy,
            'message' => 'Lowongan berhasil diperbarui'
        ]);
    }
}