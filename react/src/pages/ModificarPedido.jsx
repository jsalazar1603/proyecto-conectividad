import { useState, useEffect } from "react";
import styles from "../styles/ModificarProducto.module.css";
import {Search} from "iconoir-react";
import { Link } from "react-router-dom";
import axios from "axios";
import MenuLateral from "../components/MenuLateral";

const URI = "http://localhost:8000/producto/";

const ModificarPedido = () => {
  const [pedidos, setPedidos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showAllPedidos, setShowAllPedidos] = useState(true);
  const [showNoResults, setShowNoResults] = useState(false);

  useEffect(() => {
    getPedidos();
  }, []);

  console.log(pedidos);
  //procedimiento para mostrar todos los productos
  const getPedidos = async () => {
    const res = await axios.get(URI);
    setPedidos(res.data);
  };

  const searchPedidos = () => {
    return pedidos.filter((pedido) => {
      const fullName = `${pedido.nombre}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    const results = searchPedidos();
    setSearchResults(results);
    setShowAllPedidos(false);
    setShowNoResults(results.length === 0);
  };

  const handleListAllClick = () => {
    setShowAllPedidos(true);
  };

  const renderPedidos = () => {
    if (searchQuery !== "" && !showAllPedidos) {
      return searchResults.map((pedido) => (
        <tr key={pedido.id} className={styles.dataRow}>
          <td className={styles.dataName}>{pedido.nombre}</td>
          <td className={styles.dataStock}>
            {pedido.stock <= 30 ? (
              <span className={styles.stockBajo}>{pedido.stock}(Bajo)</span>
            ) : (
              <span className={styles.stockOptimo}>
                {pedido.stock}(Óptimo)
              </span>
            )}
          </td>
          <td className={styles.dataState}>{pedido.estado ? "Activo" : "Inhabilitado"}</td>
          <td className={styles.dataIdProveedor}>
            {pedido.idProveedor == null
              ? "Sin especificar"
              : pedido.proveedor.nombre}
          </td>
          <td>
            <Link to={`/modificardatospedido/${pedido.id}`}>
              <button className={styles.btnModificar}>Modificar</button>
            </Link>
          </td>
          <td>
            {pedido.estado ? (
              <button
                onClick={() => deletePedido(pedido.id)}
                className={styles.btnDardebaja}
              >
                Inhabilitar
              </button>
            ) : (
              <button
                onClick={() => activatePedido(pedido.id)}
                className={styles.btnDardebaja}
              >
                Habilitar
              </button>
            )}
          </td>
        </tr>
      ));
    } else {
      return pedidos.map((pedido) => (
        <tr key={pedido.id} className={styles.dataRow}>
          <td className={styles.dataName}>{pedido.nombre}</td>
          <td className={styles.dataStock}>
            {pedido.stock <= 30 ? (
              <span className={styles.stockBajo}>{pedido.stock}(Bajo)</span>
            ) : (
              <span className={styles.stockOptimo}>
                {pedido.stock}(Óptimo)
              </span>
            )}
          </td>
          <td className={styles.dataState}>{pedido.estado ? "Activo" : "Inhabilitado"}</td>
          <td className={styles.dataIdProveedor}>
            {pedido.idProveedor == null
              ? "Sin especificar"
              : pedido.proveedor.nombre}
          </td>
          <td>
            <Link to={`/modificardatospedido/${pedido.id}`}>
              <button className={styles.btnModificar}>Modificar</button>
            </Link>
          </td>
          <td>
            {pedido.estado ? (
              <button
                onClick={() => deletePedido(pedido.id)}
                className={styles.btnDardebaja}
              >
                Inhabilitar
              </button>
            ) : (
              <button
                onClick={() => activatePedido(pedido.id)}
                className={styles.btnDardebaja}
              >
                Habilitar
              </button>
            )}
          </td>
        </tr>
      ));
    }
  };

  //procedimiento para inhabilitar un producto
  const deletePedido = async (id) => {
    await axios.put(`${URI}deactivate/${id}`);
    // Actualizar el estado de los productos después de eliminar/inhabilitar un producto
    await getPedidos();
    // Actualizar la lista de productos antes de actualizar los resultados de búsqueda
    setSearchResults(searchPedidos());
    alert("Pedido Inhabilitado");
  };

  const activatePedido = async (id) => {
    await axios.put(`${URI}activate/${id}`);
    // Actualizar el estado de los productos después de activar un producto
    await getPedidos();
    // Actualizar la lista de productos antes de actualizar los resultados de búsqueda
    setSearchResults(searchPedidos());
    alert("Pedido Habilitado");
  };
  return (
    <section className={styles.mainContainer}>
      <MenuLateral opcionActiva="pedido" />
      <div className={styles.rightSection}>
        <div className={styles.topSection}>
          <h2 className={styles.title}>MODIFICAR PEDIDO</h2>
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.container}>
            <h2 className={styles.title}>Buscar pedido</h2>
            <div className={styles.search}>
              <div className={styles.searchBar}>
                <input
                  value={searchQuery}
                  onChange={handleSearchChange}
                  type="text"
                  placeholder="Ingrese nombre"
                />
                <Search size="24" color="#000000" />
              </div>
              <button onClick={handleSearchClick} className={styles.btnBuscar}>
                Buscar
              </button>
              <button className={styles.btnBuscar} onClick={handleListAllClick}>
                Listar
              </button>
            </div>
            <div className={styles.listContainer}>
              <table className={styles.table}>
                <thead className={styles.topSectionTable}>
                  <tr className={styles.columnsName}>
                    <th className={styles.name}>Nombre</th>
                    <th className={styles.lastname}>Stock</th>
                    <th className={styles.state}>Estado</th>
                    <th className={styles.state}>Proveedor</th>
                  </tr>
                </thead>
                <tbody className={styles.tableContent}>
                  {renderPedidos()}
                  {showNoResults && (
                    <tr className={styles.columnsName}>
                      <td colSpan="5" className={styles.noResults}>
                        No se encontraron coincidencias
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <Link to="/gestionarpedido">
            <button className={styles.btnBackbutton}>Volver</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ModificarPedido;
