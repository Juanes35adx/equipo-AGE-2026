import { test, expect } from '@playwright/test';

const EMAIL    = process.env.TEST_EMAIL;
const PASSWORD = process.env.TEST_PASSWORD;

test.describe('Smoke Test — Login', () => {

  test('login con credenciales válidas redirige al dashboard', async ({ page }) => {
    await page.goto('/Login');

    await page.fill('input[type="email"]', EMAIL);
    await page.fill('input[type="password"]', PASSWORD);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/dashboard', { timeout: 10000 });
    await expect(
      page.getByText('Bienvenido al Asistente General Estudiantil')
    ).toBeVisible();
  });

  test('login con credenciales inválidas muestra mensaje de error', async ({ page }) => {
    await page.goto('/Login');

    await page.fill('input[type="email"]', 'invalido@test.com');
    await page.fill('input[type="password"]', 'claveincorrecta123');
    await page.click('button[type="submit"]');

    // El componente LoginForm muestra el error en un <p> rojo
    const errorMsg = page.locator('form p').first();
    await expect(errorMsg).toBeVisible({ timeout: 8000 });

    // Sigue en la página de login, no redirigió
    await expect(page).not.toHaveURL('/dashboard');
  });

  test('ruta protegida sin sesión activa redirige al inicio', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL('/');
  });

});
