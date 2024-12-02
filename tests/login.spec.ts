import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Iniciar Sesión' }).click();
    await page.getByRole('button', { name: 'GitHub' }).click();
    await page.getByLabel('Username or email address').fill('soysergiogonza@gmail.com');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('N^3tJT$3MiH9vV7Ljw$');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    await page.getByRole('button', { name: 'Use passkey' }).click();
    await page.getByRole('link', { name: 'Use your authenticator app' }).click();
    await page.getByPlaceholder('XXXXXX').fill('600504');
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await page.getByRole('heading', { name: 'Bienvenido/a' }).click();
});
