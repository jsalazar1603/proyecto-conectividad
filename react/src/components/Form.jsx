import React, { useState } from "react";
import Input from "./Input";
import styles from "../styles/Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Form = () => {
  const URI = "http://localhost:8000/users/login";
  const [dataUsuario, setDataUsuario] = useState({
    usuario: "",
    contraseña: "",
  });
  const [refused, setRefused] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setDataUsuario({ ...dataUsuario, [e.target.name]: e.target.value });
    setRefused(false);
  };

  const handleClick = () => {
    console.log("Datos del usuario:", dataUsuario);
    login(dataUsuario);
  };

  const login = async (dataUsuario) => {
    //e.preventDefault();

    const respuesta = await axios.post(URI, dataUsuario);
    if (respuesta.data.success == true) {
      navigate("/gestionarusuario");
    } else {
      setRefused(true);
    }
    console.log("Respuesta:", respuesta);
  };

  return (
    <>
      <div className={styles.form}>
        <Input
          name="usuario"
          valor={dataUsuario.username}
          handleChange={handleChange}
          type="text"
          text="Ingrese su nombre de usuario"
        />
        <Input
          name="contraseña"
          valor={dataUsuario.password}
          handleChange={handleChange}
          type="password"
          text="Ingrese su contraseña"
        />
        <Button
          handleClick={handleClick}
          valueUser={dataUsuario}
          text="Iniciar Sesión"
        />
      </div>
      {refused ? <p>Credenciales Incorrectas</p> : null}
    </>
  );
};

export default Form;
