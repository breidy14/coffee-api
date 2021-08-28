const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');
const { createAdmin, createRoles } = require('../helpers/initialSetup');
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: '/api/auth',
      category: '/api/categories',
      product: '/api/products',
      role: '/api/roles',
      search: '/api/search',
      user: '/api/users',
      uploads: '/api/uploads',
      tables: '/api/tables',
      orders: '/api/orders',
    };

    // Conectar a base de datos
    this.conectarDB();

    // set inicial
    this.initialSetup();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  async initialSetup() {
    await createRoles();
    await createAdmin();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio Público
    this.app.use(express.static('public'));

    // Fileupload - Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        limits: { fileSize: 50 * 1024 * 1024 },
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth_routes'));
    this.app.use(this.paths.category, require('../routes/categories_routes'));
    this.app.use(this.paths.product, require('../routes/products_routes'));
    this.app.use(this.paths.role, require('../routes/roles_routes'));
    this.app.use(this.paths.search, require('../routes/search_routes'));
    this.app.use(this.paths.user, require('../routes/user_routes'));
    this.app.use(this.paths.uploads, require('../routes/uploads_routes'));
    this.app.use(this.paths.tables, require('../routes/tables_routes'));
    this.app.use(this.paths.orders, require('../routes/orders_routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port);
    });
  }
}

module.exports = Server;
