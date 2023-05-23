const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, saveMessage } = require('../controller/socket');


// Mensajes de Sockets
io.on('connection', (client) => {
    console.log('Cliente conectado');

    const [valido, uid] = comprobarJWT( client.handshake.headers['x-token'] );

    // Si el token no es válido, desconectamos el cliente.
    if( !valido ) {
        console.log('Cliente desconectado');
        return client.disconnect();
    }

    // Cliente autenticado
    usuarioConectado(uid);

    // Se ingresa al usuario a una sala específica
    client.join(uid);

    // Escuchamos del cliente, el mensaje personal
    client.on('personal_message', async(payload) => {

        // Guardamos mensaje
        await saveMessage(payload);

        // Emitimos el mensaje al usuario destino
        io.to(payload.to).emit('personal_message', payload);

    });

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });


    /*
    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
    });
    */


});
