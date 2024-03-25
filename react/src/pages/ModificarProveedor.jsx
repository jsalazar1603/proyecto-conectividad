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
        <tr key={proveedor.id} className={styles.dataRow}>
          <td className={styles.dataName}>{proveedor.nombre}</td>
          <td className={styles.dataEmail}>{proveedor.correo}</td>
          <td className={styles.dataTelephone}>{proveedor.telefono}</td>
          <td>
            <Link to={`/modificardatosproveedor/${proveedor.id}`}>
              <button className={styles.btnModificar}>Modificar</button>
            </Link>
          </td>
          <td>
            <button
              onClick={() => deleteProveedor(proveedor.id)}
              className={styles.btnDardebaja}
            >
              Dar de baja
            </button>
          </td>
          {/* Agregar más celdas si es necesario */}
        </tr>
      ));
    } else {
      return proveedores.map((proveedor) => (
        <tr key={proveedor.id} className={styles.dataRow}>
          <td className={styles.dataName}>{proveedor.nombre}</td>
          <td className={styles.dataEmail}>{proveedor.correo}</td>
          <td className={styles.dataTelephone}>{proveedor.telefono}</td>
          <td>
            <Link to={`/modificardatosproveedor/${proveedor.id}`}>
              <button className={styles.btnModificar}>Modificar</button>
            </Link>
          </td>
          <td>
            <button
              onClick={() => deleteProveedor(proveedor.id)}
              className={styles.btnDardebaja}
            >
              Dar de baja
            </button>
          </td>
          {/* Agregar más celdas si es necesario */}
        </tr>
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
            <div className={styles.listContainer}>
              <table className={styles.table}>
                <thead className={styles.topSectionTable}>
                  <tr className={styles.columnsName}>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                  </tr>
                </thead>
                <tbody className={styles.tableContent}>
                  {renderProveedores()}
                  {showNoResults && (
                    <tr className={styles.columnsName}>
                      <td colSpan="3" className={styles.noResults}>
                        No se encontraron coincidencias
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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
