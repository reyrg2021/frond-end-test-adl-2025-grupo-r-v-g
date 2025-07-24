@borrar-producto @requiere-login
Feature: Funcionalidad de eliminar un producto
    Como usuario registrado
    Quiero poder acceder al sistema
    Para eliminar un producto existente

    Background:
        Given que el usuario está en la página de inicio de SELGOM S.A
    
    @esperado-que-funcione 
    Scenario: Usuario registrado elimina el producto iPhone 16 Pro Max
        When el usuario selecciona la lista desplegable de Entidades
        And el usuario consulta sobre Artículos
        And el usuario presiona eliminar el producto con código "IP-16-Pro-2025-v13"
        Then el usuario ve un mensaje de confirmación de eliminación
        And el producto "IP-16-Pro-2025-v13" no aparece en la lista

    @esperado-que-falle  @cancelar 
    Scenario: Usuario cancela la eliminación del producto
        When el usuario selecciona la lista desplegable de Entidades
        And el usuario consulta sobre Artículos
        And el usuario presiona eliminar el producto con código "IP-16-Pro-2025-v14" 
        And aparece una ventana de confirmación preguntando "¿Está seguro que desea eliminar este producto?" and el usuario presiona el botón "Cancelar"
        Then el producto "IP-16-Pro-2025-v14" sigue apareciendo en la lista

    @esperado-que-falle @confirmar
    Scenario: Usuario confirma eliminación del producto
        When el usuario selecciona la lista desplegable de Entidades
        And el usuario consulta sobre Artículos
        And el usuario presiona eliminar el producto con código "IP-16-Pro-2025-v14" 
        And aparece una ventana de confirmación preguntando "¿Está seguro que desea eliminar este producto?" and el usuario presiona el botón "Aceptar"
        Then el producto "IP-16-Pro-2025-v14" no aparece en la lista





    
        


