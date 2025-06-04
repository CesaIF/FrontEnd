import styles from './Button.module.css';

export default function BadButton({children, onClick, cor = 'black'}){
    return(
        <button style={{'--btn-color': cor}} onClick={onClick} className={styles.button}>{children}</button>
    )
}