const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { llenarFormularioProducto } = require('../utils/producto-helpers');


When('el usuario selecciona el artículo {string}', async function (art) {
    await this.page.getByRole('cell', { name: art }).click();
});

When('el usuario selecciona editar los datos', async function () {
    await this.page.getByRole('button', { name: 'Editar' }).click();
});

When('el usuario actualiza el formulario con Código {string}, Descripción {string}, Stock Actual {string}, Costo {string}, Precio venta {string} y selecciona la unidad de medida {string}', 
async function (codigo, descripcion, stockActual, costo, precioVenta, unidadMedida) {
    const datos = { codigo, descripcion, stockActual, costo, precioVenta, unidadMedida };
    await llenarFormularioProducto(this.page, datos, 'actualizar');
});

Then('el usuario ve un mensaje de éxito que contiene {string}', async function (descripcion){
    const mensajeCompleto = `Artículo "${descripcion}" actualizado con éxito!`;    
    await expect(this.page.getByText(mensajeCompleto)).toContainText(descripcion);   
    console.log(`Mensaje de éxito completo verificado: ${mensajeCompleto}`);
});

Then('el usuario ve un mensaje de error {string}', async function (mensajeError){
    const error = mensajeError;
    await expect(this.page.getByText(error)).toContainText(mensajeError);
    console.log(`Mensaje de error: ${error}`);
});

Then('el usuario ve el boton {string}', async function (button){
    await page.getByRole('button', { name: button }).toBeVisible();
});



