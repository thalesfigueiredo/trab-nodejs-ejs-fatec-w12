const mongoose = require('mongoose');

module.exports = app => {
    mongoose.connect(`mongodb://${process.env.MONGODB_URL}/${process.env.MONGODB_DATABASE}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log("Conexão foi realizada com o MonoDB"))
    .catch((err) => console.log(`Erro ao conectar ao MongoDB: ${err}`))
    //JS Trabalha em formato assíncrono

    return mongoose;
}