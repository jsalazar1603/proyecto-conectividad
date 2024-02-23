import React from "react";
import styles from "../styles/MenuLateral.module.css";
import { User } from "iconoir-react";

const MenuLateral = () => {
  return (
    <div className={styles.content}>
      <h1 className={styles.title}>Negocios e inversiones JR</h1>
      <section className={styles.options}>
        <div className={styles.selectedOption}>
          <User size="24" color="#ffffff" />
          <span className={styles.optionName}>Gestionar Usuario</span>
        </div>
        <div>
          <User size="24" color="#ffffff" />
          <span className={styles.optionName}>Gestionar Proveedor</span>
        </div>
        <div>
          <User size="24" color="#ffffff" />
          <span className={styles.optionName}>Gestionar Producto</span>
        </div>
      </section>
    </div>
  );
};

export default MenuLateral;
