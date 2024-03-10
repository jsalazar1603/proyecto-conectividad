import { useState, useEffect } from "react";
import styles from "../styles/ModificarUsuario.module.css";
import { Package, Search, Shop, User } from "iconoir-react";
import { Link } from "react-router-dom";
import axios from "axios";

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
            <span className={styles.lastname}>{producto.stock}</span>
            <span className={styles.lastname}>{producto.precio}</span>
           <span className={styles.lastname}>{producto.estado}</span>
           <span className={styles.lastname}>{producto.idProveedor}</span>
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
            <span className={styles.lastname}>{producto.stock}</span>
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
    await axios.delete(`${URI}${id}`);
    getProductos();
    alert("Producto Inhabilitado");
  };

  const activateProducto = async (id) => {
    await axios.put(`${URI}activate/${id}`);
    getProductos();
    alert("Producto Habilitado");
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
