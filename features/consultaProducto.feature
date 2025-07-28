@consulta-producto @requiere-login 
Feature: Funcionalidad de consulta de producto
    Como usuario registrado
    Quiero poder acceder al sistema
    Para realizar la consulta de productos

    Background: 
        Given que el usuario está en la página de inicio de SELGOM S.A

    Scenario: Usuario registrado realiza una consulta de productos existentes que contiene descripcion
        When el usuario selecciona la lista desplegable de Entidades
        And  el usuario va a la página de Artículos
        And  el usuario selecciona el artículo "IP-16-2025-v13"
        Then el usuario puede ver el artículo Iphone que contiene la descripción de "Iphone"

    Scenario: Usuario registrado realiza una consulta de productos existentes que no contiene unidad
        When el usuario selecciona la lista desplegable de Entidades
        And  el usuario va a la página de Artículos
        And  el usuario selecciona el artículo "IP-16-Pro-2025-v17"
        Then el usuario puede ver el artículo Iphone que contiene la descripción de "Iphone"