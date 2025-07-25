const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');


When('el usuario cierra el navegador y vuelve a abrir la aplicación', async function () {
    
    const context = this.page.context();
    this.storageState = await context.storageState();
    console.log('DEBUG: Estado de sesión almacenado');
    await context.close();
    const newContext = await this.browser.newContext({ storageState: this.storageState });
    this.page = await newContext.newPage();
    await this.goTo('/');
    console.log('DEBUG: Nueva instancia de navegador abierta con sesión persistente');
});

Then('el usuario se mantiene en la página de login de SELGOM S.A', async function () {
    await expect(this.page).toHaveURL(/.*\/login/);
    console.log('DEBUG: Se mantiene en la página de login');
});

