import styles from './Modal.module.css';

export default function Modal({isOpen, onClose, children}){

    if(!isOpen) return null;

    return(
        <div className={styles.containerModal}>
            <div className={styles.containerModalUm} onClick={onClose}/>
            <div className={styles.containerInterno}>
                <div>{children}</div>
            </div>
        </div>
    )
}