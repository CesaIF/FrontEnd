import styles from './Choicebox.module.css';

export default function ChoiceBox({id, name, children, value}){
    return(
        <div className={styles.choiceboxContainer}>
            <select id={id} name={name}>
                <option className={styles.choicebox} value={value}>{children}</option>
            </select>
        </div>
    )
}