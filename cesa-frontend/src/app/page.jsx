"use client";

import dynamic from "next/dynamic";
import Header from "./components/header";
import Footer from "./components/footer";
import DarkFooter from "./components/darkfooter";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
const Modal = dynamic(() => import("./components/modal"), {ssr: false});
import Textarea from "./components/textarea";
import ChoiceBox from "./components/choicebox";
import BadButton from "./components/badButton";
import GoodButton from "./components/goodButton";
import { MdDelete } from "react-icons/md";
const MiniModal = dynamic(() => import("./components/miniModal"), {ssr: false});
import RightButton from "./components/rightButton";
import styles from './Dashboard.module.css';

export default function Dashboard(){

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [sureModal, setSureModal] = useState(false);
    const [privilegeModal, setPrivilegeModal] = useState(false);
    const [popUpModal, setPopUpModal] = useState(false);
    const [expandModal, setExpandModal] = useState(false);

    function handleOpenModal(){
        setModalIsOpen(!modalIsOpen);
    }

    function handleSureModal(){
        setSureModal(!sureModal);
    }

    function handlePrivilegeModal(){
      setPrivilegeModal(!privilegeModal);
    }

    function handlePopUpModal(){
      setPopUpModal(!popUpModal);
    }

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
                                <h1 className={styles.titleLocacao}>Locações Agendadas</h1>
                                <button className={styles.butaoAdd} onClick={handleOpenModal}><CiCirclePlus size={35}></CiCirclePlus></button>
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
                    <div className={styles.containerInternoUm}>
                        <div>
                            <div className={styles.containerTitle}>
                                <h1 className={styles.titleLocacao}>Locações Iniciadas</h1>
                            </div>
                            <div className={styles.line}></div>
                        </div>
                        <div className="grid grid-cols-5">
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

                    <Modal isOpen={modalIsOpen} onClose={handleOpenModal}>
                        <div className={styles.containerModal}>
                            <div className={styles.containerInternoModal}>
                                <h1 className="text-3xl">Cadastro de Locação</h1>
                                <form className={styles.formAdd}>
                                    <div className={styles.input}><ChoiceBox label={"Veículo"}>Escolha o Veículo!</ChoiceBox></div>
                                    <div className={styles.input}><ChoiceBox label={"Motorista"}>Escolha o Motorista!</ChoiceBox></div>
                                    <div className={styles.input}><Textarea label={"Itinerário"} placeholder={"Descreva o Itinerário"} maxLength={300} rows={3}></Textarea></div>
                                    <div className={styles.input}><Textarea label={"Motivo da Saída"} placeholder={"Descreva o motivo da Saída"} maxLength={300} rows={3}></Textarea></div>
                                </form>
                                <div className={styles.butaoForm}>
                                    <BadButton onClick={handleOpenModal}>Cancelar</BadButton>
                                    <GoodButton onClick={handlePopUpModal}>Criar</GoodButton>
                                </div>
                            </div>
                        </div>
                    </Modal>

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

                    <MiniModal isOpen={sureModal} onClose={handleSureModal}>
                        <div className={styles.containerMinimodal}>
                            <div className={styles.containerInMini}>
                                <h1 className="mb-3">Tem certeza que deseja deletar a locação?</h1>
                                <h1>Data!</h1>
                            </div>
                            <div className={styles.butaoMinimodal}>
                                <RightButton onClick={handleSureModal}>Cancelar</RightButton>
                                <BadButton>Deletar</BadButton>
                            </div>
                        </div>
                    </MiniModal>

                    <MiniModal isOpen={privilegeModal} onClose={handlePrivilegeModal}>
                        <div className={styles.containerMinimodal}>
                            <div className={styles.containerInMini}>
                                <h1 className="mb-3">Você não tem permissão pra isso!</h1>
                            </div>
                            <div className={styles.butaoMinimodal}>
                                <BadButton onClick={handlePrivilegeModal}>OK</BadButton>
                            </div>
                        </div>
                    </MiniModal>

                    <MiniModal isOpen={popUpModal} onClose={handlePopUpModal}>
                        <div className={styles.containerMinimodal}>
                            <div className={styles.containerInMini}>
                                <h1 className="mb-3">Locação cadastrada com sucesso!</h1>
                            </div>
                            <div className={styles.butaoMinimodal}>
                                <GoodButton onClick={handlePopUpModal}>OK</GoodButton>
                            </div>
                        </div>
                    </MiniModal>

                </main>
                <Footer></Footer>
                <DarkFooter></DarkFooter>
            </div>
        </>
    )
}