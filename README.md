# Framework de Testing Automatizado - Front End

Framework de testing automatizado utilizando **Cucumber + Playwright** con reporte de **Allure** para pruebas E2E del front-end.

## Tecnologías Utilizadas

- **[Cucumber.js](https://cucumber.io/docs/cucumber/)** - Framework BDD para escribir pruebas en lenguaje natural (Gherkin)
- **[Playwright](https://playwright.dev/)** - Herramienta de automatización para navegadores modernos
- **[Allure Report](https://docs.qameta.io/allure/)** - Framework de reporting avanzado con métricas detalladas
- **JavaScript/Node.js** - Lenguaje de programación y runtime

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/reyrg2021/frond-end-test-adl-2025-grupo-r-v-g.git

# Instalar dependencias
npm install

# Instalar navegadores de Playwright
npx playwright install
```

## Ejecución de Pruebas

### Ejecutar todas las pruebas
```bash
npx cucumber-js
```


## Reportes y Resultados

### Generar y visualizar reporte de Allure
```bash
# Servir reporte en vivo (recomendado)
allure serve allure-results

# O generar reporte estático
allure generate allure-results --clean -o allure-report
allure open allure-report
```

### Videos de ejecución
Los videos de las pruebas se almacenan automáticamente en:
```
reports/videos/
```



## 📁 Estructura del Proyecto

```
├── features/                 # Archivos .feature (Gherkin)
│   └── login.feature
├── steps/                    # Step definitions
│   └── login.steps.js
├── support/                  # Configuración y helpers
│   ├── world.js             # World object para Cucumber
│   └── hooks.js             # Before/After hooks
├── reports/                  # Reportes generados
│   ├── videos/              # Videos de ejecución
│   └── screenshots/         # Screenshots de fallos
├── allure-results/          # Resultados de Allure (JSON)
├── cucumber.js              # Configuración de Cucumber
└── playwright.config.js     # Configuración de Playwright
```

## Escribiendo Pruebas

### Ejemplo de Feature File
```gherkin
@login
Feature: Autenticación de Usuario
  Como usuario del sistema
  Quiero poder iniciar sesión
  Para acceder a las funcionalidades protegidas

  Scenario: Login exitoso con credenciales válidas
    Given que el usuario está en la página de login de SELGOM S.A
    When el usuario ingresa el email "user@test.com"
    And el usuario ingresa la contraseña "password123"
    And el usuario inicia la sesión en el botón de login
    Then el usuario está en la página de inicio de SELGOM S.A
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---
