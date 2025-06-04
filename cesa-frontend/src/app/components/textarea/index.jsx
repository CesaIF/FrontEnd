import styles from './Textarea.module.css';

export default function Textarea({label, placeholder, maxLength, rows}){
    return(
        <div className={styles.textareaContainer}>
            <label>{label}</label>
            <textarea rows={rows} maxLength={maxLength} placeholder={placeholder} className={styles.textarea}></textarea>
        </div>
    )
}