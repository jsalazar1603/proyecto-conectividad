import db from "../database/db.js";
import {DataTypes} from "sequelize";

const PedidosModel = db.define('pedidos',{
    fecha: { type: DataTypes.DATE },
    total: { type: DataTypes.FLOAT },
    estado: { type: DataTypes.STRING },
    idProveedor: { type: DataTypes.INTEGER},
},{
    timestamps: false,
});

export default PedidosModel;