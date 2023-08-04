# PruebaOnyx

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 16.1.4.

## Instalación

Asegúrate de tener instalado Node.js y npm en tu sistema.

1. Clona este repositorio en tu máquina local.
2. Navega al directorio del proyecto: `cd PruebaOnyx`.
3. Instala las dependencias: `npm install`.

## JSON Server

Antes de ejecutar la aplicación, debes instalar JSON Server de forma global en tu sistema. Para hacerlo, ejecuta el siguiente comando:

```
npm install -g json-server
```

Una vez que JSON Server está instalado, puedes iniciar el servidor ejecutando el siguiente comando:

```
json-server --watch src/assets/data/books.json
```

## Ejecución

Una vez que hayas configurado el proyecto y el servidor JSON, puedes iniciar la aplicación con el siguiente comando:

```
ng serve
```

Esto iniciará el servidor de desarrollo en `http://localhost:4200/`. La aplicación se recargará automáticamente si realizas cambios en los archivos de origen.

## Uso

A continuación, se describen las principales funcionalidades de la aplicación:

- **Autenticación**: La aplicación cuenta con un sistema de autenticación que permite a los usuarios registrarse e iniciar sesión. Para registrarse, se debe proporcionar un nombre de usuario y una contraseña válida. Una vez autenticado, el usuario puede acceder a las funcionalidades protegidas de la aplicación.

- **Vista de Libros**: Una vez autenticado, el usuario puede ver una lista de libros disponibles. La lista muestra el título, autor y género de cada libro. El usuario puede buscar libros por título o autor utilizando la barra de búsqueda y filtrar libros por género utilizando el menú desplegable de filtros.

- **Detalles del Libro**: El usuario puede hacer clic en un libro de la lista para ver más detalles sobre él. Los detalles incluyen la editorial, año de publicación, sinopsis, número de páginas, idioma, disponibilidad y palabras clave.

- **Agregar un Nuevo Libro**: El usuario autenticado tiene la capacidad de agregar un nuevo libro a la lista. Para ello, debe proporcionar los detalles del libro, como título, autor, género, editorial, año de publicación, sinopsis, número de páginas, idioma, disponibilidad y palabras clave. Una vez agregado, el nuevo libro aparecerá en la lista de libros.

- **Editar y Eliminar Libros**: El usuario también puede editar y eliminar libros existentes de la lista. Al hacer clic en el botón de edición, se mostrará un formulario con los detalles actuales del libro, permitiendo al usuario modificarlos. Al hacer clic en el botón de eliminar, se mostrará una confirmación antes de eliminar el libro de la lista.

## Contribuciones

Si deseas contribuir a este proyecto, sigue los siguientes pasos:

- Haz un fork del repositorio.
- Crea una nueva rama para tus cambios: `git checkout -b mi-rama`.
- Haz tus cambios y realiza los commits: `git commit -m "Descripción de los cambios"`.
- Sube los cambios a tu fork: `git push origin mi-rama`.
- Haz una solicitud de extracción (pull request) desde tu rama a la rama principal del repositorio original.

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.

## Contacto

Si tienes alguna pregunta o comentario sobre el proyecto, no dudes en ponerte en contacto conmigo en tu-email@example.com.
