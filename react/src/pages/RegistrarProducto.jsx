import { useState } from "react";
import styles from "../styles/RegistrarUsuario.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Package, Shop, User } from "iconoir-react";

const URI = "http://localhost:8000/productos/";

const RegistrarProducto = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState("");
  const [precio, setPrecio] = useState("");
  const [estado, setEstado] = useState("");
  const [idProveedor, setIdProveedor] = useState("");

  const tipoEstado = [
    { value: "", label: "Seleccionar" },
    { value: "1", label: "Solicitado" },
    { value: "2", label: "Enviado"},
    { value: "3", label: "Entregado"},
  ];
  

  const store = async (e) => {
    e.preventDefault();

    const respuesta = await axios.post(URI, {
      nombre: nombre,
      descripcion: descripcion,
      stock: stock,
      precio: precio,
      estado: estado,
      idProveedor: idProveedor,
    });

    console.log("respuesta: ", respuesta);

    if (respuesta.data.ok) {
      alert("Producto registrado");
      handleClear();
    }
  };

  const handleClear = () => {
    setNombre("");
    setDescripcion("");
    setStock("");
    setPrecio("");
    setEstado("");
    setIdProveedor("");
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
          <h2 className={styles.title}>REGISTRAR NUEVO PRODUCTO</h2>
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.userData}>
            <h2 className={styles.title}>DATOS DE PRODUCTO</h2>
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
                    <label htmlFor="">Descripcion</label>
                    <input
                      placeholder="Ingrese descripcion"
                      type="text"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Stock(unidades)</label>
                    <input
                      placeholder="Ingrese Stock"
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Precio</label>
                    <input
                      placeholder="Ingrese precio"
                      type="number"
                      value={precio}
                      onChange={(e) => setPrecio(e.target.value)}
                    />
                  </div>
                  <div>
                  <label htmlFor="">Estado</label>
                    <select
                      value={estado}
                      onChange={(e) => setEstado(e.target.value)}
                    >
                      {tipoEstado.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={styles.formMiddle}>
                  <div>
                    <label htmlFor="">Proveedor</label>
                    <select
                      value={idProveedor}
                      onChange={(e) => setIdProveedor(e.target.value)}
                    >
                      {tipoEstado.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
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
          <Link to="/gestionarproducto">
            <button type="submit" className={styles.backButton}>
              Volver
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RegistrarProducto;
