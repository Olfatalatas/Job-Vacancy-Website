<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Vacancy;

class VacancyApiTest extends TestCase
{
    // Membersihkan database setiap kali test dijalankan agar data bersih
    use RefreshDatabase; 

    // 1. TEST CREATE VACANCY
    public function test_can_create_vacancy()
    {
        $payload = [
            'title' => 'Laravel Developer',
            'position' => 'Developer',
            'job_type' => 'Full-Time',
            'candidates_needed' => 2,
            'expires_at' => '2026-12-31',
            'location' => 'Bandung',
            'is_remote' => true,
            'description' => 'Test Description',
            'min_experience' => '1-3 tahun',
        ];

        $response = $this->postJson('/api/vacancies', $payload);

        $response->assertStatus(201)
                 ->assertJsonFragment(['title' => 'Laravel Developer']);

        $this->assertDatabaseHas('vacancies', ['title' => 'Laravel Developer']);
    }

    // 2. TEST LIST VACANCIES
    public function test_can_list_vacancies()
    {
        \App\Models\Vacancy::factory()->count(3)->create(); 

        $response = $this->getJson('/api/vacancies');

        $response->assertStatus(200)
                 ->assertJsonCount(3, 'data'); 
    }

    // 3. TEST SEARCH VACANCY
    public function test_can_search_vacancy()
    {
        Vacancy::create([
            'title' => 'Unique Job Title', 
            'position' => 'Dev', 'job_type' => 'Full', 
            'candidates_needed' => 1, 'expires_at' => '2025-12-12', 
            'location' => 'Bdg', 'description' => 'Desc', 'min_experience' => '1yr'
        ]);

        $response = $this->getJson('/api/vacancies?title=Unique');

        $response->assertStatus(200)
                 ->assertJsonFragment(['title' => 'Unique Job Title']);
    }

    // 4. TEST UPDATE VACANCY
    public function test_can_update_vacancy()
    {
        $vacancy = Vacancy::create([
            'title' => 'Old Title', 
            'position' => 'Dev', 'job_type' => 'Full', 
            'candidates_needed' => 1, 'expires_at' => '2025-12-12', 
            'location' => 'Bdg', 'description' => 'Desc', 'min_experience' => '1yr'
        ]);

        $updatePayload = [
            'title' => 'New Updated Title',
            'position' => 'Dev', 'job_type' => 'Full', 
            'candidates_needed' => 1, 'expires_at' => '2025-12-12', 
            'location' => 'Bdg', 'description' => 'Desc', 'min_experience' => '1yr'
        ];

        $response = $this->putJson("/api/vacancies/{$vacancy->id}", $updatePayload);

        $response->assertStatus(200);
        $this->assertDatabaseHas('vacancies', ['title' => 'New Updated Title']);
    }

    // 5. TEST DELETE VACANCY
    public function test_can_delete_vacancy()
    {
        $vacancy = Vacancy::create([
            'title' => 'To Be Deleted', 
            'position' => 'Dev', 'job_type' => 'Full', 
            'candidates_needed' => 1, 'expires_at' => '2025-12-12', 
            'location' => 'Bdg', 'description' => 'Desc', 'min_experience' => '1yr'
        ]);

        $response = $this->deleteJson("/api/vacancies/{$vacancy->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('vacancies', ['id' => $vacancy->id]);
    }

    // 6. TEST VALIDATION (Gagal jika input salah)
    public function test_validation_error()
    {
        $response = $this->postJson('/api/vacancies', []); // Kirim data kosong

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['title', 'position']);
    }
}