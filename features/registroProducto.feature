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
        And  el usuario crea el formulario con Código "IP-16-2025-v13", Descripción "Iphone 16 2025 v13", Stock Actual "10", Costo "1000000", Precio venta "1200000" y selecciona la unidad de medida "Unidad" 
        Then el usuario ve un mensaje de éxito de artículo creado que contiene "Iphone 16 2025 v13"
        And el usuario está en la página de Artículos

    Scenario: Usuario registrado realiza el registro de un producto con codigo existente
        When el usuario selecciona la lista desplegable de Entidades
        And  el usuario consulta sobre Artículos
        And  el usuario selecciona crear un nuevo articulo
        And  el usuario crea el formulario con Código "IP-16-2025-v13", Descripción "Iphone 16 2025 v13", Stock Actual "10", Costo "1000000", Precio venta "1200000" y selecciona la unidad de medida "Unidad" 
        Then el usuario se mantiene en la página de crear un nuevo articulo
        And el usuario ve un mensaje que indica "Producto existente"
        
    Scenario: Usuario registrado realiza el registro de un nuevo producto con mas de 255 caracteres
        When el usuario selecciona la lista desplegable de Entidades
        And  el usuario consulta sobre Artículos
        And  el usuario selecciona crear un nuevo articulo
        And  el usuario crea el formulario con Código "IP-16-2025-v13", Descripción "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?", Stock Actual "10", Costo "1000000", Precio venta "1200000" y selecciona la unidad de medida "Unidad" 
        Then el usuario se mantiene en la página de crear un nuevo articulo

    Scenario: Usuario registrado realiza el registro de un nuevo producto dejando vacio el campo de codigo
        When el usuario selecciona la lista desplegable de Entidades
        And  el usuario consulta sobre Artículos
        And  el usuario selecciona crear un nuevo articulo
        And  el usuario crea el formulario con Código "", Descripción "Iphone 16 2025 v13", Stock Actual "10", Costo "1000000", Precio venta "1200000" y selecciona la unidad de medida "Unidad" 
        Then el usuario se mantiene en la página de crear un nuevo articulo