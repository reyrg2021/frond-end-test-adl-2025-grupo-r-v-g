const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');


Given('que el usuario está en la página de inicio de SELGOM S.A', async function () {
    // Verificar que el login automático funcionó
    await expect(this.page).toHaveURL(/.*\/dashboard/);
    console.log('DEBUG: Usuario confirmado en dashboard después del login automático');
});

When('el usuario selecciona la lista desplegable de Entidades', async function () {
    // Esperar a que el elemento esté visible y sea clickeable
    // await this.page.waitForSelector('[role="listitem"]:has-text("Entidades")', { timeout: 10000 });
    await this.page.getByRole('listitem').filter({ hasText: 'Entidades' }).getByRole('img').nth(1).click();
    console.log('DEBUG: Click en lista desplegable de Entidades realizado');
});

When('el usuario consulta sobre Artículos', async function () {
    // Esperar a que el enlace de Artículos sea visible
    // await this.page.waitForSelector('a:has-text("Artículos")', { timeout: 10000 });
    await this.page.getByRole('link', { name: 'Artículos' }).click();
    console.log('DEBUG: Click en enlace Artículos realizado');
});

Then('el usuario está en la página de Artículos', async function () {
    // Esperar a que la navegación se complete
    // await this.page.waitForURL(/.*\/articulos/, { timeout: 10000 });
    await expect(this.page).toHaveURL(/.*\/articulos/);
    console.log('DEBUG: Navegación a página de artículos completada');
});

Then('el usuario puede ver el texto de {string}', async function (textoEsperado) {
    // Esperar a que el heading sea visible
    // await this.page.waitForSelector(`h1:has-text("${textoEsperado}"), h2:has-text("${textoEsperado}"), h3:has-text("${textoEsperado}")`, { timeout: 10000 });
    await expect(this.page.getByRole('heading', { name: textoEsperado })).toBeVisible();
    console.log(`DEBUG: Texto "${textoEsperado}" verificado como visible`);
});

