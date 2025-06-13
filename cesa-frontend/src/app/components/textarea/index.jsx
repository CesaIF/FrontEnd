import styles from './Textarea.module.css';

export default function Textarea({label, placeholder, maxLength, rows, value, onChange}){
    return(
        <div className={styles.textareaContainer}>
            <label>{label}</label>
            <textarea value={value} onChange={onChange} rows={rows} maxLength={maxLength} placeholder={placeholder} className={styles.textarea}></textarea>
        </div>
    )
}