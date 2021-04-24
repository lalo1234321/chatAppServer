const mongoose = require('mongoose');


const dbConnection = async() => {

    try{
        await mongoose.connect( process.env.URL_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('Db online');

    } catch(err) {
        console.log(err);
        throw new Error('error en la base de datos');
    }
};


module.exports = { 
    dbConnection
}