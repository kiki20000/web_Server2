
const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.MONGO_DB_ATLAS);

        console.log('Base de datos funcionando');


    } catch (error) {
       console.log('Error a la hora de iniciar la bd1');
    }


}




module.exports = {
    dbConnection
}