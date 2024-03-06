import { useState, useEffect } from "react";
import styles from "../styles/RegistrarUsuario.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Package, Shop, User } from "iconoir-react";

const URI = "http://localhost:8000/productos/";

const ModificarDatosProducto = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState("");
  const [precio, setPrecio] = useState("");
  const [estado, setEstado] = useState("");
  const [idProveedor, setIdProveedor] = useState("");

  const { id } = useParams();

  //procedimiento para actualizar
  const update = async (e) => {
    e.preventDefault();

    const respuesta = await axios.put(URI + id, {
      nombre: nombre,
      descripcion: descripcion,
      stock: stock,
      precio: precio,
      estado: estado,
      idProveedor: idProveedor,
    });

    console.log("respuesta:", respuesta);

    if (respuesta.data.ok) {
      alert("Datos actualizados correctamente");

      setNombre("");
      setDescripcion("");
      setStock("");
      setPrecio("");
      setEstado("");
      setIdProveedor("");

    } 
    // else {
    //   alert("El dni ya se encuentra registrado en el sistema");
    // }
  };

  useEffect(() => {
    getProductoById();
  }, []);

  const getProductoById = async () => {
    const res = await axios.get(URI + id);
    setNombre(res.data.nombre);
    setDescripcion(res.data.descripcion);
    setStock(res.data.stock);
    setPrecio(res.data.precio);
    setEstado(res.data.estado);
    setIdProveedor(res.data.idProveedor);
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
            <div className={styles.selectedOption}>
              <Package size="24" color="#ffffff" />
              <span className={styles.optionName}>Gestionar Producto</span>
            </div>
          </section>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.topSection}>
          <h2 className={styles.title}>MODIFICAR DATOS DE PRODUCTO</h2>
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.userData}>
            <h2 className={styles.title}>DATOS DE PRODUCTO</h2>
            <div className={styles.form}>
              <form onSubmit={update} className={styles.formularioMain}>
                <div className={styles.formLeft}>
                  <div className={styles.campo}>
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
                    <label htmlFor="">Stock</label>
                    <input
                      placeholder="Ingrese stock"
                      type="number"
                      value={stock}
                      onChange={(e) => setPrecio(e.target.value)}
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
                    <label htmlFor="">Proveedor</label>
                    <select
                    //   value={idTipoUser}
                    //   onChange={(e) => setIdTipoUser(e.target.value)}
                    >
                      {/* {tipoUsuarioOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))} */}
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
          <Link to="/modificarproducto">
            <button type="submit" className={styles.backButton}>
              Volver
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ModificarDatosProducto;
