const mongoose = require('mongoose');

const dbConecction = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);

        console.log('DB online');

    } catch (error) {
        console.log(error);
        throw new Error('Error conectando a la base de datos. Hable con el administrador.');
    }
}

module.exports = {
    dbConecction
}