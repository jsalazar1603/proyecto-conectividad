import { useEffect, useState } from "react";
import styles from "../styles/RegistrarUsuario.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import MenuLateral from "../components/MenuLateral";

const URI = "http://localhost:8000/producto/";
const URI2 = "http://localhost:8000/proveedor/";

const RegistrarPedido = () => {
  const [nombre, setNombre] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState("");
  const [precio, setPrecio] = useState("");
  const [estado, setEstado] = useState("");
  const [idProveedor, setIdProveedor] = useState("1");
  const [listaPedidos, setListaPedidos] = useState([]);

  // const tipoEstado = [
  //   { value: "0", label: "Inhabilitado" },
  //   { value: "1", label: "Habilitado" },
  // ];
  useEffect(() => {
    getPedidos();
  }, []);

  const getPedidos = async () => {
    const res = await axios.get(URI2);
    setListaPedidos(res.data);
  };
  const store = async (e) => {
    e.preventDefault();

    const respuesta = await axios.post(URI, {
      nombre: nombre,
      marca: marca,
      modelo: modelo,
      descripcion: descripcion,
      stock: stock,
      precio: precio,
      estado: "1",
      idProveedor: idProveedor,
    });

    console.log("respuesta: ", respuesta);

    alert("Pedido registrado");
    handleClear();

    console.log(idProveedor);
  };

  const handleClear = () => {
    setNombre("");
    setMarca("");
    setModelo("");
    setDescripcion("");
    setStock("");
    setPrecio("");
    setEstado("");
    setIdProveedor("");
  };
  return (
    <section className={styles.mainContainer}>
      <MenuLateral opcionActiva="pedido" />
      <div className={styles.rightSection}>
        <div className={styles.topSection}>
          <h2 className={styles.title}>REGISTRAR NUEVO PEDIDO</h2>
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.userData}>
            <h2 className={styles.title}>DATOS DE PEDIDO</h2>
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
                    <label htmlFor="">Marca</label>
                    <input
                      placeholder="Ingrese Marca"
                      type="text"
                      value={marca}
                      onChange={(e) => setMarca(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Modelo</label>
                    <input
                      placeholder="Ingrese Modelo"
                      type="text"
                      value={modelo}
                      onChange={(e) => setModelo(e.target.value)}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <label style={{ marginLeft: "-170px" }} htmlFor="">
                      Descripcion
                    </label>
                    <textarea
                      placeholder="Ingrese descripcion"
                      type="text"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      style={{
                        width: "270px",
                        height: "150px",
                        resize: "none",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                </div>
                <div className={styles.formMiddle}>
                  <div>
                    <label htmlFor="">Stock (unidades)</label>
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
                    <label htmlFor="">Proveedor</label>
                    <select
                      value={idProveedor}
                      onChange={(e) => setIdProveedor(e.target.value)}
                    >
                      <option value="1">Sin especificar</option>
                      {listaPedidos.map((pedido) => (
                        <option key={pedido.value} value={pedido.id}>
                          {pedido.nombre}
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
          <Link to="/gestionarpedido">
            <button type="submit" className={styles.backButton}>
              Volver
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RegistrarPedido;