import { useState, useEffect } from "react";
import styles from "../styles/GestionarProducto.module.css";
import { BoxIso, Settings } from "iconoir-react";
import { Link } from "react-router-dom";
import axios from "axios";
import MenuLateral from "../components/MenuLateral";

const URI = "http://localhost:9000/pedido/";

const GestionarPedido = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    getPedidos();
  }, []);

  const getPedidos = async () => {
    const res = await axios.get(URI);
    setPedidos(res.data);
  };
  const deletePedido = async (id) => {
    const res = await axios.delete(`${URI}${id}`);
    getPedidos();
    console.log("res:", res);
    alert("Pedido Eliminado");
  };
  return (
    <section className={styles.mainContainer}>
      <MenuLateral opcionActiva="pedido" />
      <div className={styles.rightSection}>
        <div className={styles.topSection}>
          <h2 className={styles.title}>GESTIONAR PEDIDO</h2>
        </div>
        <div className={styles.options}>
          <Link to="/registrarpedido">
            <div className={styles.option1}>
              <span className={styles.optionText}>Registrar nuevo pedido</span>
              <BoxIso color="#ffffff" style={{ fontSize: "35px" }} />
            </div>
          </Link>
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.proveedorInfo}>
            <div className={styles.proveedorList}>
              <h2 className={styles.title}>Pedidos registrados</h2>
              <table className={styles.productosTable}>
                <thead>
                  <tr>
                    <th className={styles.proveedorName}>Pedido</th>
                    <th className={styles.proveedorEmail}>Fecha</th>
                    <th className={styles.proveedorEmail}>Estado</th>
                    <th className={styles.proveedorWeb}>Total</th>
                    <th className={styles.proveedorTelephone}>Proveedor</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.map((pedido) => (
                    <tr key={pedido.id}>
                      <td className={styles.productoNombre}>{pedido.id}</td>
                      <td className={`${styles.marca} ${styles.centered}`}>
                        {pedido.fecha}
                      </td>
                      <td className={styles.pedidoModelo}>{pedido.estado}</td>
                      <td className={`${styles.stock} ${styles.centered}`}>
                        {pedido.total}
                      </td>
                      <td className={styles.productoProveedor}>
                        {pedido.proveedor
                          ? pedido.proveedor.nombre
                          : "Sin proveedor"}
                      </td>
                      <td className={styles.productoProveedor}>
                        <button onClick={() => deletePedido(pedido.id)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GestionarPedido;
