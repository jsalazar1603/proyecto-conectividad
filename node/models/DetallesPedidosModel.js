import db from "../database/db.js";
import { DataTypes } from "sequelize";
import PedidosModel from "./PedidosModel.js";

const DetallesPedidosModel = db.define(
    "detallespedidos",{
        descripcion: { type: DataTypes.STRING },
        cantidad: { type: DataTypes.INTEGER },
        precio: { type: DataTypes.FLOAT },
        idPedido: { type: DataTypes.INTEGER },
    },{
        timestamps: false,
    }
);
PedidosModel.hasMany(DetallesPedidosModel, { foreignKey: "idPedido" });
//PedidosModel.belongsTo(DetallesPedidosModel, { foreignKey: "idPedido" });
export default DetallesPedidosModel;