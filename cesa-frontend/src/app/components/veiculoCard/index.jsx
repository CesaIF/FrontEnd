import BadButton from "../badButton";
import RightButton from "../rightButton";
import { HiPencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";

export default function VeiculoCard() {
    return(
        <div className="bg-white border-b-8 border-r-8 border-l-2 border-t-2 mt-[5%] rounded-2xl px-7 py-7 flex flex-col justify-between items-center w-full">
            <div>
                <h1 className="text-[30px]">Data!</h1>
            </div>
            <div className="bg-neutral-700 h-[1px] w-full mt-5"></div>
            <div className="flex flex-col justify-between items-center">
                <div className="flex flex-row mt-3">
                    <h1 className="mr-5">Cor:</h1>
                    <h1>Data!</h1>
                </div>
                <div className="flex flex-row mt-3">
                    <h1 className="mr-5">Placa:</h1>
                    <h1>Data!</h1>
                </div>
                <div className="flex flex-row mt-3">
                    <h1 className="mr-5">Km:</h1>
                    <h1>Data!</h1>
                </div>
                <div className="flex flex-row mt-3">
                    <h1 className="mr-5">Ano:</h1>
                    <h1>Data!</h1>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="">
                    <BadButton><MdDelete></MdDelete></BadButton>
                </div>
                <div>
                    <RightButton><HiPencilAlt></HiPencilAlt></RightButton>
                </div>
            </div>
        </div>
    )
}