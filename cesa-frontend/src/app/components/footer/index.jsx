import Link from "next/link";

export default function Footer(){
    return(
        <>
        <footer className="bg-[#181818] flex flex-col">
            <div className="flex justify-between items-center">
                <div className="flex flex-row ml-[10%] items-center">
                    <Link className="w-[20%]" href={"https://www.ifbaiano.edu.br/unidades/itapetinga/"}><img className="" src="/if/if.png"></img></Link>
                    <h1 className="font-cormorant text-neutral-700">@ 2025 <Link href={"google.com"}>IF Baiano <i>campus</i> Itapetinga</Link>. Todos os direitos reservados.</h1>
                </div>
                <div className="flex flex-row items-center mr-[10%]">
                    <Link className="mr-[10%]" href={"https://nodejs.org/pt"}><img className="h-[100px]" src="/node/nodejs.png"></img></Link>
                    <Link href={"https://nextjs.org/"}><img className="h-[100px]" src="/next/nextjs2.png"></img></Link>
                </div>
            </div>
        </footer>
        </>
    )
}