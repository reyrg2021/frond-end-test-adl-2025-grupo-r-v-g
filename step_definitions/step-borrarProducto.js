const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('el usuario elimina el producto con código {string}', async function (codigoProducto) {
    console.log(`Buscando el ID interno para el producto con código: ${codigoProducto}`);

    // 1. Buscar la fila del producto en la tabla
    const fila = this.page.locator(`tr:has-text("${codigoProducto}")`);
    await expect(fila).toBeVisible();

    // 2. Extraer el texto completo de la fila
    const textoFila = await fila.textContent();
    console.log(`Texto de la fila encontrada: ${textoFila}`);

    // 3. Extraer un número (ej. "528") desde el contenido de la fila
    const regexID = /\b\d{3,}\b/g; // Números de 3+ cifras
    const coincidencias = [...textoFila.matchAll(regexID)];

    if (coincidencias.length === 0) {
        throw new Error(` No se encontró ningún ID numérico en la fila del producto ${codigoProducto}`);
    }

    // 4. Tomar el último número como el ID interno correcto
    const idInterno = coincidencias[coincidencias.length - 1][0];
    console.log(`ID interno correcto extraído: ${idInterno}`);

    // 5. Hacer clic en el botón de eliminar correspondiente
    const botonEliminar = this.page.getByRole('button', { name: idInterno }).nth(1);
    await botonEliminar.click();
    console.log(`Click en botón de eliminar para ID interno ${idInterno}`);

    // 6. Confirmar si aparece un modal
    const confirmar = this.page.getByRole('button', { name: /confirmar/i });
    if (await confirmar.isVisible()) {
        await confirmar.click();
        console.log('Confirmación de eliminación enviada');
    }
});

Then('el usuario ve un mensaje de confirmación de eliminación', async function () {
    const mensaje = this.page.locator('text=/Artículo eliminado con éxito/i');
    await expect(mensaje).toBeVisible();
    console.log('Mensaje de éxito de eliminación verificado');
});

Then('el producto {string} no aparece en la lista', async function (codigoProducto) {
    const fila = this.page.locator(`tr:has-text("${codigoProducto}")`);
    await expect(fila).toHaveCount(0);
    console.log(`Confirmado que el producto "${codigoProducto}" ya no está en la lista`);
});