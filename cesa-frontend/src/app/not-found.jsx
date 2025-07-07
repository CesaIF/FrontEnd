"use client";

import Link from "next/link";
import styles from "./NotFound.module.css";

export default function NotFound () {
    return (
        <>
        <div className={styles.notfound}>
            <h1 className={styles.erro}>404</h1>
            <p className={styles.info}>Página não encontrada</p>
            <Link className={styles.irparalogin} href={"/"}>Vá para Login</Link>
        </div>
        </>
    )
}