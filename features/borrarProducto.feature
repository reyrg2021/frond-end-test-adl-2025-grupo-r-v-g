@borrar-producto @requiere-login
Feature: Funcionalidad de eliminar un producto
    Como usuario registrado
    Quiero poder acceder al sistema
    Para eliminar un producto existente

    Background:
        Given que el usuario está en la página de inicio de SELGOM S.A

    Scenario: Usuario registrado elimina el producto iPhone 16 Pro Max
        When el usuario selecciona la lista desplegable de Entidades
        And el usuario consulta sobre Artículos
        And el usuario elimina el producto con código "IP-16-Pro-2025-v11"
        Then el usuario ve un mensaje de confirmación de eliminación
        And el producto "IP-16-Pro-2025-v11" no aparece en la lista
        


