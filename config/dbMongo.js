const mongoose = require('mongoose');



const conectarDBMongo = async() => {
    try {
        const db = await mongoose.connect('mongodb+srv://root:root@cluster0.ixidx.mongodb.net/eccomerce?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const url = `${db.connection.host}:${db.connection.port}`
        console.log(`mongodb conectado en :${url}`)


    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1)
    }
}
module.exports = conectarDBMongo