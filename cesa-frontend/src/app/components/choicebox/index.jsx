import styles from './Choicebox.module.css';

export default function ChoiceBox({id, name, children, value, key, valueSelect, onChange}){
    return(
        <div className={styles.choiceboxContainer}>
            <select id={id} name={name} value={valueSelect} onChange={onChange}>
                <option key={key} className={styles.choicebox} value={value}>{children}</option>
            </select>
        </div>
    )
}