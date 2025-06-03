import styles from "./Button.module.css";

export default function GoodButton({children, onClick}){
    return(
        <button onClick={onClick} className={styles.button}>{children}</button>
    )
}