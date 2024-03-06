import React, { useState } from "react";
import styles from "../styles/RegistrarUsuario.module.css";
import MenuLateral from "../components/MenuLateral";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Package, Shop, User } from "iconoir-react";

const URI = "http://localhost:8000/users/";

const RegistrarUsuario = () => {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [dni, setDNI] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [sexo, setSexo] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [idTipoUser, setIdTipoUser] = useState("");

  const tipoUsuarioOptions = [
    { value: "", label: "Seleccionar" },
    { value: "1", label: "Administrador" },
    { value: "2", label: "Vendedor" },
  ];

  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    return edad;
  };
  const store = async (e) => {
    e.preventDefault();

    const defaultPassword = dni;

    // Autogenerar el nombre de usuario concatenando la primera letra del nombre
    // con el primer apellido
    const firstLetterOfName = nombre.charAt(0).toLowerCase();
    const username = `${firstLetterOfName}${apellidos
      .split(" ")[0]
      .toLowerCase()}`;

    const respuesta = await axios.post(URI, {
      nombre: nombre,
      apellidos: apellidos,
      dni: dni,
      edad: calcularEdad(fechaNacimiento),
      correo: correo,
      telefono: telefono,
      sexo: sexo,
      usuario: username,
      contraseña: defaultPassword,
      idTipoUser: idTipoUser,
    });

    console.log("respuesta: ", respuesta);

    if (respuesta.data.ok) {
      alert("Usuario agregado");
      handleClear();

      alert(
        `Usuario creado con Exito: \n  Usuario: ${username} \n Contraseña: ${defaultPassword}`
      );
    } else {
      alert("Ya existe un usuario con este dni");
    }
  };

  const handleClear = () => {
    setNombre("");
    setApellidos("");
    setDNI("");
    setFechaNacimiento("");
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
          <h2 className={styles.title}>REGISTRAR NUEVO USUARIO</h2>
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.userData}>
            <h2 className={styles.title}>DATOS DE USUARIO</h2>
            <div className={styles.form}>
              <form onSubmit={store} className={styles.formularioMain}>
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
                      onChange={(e) => setFechaNacimiento(e.target.value)}
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
                  <div>
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
          <Link to="/gestionarusuario">
            <button type="submit" className={styles.backButton}>
              Volver
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RegistrarUsuario;
