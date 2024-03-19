import React, { useState, useEffect } from "react";
import styles from "../styles/RegistrarUsuario.module.css";
import MenuLateral from "../components/MenuLateral";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Package, Shop, User } from "iconoir-react";

const URI = "http://localhost:8000/proveedor/";

const ModificarDatosProveedor = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [sitioweb, setSitioweb] = useState("");

  const { id } = useParams();

  //procedimiento para actualizar
  const update = async (e) => {
    e.preventDefault();
    await axios.put(URI + id, {
      nombre: nombre,
      correo: correo,
      telefono: telefono,
      direccion: direccion,
      sitioweb: sitioweb,
    });

    alert("Datos actualizados correctamente");

    handleClear();
  };

  useEffect(() => {
    getProveedorById();
  }, []);

  const getProveedorById = async () => {
    const res = await axios.get(URI + id);
    setNombre(res.data.nombre);
    setCorreo(res.data.correo);
    setTelefono(res.data.telefono);
    setDireccion(res.data.direccion);
    setSitioweb(res.data.sitioweb);
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
      <MenuLateral opcionActiva="proveedor" />
      <div className={styles.rightSection}>
        <div className={styles.topSection}>
          <h2 className={styles.title}>MODIFICAR DATOS DE PROVEEDOR</h2>
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.proveedorData}>
            <h2 className={styles.title}>DATOS DE PROVEEDOR</h2>
            <div className={styles.form}>
              <form onSubmit={update} className={styles.formularioMain}>
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
          <Link to="/modificarproveedor">
            <button type="submit" className={styles.backButton}>
              Volver
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ModificarDatosProveedor;
