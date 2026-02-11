import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Dicoding Jobs - Main E2E Flow', () => {

  test('User opens list, searches a job, and views details', async ({ page }) => {
    
    // ==========================================
    // 1. User opens the vacancies list page
    // ==========================================
    await page.goto(BASE_URL);
    
    await expect(page.getByText('Temukan lowongan yang cocok')).toBeVisible();

    // ==========================================
    // 2. User searches a job by title
    // ==========================================
    const searchInput = page.getByPlaceholder('Pekerjaan apa yang sedang kamu cari?');
    
    const searchKeyword = 'Developer'; 
    await searchInput.fill(searchKeyword);

    // ==========================================
    // 3. User views vacancy details
    // ==========================================
    // Playwright akan mencari link lowongan yang muncul setelah pencarian
    const firstJobCard = page.locator('a[href^="/vacancies/"]').first();
    
    await firstJobCard.waitFor({ state: 'visible' });
    await firstJobCard.click();

    // Verifikasi bahwa user benar-benar pindah ke halaman Detail
    await expect(page).toHaveURL(/.*\/vacancies\/\d+/);
    
    // Verifikasi ada elemen khas halaman detail (tombol Lamar)
    await expect(page.getByRole('button', { name: 'Lamar Sekarang' })).toBeVisible();
    
  });

});