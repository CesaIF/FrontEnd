import Link from "next/link";

export default function DarkFooter(){
    return(
        <>
            <div className="bg-[#48793c] h-[100px] flex justify-between font-cormorant">
                <div className="ml-[10%] flex flex-col mt-[1%]">
                    <h1>Desenvolvedores:</h1>
                    <Link className="" href={"httos://www.github.com/natanael9999"}>Natanael Dos Santos</Link>
                    <Link href={"/"}>Hércules Silva</Link>
                </div>
                <div className="flex flex-col mt-[1%]">
                    <h1>Orientado por:</h1>
                    <h1>Éber Chargas</h1>
                </div>
                <div className="flex flex-col mt-[1%]">
                    <h1>Supervisionado por:</h1>
                    <h1>Sandoelton Coelho</h1>
                </div>
                <div className="mr-[10%] flex flex-col mt-[1%]">
                    <h1>Setor responsável:</h1>
                    <h1>NGTI</h1>
                </div>
            </div>
        </>
    )
}