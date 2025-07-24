const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('el usuario presiona eliminar el producto con código {string}', async function (codigoProducto) {
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
    const mensaje = this.page.locator('text=/Artículo eliminado con éxito./i');
    await expect(mensaje).toBeVisible();
});

Then('el producto {string} no aparece en la lista', async function (codigoProducto) {
    const fila = this.page.locator(`tr:has-text("${codigoProducto}")`);
    await expect(fila).toHaveCount(0);
});


//////////// STEP DEFINITIONS PARA LOS ESCENARIOS DE BORRAR  @esperado-que-falle @cancelar Y @esperado-que-falle @confirmar
Then('aparece una ventana de confirmación preguntando {string}', async function (mensajeEsperado) {
    console.log(`Buscando ventana de confirmación con mensaje: ${mensajeEsperado}`);
    
    // Buscar diferentes tipos de ventanas de confirmación
    const ventanaConfirmacion = this.page.locator(`text=${mensajeEsperado}`).or(
        this.page.locator('text=/¿Está seguro/i')
    ).or(
        this.page.locator('.modal, .dialog, [role="dialog"], .confirmation-dialog')
    ).or(
        this.page.locator('[role="alertdialog"]')
    );

    await expect(ventanaConfirmacion).toBeVisible({ timeout: 5000 });
    console.log('Ventana de confirmación encontrada (no debería llegar aquí)');
});


When('el usuario presiona el botón {string}', async function (nombreBoton) {
    console.log(`Buscando botón: ${nombreBoton}`);
    
    let boton;
    
    if (nombreBoton.toLowerCase().includes('aceptar')) {
        boton = this.page.getByRole('button', { name: /aceptar|confirmar|sí|yes|ok/i });
    } else if (nombreBoton.toLowerCase().includes('cancelar')) {
        boton = this.page.getByRole('button', { name: /cancelar|no|cancel/i });
    } else {
        boton = this.page.getByRole('button', { name: new RegExp(nombreBoton, 'i') });
    }
    
    await expect(boton).toBeVisible({ timeout: 5000 });
    await boton.click();
    console.log(`Click realizado en botón: ${nombreBoton} (no debería llegar aquí)`);
});

Then('la ventana de confirmación se cierra', async function () {
    console.log('Verificando que la ventana de confirmación se haya cerrado');
    const ventanaConfirmacion = this.page.locator('.modal, .dialog, [role="dialog"]');

    await expect(ventanaConfirmacion).toHaveCount(0, { timeout: 5000 });
    console.log('Ventana de confirmación cerrada correctamente');
});

Then('el producto {string} sigue apareciendo en la lista', async function (codigoProducto) {
    const fila = this.page.locator(`tr:has-text("${codigoProducto}")`);
    await expect(fila).toBeVisible();
    console.log(`Confirmado que el producto "${codigoProducto}" sigue en la lista`);
});




