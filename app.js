require('dotenv').config();
const Server = require('./models/server');

const server = new Server();

server.listen();

/* const express = require('express');
const cors = require('cors');

const UserRoutes = require('./routes/user_routes');
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

app.use(express.static('public'));

//routes
app.use('/api/users/', UserRoutes);

app.listen(process.env.PORT, () => {
  console.log('Server corriendo');
});
 */
