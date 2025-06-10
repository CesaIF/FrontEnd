import styles from './Button.module.css';

export default function BadButton({children, onClick, cor = 'black', textColor = 'white', colorHover = 'black', buttonWidth = '150px'}){
    return(
        <button style={{'--btn-color': cor, '--text-color': textColor, '--btn-colorHover': colorHover, '--button-width': buttonWidth}} onClick={onClick} className={styles.button}>{children}</button>
    )
}