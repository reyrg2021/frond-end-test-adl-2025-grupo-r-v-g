const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { llenarFormularioProducto } = require('../utils/producto-helpers');


When('el usuario selecciona crear un nuevo articulo', async function () {
    await this.page.getByRole('button', { name: 'Crear Artículo' }).click();
    console.log('DEBUG: Creando artículo');
});


When('el usuario crea el formulario con Código {string}, Descripción {string}, Stock Actual {string}, Costo {string}, Precio venta {string} y selecciona la unidad de medida {string}', 
async function (codigo, descripcion, stockActual, costo, precioVenta, unidadMedida) {
    const datos = { codigo, descripcion, stockActual, costo, precioVenta, unidadMedida };
    await llenarFormularioProducto(this.page, datos, 'crear');
});

Then('el usuario ve un mensaje de éxito de artículo creado que contiene {string}', async function (descripcion){
    // Verificar el mensaje de éxito completo
    const mensajeCompleto = `Articulo "${descripcion}" creado con éxito!`;
    await expect(this.page.getByText(mensajeCompleto)).toContainText(descripcion);
    console.log(`Mensaje de éxito completo verificado: ${mensajeCompleto}`);
});

Then('el usuario se mantiene en la página de crear un nuevo articulo', async function () {
    await expect(this.page).toHaveURL(/.*\/nuevo/);
    console.log("Usuario se mantiene en la página de crear un nuevo artículo");
});