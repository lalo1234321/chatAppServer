const express = require('express');
const path = require('path');
const app = express();

const auth = require('./routes/auth.js');
const user = require('./routes/usuarios.js');

// Lectura y parseo del body
app.use( express.json() );
app.use(auth);
app.use(user);
require('dotenv').config();
// node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket.js');

const { dbConnection } = require('./database/config.js');
dbConnection();

// cuando configuramos otro sript diferente al de start, usar npm run <algo></algo>
// apunta a la carpeta public
const publicPath = path.resolve(__dirname, 'public');

app.use( express.static(publicPath) );

server.listen(process.env.PORT, (err) => {
    if(err) throw new Error(err);
    console.log(`Server escuchando puerto ${process.env.PORT}`); 
})