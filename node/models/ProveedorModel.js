import db from "../database/db.js";
import {DataTypes} from 'sequelize'
const ProveedorModel = db.define('proveedors',{ 
    nombre:{type:DataTypes.STRING},
    direccion:{type:DataTypes.STRING},
    correo:{type:DataTypes.STRING},
    telefono:{type:DataTypes.INTEGER},
    sitioweb:{type:DataTypes.STRING},
},{
    timestamps: false // Deshabilitar marcas de tiempo
});   

export default ProveedorModel;