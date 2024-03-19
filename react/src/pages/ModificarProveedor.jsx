import { useState, useEffect } from "react";
import styles from "../styles/ModificarProveedor.module.css";
import { Package, Search, Shop, User } from "iconoir-react";
import { Link } from "react-router-dom";
import axios from "axios";
import MenuLateral from "../components/MenuLateral";

const URI = "http://localhost:8000/proveedor/";

const ModificarProveedor = () => {
  const [proveedores, setProveedores] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showAllProveedores, setShowAllProveedores] = useState(true);
  const [showNoResults, setShowNoResults] = useState(false);

  useEffect(() => {
    getProveedores();
  }, []);

  console.log(proveedores);

  const getProveedores = async () => {
    const res = await axios.get(URI);
    setProveedores(res.data);
  };

  const searchProveedores = () => {
    return proveedores.filter((proveedor) => {
      const fullName = `${proveedor.nombre}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    const results = searchProveedores();
    setSearchResults(results);
    setShowAllProveedores(false);
    setShowNoResults(results.length === 0);
  };
  const handleListAllClick = () => {
    setShowAllProveedores(true);
  };

  const renderProveedores = () => {
    if (searchQuery !== "" && !showAllProveedores) {
      return searchResults.map((proveedor) => (
        <div key={proveedor.id}>
          <div className={styles.proveedorData1}>
            <span className={styles.name}>{proveedor.nombre}</span>
            <span className={styles.usuario}>{proveedor.correo}</span>
            <span className={styles.telefono}>{proveedor.telefono}</span>
            <Link to={`/modificardatosproveedor/${proveedor.id}`}>
              <button className={styles.btnModificar}>Modificar</button>
            </Link>
            <button
              onClick={() => deleteProveedor(proveedor.id)}
              className={styles.btnDardebaja}
            >
              Dar de baja
            </button>
            {/* Agregar más campos si es necesario */}
          </div>
          <hr />
        </div>
      ));
    } else {
      return proveedores.map((proveedor) => (
        <div key={proveedor.id}>
          <div className={styles.proveedorData1}>
            <span className={styles.name}>{proveedor.nombre}</span>
            <span className={styles.usuario}>{proveedor.correo}</span>
            <span className={styles.cellphone}>{proveedor.telefono}</span>
            <Link to={`/modificardatosproveedor/${proveedor.id}`}>
              <button className={styles.btnModificar}>Modificar</button>
            </Link>
            <button
              onClick={() => deleteProveedor(proveedor.id)}
              className={styles.btnDardebaja}
            >
              Dar de baja
            </button>
            {/* Agregar más campos si es necesario */}
          </div>
          <hr />
        </div>
      ));
    }
  };
  const deleteProveedor = async (id) => {
    await axios.delete(`${URI}${id}`);
    getProveedores();
    alert("Proveedor eliminado");
  };
  return (
    <section className={styles.mainContainer}>
      <MenuLateral opcionActiva="proveedor" />
      <div className={styles.rightSection}>
        <div className={styles.topSection}>
          <h2 className={styles.title}>MODIFICAR PROVEEDOR</h2>
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.container}>
            <h2 className={styles.title}>Buscar Proveedor</h2>
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
              <button className={styles.btnListar} onClick={handleListAllClick}>
                Listar
              </button>
            </div>
            <div className={styles.table}>
              <div className={styles.columns}>
                <span className={styles.name}>Nombre</span>
                <span className={styles.correo}>Correo</span>
                <span className={styles.cellphone}>telefono</span>
              </div>
              {renderProveedores()}
              {showNoResults && ( // Utiliza el estado showNoResults para controlar la visibilidad del mensaje
                <div className={styles.noResults}>
                  No se encontraron coincidencias
                </div>
              )}
            </div>
          </div>
          <Link to="/gestionarproveedor">
            <button className={styles.btnBackbutton}>Volver</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ModificarProveedor;
