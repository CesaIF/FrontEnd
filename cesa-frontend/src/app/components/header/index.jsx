"use client";

{/*import Link from "next/link";
import {FaRegUserCircle} from "react-icons/fa";
import {AiOutlineMore} from "react-icons/ai";
import { useState } from "react";
import { IoExitOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { GoHistory } from "react-icons/go";
import { FaHome } from "react-icons/fa";

export default function Header(){

    const [isFirstOpen, setIsFirstOpen] = useState(false);
    const [isSecondOpen, setIsSecondOpen] = useState(false);

    return(
        <aside className="bg-[#d1dec7]">
            <nav className="flex not-sm:flex-col justify-between">
                <ul className="flex flex-row items-center ml-[6%] not-sm:flex-col not-sm:ml-[0%] not-sm:items-center">
                    <li className="md:mr-[35%] sm:mr-[10%] text-black font-outfit text-4xl not-sm:mr-[0px]">
                        <Link href={"/"}><FaHome></FaHome></Link>
                    </li>

                    <li className="md:mr-[20%] not-sm:mr-[0px] sm:mr-[6px] text-black font-outfit 
                    text-xl py-3 px-5 hover:bg-white border-b-4 border-transparent 
                    hover:border-[#48793c]"><Link href={"/veiculos"}>Veículos</Link>
                    </li>
                    
                    <li className="md:mr-[20%] not-sm:mr-[0px] sm:mr-[6px] text-black font-outfit 
                    text-xl py-3 px-5 hover:bg-neutral-100 border-b-4 border-transparent 
                    hover:border-[#48793c]"><Link href={"/motoristas"}>Motoristas</Link>
                    </li>

                    <li className="text-black font-outfit 
                    text-xl py-3 px-5 hover:bg-neutral-100 border-b-4 border-transparent 
                    hover:border-[#48793c]"><Link href={"/porteiros"}>Porteiros</Link>
                    </li>
                </ul>
                <ul className="flex flex-row items-center mr-[4%] not-sm:mr-[0px] not-sm:justify-center not-sm:mb-5">
                    <li onClick={() => setIsFirstOpen(!isFirstOpen)} className="text-black mr-[20%] not-sm:mr-[5%] sm:mr-[10%] py-2 px-2 hover:bg-white rounded-xl"><FaRegUserCircle size={25}></FaRegUserCircle></li>
                    <li onClick={() => setIsSecondOpen(!isSecondOpen)} className="text-black ml-[50%] sm:ml-[10%] not-sm:ml-[0px] py-2 px-2 hover:bg-white rounded-xl sm:mr-[20px]"><AiOutlineMore size={25}></AiOutlineMore></li>
                </ul>
            </nav>

            {isFirstOpen && (
                <div className="absolute right-6 mt-3 bg-white shadow-neutral-950 shadow-2xl py-4 px-4 w-[300px] rounded-2xl border-neutral-700 text-neutral-700 font-outfit font-medium flex flex-col justify-center">
                    <Link href={"/perfil"} className="w-[100%] hover:bg-neutral-200 rounded-xl flex flex-row justify-between items-center mb-[5%]">
                        <h1 className="py-1.5 px-4" href={"/login"}>Meu Perfil</h1>
                    </Link>
                    <div className="w-[100%] flex justify-center items-center">
                        <div className="bg-neutral-400 h-[1px] w-[100%] mb-[5%]"></div>
                    </div>
                    <Link href={"mailto:trabalhossiemail@gmail.com?subject=Ajuda+no+software+CESA&body=Preciso+de+ajuda+no+software+CESA"} className="w-[100%] hover:bg-neutral-200 rounded-xl flex flex-row justify-between items-center mb-[5%]">
                        <h1 className="py-1.5 px-4" href={"/login"}>Ajuda</h1>
                        <IoIosHelpCircleOutline className="mr-[5%]" size={25}></IoIosHelpCircleOutline>
                    </Link>
                    <div className="w-[100%] flex justify-center items-center">
                        <div className="bg-neutral-400 h-[1px] w-[100%] mb-[5%]"></div>
                    </div>
                    <Link href={"/login"} className="w-[100%] hover:bg-neutral-200 rounded-xl flex flex-row justify-between items-center">
                        <h1 className="py-1.5 px-4" href={"/login"}>Sair</h1>
                        <IoExitOutline className="mr-[5%]" size={25}></IoExitOutline>
                    </Link>
                </div>
            )}

            {isSecondOpen && (
                <div className="absolute right-6 mt-3 bg-white shadow-neutral-950 shadow-2xl py-4 px-4 w-[200px] rounded-2xl border-neutral-700 text-neutral-700 font-outfit font-medium flex flex-col justify-center">
                    <div className="flex justify-between items-center mb-5">
                        <h1 className="ml-[10%]">Versão</h1>
                        <h1 className="mr-[10%]">1.0</h1>
                    </div>
                    <div className="w-[100%] flex justify-center items-center">
                        <div className="bg-neutral-400 h-[1px] w-[100%] mb-5"></div>
                    </div>
                    <Link href={"/history"} className="w-[100%] hover:bg-neutral-200 rounded-xl flex flex-row justify-between items-center">
                        <h1 className="py-1.5 px-4" href={"/login"}>Histórico</h1>
                        <GoHistory className="mr-[10%]" size={20}></GoHistory>
                    </Link>
                </div>
            )}
        </aside>
    )
}*/}

import Link from "next/link";
import styles from "./Header.module.css";
import { IoExitOutline } from "react-icons/io5";
import { GoHistory, GoPasskeyFill } from "react-icons/go";
import { FaHome, FaCar, FaRegUserCircle } from "react-icons/fa";
import { BsPersonVcard } from "react-icons/bs";
import { CiCircleInfo } from "react-icons/ci";
import { FiTable } from "react-icons/fi";

export default function Header({isOpen, onClick}){
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
                            <Link className={styles.link} href={"/profile"}>
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

                        <li className={styles.liDois}>
                            <Link className={styles.link} href={"/"}>
                                <span>
                                    <CiCircleInfo />
                                </span>
                                <span className={styles.title}>Info</span>
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