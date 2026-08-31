import { test, expect } from '@playwright/test';

const EMAIL    = process.env.TEST_EMAIL;
const PASSWORD = process.env.TEST_PASSWORD;

async function loginAs(page) {
  await page.goto('/Login');
  await page.fill('input[type="email"]', EMAIL);
  await page.fill('input[type="password"]', PASSWORD);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard', { timeout: 10000 });
}

test.describe('Smoke Test — Logout', () => {

  test.beforeEach(async ({ page }) => {
    await loginAs(page);
  });

  test('cerrar sesión desde el menú lateral redirige a /LogOut', async ({ page }) => {
    // Abrir el menú lateral
    await page.getByRole('button', { name: 'Menú' }).click();
    await expect(
      page.getByRole('navigation', { name: 'Menú principal' })
    ).toBeVisible();

    // Hacer clic en Cerrar Sesión
    await page.getByRole('button', { name: 'Cerrar Sesión' }).click();

    await expect(page).toHaveURL('/LogOut', { timeout: 10000 });
    await expect(page.getByText('Su sesión se ha cerrado con éxito')).toBeVisible();
  });

  test('después del logout, /dashboard redirige al inicio', async ({ page }) => {
    await page.getByRole('button', { name: 'Menú' }).click();
    await page.getByRole('button', { name: 'Cerrar Sesión' }).click();
    await expect(page).toHaveURL('/LogOut', { timeout: 10000 });

    // Intentar volver al dashboard sin sesión
    await page.goto('/dashboard');
    await expect(page).toHaveURL('/');
  });

});
