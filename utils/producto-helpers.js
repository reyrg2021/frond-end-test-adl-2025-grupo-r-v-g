
// utils/formulario-helpers.js - Versión SIMPLE
async function llenarFormularioProducto(page, datos, tipoOperacion = 'crear') {
    const { codigo, descripcion, stockActual, costo, precioVenta, unidadMedida } = datos;
    
    try {
        // Llenar campos básicos -
        await page.getByRole('textbox', { name: 'Código (SKU)' }).fill(codigo);
        await page.getByRole('textbox', { name: 'Descripción' }).fill(descripcion);
        
        // Para campos numéricos, usar clear() simple
        const stockField = page.getByRole('spinbutton', { name: 'Stock Actual' });
        await stockField.clear();
        await stockField.fill(stockActual);
        
        const costoField = page.getByRole('spinbutton', { name: 'Costo' });
        await costoField.clear();
        await costoField.fill(costo);
        
        const precioField = page.getByRole('spinbutton', { name: 'Precio venta' });
        await precioField.clear();
        await precioField.fill(precioVenta);
        
        // Unidad de medida
        await page.getByLabel('Unidad de Medida').selectOption(unidadMedida);
        
        // Esperar un momento antes de guardar
        // await page.waitForTimeout(500);
        
        // Guardar
        await page.getByRole('button', { name: 'Guardar Cambios' }).click();
        
        // Esperar respuesta
        // await page.waitForLoadState('networkidle');
        
    } catch (error) {
        throw new Error(`Error al llenar formulario: ${error.message}`);
    }
}

module.exports = { llenarFormularioProducto };