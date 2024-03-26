import db from "../database/db.js";
import {DataTypes} from "sequelize";
import ProveedorModel from "./ProveedorModel.js";

const PedidosModel = db.define('pedidos',{
    fecha: { type: DataTypes.DATE },
    total: { type: DataTypes.FLOAT },
    estado: { type: DataTypes.STRING },
    idProveedor: { type: DataTypes.INTEGER},
},{
    timestamps: false,
});
PedidosModel.belongsTo(ProveedorModel, { foreignKey: "idProveedor" });
export default PedidosModel;