const { Before, After, AfterStep, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const { llenarFormularioProducto } = require('../utils/producto-helpers');
const { expect } = require('@playwright/test');
// const LoginPage = require('../step_definitions/pom/LoginPage.js');
const fs = require('fs');
const path = require('path');
// const LoginPage = require('../step_definitions/pom/loginPage');
// const SecurePage = require('../step_definitions/pom/securePage');

// Configurar timeout de Cucumber
setDefaultTimeout(60000);


Before({ tags: '@not-requiere-login' },async function () {
    // 'this' es una instancia de tu CustomWorld
    await this.init();
    // this.loginPage = new LoginPage(this.page);

    const screenshotDir = 'reports/screenshots';
    if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
    }
    // Instanciamos los Page Objects para cada escenario, pasándoles la nueva página
    // this.loginPage = new LoginPage(this.page);
    // this.securePage = new SecurePage(this.page);
});


Before( { tags: '@requiere-login' } ,async function () {
    // Inicializar como siempre
    await this.init();

    const screenshotDir = 'reports/screenshots';
    if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
    }
        console.log('DEBUG: Iniciando login automático...');
        
        await this.page.goto('/login');
        await this.page.getByRole('textbox', { name: 'Email' }).fill('testeradl@test.com');
        await this.page.getByRole('textbox', { name: 'Contraseña' }).fill('Tester@2025');
        await this.page.getByRole('button', { name: 'Ingresar' }).click();
        
        console.log('DEBUG: Login automático completado exitosamente');
        
});

AfterStep(async function (scenario) {
    if (this.page) {
        
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
        const filename = `step-${scenarioName}-${timestamp}.png`;

        await this.page.screenshot({
            path: `reports/screenshots/${filename}`,
            fullPage: true
        });  
    }
});

After(async function (scenario) {
    //Solo toma screenshoot cuando falla
    //if (scenario.result.status === Status.FAILED) {
    // page.screenshot() sin 'path' devuelve la imagen como un buffer
    const screenshot = await this.page.screenshot({ fullPage: true });

    // Adjunta la imagen al reporte de Cucumber.
    // Esto es lo que permite que cucumber-html-reporter la muestre.
    this.attach(screenshot, 'image/png');
    //}

    //Grabando video.
    const videoPath = await this.page.video()?.path();

    await this.cleanup();

    if (videoPath) {
        const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const newVideoPath = `reports/videos/${scenarioName}-${timestamp}.webm`;

        // Renombrar video con nombre descriptivo
        if (fs.existsSync(videoPath)) {
            fs.renameSync(videoPath, newVideoPath);
            console.log(`🎥 Video guardado: ${newVideoPath}`);

            // Adjuntar video al reporte (si el reporter lo soporta)
            const videoBuffer = fs.readFileSync(newVideoPath);
            this.attach(videoBuffer, 'video/webm');
        }
    }
});


//////////////// Hooks PARA ESCENARIOS DE BORRAR QUE VAN A FALLAR Y NECESITAN QUE EL PRODUCTO ESTE CREADO///////////////// 
Before({ tags: '@esperado-que-falle' }, async function () {
    console.log('Preparando producto para escenario de confirmación...');
    
    await this.page.getByText('Entidades').click();
    await this.page.getByText('Artículos').click();
    await this.page.getByRole('button', { name: 'Crear Artículo' }).click();
    
    const datosProductoTemporal = {
        codigo: 'IP-16-Pro-2025-v14',
        descripcion: 'IP-16-Pro-2025-v14',
        stockActual: '10',
        costo: '800000',
        precioVenta: '999000',
        unidadMedida: 'Unidad' 
    };

    await llenarFormularioProducto(this.page, datosProductoTemporal, 'crear');
    const mensajeExito = `Articulo "${datosProductoTemporal.descripcion}" creado con éxito!`;
    await expect(this.page.getByText(mensajeExito)).toContainText(datosProductoTemporal.descripcion);
    console.log(`Producto temporal creado exitosamente: ${datosProductoTemporal.codigo}`);
    const filaProducto = this.page.locator(`tr:has-text("${datosProductoTemporal.codigo}")`);
    await expect(filaProducto).toBeVisible({ timeout: 5000 });
    console.log(`Producto temporal verificado en la lista: ${datosProductoTemporal.codigo}`);
    console.log('Regresando a la página de inicio');
    await this.page.goto('/dashboard');
});
