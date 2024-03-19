import styles from "../styles/MenuLateral.module.css";
import { Package, Shop, User } from "iconoir-react";
import { Link } from "react-router-dom";

const MenuLateral = (props) => {
  return (
    <div className={styles.menuLateral}>
      <div className={styles.content}>
        <h1 className={styles.titlebrand}>Negocios e inversiones JR</h1>
        <section className={styles.optionsMenu}>
          <Link to="/gestionarUsuario">
            <div
              className={`${
                props.opcionActiva == "usuario"
                  ? styles.selectedOption
                  : styles.option
              }`}
            >
              <User size="24" color="#ffffff" />
              <span className={styles.optionName}>Gestionar Usuario</span>
            </div>
          </Link>
          <Link to="/gestionarproveedor">
          <div
              className={`${
                props.opcionActiva == "proveedor"
                  ? styles.selectedOption
                  : styles.option
              }`}
            >
              <Shop size="24" color="#ffffff" />
              <span className={styles.optionName}>Gestionar Proveedor</span>
            </div>
          </Link>
          <Link to="/gestionarproducto">
          <div
              className={`${
                props.opcionActiva == "producto"
                  ? styles.selectedOption
                  : styles.option
              }`}
            >
              <Package size="24" color="#ffffff" />
              <span className={styles.optionName}>Gestionar Producto</span>
            </div>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default MenuLateral;
