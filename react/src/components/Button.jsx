import React from 'react'
import styles from '../styles/Button.module.css'

const Button = (props) => {
  
  return (
    <button onClick={props.handleClick} className={styles.btnIniciarSesion}>{props.text}</button>
  );
}


export default Button
