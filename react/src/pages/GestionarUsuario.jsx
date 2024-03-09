import { useState, useEffect } from "react";
import styles from "../styles/GestionarUsuario.module.css";
import { Package, Shop, User, UserBag, UserPlus } from "iconoir-react";
import { Link } from "react-router-dom";
import axios from "axios";

const URI = "http://localhost:8000/users/";

const tipoUsuarioMap = {
  1: "Administrador",
  2: "Vendedor",
};
const GestionarUsuario = () => {
  const [users, setUser] = useState([]);
  const [conteoHombres, setConteoHombres] = useState(0);
  const [conteoMujeres, setConteoMujeres] = useState(0);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    // Calcula los conteos de hombres y mujeres cada vez que se actualice la lista de usuarios
    calcularConteos();
  }, [users]);

  console.log(users);
  //procedimiento para mostrar todos los usuarios
  const getUsers = async () => {
    const res = await axios.get(URI);
    setUser(res.data);
  };

  //procedimiento para eliminar un usuario
  const calcularConteos = () => {
    const hombres = users.filter((user) => user.sexo === "masculino").length;
    const mujeres = users.filter((user) => user.sexo === "femenino").length;
    setConteoHombres(hombres);
    setConteoMujeres(mujeres);
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
          <h2 className={styles.title}>GESTIONAR USUARIO</h2>
        </div>
        <div className={styles.options}>
          <Link to="/registrarusuario">
            <div className={styles.option1}>
              <span className={styles.optionText}>Registrar nuevo usuario</span>
              <UserPlus color="#ffffff" style={{ fontSize: "35px" }} />
            </div>
          </Link>
          <Link to="/modificarusuario">
            <div className={styles.option2}>
              <span className={styles.optionText}>Modificar usuario</span>
              <UserBag color="#ffffff" style={{ fontSize: "35px" }} />
            </div>
          </Link>
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.usersInfo}>
            <div className={styles.usersList}>
              <h2 className={styles.title}>Usuarios registrados</h2>
              <div className={styles.usersTable}>
                {users.map((user) => (
                  <div key={user.id}>
                    <div className={styles.userData1}>
                      <span className={styles.userName}>
                        {user.nombre} {user.apellidos}
                      </span>
                      <div className={styles.roleName}>
                        <span className={styles.text}>
                          {tipoUsuarioMap[user.idTipoUser]}
                        </span>
                      </div>
                      <span className={styles.telephone}>{user.telefono}</span>
                      <span className={styles.age}>{user.edad} años</span>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.stadistic}>
              <div className={styles.usersNumber}>
                <h2 className={styles.title}>Número de trabajadores</h2>
                <div className={styles.contentNumber}>
                  <div className={styles.male}>
                    <div className={styles.color}></div>
                    <span className={styles.text}>Hombres</span>
                    <span className={styles.number}>{conteoHombres}</span>
                  </div>
                  <div className={styles.female}>
                    <div className={styles.color}></div>
                    <span className={styles.text}>Mujeres</span>
                    <span className={styles.number}>{conteoMujeres}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GestionarUsuario;
