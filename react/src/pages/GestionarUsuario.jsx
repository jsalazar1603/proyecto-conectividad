import { useState, useEffect } from "react";
import styles from "../styles/GestionarUsuario.module.css";
import { Package, Shop, User, UserBag, UserPlus } from "iconoir-react";
import { Link } from "react-router-dom";
import axios from "axios";
import MenuLateral from "../components/MenuLateral";

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
      <MenuLateral opcionActiva="usuario" />
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
              <table className={styles.productosTable}>
                <thead>
                  <tr>
                    <th className={styles.proveedorName}>Nombre</th>
                    <th className={styles.proveedorEmail}>Rol</th>
                    <th className={styles.proveedorEmail}>Número</th>
                    <th className={styles.proveedorWeb}>Edad</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((usuario) => (
                    <tr key={usuario.id}>
                      <td className={styles.productoNombre}>
                        {usuario.nombre}
                        {usuario.apellidos}
                      </td>
                      <td className={`${styles.marca} ${styles.centered}`}>
                        {tipoUsuarioMap[usuario.idTipoUser]}
                      </td>
                      <td className={styles.productoModelo}>
                        {usuario.telefono}
                      </td>
                      <td className={`${styles.stock} ${styles.centered}`}>
                        {usuario.edad}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
