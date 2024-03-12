import db from "../database/db.js";
import { DataTypes } from "sequelize";
import ProveedorModel from "./ProveedorModel.js";
const ProductoModel = db.define(
  "productos",
  {
    nombre: { type: DataTypes.STRING },
    marca: { type: DataTypes.STRING },
    modelo: { type: DataTypes.STRING },
    descripcion: { type: DataTypes.STRING},
    stock: { type: DataTypes.INTEGER },
    precio: { type: DataTypes.FLOAT },
    estado: { type: DataTypes.BOOLEAN },
    idProveedor: { type: DataTypes.INTEGER}, //Aqui deberia ser por integer pero no se como lo harias por ello le pongo string
  },
  {
    timestamps: false, //Deshabilitar marcas de tiempo
  }
);
ProductoModel.belongsTo(ProveedorModel, { foreignKey: "idProveedor" });
export default ProductoModel;
