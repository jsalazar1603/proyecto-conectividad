import { useState, useEffect } from "react";
import styles from "../styles/GestionarProducto.module.css";
import { Package, Shop, User, BoxIso, Settings } from "iconoir-react";
import { Link } from "react-router-dom";
import axios from "axios";

const URI = "http://localhost:8000/producto/";

const GestionarProducto = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProductos();
  }, []);
  const getProductos = async () => {
    const res = await axios.get(URI);
    setProductos(res.data);
  };

  return (
    <section className={styles.mainContainer}>
      <div className={styles.menuLateral}>
        <div className={styles.content}>
          <h1 className={styles.titlebrand}>Negocios e inversiones JR</h1>
          <section className={styles.optionsMenu}>
            <Link to="/gestionarUsuario">
              <div className={styles.option}>
                <User size="24" color="#ffffff" />
                <span className={styles.optionName}>Gestionar Usuario</span>
              </div>
            </Link>
            <Link to="/gestionarproveedor">
              <div className={styles.option}>
                <Shop size="24" color="#ffffff" />
                <span className={styles.optionName}>Gestionar Proveedor</span>
              </div>
            </Link>
            <Link to="/gestionarproducto">
              <div className={styles.selectedOption}>
                <Package size="24" color="#ffffff" />
                <span className={styles.optionName}>Gestionar Producto</span>
              </div>
            </Link>
          </section>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.topSection}>
          <h2 className={styles.title}>GESTIONAR PRODUCTO</h2>
        </div>
        <div className={styles.options}>
          <Link to="/registrarproducto">
            <div className={styles.option1}>
              <span className={styles.optionText}>
                Registrar nuevo producto
              </span>
              <BoxIso color="#ffffff" style={{ fontSize: "35px" }} />
            </div>
          </Link>
          <Link to="/modificarproducto">
            <div className={styles.option2}>
              <span className={styles.optionText}>Modificar producto</span>
              <Settings color="#ffffff" style={{ fontSize: "35px" }} />
            </div>
          </Link>
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.proveedorInfo}>
            <div className={styles.proveedorList}>
              <h2 className={styles.title}>Productos registrados</h2>
              <table className={styles.productosTable}>
                <thead>
                  <tr>
                    <th className={styles.proveedorName}>Nombre</th>
                    <th className={styles.proveedorEmail}>Marca</th>
                    <th className={styles.proveedorWeb}>Stock</th>
                    <th className={styles.proveedorTelephone}>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto) => (
                    <tr key={producto.id}>
                      <td className={styles.proveedorName}>
                        {producto.nombre}
                      </td>
                      <td
                        className={`${styles.marca} ${styles.centered}`}
                      >
                        {producto.marca == "" ? "Sin especificar" : producto.marca}
                      </td>
                      <td
                        className={`${styles.stock} ${styles.centered}`}
                      >
                        {producto.stock}
                      </td>
                      <td className={styles.proveedorTelephone}>
                        {producto.precio}
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

export default GestionarProducto;
