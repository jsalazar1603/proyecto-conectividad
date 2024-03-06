import React, { useState } from "react";
import styles from "../styles/RegistrarProveedor.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Package, Shop, User } from "iconoir-react";

const URI = "http://localhost:8000/proveedor/";

const RegistrarProveedor = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [sitioweb, setSitioweb] = useState("");
  const [direccion, setDireccion] = useState("");

  const store = async (e) => {
    e.preventDefault();

    await axios.post(URI, {
      nombre: nombre,
      correo: correo,
      telefono: telefono,
      sitioweb: sitioweb,
      direccion: direccion,
    });
    alert("Proveedor agregado");
    handleClear();
  };

  const handleClear = () => {
    setNombre("");
    setCorreo("");
    setTelefono("");
    setDireccion("");
    setSitioweb("");
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
          <h2 className={styles.title}>REGISTRAR NUEVO PROVEEDOR</h2>
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.proveedorData}>
            <h2 className={styles.title}>DATOS DE PROVEEDOR</h2>
            <div className={styles.form}>
              <form onSubmit={store} className={styles.formularioMain}>
                <div className={styles.formLeft}>
                  <div>
                    <label htmlFor="">Nombre</label>
                    <input
                      placeholder="Ingrese nombre"
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Correo</label>
                    <input
                      placeholder="Ingrese correo"
                      type="text"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Telefono</label>
                    <input
                      placeholder="Ingrese telefono"
                      type="number"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Dirección</label>
                    <input
                      placeholder="Ingrese dirección"
                      type="text"
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Sitio Web</label>
                    <input
                      placeholder="Ingrese sitio web"
                      type="text"
                      value={sitioweb}
                      onChange={(e) => setSitioweb(e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.buttons}>
                  <button type="submit" className={styles.btnAceptar}>
                    Aceptar
                  </button>
                  <button
                    onClick={handleClear}
                    type="button"
                    className={styles.btnLimpiar}
                  >
                    Limpiar
                  </button>
                </div>
              </form>
            </div>
          </div>
          <Link to="/gestionarproveedor">
            <button type="submit" className={styles.backButton}>
              Volver
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RegistrarProveedor;
