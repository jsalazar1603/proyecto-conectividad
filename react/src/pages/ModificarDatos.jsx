import { useState, useEffect } from "react";
import styles from "../styles/RegistrarUsuario.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Package, Shop, User } from "iconoir-react";

const URI = "http://localhost:8000/users/";

const ModificarDatos = () => {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [dni, setDNI] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [edad, setEdad] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [sexo, setSexo] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [idTipoUser, setIdTipoUser] = useState("");

  const { id } = useParams();

  // Función para calcular la edad a partir de la fecha de nacimiento
  const calcularEdad = (fechaNacimientoString) => {
    const fechaNacimiento = new Date(fechaNacimientoString);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mesActual = hoy.getMonth();
    const mesNacimiento = fechaNacimiento.getMonth();
    const diaActual = hoy.getDate();
    const diaNacimiento = fechaNacimiento.getDate();

    // Restar un año si aún no se ha alcanzado el mes y el día de nacimiento
    if (
      mesActual < mesNacimiento ||
      (mesActual === mesNacimiento && diaActual < diaNacimiento)
    ) {
      edad--;
    }

    return edad;
  };

  // Función para actualizar los datos del usuario
  const update = async (e) => {
    e.preventDefault();

    const edadCalculada = calcularEdad(fechaNacimiento);

    const respuesta = await axios.put(URI + id, {
      nombre: nombre,
      apellidos: apellidos,
      dni: dni,
      fechaNacimiento: fechaNacimiento,
      edad: edadCalculada,
      correo: correo,
      telefono: telefono,
      sexo: sexo,
      usuario: usuario,
      contraseña: contraseña,
      idTipoUser: idTipoUser,
    });
console.log("edad:",edad)
    console.log("respuesta:", respuesta);

    if (respuesta.data.ok) {
      alert("Datos actualizados correctamente");

      // Limpiar los campos después de la actualización
      setNombre("");
      setApellidos("");
      setDNI("");
      setFechaNacimiento("");
      setEdad("");
      setCorreo("");
      setTelefono("");
      setSexo("");
      setUsuario("");
      setContraseña("");
      setIdTipoUser("");
    } else {
      alert("El DNI ya se encuentra registrado en el sistema");
    }
  };

  // Obtener los datos del usuario por su ID al cargar el componente
  useEffect(() => {
    getUserById();
  }, []);

  // Función para obtener los datos del usuario por su ID
  const getUserById = async () => {
    const res = await axios.get(URI + id);
    setNombre(res.data.nombre);
    setApellidos(res.data.apellidos);
    setDNI(res.data.dni);
    setFechaNacimiento(res.data.fechaNacimiento);
    setEdad(res.data.edad); // Asignar la edad obtenida del servidor
    setCorreo(res.data.correo);
    setTelefono(res.data.telefono);
    setSexo(res.data.sexo);
    setUsuario(res.data.usuario);
    setContraseña(res.data.contraseña);
    setIdTipoUser(res.data.idTipoUser);
  };

  const tipoUsuarioOptions = [
    { value: "", label: "Seleccionar" },
    { value: "1", label: "Administrador" },
    { value: "2", label: "Vendedor" },
  ];

  // Función para limpiar los campos del formulario
  const handleClear = () => {
    setNombre("");
    setApellidos("");
    setDNI("");
    setFechaNacimiento("");
    setEdad("");
    setCorreo("");
    setTelefono("");
    setSexo("");
    setUsuario("");
    setContraseña("");
    setIdTipoUser("");
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
          <h2 className={styles.title}>MODIFICAR DATOS DE USUARIO</h2>
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.userData}>
            <h2 className={styles.title}>DATOS DE USUARIO</h2>
            <div className={styles.form}>
              <form onSubmit={update} className={styles.formularioMain}>
                <div className={styles.formLeft}>
                  <div>
                    <label htmlFor="">Nombre</label>
                    <input
                      placeholder="Ingrese nombre"
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Apellidos</label>
                    <input
                      placeholder="Ingrese apellidos"
                      type="text"
                      value={apellidos}
                      onChange={(e) => setApellidos(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">DNI</label>
                    <input
                      placeholder="Ingrese DNI"
                      type="number"
                      value={dni}
                      onChange={(e) => setDNI(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Fecha de Nacimiento</label>
                    <input
                      placeholder="Ingrese fecha de nacimiento"
                      type="date"
                      value={fechaNacimiento}
                      onChange={(e) => {
                        setFechaNacimiento(e.target.value);
                        setEdad(calcularEdad(e.target.value)); // Actualizar la edad al cambiar la fecha de nacimiento
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Correo</label>
                    <input
                      placeholder="Ingrese correo"
                      type="text"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.formMiddle}>
                  <div>
                    <label htmlFor="">Celular</label>
                    <input
                      placeholder="Ingrese celular"
                      type="number"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                    />
                  </div>
                  <div className={styles.selectSexo}>
                    <label htmlFor="">Sexo</label>
                    <select
                      value={sexo}
                      onChange={(e) => setSexo(e.target.value)}
                    >
                      <option value="">Seleccionar</option>
                      <option value="masculino">Masculino</option>
                      <option value="femenino">Femenino</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="">Nombre de usuario</label>
                    <input
                      placeholder="Ingrese nombre de usuario"
                      type="text"
                      value={usuario}
                      onChange={(e) => setUsuario(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Contraseña</label>
                    <input
                      placeholder="Ingrese Contraseña"
                      type="password"
                      value={contraseña}
                      onChange={(e) => setContraseña(e.target.value)}
                    />
                  </div>
                  <div className={styles.selectRol}>
                    <label htmlFor="">Rol</label>
                    <select
                      value={idTipoUser}
                      onChange={(e) => setIdTipoUser(e.target.value)}
                    >
                      {tipoUsuarioOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={styles.buttons}>
                  <button type="submit" className={styles.btnAceptar}>
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
          <Link to="/modificarusuario">
            <button type="submit" className={styles.backButton}>
              Volver
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ModificarDatos;
