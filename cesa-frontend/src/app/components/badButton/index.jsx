import styles from './Button.module.css';

export default function BadButton({children, onClick, cor = 'black', textColor = 'white', colorHover = 'black', buttonWidth = '150px', type}){
    return(
        <button style={{'--btn-color': cor, '--text-color': textColor, '--btn-colorHover': colorHover, '--button-width': buttonWidth}} onClick={onClick} type={type} className={styles.button}>{children}</button>
    )
}