# Proyecto 7.1 - Gonzalo Fourtane - SHAT-APP (Real Time Chat)

Este proyecto contiene dos componentes principales: un servidor y un cliente.
El servidor se encarga de manejar la lógica del backend y las solicitudes API, mientras que el cliente es una aplicación frontend que interactúa con el servidor.
Como base de datos, la aplicación utiliza MongoDB Atlas

Hay un sistema de registro de usuarios que requiere nombre de usuario a elección, contraseña y confirmación de contraseña.

La contraseñas están hasheadas, y se utilizan cookies y localStorage para contexto de sesión.

Posibilidad de Chat en tiempo real y vistas de estados de los demás usuarios, mediante Socket.io

Futuras mejoras:

- Datos de usuario (Nombres, apellidos, etc)
- Agregar imagen de perfil
- Pop-up de conexión de usuarios
- Creación de salas de chat personalizadas
- Agregar Emojis y Gifs en chat

## Tabla de Contenidos

- [Instalación](#instalación)
- [Comandos Básicos](#comandos-básicos)
- [Variables de Entorno](#variables-de-entorno)

## Instalación

Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/ghOdisea/7.1-gonzalo-fourtane.git
```

### Navega al directorio del proyecto

```bash
cd 7.1-gonzalo-fourtane
```

### Instalación de Dependencias del Servidor

```bash
cd server
npm install
```

### Instalación de Dependencias del Cliente

```bash
cd ../client
npm install
```

### Comandos Básicos

Iniciar el Servidor
Para iniciar el servidor, navega al directorio del servidor y usa el siguiente comando:

```bash
cd server
npm run build
npm run server
```

### Iniciar el Cliente

Para iniciar el cliente, navega al directorio del cliente y usa el siguiente comando:

```bash
cd client
npm run dev
```

### Variables de Entorno

Para el correcto funcionamiento del proyecto, asegúrate de configurar las siguientes variables de entorno:

Servidor
Crea un archivo .env en el directorio server con el contenido del archivo env.txt proporcionado.
