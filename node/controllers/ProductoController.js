import ProductoModel from "../models/ProductoModel.js";
import ProveedorModel from "../models/ProveedorModel.js";

// Mostrar todos los productos
export const getAllProductos = async (req, res) => {
  try {
    const productos = await ProductoModel.findAll({ include: ProveedorModel});
    res.json(productos);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Mostrar un producto por su id
export const getProducto = async (req, res) => {
  try {
    const producto = await ProductoModel.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(producto[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};
//crear un registro de producto
export const createProducto = async (req, res) => {
  try {
    console.log("req:", req.body);
    await ProductoModel.create(req.body);
    res.json({ message: "Registro creado exitosamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Actualizar datos de un prroducto
export const updateProducto = async (req, res) => {
  try {
    await ProductoModel.update(req.body, {
      where: { id: req.params.id },
    });
    res.json({ message: "Registro actualizado exitosamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Activar producto por estado
export const activateProducto = async (req, res) => {
  try {
    await ProductoModel.update(
      { estado: true },
      {
        where: { id: req.params.id },
      }
    );
    res.json({ message: "Registro actualizado correctamente." });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Desactivar producto por estado
export const deactivateProducto = async (req, res) => {
  try {
    await ProductoModel.update(
      { estado: false },
      {
        where: { id: req.params.id },
      }
    );
    res.json({ message: "Registro actualizado correctamente." });
  } catch (error) {
    res.json({ message: error.message });
  }
};
