import { useState, useEffect } from "react";
import styles from "../styles/ModificarUsuario.module.css";
import { Search } from "iconoir-react";
import { Link } from "react-router-dom";
import axios from "axios";
import MenuLateral from "../components/MenuLateral";

const URI = "http://localhost:9000/users/";

const tipoUsuarioMap = {
  1: "Administrador",
  2: "Vendedor",
};

const ModificarUsuario = () => {
  const [users, setUser] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showAllUsers, setShowAllUsers] = useState(true);
  const [showNoResults, setShowNoResults] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  console.log(users);
  //procedimiento para mostrar todos los usuarios
  const getUsers = async () => {
    const res = await axios.get(URI);
    setUser(res.data);
  };

  const searchUsers = () => {
    return users.filter((user) => {
      const fullName = `${user.nombre} ${user.apellidos}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    const results = searchUsers();
    setSearchResults(results);
    setShowAllUsers(false);
    setShowNoResults(results.length === 0);
  };

  const handleListAllClick = () => {
    setShowAllUsers(true);
  };

  const renderUsers = () => {
    if (searchQuery !== "" && !showAllUsers) {
      return searchResults.map((user) => (
        <tr key={user.id} className={styles.dataRow}>
          <td className={styles.dataName}>{user.nombre}</td>
          <td className={styles.dataLastName}>{user.apellidos}</td>
          <td className={styles.dataRole}>{tipoUsuarioMap[user.idTipoUser]}</td>
          <td className={styles.dataState}>
            {user.estado ? "Activo" : "Inhabilitado"}
          </td>
          <td>
            <Link to={`/modificardatos/${user.id}`}>
              <button className={styles.btnModificar}>Modificar</button>
            </Link>
          </td>
          <td>
            {user.estado ? (
              <button
                onClick={() => deleteUser(user.id)}
                className={styles.btnDardebaja}
              >
                Dar de baja
              </button>
            ) : (
              <button
                onClick={() => activateUser(user.id)}
                className={styles.btnDardebaja}
              >
                Activar cuenta
              </button>
            )}
          </td>
          {/* Agregar más celdas si es necesario */}
        </tr>
      ));
    } else {
      return users.map((user) => (
        <tr key={user.id} className={styles.dataRow}>
          <td className={styles.dataName}>{user.nombre}</td>
          <td className={styles.dataLastName}>{user.apellidos}</td>
          <td className={styles.dataRole}>{tipoUsuarioMap[user.idTipoUser]}</td>
          <td className={styles.dataState}>
            {user.estado ? "Activo" : "Inhabilitado"}
          </td>
          <td>
            <Link to={`/modificardatos/${user.id}`}>
              <button className={styles.btnModificar}>Modificar</button>
            </Link>
          </td>
          <td>
            {user.estado ? (
              <button
                onClick={() => deleteUser(user.id)}
                className={styles.btnDardebaja}
              >
                Dar de baja
              </button>
            ) : (
              <button
                onClick={() => activateUser(user.id)}
                className={styles.btnDardebaja}
              >
                Activar cuenta
              </button>
            )}
          </td>
          {/* Agregar más celdas si es necesario */}
        </tr>
      ));
    }
  };

  //procedimiento para eliminar un usuario
  const deleteUser = async (id) => {
    await axios.delete(`${URI}${id}`);
    getUsers();
    alert("Usuario inhabilitado");
  };

  const activateUser = async (id) => {
    await axios.put(`${URI}activate/${id}`);
    getUsers();
    alert("Usuario habilitado");
  };

  return (
    <section className={styles.mainContainer}>
      <MenuLateral opcionActiva="usuario" />
      <div className={styles.rightSection}>
        <div className={styles.topSection}>
          <h2 className={styles.title}>MODIFICAR USUARIO</h2>
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.container}>
            <h2 className={styles.title}>Buscar Usuario</h2>
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
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Rol</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody className={styles.tableContent}>
                  {renderUsers()}
                  {showNoResults && (
                    <tr>
                      <td colSpan="4" className={styles.noResults}>
                        No se encontraron coincidencias
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <Link to="/gestionarusuario">
            <button className={styles.btnBackbutton}>Volver</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ModificarUsuario;
