"use client";

import { useState } from "react";
import DarkFooter from "../components/darkfooter";
import Footer from "../components/footer";
import GoodButton from "../components/goodButton";
import Header from "../components/header";
import Modal from "../components/modal";

export default function History(){

    const [expandModal, setExpandModal] = useState(false);

    function handleExpandModal(){
        setExpandModal(!expandModal);
    }
    
    return(
        <>
            <div className="flex flex-col h-[100vh] selection:bg-green-500 selection:text-white">
                <Header></Header>
                <main className="flex flex-1 py-16 px-6 bg-white shrink-0 flex-col items-center font-outfit font-medium text-neutral-700">
                    <div className="w-[70%] mt-5">
                        <div>
                            <div className="flex flex-row justify-between items-center">
                                <h1 className="text-2xl">Locações Agendadas</h1>
                            </div>
                            <div className="bg-neutral-600 h-[1px] mt-4"></div>
                        </div>
                        <div className="grid grid-cols-6 gap-2">
                            <div className="bg-neutral-100 border-b-8 border-r-8 border-l-2 border-t-2 mt-[3rem] rounded-2xl px-12 py-7 flex flex-col items-center">
                                <div className="bg-white rounded-lg p-2">
                                    <div className="flex flex-row gap-4">
                                        <h1>Id:</h1>
                                        <h1>Data!</h1>
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg p-2 mt-5">
                                    <div className="flex flex-col gap-4 items-center">
                                        <h1>Automóvel:</h1>
                                        <h1>Data!</h1>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <GoodButton onClick={handleExpandModal}>Expandir</GoodButton>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Modal isOpen={expandModal} onClose={handleExpandModal}>
                        <div className="flex flex-col justify-center items-center">
                            <div className="grid grid-cols-4 gap-4 w-[80%]">
                                <div className="flex flex-col bg-neutral-200 rounded-lg p-2">
                                    <h1 className="h1">Id:</h1>
                                    <h1 className="h1">Data!</h1>
                                </div>

                                <div className="flex flex-col bg-neutral-200 rounded-lg p-2">
                                    <h1 className="h1">Placa:</h1>
                                    <h1 className="h1">Data!</h1>
                                </div>

                                <div className="flex flex-col bg-neutral-200 rounded-lg p-2">
                                    <h1 className="h1">Km Saída:</h1>
                                    <h1 className="h1">Data!</h1>
                                </div>

                                <div className="flex flex-col bg-neutral-200 rounded-lg p-2">
                                    <h1 className="h1">Km Chegada:</h1>
                                    <h1 className="h1">Data!</h1>
                                </div>
                            </div>

                            <div className="w-[100%] flex justify-center mt-5">
                                <div className="w-[80%] bg-neutral-200 rounded-lg flex flex-row p-2">
                                    <h1>Itinerário:</h1>
                                    <h1>Data!</h1>
                                </div>
                            </div>

                            <div className="w-[100%] flex justify-center mt-5">
                                <div className="w-[80%] bg-neutral-200 rounded-lg flex flex-row p-2">
                                    <h1>Motivo da Saída:</h1>
                                    <h1>Data!</h1>
                                </div>
                            </div>

                            <div className="w-[80%] mt-5 grid grid-cols-2 gap-4">
                                <div className="flex flex-col bg-neutral-200 p-2 rounded-lg">
                                    <h1>Data e Hora de Saída:</h1>
                                    <h1>Data!</h1>
                                </div>
                                <div className="flex flex-col bg-neutral-200 p-2 rounded-lg">
                                    <h1>Data e Hora de Chegada:</h1>
                                    <h1>Data!</h1>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 w-[80%] mt-5">
                                <div className="flex flex-col bg-neutral-200 p-2 rounded-lg">
                                    <h1>Gestor:</h1>
                                    <h1>Data!</h1>
                                </div>
                                <div className="flex flex-col bg-neutral-200 p-2 rounded-lg">
                                    <h1>Porteiro:</h1>
                                    <h1>Data!</h1>
                                </div>
                                <div className="flex flex-col bg-neutral-200 p-2 rounded-lg">
                                    <h1>Motorista:</h1>
                                    <h1>Data!</h1>
                                </div>
                            </div>
                            <div className="flex justify-center items-center mt-10">
                                <GoodButton onClick={handleExpandModal}>OK</GoodButton>
                            </div>
                        </div>
                    </Modal>

                </main>
                <Footer></Footer>
                <DarkFooter></DarkFooter>
            </div>
        </>
    )
}