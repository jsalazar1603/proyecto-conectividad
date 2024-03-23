import PedidosModel from "../models/PedidosModel.js";
import DetallesPedidosModel from "../models/DetallesPedidosModel.js";

// Mostrar todos los pedidos y sus detallespedidos
export const getAllPedidos = async (req, res) => {
  try {
    const pedidos = await PedidosModel.findAll({ include: DetallesPedidosModel });
    res.json(pedidos);
  } catch (error) {
    res.json({ message: error.message });
  }
};
//mostrar todos los pedidos !! Prueba para ver si funciona la tabla pedidos
export const getAllPedidos1 = async (req, res) => {
  try {
    const pedidos = await PedidosModel.findAll();
    res.json(pedidos);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Mostrar un pedido por su id y sus detallespedidos
export const getPedido = async (req, res) => {
  try {
    const pedido = await PedidosModel.findAll({
      where: {
        id: req.params.id,
      },
      include: DetallesPedidosModel
    });
    res.json(pedido[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//crear un registro de pedido 
export const createPedido = async (req, res) => {
  try {
    const { detallespedidos, ...pedido } = req.body;
    const nuevoPedido = await PedidosModel.create(pedido);
    let total = 0;
    detallespedidos.forEach(async (detalle) => {
      total += detalle.precio * detalle.cantidad;
      await DetallesPedidosModel.create({
        ...detalle,
        idPedido: nuevoPedido.id,
      });
    });
    await PedidosModel.update({ total }, { where: { id: nuevoPedido.id } });
    res.json({ message: "Registro creado exitosamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Actualizar datos de un pedido 
export const updatePedido = async (req, res) => {
  try {
    const { detallespedidos, ...pedido } = req.body;
    await PedidosModel.update(pedido, {
      where: { id: req.params.id },
    });
    let total = 0;
    detallespedidos.forEach(async (detalle) => {
      total += detalle.precio * detalle.cantidad;
      await DetallesPedidosModel.update(detalle, {
        where: { id: detalle.id },
      });
    });
    await PedidosModel.update({ total }, { where: { id: req.params.id } });
    res.json({ message: "Registro actualizado exitosamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Eliminar un pedido y/o un/los detalles pedidos
export const deletePedido = async (req, res) => {
  try {
    await PedidosModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    await DetallesPedidosModel.destroy({
      where: {
        idPedido: req.params.id,
      },
    });
    res.json({ message: "Registro eliminado exitosamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

