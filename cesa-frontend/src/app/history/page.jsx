"use client";

import dynamic from "next/dynamic";
import Header from "./components/header";
import Footer from "./components/footer";
import DarkFooter from "./components/darkfooter";
import { useState } from "react";
const Modal = dynamic(() => import("./components/modal"), {ssr: false});
import GoodButton from "./components/goodButton";
import styles from './Dashboard.module.css';

export default function History(){

    const [expandModal, setExpandModal] = useState(false);

    function handleExpandModal(){
        setExpandModal(!expandModal);
    }

    return(
        <>
            <div className={styles.containerGeral}>
                <Header></Header>
                <main className={styles.containerMain}>
                    <div className={styles.containerInternoUm}>
                        <div>
                            <div className={styles.containerTitle}>
                                <h1 className={styles.titleLocacao}>Locações Finalizadas</h1>
                            </div>
                            <div className={styles.line}></div>
                        </div>
                        <div className={styles.containerLocacao}>
                            <div className={styles.cardLocacao}>
                                <div className={styles.cardLUm}>
                                    <div className={styles.cardInterno}>
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