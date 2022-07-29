const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../Database/config');



class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //Conectar a base de datos
        this.conectarBD();

        //Middelwares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();

    }

    async conectarBD(){
        await dbConnection();
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio Publico
        this.app.use(express.static('public'));
    }


    routes(){

        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));

    }

    listen(){
        this.app.listen(this.port);
    }


}





module.exports = Server;