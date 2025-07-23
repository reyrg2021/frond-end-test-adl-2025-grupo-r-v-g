@registro-producto @requiere-login
Feature: Funcionalidad de registro de producto
    Como usuario registrado
    Quiero poder acceder al sistema
    Para registrar un nuevo producto

    Background: 
        Given que el usuario está en la página de inicio de SELGOM S.A

    Scenario: Usuario registrado realiza el registro de un nuevo producto con todos los datos
        When el usuario selecciona la lista desplegable de Entidades
        And  el usuario consulta sobre Artículos
        And  el usuario selecciona crear un nuevo articulo
        And  el usuario crea el formulario con Código "IP-16-2025-v12", Descripción "Iphone 16 2025 v12", Stock Actual "10", Costo "1000000", Precio venta "1200000" y selecciona la unidad de medida "Unidad" 
        Then el usuario ve un mensaje de éxito de artículo creado que contiene "Iphone 16 2025 v12"
        And el usuario está en la página de Artículos
        
