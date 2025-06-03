import styles from './Input.module.css';
import React from 'react';

export default function Input({label, placeholder, type, maxLength, id, htmlFor, value, onChange}){
    return(
        <div className={styles.inputContainer}>
            <label htmlFor={htmlFor} className={styles.label}>{label}</label>
            <input value={value} id={id} maxLength={maxLength} type={type} placeholder={placeholder} className={styles.input} onChange={onChange}></input>
        </div>
    )
}