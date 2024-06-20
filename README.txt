TODOS



Installation:

Aqui van las instrucciones de instalacion


Production:

Comenzar el proyecto en modo produccion


Scripts:

Aqui van los scripts del packaje.json


Dependences:

"cors" : middleware for handling Cross-Origin Resource Sharing (CORS)
"dotenv" : loads environment variables from a .env file
"express": web framework for Node.js
"helmet" : middleware for adding security headers
"morgan" : 

/*mongodb: driver for MongoDB
mysql2: MySQL client for Node.js*/



Dev dependences:

"@types/cors": TypeScript definitions for cors
"@types/express": TypeScript definitions for express
"@types/morgan": 
"@types/react-dom": 
"@typescript-eslint/eslint-plugin": 
"eslint": linter for TypeScript
"eslint-config-standard-with-typescript": Eslint config
"eslint-plugin-import": Eslint config
"eslint-plugin-n": Eslint config
"eslint-plugin-promise": Eslint config
"eslint-plugin-react": Eslint config
"standard": eslinter config
"typescript": 


@types/socket.io


Folder estructure:

my-chat-app/
├── src/
│   ├── client/
│   │   └── chat.s7/
│   │       └── 
│   ├── server/
│   │   ├── config/
│   │   │   └── config.ts
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   └── chatController.ts
│   │   ├── middleware/
│   │   │   └── authMiddleware.ts
│   │   ├── models/
│   │   │   ├── userModel.ts
│   │   │   └── messageModel.ts
│   │   ├── repositories/
│   │   │   ├── userRepository.ts
│   │   │   └── messageRepository.ts
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   └── chatRoutes.ts
│   │   ├── services/
│   │   │   ├── authService.ts
│   │   │   └── chatService.ts
│   │   ├── sockets/
│   │   │   └── chatSocket.ts
│   │   ├── utils/
│   │   │   └── utils.ts
│   │   ├── app.ts
│   │   └── server.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md



Intentar crear 4 cuentas de admin, donde se puedan crear dentro del entorno,
 dos salas diferentes, y se pueda volver a salir y entrar.
_____________________
|         |         |
|   S1    |   S2    |   1 chat x sala.
|_________|_________|
|                   |
|  U1, U2, U3, U4   |   1 chat
|___________________|

Ambos tienen que mantenerse, "borrar chat" con pass de admin.