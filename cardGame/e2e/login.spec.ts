import { test, expect } from '@playwright/test';

test('L’utilisateur peut se connecter o', async ({ page }) => {
  // 1. Va sur la page de login
  await page.goto('http://localhost:4200/login');

  // 2. Remplit les champs
  await page.fill('#login', 'veronique@example.com');
  await page.fill('#password', 'test1234');

  // 3. Clique sur le bouton
  await page.click('button[type="submit"]');

  // 4. Vérifie la redirection ou un élément visible du dashboard
  await expect(page).toHaveURL(/dashboard/);
});
