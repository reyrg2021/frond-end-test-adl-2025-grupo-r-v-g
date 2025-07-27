@consulta-producto @requiere-login 
Feature: Funcionalidad de consulta de producto
    Como usuario registrado
    Quiero poder acceder al sistema
    Para realizar la consulta de productos

    Background: 
        Given que el usuario está en la página de inicio de SELGOM S.A

    Scenario: Usuario registrado realiza una consulta de productos existentes
        When el usuario selecciona la lista desplegable de Entidades
        And el usuario está en la página de Artículos
        And  el usuario selecciona el artículo "IP-16-2025-v13"
        Then el usauario puede ver el artículo Iphone que contiene la descripción de "Iphone 16 2025 v13"