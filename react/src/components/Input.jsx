import React, { useState } from 'react'
import styles from '../styles/Input.module.css'

const Input = (props) => {

  return (
    <input name={props.name} value={props.valor} onChange={props.handleChange} className={styles.inputText} placeholder={props.text} type={props.type}/>
  )
}
export default Input