import { useState, useEffect } from "react";
import styles from "../styles/GestionarProducto.module.css";
import { BoxIso, Settings } from "iconoir-react";
import { Link } from "react-router-dom";
import axios from "axios";
import MenuLateral from "../components/MenuLateral";

const URI = "http://localhost:8000/producto/";

const GestionarPedido = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    getPedidos();
  }, []);
  const getPedidos = async () => {
    const res = await axios.get(URI);
    setPedidos(res.data);
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
              <span className={styles.optionText}>
                Registrar nuevo pedido
              </span>
              <BoxIso color="#ffffff" style={{ fontSize: "35px" }} />
            </div>
          </Link>
          <Link to="/modificarpedido">
            <div className={styles.option2}>
              <span className={styles.optionText}>Modificar pedido</span>
              <Settings color="#ffffff" style={{ fontSize: "35px" }} />
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
                    <th className={styles.proveedorName}>Nombre</th>
                    <th className={styles.proveedorEmail}>Marca</th>
                    <th className={styles.proveedorEmail}>Modelo</th>
                    <th className={styles.proveedorWeb}>Stock</th>
                    <th className={styles.proveedorTelephone}>Precio</th>
                    <th className={styles.proveedorTelephone}>Proveedor</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.map((pedido) => (
                    <tr key={pedido.id}>
                      <td className={styles.productoNombre}>
                        {pedido.nombre}
                      </td>
                      <td className={`${styles.marca} ${styles.centered}`}>
                        {pedido.marca == ""
                          ? "Sin especificar"
                          : pedido.marca}
                      </td>
                      <td className={styles.pedidoModelo}>
                        {pedido.modelo}
                      </td>
                      <td className={`${styles.stock} ${styles.centered}`}>
                        {pedido.stock}
                      </td>
                      <td className={styles.productoPrecio}>
                        {pedido.precio}
                      </td>
                      <td className={styles.productoProveedor}>
                        {pedido.proveedor
                          ? pedido.proveedor.nombre
                          : "Sin proveedor"}
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
