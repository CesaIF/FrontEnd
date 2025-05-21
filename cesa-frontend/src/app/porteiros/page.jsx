import DarkFooter from "../components/darkfooter";
import Footer from "../components/footer";
import Header from "../components/header";
import { CiCirclePlus } from "react-icons/ci";
import PorteiroCard from "../components/porteiroCard";

export default function Porteiros(){
    return(
        <>
        <div className="flex flex-col h-[100vh]">
            <Header></Header>
                <main className="flex flex-1 py-16 px-6 bg-white shrink-0 flex-col items-center font-cormorant text-neutral-700">
                    <div className="w-[60%] mt-5">
                        <div>
                            <div className="flex flex-row justify-between items-center">
                                <h1 className="text-2xl">Porteiros Cadastrados</h1>
                                <CiCirclePlus size={35}></CiCirclePlus>
                            </div>
                            <div className="bg-neutral-600 h-[1px] mt-4"></div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <PorteiroCard></PorteiroCard>
                        </div>
                    </div>
                </main>
            <Footer></Footer>
            <DarkFooter></DarkFooter>
        </div>
        </>
    )
}