"use client"

import Link from "next/link";
import {FaRegUserCircle} from "react-icons/fa";
import {AiOutlineMore} from "react-icons/ai";
import { useState } from "react";
import { IoExitOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { GoHistory } from "react-icons/go";

export default function Header(){

    const [isFirstOpen, setIsFirstOpen] = useState(false);
    const [isSecondOpen, setIsSecondOpen] = useState(false);

    return(
        <header className="bg-white border-b-neutral-700 border-2">
            <nav className="flex justify-between">
                <ul className="flex flex-row items-center ml-[4%]">
                    <li className="mr-[35%] text-neutral-700 font-cormorant 
                    text-4xl"><Link href={"/dashboard"}>CESA</Link>
                    </li>

                    <li className="mr-[20%] text-neutral-700 font-cormorant 
                    text-lg py-3 px-5 hover:bg-neutral-100 border-b-4 border-transparent 
                    hover:border-neutral-700"><Link href={"/veiculos"}>Veículos</Link>
                    </li>
                    
                    <li className="mr-[20%] text-neutral-700 font-cormorant 
                    text-lg py-3 px-5 hover:bg-neutral-100 border-b-4 border-transparent 
                    hover:border-neutral-700"><Link href={"/motoristas"}>Motoristas</Link>
                    </li>

                    <li className="text-neutral-700 font-cormorant 
                    text-lg py-3 px-5 hover:bg-neutral-100 border-b-4 border-transparent 
                    hover:border-neutral-700"><Link href={"/porteiros"}>Porteiros</Link>
                    </li>
                </ul>
                <ul className="flex flex-row items-center mr-[4%]">
                    <li onClick={() => setIsFirstOpen(!isFirstOpen)} className="text-neutral-700 mr-[20%]"><FaRegUserCircle size={25}></FaRegUserCircle></li>
                    <li onClick={() => setIsSecondOpen(!isSecondOpen)} className="text-neutral-700 ml-[50%]"><AiOutlineMore size={25}></AiOutlineMore></li>
                </ul>
            </nav>

            {isFirstOpen && (
                <div className="absolute right-6 mt-3 bg-white shadow-neutral-950 shadow-2xl py-4 px-4 w-[300px] rounded-2xl border-neutral-700 text-neutral-700 font-cormorant flex flex-col justify-center">
                    <div className="mb-[5%] py-1.5 px-4">
                        <h1>Usuário</h1>
                    </div>
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
                <div className="absolute right-6 mt-3 bg-white shadow-neutral-950 shadow-2xl py-4 px-4 w-[200px] rounded-2xl border-neutral-700 text-neutral-700 font-cormorant flex flex-col justify-center">
                    <div className="flex justify-between items-center mb-5">
                        <h1 className="ml-[10%]">Versão</h1>
                        <h1 className="mr-[10%]">1.0</h1>
                    </div>
                    <div className="w-[100%] flex justify-center items-center">
                        <div className="bg-neutral-400 h-[1px] w-[100%] mb-5"></div>
                    </div>
                    <button className="w-[100%] hover:bg-neutral-200 rounded-xl flex flex-row justify-between items-center">
                        <h1 className="py-1.5 px-4" href={"/login"}>Histórico</h1>
                        <GoHistory className="mr-[10%]" size={20}></GoHistory>
                    </button>
                </div>
            )}
        </header>
    )
}