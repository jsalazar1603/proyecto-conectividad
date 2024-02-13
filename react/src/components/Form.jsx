import React from "react";
import Input from "./Input";
import styles from "../styles/Form.module.css";
import Button from "./Button";
import { Link } from "react-router-dom";

const Form = () => {
  return (
    <>
      <div className={styles.form}>
        <Input type="text" text="Ingrese su nombre de usuario" />
        <Input type="password" text="Ingrese su contraseña" />
        <Link to="/gestionarusuario">
          <Button text="Iniciar Sesión" />
        </Link>
      </div>
    </>
  );
};

export default Form;