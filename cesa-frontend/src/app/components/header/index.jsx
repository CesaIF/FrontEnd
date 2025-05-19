import Link from "next/link";
import {FaRegUserCircle} from "react-icons/fa";
import {AiOutlineMore} from "react-icons/ai";

export default function Header(){
    return(
        <header className="p-2 bg-white border-b-neutral-700 border-2">
            <nav className="flex justify-between">
                <ul className="flex flex-row items-center ml-[4%]">
                    <li className="mr-[40%] text-neutral-700 font-cormorant text-4xl"><Link href={"/dashboard"}>CESA</Link></li>
                    <li className="mr-[20%] text-neutral-700 font-cormorant text-lg"><Link href={"/locacoes"}>Locações</Link></li>
                    <li className="mr-[20%] text-neutral-700 font-cormorant text-lg"><Link href={"/veiculos"}>Veículos</Link></li>
                    <li className="text-neutral-700 font-cormorant text-lg"><Link href={"/motoristas"}>Motoristas</Link></li>
                </ul>
                <ul className="flex flex-row items-center mr-[4%]">
                    <li className="text-neutral-700 mr-[20%]"><Link href={"/"}><FaRegUserCircle size={25}></FaRegUserCircle></Link></li>
                    <li className="text-neutral-700 ml-[50%]"><Link href={"/"}><AiOutlineMore size={25}></AiOutlineMore></Link></li>
                </ul>
            </nav>
        </header>
    )
}