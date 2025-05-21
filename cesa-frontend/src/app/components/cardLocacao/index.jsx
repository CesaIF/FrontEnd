import BadButton from "../badButton";
import RightButton from "../rightButton";
import GoodButton from "../goodButton";
import { HiPencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";

export default function CardLocacao(){
    return(
        <div className="bg-gray-100 border-b-8 border-r-8 border-l-2 border-t-2 mt-[3rem] rounded-2xl px-12 py-7 flex flex-row justify-between items-center w-full">
            <div className="flex flex-col justify-between items-center flex-wrap">
                <div className="flex flex-row justify-between items-center flex-wrap gap-5">
                    <div className="flex flex-col justify-center">
                        <h1 className="">ID:</h1>
                        <h1 className="">Data!</h1>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="">Placa:</h1>
                        <h1>Data!</h1>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="">Km Saída:</h1>
                        <h1>Data!</h1>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="">Km Chegada:</h1>
                        <h1>Data!</h1>
                    </div>
                </div>
                <div className="flex flex-row w-full mt-6">
                    <h1 className="mr-5">Itinerário: </h1>
                    <h1>Data!</h1>
                </div>
                <div className="flex flex-row w-full mt-6">
                    <h1 className="mr-5">Motivo da Saída: </h1>
                    <h1>Data!</h1>
                </div>
            </div>
            <div className="flex flex-col justify-between items-center">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col mr-10">
                        <h1>Data e Hora de Saída:</h1>
                        <h1>Data!</h1>
                    </div>
                    <div className="flex flex-col">
                        <h1>Data e Hora de Chegada:</h1>
                        <h1>Data!</h1>
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center mt-5">
                    <div className="flex flex-row mr-6 items-center">
                        <h1 className="mr-2">ADM:</h1>
                        <h1>Data!</h1>
                    </div>
                    <div className="flex flex-row mr-6 items-center">
                        <h1 className="mr-2">Porteiro:</h1>
                        <h1>Data!</h1>
                    </div>
                    <div className="flex flex-row items-center">
                        <h1 className="mr-2">Motorista:</h1>
                        <h1>Data!</h1>
                    </div>
                </div>
                <div className="flex flex-row mt-5">
                    <div className="mr-8">
                        <BadButton><MdDelete size={28}></MdDelete></BadButton>
                    </div>
                    <div className="mr-8">
                        <RightButton><HiPencilAlt size={28}></HiPencilAlt></RightButton>
                    </div>
                    <div>
                        <GoodButton>Registrar</GoodButton>
                    </div>
                </div>
            </div>
        </div>
    )
}