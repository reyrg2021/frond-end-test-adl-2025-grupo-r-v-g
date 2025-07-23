const { Before, After, AfterStep, Status, setDefaultTimeout } = require('@cucumber/cucumber');
// const LoginPage = require('../step_definitions/pom/LoginPage.js');
const fs = require('fs');
const path = require('path');
// const LoginPage = require('../step_definitions/pom/loginPage');
// const SecurePage = require('../step_definitions/pom/securePage');

// Configurar timeout de Cucumber
setDefaultTimeout(60000);

// Hook normal para features SIN login automático
Before({ tags: 'not @requiere-login' }, async function () {
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

// NUEVO: Hook para features que requieren login automático
Before({ tags: '@requiere-login' }, async function () {
    // Inicializar como siempre
    await this.init();

    const screenshotDir = 'reports/screenshots';
    if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
    }

    // REALIZAR LOGIN AUTOMÁTICO
    try {
        console.log('DEBUG: Iniciando login automático...');
        
        await this.page.goto('/login');
        // await this.page.waitForSelector('[name="Email"], [role="textbox"]:has-text("Email")', { timeout: 60000 });
        
        await this.page.getByRole('textbox', { name: 'Email' }).fill('testeradl@test.com');
        await this.page.getByRole('textbox', { name: 'Contraseña' }).fill('Tester@2025');
        await this.page.getByRole('button', { name: 'Ingresar' }).click();
        
        // Esperar que el login sea exitoso
        // await this.page.waitForURL(/.*\/dashboard/, { timeout: 15000 });
        
        console.log('DEBUG: Login automático completado exitosamente');
        
    } catch (error) {
        console.error('ERROR: Fallo en login automático:', error.message);
        throw error;
    }
});

AfterStep(async function (scenario) {
    if (this.page) {
        //Si desean screenshots en cada paso
        /*
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
        const filename = `step-${scenarioName}-${timestamp}.png`;

        await this.page.screenshot({
            path: `reports/screenshots/${filename}`,
            fullPage: true
        });
        */
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