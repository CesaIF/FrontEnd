import Header from "../components/header";
import Footer from "../components/footer";
import DarkFooter from "../components/darkfooter";
import { CiCirclePlus } from "react-icons/ci";
import CardLocacao from "../components/cardLocacao";

export default function Dashboard(){
    return(
        <>
            <div className="flex flex-col h-[100vh]">
                <Header></Header>
                <main className="flex flex-1 py-4 px-6 h-[100%] bg-white shrink-0 flex-col items-center font-cormorant text-neutral-700">
                    <div className="w-[60%] mt-5">
                        <div>
                            <div className="flex flex-row justify-between items-center">
                                <h1 className="text-2xl">Locações Agendadas</h1>
                                <CiCirclePlus size={35}></CiCirclePlus>
                            </div>
                            <div className="bg-neutral-600 h-[1px] mt-4"></div>
                        </div>
                        <div>
                            <CardLocacao></CardLocacao>
                        </div>
                    </div>
                    <div className="w-[60%] mt-5">
                        <div>
                            <div className="flex flex-row justify-between items-center">
                                <h1 className="text-2xl">Locações Iniciadas</h1>
                            </div>
                            <div className="bg-neutral-600 h-[1px] mt-4"></div>
                        </div>
                        <div>
                            <CardLocacao></CardLocacao>
                        </div>
                    </div>
                </main>
                <Footer></Footer>
                <DarkFooter></DarkFooter>
            </div>
        </>
    )
}