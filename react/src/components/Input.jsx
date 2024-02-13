import React from 'react'
import styles from '../styles/Input.module.css'

const Input = (props) => {
  return (
    <input className={styles.inputText} placeholder={props.text} type={props.type}/>
  )
}
export default Input