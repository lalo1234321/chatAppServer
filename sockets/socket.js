// mensajes de sockets
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket.js');
const { comprobarJWT } = require('../helpers/jwt.js');
const {io} = require('../index.js');


io.on('connection', client => {
    console.log('Cliente conectado');

    // para mandar el arreglo de bandas registradas a los clientes conectados
    // client.emit('active-bands', bands.getBands());
    
    //  Cómo se que usuario se conectó con el jwt?????}
    // así mandamos en JWT a través de un cliente mobile al server
    // console.log( client.handshake.headers['token'] );
    const [valido, uid] = comprobarJWT( client.handshake.headers['token'] );
    console.log(valido, uid);
    if( !valido ) { return client.disconnect(); }
    console.log('Cliente autenticado');
    usuarioConectado( uid );

    // Ingresar el usuario a una sala específica
    // sala global
    client.join( uid );

    // escuchar del cliente el mensaje personal
    client.on('mensaje-personal', async ( payload ) => {
        console.log(payload);
        await grabarMensaje( payload );
        io.to( payload.para ).emit('mensaje-personal',payload);
    } )


    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado( uid ); 
    });

    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje!!!', payload);
    //     io.emit('mensaje',{ admin: 'Nuevo mensaje' });
    // });

    

});