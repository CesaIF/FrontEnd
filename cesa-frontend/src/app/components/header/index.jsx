"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import { IoExitOutline } from "react-icons/io5";
import { GoHistory, GoPasskeyFill } from "react-icons/go";
import { FaHome, FaCar, FaRegUserCircle } from "react-icons/fa";
import { BsPersonVcard } from "react-icons/bs";
import { FiTable } from "react-icons/fi";
import { useAuth } from "@/app/hooks/useAuth";

export default function Header({isOpen, onClick}){
    useAuth();
    return (
        <>
            <aside className={`${styles.aside} ${isOpen ? styles.open : ''}`}>
                <nav className={styles.nav}>
                    <ul className={styles.ul}>
                        <li className={styles.liUm}>
                            <button className={styles.button} onClick={onClick}>
                                <FiTable />
                            </button>
                        </li>

                        <li className={styles.liDois}>
                            <Link className={styles.link} href={"/"}>
                                <span>
                                    <FaHome />
                                </span>
                                <span className={styles.title}>Página Inicial</span>
                            </Link>
                        </li>

                        <li className={styles.liDois}>
                            <Link className={styles.link} href={"/perfil"}>
                                <span>
                                    <FaRegUserCircle />
                                </span>
                                <span className={styles.title}>Meu Perfil</span>
                            </Link>
                        </li>

                        <li className={styles.liDois}>
                            <Link className={styles.link} href={"/veiculos"}>
                                <span>
                                    <FaCar />
                                </span>
                                <span className={styles.title}>Veículos</span>
                            </Link>
                        </li>
                        <li className={styles.liDois}>
                            <Link className={styles.link} href={"/motoristas"}>
                                <span>
                                    <BsPersonVcard />
                                </span>
                                <span className={styles.title}>Motoristas</span>
                            </Link>
                        </li>

                        <li className={styles.liDois}>
                            <Link className={styles.link} href={"/porteiros"}>
                                <span>
                                    <GoPasskeyFill />
                                </span>
                                <span className={styles.title}>Porteiros</span>
                            </Link>
                        </li>

                        <li className={styles.liDois}>
                            <Link className={styles.link} href={"/history"}>
                                <span>
                                    <GoHistory />
                                </span>
                                <span className={styles.title}>Histórico</span>
                            </Link>
                        </li>

                        <li className={`${styles.liDois} ${styles.out}`}>
                            <Link className={styles.link} href={"/login"}>
                                <span>
                                    <IoExitOutline />
                                </span>
                                <span className={styles.title}>Sair</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    )
}