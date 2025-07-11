import { useState } from 'react';
import styles from './Textarea.module.css';

export default function Textarea({label, placeholder, maxLength, rows, value, onChange}){

    const [tocado, setTocado] = useState(false);

    const isEmpty = tocado && value?.toString().trim() === "";

    return(
        <div className={styles.textareaContainer}>
            <label>{label}</label>
            <textarea 
                value={value} 
                onChange={onChange} 
                rows={rows} 
                maxLength={maxLength} 
                placeholder={placeholder} 
                onBlur={() => setTocado(true)}
                className={`${styles.textarea} ${isEmpty ? styles.textareaVazio : ""}`}>
            </textarea>
        </div>
    )
}