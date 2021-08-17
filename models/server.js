const express = require('express');
const cors = require('cors');
//const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: '/api/auth',
      category: '/api/categories',
      //product: '/api/products',
      user: '/api/users',
    };

    // Conectar a base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio Público
    this.app.use(express.static('public'));

    // Fileupload - Carga de archivos
    /* this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        createParentPath: true,
      })
    ); */
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth_routes'));
    this.app.use(this.paths.category, require('../routes/categories_routes'));
    //this.app.use(this.paths.product, require('../routes/products_routes'));
    this.app.use(this.paths.user, require('../routes/user_routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port);
    });
  }
}

module.exports = Server;
