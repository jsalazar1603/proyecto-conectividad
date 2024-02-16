import React from "react";
import styles from "../styles/IniciarSesion.module.css";
import Form from "../components/Form";

const IniciarSesion = () => {
  return (
    <>
      <section className={styles.mainContainer}>
        <section className={styles.leftSection}>
          <h1 className={styles.mainTitle}>Negocios e inversiones JR</h1>
          <p className={styles.description}>
            Sistema de Inventario para control de almacén
          </p>
        </section>
        <section className={styles.rightSection}>
          <Form />
        </section>
      </section>
    </>
  );
};

export default IniciarSesion;
