import { useState, useEffect } from "react";
import styles from "../styles/GestionarProveedor.module.css";
import { Package, Shop, User, UserBag, UserPlus } from "iconoir-react";
import { Link } from "react-router-dom";
import axios from "axios";

const URI = "http://localhost:8000/proveedor/";

const GestionarProveedor = () => {
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    getProveedores();
  }, []);

  const getProveedores = async () => {
    const res = await axios.get(URI);
    setProveedores(res.data);
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
              <div className={styles.selectedOption}>
                <Shop size="24" color="#ffffff" />
                <span className={styles.optionName}>Gestionar Proveedor</span>
              </div>
            </Link>
            <Link to="/gestionarproducto">
              <div className={styles.option}>
                <Package size="24" color="#ffffff" />
                <span className={styles.optionName}>Gestionar Producto</span>
              </div>
            </Link>
          </section>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.topSection}>
          <h2 className={styles.title}>GESTIONAR PROVEEDOR</h2>
        </div>
        <div className={styles.options}>
          <Link to="/registrarproveedor">
            <div className={styles.option1}>
              <span className={styles.optionText}>
                Registrar nuevo proveedor
              </span>
              <UserPlus color="#ffffff" style={{ fontSize: "35px" }} />
            </div>
          </Link>
          <Link to="/modificarproveedor">
            <div className={styles.option2}>
              <span className={styles.optionText}>Modificar proveedor</span>
              <UserBag color="#ffffff" style={{ fontSize: "35px" }} />
            </div>
          </Link>
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.proveedorInfo}>
            <div className={styles.proveedorList}>
              <h2 className={styles.title}>Proveedores registrados</h2>
              <table className={styles.proveedoresTable}>
                <thead>
                  <tr>
                    <th className={styles.proveedorName}>Nombre</th>
                    <th className={styles.proveedorEmail}>Correo</th>
                    <th className={styles.proveedorWeb}>Sitio Web</th>
                    <th className={styles.proveedorTelephone}>Teléfono</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Aquí va el mapeo de los proveedores */}
                  {proveedores.map((proveedor) => (
                    <tr key={proveedor.id}>
                      <td className={styles.proveedorName}>
                        {proveedor.nombre}
                      </td>
                      <td className={styles.proveedorEmail}>
                        {proveedor.correo}
                      </td>
                      <td className={styles.proveedorWeb}>
                        {proveedor.sitioweb}
                      </td>
                      <td className={styles.proveedorTelephone}>
                        {proveedor.telefono}
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

export default GestionarProveedor;
