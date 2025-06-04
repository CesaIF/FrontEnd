import Link from "next/link";
import styles from './Footer.module.css';
import { FaLink } from "react-icons/fa6";

export default function Footer(){
    return(
        <>
        <footer className={styles.footer}>
                <div className={styles.containerUm}>
                    <div>
                        <h1>Sobre o CESA</h1>
                        <p>Sistema de Controle de Entrada e Saída de Veículos</p>
                    </div>
                    <div>
                        <h1>Equipe</h1>
                        <div className={styles.techUsed}>
                            <Link className={styles.link} href={"https://www.github.com/thellllima02"}>Hércules da Silva Santos</Link>
                            <Link className={styles.link} href={"https://www.github.com/natanael9999"}>Natanael Dos Santos Gonçalves</Link>
                        </div>
                    </div>
                    <div>
                        <h1>Insituição</h1>
                        <Link className={styles.link} href={"https://www.ifbaiano.edu.br/unidades/itapetinga/"}>IF Baiano <i>campus</i> Itapetinga</Link>
                        <p>Núcleo: NGTI</p>
                    </div>
                    <Link href={"https://www.ifbaiano.edu.br/unidades/itapetinga/"} className={styles.link}>
                        <img className={styles.imgUm} src="https://www.ifbaiano.edu.br/unidades/itapetinga/files/2020/04/marca-if-baiano-campus-itapetinga-horizontal.png"></img>
                    </Link>
                    <div>
                        <h1>Orientadores/Supervisores</h1>
                        <p>Éber Chargas</p>
                        <p>Sandoelton Coelho</p>
                    </div>
                    <div className={styles.techUsed}>
                        <div>
                            <h1>Desenvolvido com:</h1>
                        </div>
                        <div className={styles.techUsedUm}>
                            <Link className={styles.link} href={"/"}>Next.js</Link>
                            <Link className={styles.link} href={"/"}>Node.js</Link>
                            <Link className={styles.link} href={"/"}>MariaDB</Link>
                            <Link className={styles.link} href={"/"}>Docker</Link>
                        </div>
                    </div>
                    
                </div>
        </footer>
        </>
    )
}