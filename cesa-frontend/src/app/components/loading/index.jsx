import React from "react";
import styles from "./Loading.module.css";

export default function Loading() {
    return(
        <div className={styles.tela}>
            <div className={styles.circulo}></div>
            <p className={styles.texto}>Carregando...</p>
        </div>
    )
}