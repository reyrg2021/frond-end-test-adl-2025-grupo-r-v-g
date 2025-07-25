const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('que el usuario está en la página de login de SELGOM S.A', async function () {
    await this.page.goto('/login');
    console.log('DEBUG: URL después de goto(/):', this.page.url());
    await expect(this.page).toHaveURL(/.*\/login/);
});
/////////////// Escenario 1 ///////////////////
When('el usuario ingresa el email {string}', async function (email) {
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    console.log(`DEBUG: Email ingresado: ${email}`);
});

When('el usuario ingresa la contraseña {string}', async function (password) {
    await this.page.getByRole('textbox', { name: 'Contraseña' }).fill(password);
    console.log(`DEBUG: Contraseña ingresada: ${password.replace(/./g, '*')}`);
});

When('el usuario inicia la sesión en el botón de login', async function () {
    await this.page.getByRole('button', { name: 'Ingresar' }).click();
    console.log('DEBUG: Click en botón Ingresar realizado');
});

Then('el usuario está en la página de inicio de SELGOM S.A', async function () {
    // await this.page.waitForURL(/.*\/dashboard/, { timeout: 10000 });
    await expect(this.page).toHaveURL(/.*\/dashboard/);
    console.log('DEBUG: Navegación a dashboard completada');
});

Then('el texto {string} esta visible para el usuario', async function (textoEsperado) {
    //await this.page.waitForSelector(`text=${textoEsperado}`, { timeout: 10000 });
    await expect(this.page.getByText(textoEsperado)).toBeVisible();
    console.log(`DEBUG: Texto "${textoEsperado}" verificado como visible`);
});
/////////////// Escenario 2 ///////////////////
Then('el usuario ve un mensaje error como {string}', async function (descripcion){
    await expect(this.page.getByText(descripcion)).toContainText(descripcion);
    console.log(`Mensaje de error: ${descripcion}`);
});


Then('el usuario se mantiene en la página de login de SELGOM S.A', async function () {
    // await this.page.waitForURL(/.*\/login/, { timeout: 10000 });
    await expect(this.page).toHaveURL(/.*\/login/);
});

