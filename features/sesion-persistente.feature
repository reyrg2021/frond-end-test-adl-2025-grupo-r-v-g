@sesion-persistente-SELGOM @not-requiere-login
Feature: Funcionalidad de sesión persistente
    Como usuario del sistema
    Quiero poder iniciar sesión en el sitio de SELGOM S.A
    Para acceder a las funcionalidades protegidas sin volver a autenticarme

    Background: 
        Given que el usuario está en la página de login de SELGOM S.A

    Scenario: Sesión permanece activa tras cerrar y reabrir el navegador
        When el usuario ingresa el email "testeradl@test.com"
        And el usuario ingresa la contraseña "Tester@2025"
        And el usuario inicia la sesión en el botón de login
        Then el usuario está en la página de inicio de SELGOM S.A
        And el texto "Bienvenido al sistema ERP." esta visible para el usuario
        When el usuario cierra el navegador y vuelve a abrir la aplicación
        Then el usuario se mantiene en la página de login de SELGOM S.A
        