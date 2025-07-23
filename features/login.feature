@login-SELGOM
Feature: Funcionalidad de login
    Como usuario del sistema
    Quiero poder iniciar sesión en el sitio de SELGOM S.A
    Para acceder a las funcionalidades protegidas

    Background: 
        Given que el usuario está en la página de login de SELGOM S.A

    Scenario: Usuario existente inicia sesión con credenciales válidas
        When el usuario ingresa el email "testeradl@test.com" 
        And  el usuario ingresa la contraseña "Tester@2025"
        And  el usuario inicia la sesión en el botón de login
        Then el usuario está en la página de inicio de SELGOM S.A
        And  el texto "Bienvenido al sistema ERP." esta visible para el usuario
        



        
            