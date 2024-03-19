import { useState, useEffect } from "react";
import styles from "../styles/ModificarUsuario.module.css";
import { Package, Search, Shop, User } from "iconoir-react";
import { Link } from "react-router-dom";
import axios from "axios";
import MenuLateral from "../components/MenuLateral";

const URI = "http://localhost:8000/producto/";

const ModificarProducto = () => {
  const [productos, setProductos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showAllProductos, setShowAllProductos] = useState(true);
  const [showNoResults, setShowNoResults] = useState(false);

  useEffect(() => {
    getProductos();
  }, []);

  console.log(productos);
  //procedimiento para mostrar todos los productos
  const getProductos = async () => {
    const res = await axios.get(URI);
    setProductos(res.data);
  };

  const searchProductos = () => {
    return productos.filter((producto) => {
      const fullName = `${producto.nombre}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    const results = searchProductos();
    setSearchResults(results);
    setShowAllProductos(false);
    setShowNoResults(results.length === 0);
  };

  const handleListAllClick = () => {
    setShowAllProductos(true);
  };

  const renderProductos = () => {
    if (searchQuery !== "" && !showAllProductos) {
      return searchResults.map((producto) => (
        <div key={producto.id}>
          <div className={styles.userData1}>
            <span className={styles.name}>{producto.nombre}</span>
            {producto.stock <= 30 ? (
              <span className={styles.stockBajo}>{producto.stock}(Bajo)</span>
            ) : (
              <span className={styles.stockOptimo}>
                {producto.stock}(Óptimo)
              </span>
            )}
            <span className={styles.lastname}>{producto.precio}</span>
            {producto.estado ? (
              <span className={styles.state}>Activo</span>
            ) : (
              <span className={styles.state}>Inhabilitado</span>
            )}
            {producto.idProveedor == null ? (
              <span className={styles.state}>Sin especificar</span>
            ) : (
              <span className={styles.state}>{producto.proveedor.nombre}</span>
            )}
            <Link to={`/modificardatosproducto/${producto.id}`}>
              <button className={styles.btnModificar}>Modificar</button>
            </Link>
            {producto.estado ? (
              <button
                onClick={() => deleteProducto(producto.id)}
                className={styles.btnDardebaja}
              >
                Inhabilitar
              </button>
            ) : (
              <button
                onClick={() => activateProducto(producto.id)}
                className={styles.btnDardebaja}
              >
                Habilitar
              </button>
            )}
          </div>
          <hr />
        </div>
      ));
    } else {
      return productos.map((producto) => (
        <div key={producto.id}>
          <div className={styles.userData1}>
            <span className={styles.name}>{producto.nombre}</span>
            {producto.stock <= 30 ? (
              <span className={styles.stockBajo}>{producto.stock}(Bajo)</span>
            ) : (
              <span className={styles.stockOptimo}>
                {producto.stock}(Óptimo)
              </span>
            )}
            <span className={styles.lastname}>{producto.precio}</span>
            {producto.estado ? (
              <span className={styles.state}>Activo</span>
            ) : (
              <span className={styles.state}>Inhabilitado</span>
            )}
            {producto.idProveedor == null ? (
              <span className={styles.state}>Sin especificar</span>
            ) : (
              <span className={styles.state}>{producto.proveedor.nombre}</span>
            )}
            <Link to={`/modificardatosproducto/${producto.id}`}>
              <button className={styles.btnModificar}>Modificar</button>
            </Link>
            {producto.estado ? (
              <button
                onClick={() => deleteProducto(producto.id)}
                className={styles.btnDardebaja}
              >
                Inhabilitar
              </button>
            ) : (
              <button
                onClick={() => activateProducto(producto.id)}
                className={styles.btnDardebaja}
              >
                Habilitar
              </button>
            )}
          </div>
          <hr />
        </div>
      ));
    }
  };

  //procedimiento para inhabilitar un producto
  const deleteProducto = async (id) => {
    await axios.put(`${URI}deactivate/${id}`);
    // Actualizar el estado de los productos después de eliminar/inhabilitar un producto
    await getProductos();
    // Actualizar la lista de productos antes de actualizar los resultados de búsqueda
    setSearchResults(searchProductos());
    alert("Producto Inhabilitado");
  };

  const activateProducto = async (id) => {
    await axios.put(`${URI}activate/${id}`);
    // Actualizar el estado de los productos después de activar un producto
    await getProductos();
    // Actualizar la lista de productos antes de actualizar los resultados de búsqueda
    setSearchResults(searchProductos());
    alert("Producto Habilitado");
  };
  return (
    <section className={styles.mainContainer}>
      <MenuLateral opcionActiva="producto" />
      <div className={styles.rightSection}>
        <div className={styles.topSection}>
          <h2 className={styles.title}>MODIFICAR PRODUCTO</h2>
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.container}>
            <h2 className={styles.title}>Buscar producto</h2>
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
            <div className={styles.table}>
              <div className={styles.columns}>
                <span className={styles.name}>Nombre</span>
                <span className={styles.lastname}>Stock</span>
                <span className={styles.role}>Precio</span>
                <span className={styles.state}>Estado</span>
                <span className={styles.state}>Proveedor</span>
              </div>
              {renderProductos()}
              {showNoResults && ( // Utiliza el estado showNoResults para controlar la visibilidad del mensaje
                <div className={styles.noResults}>
                  No se encontraron coincidencias
                </div>
              )}
            </div>
          </div>
          <Link to="/gestionarproducto">
            <button className={styles.btnBackbutton}>Volver</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ModificarProducto;
