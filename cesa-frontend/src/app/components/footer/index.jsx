import Link from "next/link";
import styles from './Footer.module.css';
import { FaLink } from "react-icons/fa6";
import { RiNextjsLine } from "react-icons/ri";
import { FaNodeJs } from "react-icons/fa";
import { SiMariadbfoundation } from "react-icons/si";
import { FaDocker } from "react-icons/fa";

export default function Footer(){
    return(
        <>
        <footer className={styles.footer}>
                <div className={styles.containerUm}>
                    <div>
                        <h1>Sobre o CESA</h1>
                        <p>Sistema de Controle de Entrada e Saída de Veículos.</p>
                    </div>
                    <div>
                        <h1>Equipe</h1>
                        <div className={styles.techUsed}>
                            <Link className={styles.link} href={"https://www.github.com/thellllima02"}>Hércules da Silva Santos</Link>
                            <Link className={styles.link} href={"https://www.github.com/natanael9999"}>Natanael Dos Santos Gonçalves</Link>
                        </div>
                    </div>
                    <div>
                        <h1>Instituição</h1>
                        <Link className={styles.link} href={"https://www.ifbaiano.edu.br/unidades/itapetinga/"}>IF Baiano <i>campus</i> Itapetinga</Link>
                        <p>Núcleo: NGTI</p>
                    </div>
                    <div>
                        <h1>Nossa missão é garantir a segurança e eficiência no controle de locações de veículos institucionais.</h1>
                    </div>
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
                            <Link className={styles.link} href={"https://nextjs.org/"}><RiNextjsLine size={35}/></Link>
                            <Link className={styles.link} href={"https://nodejs.org/pt"}><FaNodeJs size={35}/></Link>
                            <Link className={styles.link} href={"https://mariadb.org/"}><SiMariadbfoundation size={35}/></Link>
                            <Link className={styles.link} href={"https://www.docker.com/"}><FaDocker size={35}/></Link>
                        </div>
                    </div>
                    
                </div>
        </footer>
        </>
    )
}