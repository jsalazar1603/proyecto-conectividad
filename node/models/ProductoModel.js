import db from '../database/db.js'
import {DataTypes} from 'sequelize'
const ProductoModel=db.define('productos',{
    nombre:{type:DataTypes.STRING},
    descripcion:{type:DataTypes.STRING},
    stock:{type:DataTypes.INTEGER},
    precio:{type:DataTypes.FLOAT},
    estado:{type:DataTypes.BOOLEAN},
    idproveedor:{type:DataTypes.STRING}, //Aqui deberia ser por integer pero no se como lo harias por ello le pongo string
},{
    timestamps:false //Deshabilitar marcas de tiempo   
})
export default ProductoModel;