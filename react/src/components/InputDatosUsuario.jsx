import React from 'react'
import styles from'../styles/InputDatosUsuario.module.css'

const InputDatosUsuario = (props) => {
  return (
    <input onChange={props.onChange} value={props.value} className={styles.inputText} placeholder={props.text} type={props.type}/>
  )
}

export default InputDatosUsuario