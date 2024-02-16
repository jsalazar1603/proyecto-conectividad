import React, { useState } from "react";
import styles from "../styles/RegistrarUsuario.module.css";
import MenuLateral from "../components/MenuLateral";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const URI = "http://localhost:8000/users/";

const RegistrarUsuario = () => {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [dni, setDNI] = useState("");
  const [edad, setEdad] = useState("");
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

  const store = async (e) => {
    e.preventDefault();

    const defaultPassword = dni;

    // Autogenerar el nombre de usuario concatenando la primera letra del nombre
    // con el primer apellido
    const firstLetterOfName = nombre.charAt(0).toLowerCase();
    const username = `${firstLetterOfName}${apellidos
      .split(" ")[0]
      .toLowerCase()}`;

    await axios.post(URI, {
      nombre: nombre,
      apellidos: apellidos,
      dni: dni,
      edad: edad,
      correo: correo,
      telefono: telefono,
      sexo: sexo,
      usuario: username,
      contraseña: defaultPassword,
      idTipoUser: idTipoUser,
    });
    alert("Usuario agregado");
    handleClear();

    alert(
      `Usuario creado con Exito: \n  Usuario: ${username} \n Contraseña: ${defaultPassword}`
    );
  };

  const handleClear = () => {
    setNombre("");
    setApellidos("");
    setDNI("");
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
      <div className={styles.leftSection}>
        <MenuLateral />
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
                    <label htmlFor="">Edad</label>
                    <input
                      placeholder="Ingrese edad"
                      type="number"
                      value={edad}
                      onChange={(e) => setEdad(e.target.value)}
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
