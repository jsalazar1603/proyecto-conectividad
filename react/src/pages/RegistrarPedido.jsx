import { useEffect, useState } from "react";
import styles from "../styles/RegistrarPedido.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import MenuLateral from "../components/MenuLateral";

const URI = "http://localhost:9000/pedido/";
const URI2 = "http://localhost:9000/proveedor/";

const RegistrarPedido = () => {
  const [fecha, setFecha] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [estado, setEstado] = useState("");
  const [total, setTotal] = useState("");
  const [idProveedor, setIdProveedor] = useState("1");
  const [listaPedidos, setListaPedidos] = useState([]);
  const [producto, setProducto] = useState();
  const [stock, setStock] = useState();
  const [precio, setPrecio] = useState();
  const [productosLista, setProductosLista] = useState([]);
  const [totalProductos, setTotalProductos] = useState(0);
  const [detallesPedido, setDetallesPedido] = useState([]);

  const estadoPedido = [
    { value: "", label: "Seleccionar" },
    { value: "1", label: "Solicitado" },
    { value: "2", label: "En proceso" },
    { value: "3", label: "Recibido" },
  ];

  // const tipoEstado = [
  //   { value: "0", label: "Inhabilitado" },
  //   { value: "1", label: "Habilitado" },
  // ];
  useEffect(() => {
    getPedidos();
  }, []);

  useEffect(() => {
    calcularTotalProductos(); // Calcula la suma de los totales cada vez que la lista de productos cambie
  }, [productosLista]);

  const getPedidos = async () => {
    const res = await axios.get(URI2);
    setListaPedidos(res.data);
  };
  const handleAddDetallePedido = () => {
    const nuevoDetallePedido = {
      descripcion: producto,
      cantidad: stock,
      precio: precio,
      total: (stock * precio).toFixed(2),
    };
    setDetallesPedido([...detallesPedido, nuevoDetallePedido]);
    setProducto("");
    setStock(0);
    setPrecio(0);
    const nuevaLista = [...productosLista, nuevoDetallePedido]; // Agregando el nuevo producto a la lista existente
    setProductosLista(nuevaLista);
    handleClearList();
  };

  const handleGuardarPedido = async () => {
    const pedidoPrincipal = {
      fecha: fecha,
      estado: estadoPedido[1].label,
      idProveedor: idProveedor,
      detallespedidos: detallesPedido,
    };

    try {
      const response = await axios.post(URI, pedidoPrincipal);
      console.log(response.data);
      // Restablecer estado después de la creación exitosa
      setFecha("");
      setEstado("");
      setIdProveedor("");
      setDetallesPedido([]);
      setProductosLista([]);
      setTotalProductos(0);
    } catch (error) {
      console.error(error);
    }
  };
  const handleClear = () => {
    setFecha("");
    setEstado("");
    setTotal("");
    setIdProveedor("");
  };
  const handleClearList = () => {
    setProducto("");
    setStock("");
    setPrecio("");
  };
  const calcularTotalProductos = () => {
    let sumaTotal = 0;
    productosLista.forEach((producto) => {
      sumaTotal += parseFloat(producto.total);
    });
    setTotalProductos(sumaTotal.toFixed(2));
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
              <form onSubmit={(e) => e.preventDefault()} className={styles.formularioMain}>
                <div className={styles.formLeft}>
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
                  <div>
                    <label htmlFor="">Nombre</label>
                    <input
                      placeholder="Ingrese nombre"
                      type="text"
                      value={producto}
                      onChange={(e) => setProducto(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Cantidad (unidades)</label>
                    <input
                      placeholder="Ingrese Cantidad"
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
                    <button onClick={handleAddDetallePedido}>Añadir</button>
                    <button onClick={handleClearList}>Limpiar</button>
                  </div>
                </div>
                <div className={styles.formMiddle}>
                  <h2 className={styles.detailTitle}>Detalles de pedido</h2>
                  <table className={styles.listDetailTable}>
                    <thead className={styles.topSectionTable}>
                      <tr className={styles.columnsName}>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productosLista.map((producto, index) => (
                        <tr key={index}>
                          <td className={styles.productName}>
                            {producto.descripcion}
                          </td>
                          <td className={styles.productStock}>
                            {producto.cantidad}
                          </td>
                          <td className={styles.productTotal}>
                            {producto.total}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className={styles.totalCounter}>
                    <span>Total: {totalProductos}</span>
                  </div>
                </div>
                <div className={styles.buttons}>
                  <button onClick={handleGuardarPedido} className={styles.btnAceptar}>
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
