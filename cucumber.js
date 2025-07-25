
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
        // 'features' con orden específico
        paths: [
            'features/login.feature',                    // 1. Login primero
            'features/registroProducto.feature',         // 2. Crear producto  
            'features/actualizarProducto.feature',       // 3. Actualizar producto
            'features/consultaProducto.feature',         // 4. Consultar producto
            'features/borrarProducto.feature',            // 5. Borrar producto
            'features/sesion-persistente.feature'         // 6. Probar sesión persistente
        ],

        // Le dice a Cucumber dónde encontrar tus definiciones de pasos y archivos de soporte.
        require: [
            'step_definitions/**/*.js', // Tus pasos de Gherkin
            'support/**/*.js'          // Archivos de hooks (Before, After)
        ],

        // Define el formato de la salida en la consola y para los reportes.
        format: ["allure-cucumberjs/reporter"],
            formatOptions: {
            resultsDir: "allure-results",
            },
        /*
        format: [
            'progress-bar', // Muestra una barra de progreso durante la ejecución
            'json:reports/cucumber-report.json' // Genera un reporte JSON
        ],
        */
        // Permite pasar parámetros a tu World personalizado.
        worldParameters: {
            baseUrl: 'https://test-adl.leonardojose.dev'
        },

        // CRÍTICO: Sin paralelización para mantener orden secuencial
        parallel: 1
    }
};