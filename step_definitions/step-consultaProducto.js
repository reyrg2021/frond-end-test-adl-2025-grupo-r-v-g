const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');


Given('que el usuario está en la página de inicio de SELGOM S.A', async function () {
    await expect(this.page).toHaveURL(/.*\/dashboard/);
    console.log('DEBUG: Usuario confirmado en dashboard después del login automático');
});

When('el usuario selecciona la lista desplegable de Entidades', async function () {
    await this.page.getByRole('listitem').filter({ hasText: 'Entidades' }).getByRole('img').nth(1).click();
    console.log('DEBUG: Click en lista desplegable de Entidades realizado');
});

When('el usuario consulta sobre Artículos', async function () {
    await this.page.getByRole('link', { name: 'Artículos' }).click();
    console.log('DEBUG: Click en enlace Artículos realizado');
});

Then('el usuario está en la página de Artículos', async function () {
    await expect(this.page).toHaveURL(/.*\/articulos/);
    console.log('DEBUG: Navegación a página de artículos completada');
});

Then('el usuario puede ver el texto de {string}', async function (textoEsperado) {
    await expect(this.page.getByRole('heading', { name: textoEsperado })).toBeVisible();
    console.log(`DEBUG: Texto "${textoEsperado}" verificado como visible`);
});

    