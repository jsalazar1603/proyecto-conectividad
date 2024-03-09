import { useState, useEffect } from "react";
import styles from "../styles/ModificarUsuario.module.css";
import { Package, Search, Shop, User } from "iconoir-react";
import { Link } from "react-router-dom";
import axios from "axios";

const URI = "http://localhost:8000/users/";

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
        <div key={user.id}>
          <div className={styles.userData1}>
            <span className={styles.name}>{user.nombre}</span>
            <span className={styles.lastname}>{user.apellidos}</span>
            <span className={styles.idTipoUser}>
              {tipoUsuarioMap[user.idTipoUser]}
            </span>
            {user.estado ? (
              <span className={styles.state}>Activo</span>
            ) : (
              <span className={styles.state}>Inhabilitado</span>
            )}
            <Link to={`/modificardatos/${user.id}`}>
              <button className={styles.btnModificar}>Modificar</button>
            </Link>
            {
              user.estado ? (
                <button
              onClick={() => deleteUser(user.id)}
              className={styles.btnDardebaja}
            >
              Dar de baja
            </button>
              ) : <button
              onClick={() => activateUser(user.id)}
              className={styles.btnDardebaja}
            >
              Activar cuenta
            </button>
            }
            {/* Agregar más campos si es necesario */}
          </div>
          <hr />
        </div>
      ));
    } else {
      return users.map((user) => (
        <div key={user.id}>
          <div className={styles.userData1}>
            <span className={styles.name}>{user.nombre}</span>
            <span className={styles.lastname}>{user.apellidos}</span>
            <span className={styles.idTipoUser}>
              {tipoUsuarioMap[user.idTipoUser]}
            </span>
            {user.estado ? (
              <span className={styles.state}>Activo</span>
            ) : (
              <span className={styles.state}>Inhabilitado</span>
            )}
            <Link to={`/modificardatos/${user.id}`}>
              <button className={styles.btnModificar}>Modificar</button>
            </Link>
            {
              user.estado ? (
                <button
              onClick={() => deleteUser(user.id)}
              className={styles.btnDardebaja}
            >
              Dar de baja
            </button>
              ) : <button
              onClick={() => activateUser(user.id)}
              className={styles.btnDardebaja}
            >
              Activar cuenta
            </button>
            }
            {/* Agregar más campos si es necesario */}
          </div>
          <hr />
        </div>
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
      <div className={styles.menuLateral}>
        <div className={styles.content}>
          <h1 className={styles.titlebrand}>Negocios e inversiones JR</h1>
          <section className={styles.optionsMenu}>
            <Link to="/gestionarUsuario">
              <div className={styles.selectedOption}>
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
              <div className={styles.option}>
                <Package size="24" color="#ffffff" />
                <span className={styles.optionName}>Gestionar Producto</span>
              </div>
            </Link>
          </section>
        </div>
      </div>
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
            <div className={styles.table}>
              <div className={styles.columns}>
                <span className={styles.name}>Nombre</span>
                <span className={styles.lastname}>Apellidos</span>
                <span className={styles.role}>Rol</span>
                <span className={styles.state}>Estado</span>
              </div>
              {renderUsers()}
              {showNoResults && ( // Utiliza el estado showNoResults para controlar la visibilidad del mensaje
                <div className={styles.noResults}>
                  No se encontraron coincidencias
                </div>
              )}
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
