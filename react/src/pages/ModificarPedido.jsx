import { useState, useEffect } from "react";
import styles from "../styles/ModificarPedido.module.css";
import { Search } from "iconoir-react";
import { Link } from "react-router-dom";
import axios from "axios";
import MenuLateral from "../components/MenuLateral";

const URI = "http://localhost:9000/pedido/";

const ModificarPedido = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    getPedidos();
  }, []);
  const estadoPedido = [
    { value: "", label: "Seleccionar" },
    { value: "1", label: "Solicitado" },
    { value: "2", label: "En proceso" },
    { value: "3", label: "Recibido" },
  ];

  console.log(pedidos);
  //procedimiento para mostrar todos los productos
  const getPedidos = async () => {
    const res = await axios.get(URI);
    setPedidos(res.data);
  };

  const handleChangeEstado = (id, estado) => {
    const updatedPedidos = pedidos.map((pedido) =>
      pedido.id === id ? { ...pedido, estado } : pedido
    );
    setPedidos(updatedPedidos);
  };
  const handleSaveEstado = async (id, estado) => {
    try {
      await axios.put(`${URI}${id}`, { estado });
      alert("Estado del pedido guardado correctamente");
      // Actualizar la lista de pedidos después de modificar el estado
      await getPedidos();
    } catch (error) {
      console.error("Error al guardar estado del pedido:", error);
      alert("Error al guardar el estado del pedido");
    }
  };
  const renderPedidos = () => {
    return pedidos.map((pedido) => (
      <tr key={pedido.id} className={styles.dataRow}>
        <td className={styles.dataName}>{pedido.id}</td>
        <td className={styles.dataStock}>{pedido.fecha}</td>
        <td className={styles.dataState}>
          <select
            defaultValue={pedido.estado}
            onChange={(e) => handleChangeEstado(pedido.id, e.target.value)}
          >
            {estadoPedido.map((estado) => (
              <option
                key={estado.value}
                value={estado.value}
                selected={estado.value === pedido.estado}
              >
                {estado.label}
              </option>
            ))}
          </select>
        </td>
        <td>
          <Link to={`/modificardatospedido/${pedido.id}`}>
            <button
              onClick={() => handleSaveEstado(pedido.id, pedido.estado)}
              className={styles.btnGuardar}
            >
              Guardar
            </button>
          </Link>
        </td>
        <td>
          {pedido.estado ? (
            <button
              onClick={() => deletePedido(pedido.id)}
              className={styles.btnDardebaja}
            >
              Inhabilitar
            </button>
          ) : (
            <button
              onClick={() => activatePedido(pedido.id)}
              className={styles.btnDardebaja}
            >
              Habilitar
            </button>
          )}
        </td>
      </tr>
    ));
  };

  //procedimiento para inhabilitar un producto
  const deletePedido = async (id) => {
    await axios.put(`${URI}deactivate/${id}`);
    // Actualizar el estado de los productos después de eliminar/inhabilitar un producto
    await getPedidos();
    // Actualizar la lista de productos antes de actualizar los resultados de búsqueda
    alert("Pedido Inhabilitado");
  };

  const activatePedido = async (id) => {
    await axios.put(`${URI}activate/${id}`);
    // Actualizar el estado de los productos después de activar un producto
    await getPedidos();
    // Actualizar la lista de productos antes de actualizar los resultados de búsqueda
    alert("Pedido Habilitado");
  };
  return (
    <section className={styles.mainContainer}>
      <MenuLateral opcionActiva="pedido" />
      <div className={styles.rightSection}>
        <div className={styles.topSection}>
          <h2 className={styles.title}>MODIFICAR PEDIDO</h2>
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.container}>
            <h2 className={styles.title}>Buscar pedido</h2>
            <div className={styles.listContainer}>
              <table className={styles.table}>
                <thead className={styles.topSectionTable}>
                  <tr className={styles.columnsName}>
                    <th className={styles.name}>Pedido</th>
                    <th className={styles.lastname}>Fecha</th>
                    <th className={styles.state}>Estado</th>
                  </tr>
                </thead>
                <tbody className={styles.tableContent}>{renderPedidos()}</tbody>
              </table>
            </div>
          </div>
          <Link to="/gestionarpedido">
            <button className={styles.btnBackbutton}>Volver</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ModificarPedido;
