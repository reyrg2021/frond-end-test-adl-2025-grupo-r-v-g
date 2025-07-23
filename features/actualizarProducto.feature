@actualizar-producto @requiere-login
Feature: Funcionalidad de actualizar un producto
    Como usuario registrado
    Quiero poder acceder al sistema
    Para actualizar un producto

    Background: 
        Given que el usuario está en la página de inicio de SELGOM S.A

    Scenario: Usuario registrado realiza la actualización de un producto existente con todos los datos
        When el usuario selecciona la lista desplegable de Entidades
        And  el usuario consulta sobre Artículos
        And  el usuario selecciona el artículo 'IP-16-2025-v11'
        And  el usuario selecciona editar los datos 
        And  el usuario actualiza el formulario con Código "IP-16-Pro-2025-v11", Descripción "Iphone 16 Pro Max 2025 v11", Stock Actual "10", Costo "1000000", Precio venta "1200000" y selecciona la unidad de medida "Unidad" 
        Then el usuario ve un mensaje de éxito que contiene "Iphone 16 Pro Max 2025 v11"
        And  el usuario está en la página de Artículos
        



       