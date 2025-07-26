
// module.exports = {
//    default: {
        // Especifica la ruta a tus archivos de features.
//        paths: ['features/**/*.feature'],

        // Le dice a Cucumber dónde encontrar tus definiciones de pasos y archivos de soporte.
//        require: [
//            'step_definitions/**/*.js', // Tus pasos de Gherkin
//            'support/**/*.js'          // Archivos de hooks (Before, After)
//        ],

        // Define el formato de la salida en la consola y para los reportes.
//        format: [
//            'progress-bar', // Muestra una barra de progreso cucudurante la ejecución
//            'json:reports/cucumber-report.json' // Genera un reporte JSON
//        ],

        // Permite pasar parámetros a tu World personalizado.
//        worldParameters: {
//            baseUrl: 'https://test-adl.leonardojose.dev'
//        }
//    }
//}

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
      'progress-bar',  // ✅ Incluido por defecto
      'json:test-results/cucumber-report.json',  // ✅ Incluido por defecto
      'html:test-results/cucumber-report.html',  // ✅ Incluido por defecto
      '@cucumber/pretty-formatter'  // ✅ Instalado por separado
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },

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

