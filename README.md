# Multi-Game App

Este proyecto es una aplicación de múltiples juegos desarrollada con React. Incluye varios juegos como Tic-Tac-Toe, Piedra, Papel, Tijera, Calculadora, y más.

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### `npm start`

Ejecuta la aplicación en modo de desarrollo.\
Abre [http://localhost:3000](http://localhost:3000) para verlo en tu navegador.

La página se recargará cuando realices cambios.\
También verás errores de lint en la consola.

### `npm test`

Lanza el corredor de pruebas en modo interactivo.\
Consulta la sección sobre [ejecución de pruebas](https://facebook.github.io/create-react-app/docs/running-tests) para más información.

### `npm run build`

Construye la aplicación para producción en la carpeta `build`.\
Agrupa correctamente React en modo de producción y optimiza la compilación para obtener el mejor rendimiento.

La compilación está minificada y los nombres de los archivos incluyen los hashes.\
¡Tu aplicación está lista para ser desplegada!

Consulta la sección sobre [despliegue](https://facebook.github.io/create-react-app/docs/deployment) para más información.

### `npm run eject`

**Nota: esta es una operación unidireccional. ¡Una vez que `eject`, no puedes volver atrás!**

Si no estás satisfecho con la herramienta de construcción y las opciones de configuración, puedes `eject` en cualquier momento. Este comando eliminará la dependencia de construcción única de tu proyecto.

En su lugar, copiará todos los archivos de configuración y las dependencias transitivas (webpack, Babel, ESLint, etc.) directamente en tu proyecto para que tengas control total sobre ellos. Todos los comandos excepto `eject` seguirán funcionando, pero apuntarán a los scripts copiados para que puedas modificarlos. En este punto, estás por tu cuenta.

No tienes que usar `eject`. El conjunto de características seleccionadas es adecuado para pequeños y medianos despliegues, y no deberías sentirte obligado a usar esta característica. Sin embargo, entendemos que esta herramienta no sería útil si no pudieras personalizarla cuando estés listo para hacerlo.

## Integración Continua

Este proyecto utiliza GitHub Actions para la integración continua. La configuración de CI se encuentra en el archivo [ci.yml](.github/workflows/ci.yml).

### Flujo de Trabajo de CI

- **Build**: Ejecuta el script de construcción.
- **Test**: Ejecuta las pruebas.
- **SonarCloud**: Ejecuta el análisis de SonarCloud.
- **Deploy**: Despliega la aplicación.

## Configuración de SonarCloud

El análisis de SonarCloud se configura en el archivo [sonar-project.properties](sonar-project.properties). Asegúrate de configurar los secretos `GITHUB_TOKEN` y `SONAR_TOKEN` en los secretos del repositorio en GitHub.

## Despliegue

La aplicación se despliega utilizando Vercel. Asegúrate de configurar el secreto `VERCEL_TOKEN` en los secretos del repositorio en GitHub.

## Documentación Técnica

La documentación técnica generada se encuentra en la carpeta `mo4doutput/docs/20241125_122332/`.

## Aprende Más

Puedes aprender más en la [documentación de Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

Para aprender React, consulta la [documentación de React](https://reactjs.org/).
