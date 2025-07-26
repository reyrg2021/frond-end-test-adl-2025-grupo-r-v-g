// cucumber-temp.js - Configuración SIN Allure para identificar el problema
module.exports = {
    default: {
        // Mismo orden de features
        paths: [
            'features/login.feature',
            'features/registroProducto.feature',
            'features/actualizarProducto.feature',
            'features/consultaProducto.feature',
            'features/borrarProducto.feature',
            'features/sesionPersistente.feature'
        ],

        // Mismo require
        require: [
            'step_definitions/**/*.js',
            'support/**/*.js'
        ],

        // REPORTERS SIN ALLURE (para testing)
        format: [
            'progress-bar',
            'json:test-results/cucumber-report.json',
            'html:test-results/cucumber-report.html',
            '@cucumber/pretty-formatter'
        ],

        // Mismos parámetros
        worldParameters: {
            baseUrl: 'https://test-adl.leonardojose.dev'
        },

        // Sin paralelización
        parallel: 1,
        
        // Timeout más generoso
        timeout: 60000
    }
};