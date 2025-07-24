

async function llenarFormularioProducto(page, datos, tipoOperacion = 'crear') {
    const { codigo, descripcion, stockActual, costo, precioVenta, unidadMedida } = datos;
    
        await page.getByRole('textbox', { name: 'Código (SKU)' }).fill(codigo);
        await page.getByRole('textbox', { name: 'Descripción' }).fill(descripcion);
        
        const stockField = page.getByRole('spinbutton', { name: 'Stock Actual' });
        await stockField.clear();
        await stockField.fill(stockActual);
        
        const costoField = page.getByRole('spinbutton', { name: 'Costo' });
        await costoField.clear();
        await costoField.fill(costo);
        
        const precioField = page.getByRole('spinbutton', { name: 'Precio venta' });
        await precioField.clear();
        await precioField.fill(precioVenta);
        
        
        await page.getByLabel('Unidad de Medida').selectOption(unidadMedida);
        await page.getByRole('button', { name: 'Guardar Cambios' }).click();     
  
}

module.exports = { llenarFormularioProducto };