import db from '../database/db.js'

import {DataTypes} from 'sequelize'

const UserModel = db.define('usuarios',{
    nombre:{type:DataTypes.STRING},
    apellidos:{type:DataTypes.STRING},
    dni:{type:DataTypes.INTEGER},
    edad:{type:DataTypes.INTEGER},
    correo:{type:DataTypes.STRING},
    telefono:{type:DataTypes.INTEGER},
    sexo:{type:DataTypes.STRING},
    usuario:{type:DataTypes.STRING},
    contraseña:{type:DataTypes.STRING},
    idTipoUser:{type:DataTypes.STRING},
    estado:{type:DataTypes.BOOLEAN}
},{
        timestamps: false // Deshabilitar marcas de tiempo
})

export default UserModel;