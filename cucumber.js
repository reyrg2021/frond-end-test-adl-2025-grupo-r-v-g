
module.exports = {
    default: {
        // 'features' con orden específico
        paths: [
            // 'features/login.feature',                    // 1. Login primero
            // 'features/registroProducto.feature',         // 2. Crear producto  
            'features/actualizarProducto.feature',       // 3. Actualizar producto
            // 'features/consultaProducto.feature',         // 4. Consultar producto
            // 'features/borrarProducto.feature',            // 5. Borrar producto
            // 'features/sesionPersistente.feature'         // 6. Probar sesión persistente
        ],


        require: [
            'step_definitions/**/*.js', 
            'support/**/*.js'          
        ],

  
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
    
        worldParameters: {
            baseUrl: 'https://test-adl.leonardojose.dev'
        },


        parallel: 1
    }
};