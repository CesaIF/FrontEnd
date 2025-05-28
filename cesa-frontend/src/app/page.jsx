"use client";

import Header from "./components/header";
import Footer from "./components/footer";
import DarkFooter from "./components/darkfooter";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
import Modal from "./components/modal";
import Textarea from "./components/textarea";
import ChoiceBox from "./components/choicebox";
import BadButton from "./components/badButton";
import GoodButton from "./components/goodButton";
import { MdDelete } from "react-icons/md";
import MiniModal from "./components/miniModal";
import RightButton from "./components/rightButton";

export default function Dashboard(){

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [miniModal, setMiniModal] = useState(false);
    const [secondMiniModal, setSecondMiniModal] = useState(false);
    const [thirdMiniModal, setThirdMiniModal] = useState(false);
    const [fourthMiniModal, setFourthMiniModal] = useState(false);
    const [fifthMiniModal, setFifthMiniModal] = useState(false);

    function handleOpenModal(){
        setModalIsOpen(!modalIsOpen);
    }

    function handleMiniModal(){
        setMiniModal(!miniModal);
    }

    function handleSecondMiniModal(){
        setSecondMiniModal(!secondMiniModal);
    }

    function handleThirdMiniModal(){
        setThirdMiniModal(!thirdMiniModal);
    }

    function handleFourthMiniModal(){
      setFourthMiniModal(!fourthMiniModal);
    }

    function handleFifthMiniModal(){
      setFifthMiniModal(!fifthMiniModal);
    }

    return(
        <>
            <div className="flex flex-col h-[100vh] selection:bg-green-500 selection:text-white">
                <Header></Header>
                <main className="flex flex-1 py-16 px-6 bg-white shrink-0 flex-col items-center font-outfit font-medium text-neutral-700">
                    <div className="w-[70%] mt-5">
                        <div>
                            <div className="flex flex-row justify-between items-center">
                                <h1 className="text-2xl text-[#48793c]">Locações Agendadas</h1>
                                <button className="py-2 px-2 text-[#48793c] hover:bg-[#d1dec7] rounded-2xl" onClick={handleOpenModal}><CiCirclePlus size={35}></CiCirclePlus></button>
                            </div>
                            <div className="bg-[#48793c] h-[1px] mt-4"></div>
                        </div>
                        <div>
                            <div className="bg-white border-b-8 border-r-8 border-l-2 border-t-2 mt-[3rem] rounded-2xl px-12 py-7 lg:flex lg:flex-row lg:justify-between items-center w-full not-sm:flex-col sm:flex-col sm:justify-center border-[#a3bc98]">
                                <div className="flex flex-col justify-between items-center flex-wrap">
                                    <div className="lg:flex lg:flex-row lg:justify-between items-center flex-wrap gap-5 not-sm:grid not-sm:grid-cols-2 sm:grid sm:grid-cols-2">
                                        <div className="flex flex-col justify-center bg-[#d1dec7] rounded-lg px-2 py-2">
                                            <h1 className="">ID:</h1>
                                            <h1 className="">Data!</h1>
                                        </div>
                                        <div className="flex flex-col justify-center bg-[#d1dec7] rounded-lg px-2 py-2">
                                            <h1 className="">Placa:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                        <div className="flex flex-col justify-center bg-[#d1dec7] rounded-lg px-2 py-2">
                                            <h1 className="">Km Saída:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                        <div className="flex flex-col justify-center bg-[#d1dec7] rounded-lg px-2 py-2">
                                            <h1 className="">Km Chegada:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                    </div>
                                    <div className="flex flex-row w-full mt-6 not-sm:flex-col bg-[#d1dec7] rounded-lg px-2 py-2">
                                        <h1 className="mr-5">Itinerário: </h1>
                                        <h1>Data!</h1>
                                    </div>
                                    <div className="flex flex-row w-full mt-6 not-sm:flex-col bg-[#d1dec7] rounded-lg px-2 py-2">
                                        <h1 className="mr-5">Motivo da Saída: </h1>
                                        <h1>Data!</h1>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between items-center not-sm:mt-5 not-sm:items-baseline">
                                    <div className="flex lg:flex-row justify-between items-center not-sm:flex-col not-sm:justify-center not-sm:items-baseline sm:flex-col">
                                        <div className="flex flex-col lg:mr-10 sm:mr-0 md:mr-0 not-sm:mr-0 bg-[#d1dec7] rounded-lg px-2 py-2 sm:mt-5 lg:mt-0">
                                            <h1>Data e Hora de Saída:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                        <div className="flex flex-col not-sm:mt-5 sm:mt-5 md:mt-5 lg:mt-0 bg-[#d1dec7] rounded-lg px-2 py-2">
                                            <h1>Data e Hora de Chegada:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                    </div>
                                    <div className="flex lg:flex-row justify-between items-center mt-5 not-sm:flex-col not-sm:items-baseline sm:flex-col md:flex-col">
                                        <div className="flex flex-row lg:mr-6 items-center not-sm:mr-0 not-sm:mb-5 sm:mb-5 md:mb-5 lg:mb-0 bg-[#d1dec7] rounded-lg px-2 py-2">
                                            <h1 className="mr-2">ADM:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                        <div className="flex flex-row lg:mr-6 items-center not-sm:mr-0 not-sm:mb-5 sm:mb-5 md:mb-5 lg:mb-0 bg-[#d1dec7] rounded-lg px-2 py-2">
                                            <h1 className="mr-2">Porteiro:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                        <div className="flex flex-row items-center not-sm:mr-0 bg-[#d1dec7] rounded-lg px-2 py-2">
                                            <h1 className="mr-2">Motorista:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                    </div>
                                    <div className="flex lg:flex-row mt-5 not-sm:flex-col not-sm:grid not-sm:grid-cols-2 not-sm:gap-x-6 sm:flex-row w-full justify-end">
                                        <div className="lg:mr-8 not-sm:mr-0 not-sm:mb-5 sm:mr-3">
                                            <BadButton onClick={handleMiniModal}><MdDelete className="w-6 h-6"></MdDelete></BadButton>
                                        </div>
                                        <div>
                                            <GoodButton onClick={handleSecondMiniModal}>Iniciar</GoodButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[70%] mt-16">
                        <div>
                            <div className="flex flex-row justify-between items-center">
                                <h1 className="text-2xl">Locações Iniciadas</h1>
                            </div>
                            <div className="bg-neutral-600 h-[1px] mt-4"></div>
                        </div>
                        <div>
                            <div className="bg-neutral-100 border-b-8 border-r-8 border-l-2 border-t-2 mt-[3rem] rounded-2xl px-12 py-7 lg:flex lg:flex-row lg:justify-between items-center w-full not-sm:flex-col sm:flex-col sm:justify-center">
                                <div className="flex flex-col justify-between items-center flex-wrap">
                                    <div className="lg:flex lg:flex-row lg:justify-between items-center flex-wrap gap-5 not-sm:grid not-sm:grid-cols-2 sm:grid sm:grid-cols-2">
                                        <div className="flex flex-col justify-center bg-white rounded-lg px-2 py-2">
                                            <h1 className="">ID:</h1>
                                            <h1 className="">Data!</h1>
                                        </div>
                                        <div className="flex flex-col justify-center bg-white rounded-lg px-2 py-2">
                                            <h1 className="">Placa:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                        <div className="flex flex-col justify-center bg-white rounded-lg px-2 py-2">
                                            <h1 className="">Km Saída:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                        <div className="flex flex-col justify-center bg-white rounded-lg px-2 py-2">
                                            <h1 className="">Km Chegada:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                    </div>
                                    <div className="flex flex-row w-full mt-6 not-sm:flex-col bg-white rounded-lg px-2 py-2">
                                        <h1 className="mr-5">Itinerário: </h1>
                                        <h1>Data!</h1>
                                    </div>
                                    <div className="flex flex-row w-full mt-6 not-sm:flex-col bg-white rounded-lg px-2 py-2">
                                        <h1 className="mr-5">Motivo da Saída: </h1>
                                        <h1>Data!</h1>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between items-center not-sm:mt-5 not-sm:items-baseline">
                                    <div className="flex lg:flex-row justify-between items-center not-sm:flex-col not-sm:justify-center not-sm:items-baseline sm:flex-col">
                                        <div className="flex flex-col lg:mr-10 sm:mr-0 md:mr-0 not-sm:mr-0 bg-white rounded-lg px-2 py-2 sm:mt-5 lg:mt-0">
                                            <h1>Data e Hora de Saída:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                        <div className="flex flex-col not-sm:mt-5 sm:mt-5 md:mt-5 lg:mt-0 bg-white rounded-lg px-2 py-2">
                                            <h1>Data e Hora de Chegada:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                    </div>
                                    <div className="flex lg:flex-row justify-between items-center mt-5 not-sm:flex-col not-sm:items-baseline sm:flex-col md:flex-col">
                                        <div className="flex flex-row lg:mr-6 items-center not-sm:mr-0 not-sm:mb-5 sm:mb-5 md:mb-5 lg:mb-0 bg-white rounded-lg px-2 py-2">
                                            <h1 className="mr-2">ADM:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                        <div className="flex flex-row lg:mr-6 items-center not-sm:mr-0 not-sm:mb-5 sm:mb-5 md:mb-5 lg:mb-0 bg-white rounded-lg px-2 py-2">
                                            <h1 className="mr-2">Porteiro:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                        <div className="flex flex-row items-center not-sm:mr-0 bg-white rounded-lg px-2 py-2">
                                            <h1 className="mr-2">Motorista:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                    </div>
                                    <div className="flex lg:flex-row mt-5 not-sm:flex-col not-sm:grid not-sm:grid-cols-2 not-sm:gap-x-6 sm:flex-row w-full justify-end">
                                        <div>
                                            <GoodButton onClick={handleThirdMiniModal}>Finalizar</GoodButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Modal isOpen={modalIsOpen} onClose={handleOpenModal}>
                        <div className="flex flex-col justify-center items-center w-full px-7 py-4">
                            <div className="flex flex-col justify-center items-center w-full">
                                <h1 className="text-3xl">Cadastro de Locação</h1>
                                <form className="w-full mt-10 flex flex-col gap-6">
                                    <div className="flex justify-center"><ChoiceBox label={"Veículo"}>Escolha o Veículo!</ChoiceBox></div>
                                    <div className="flex justify-center"><ChoiceBox label={"Motorista"}>Escolha o Motorista!</ChoiceBox></div>
                                    <div className="flex justify-center"><Textarea label={"Itinerário"} placeholder={"Descreva o Itinerário"} maxLength={300} rows={3}></Textarea></div>
                                    <div className="flex justify-center"><Textarea label={"Motivo da Saída"} placeholder={"Descreva o motivo da Saída"} maxLength={300} rows={3}></Textarea></div>
                                </form>
                                <div className="flex flex-row justify-between items-center mt-10 w-[80%]">
                                    <BadButton onClick={handleOpenModal}>Cancelar</BadButton>
                                    <GoodButton onClick={handleFifthMiniModal}>Criar</GoodButton>
                                </div>
                            </div>
                            <div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </Modal>

                    <MiniModal isOpen={miniModal} onClose={handleMiniModal}>
                        <div className="flex flex-col justify-center items-center">
                            <div className="flex flex-col justify-center items-center text-lg flex-wrap">
                                <h1 className="mb-3">Tem certeza que deseja deletar a locação?</h1>
                                <h1>Data!</h1>
                            </div>
                            <div className="flex flex-row flex-wrap w-full justify-end mr-10 mt-7 gap-x-5">
                                <RightButton onClick={handleMiniModal}>Cancelar</RightButton>
                                <BadButton>Deletar</BadButton>
                            </div>
                        </div>

                    </MiniModal>

                    <MiniModal isOpen={secondMiniModal} onClose={handleSecondMiniModal}>
                        <div className="flex flex-col justify-center items-center">
                            <div className="flex flex-col justify-center items-center text-lg flex-wrap">
                                <h1 className="mb-3">Deseja iniciar a locação?</h1>
                                <h1 className="text-red-700">Essa ação é irreversível!</h1>
                            </div>
                            <div className="flex flex-row flex-wrap w-full justify-center mt-7 gap-x-5">
                                <GoodButton onClick={handleSecondMiniModal}>Cancelar</GoodButton>
                                <BadButton>Iniciar</BadButton>
                            </div>
                        </div>
                    </MiniModal>

                    <MiniModal isOpen={thirdMiniModal} onClose={handleThirdMiniModal}>
                        <div className="flex flex-col justify-center items-center">
                            <div className="flex flex-col justify-center items-center text-lg flex-wrap">
                                <h1 className="mb-3">Deseja Finalizar A Locação?</h1>
                                <h1 className="text-red-700">Essa ação é irreversível!</h1>
                            </div>
                            <div className="flex flex-row flex-wrap w-full justify-center mt-7 gap-x-5">
                                <GoodButton onClick={handleThirdMiniModal} >Cancelar</GoodButton>
                                <BadButton>Finalizar</BadButton>
                            </div>
                        </div>
                    </MiniModal>

                    <MiniModal isOpen={fourthMiniModal} onClose={handleFourthMiniModal}>
                        <div className="flex flex-col justify-center items-center">
                            <div className="flex flex-col justify-center items-center text-lg flex-wrap">
                                <h1 className="mb-3">Você não tem permissão pra isso!</h1>
                            </div>
                            <div className="flex flex-row flex-wrap w-full justify-center mt-7 gap-x-5">
                                <BadButton onClick={handleFourthMiniModal}>OK</BadButton>
                            </div>
                        </div>
                    </MiniModal>

                    <MiniModal isOpen={fifthMiniModal} onClose={handleFifthMiniModal}>
                        <div className="flex flex-col justify-center items-center">
                            <div className="flex flex-col justify-center items-center text-lg flex-wrap">
                                <h1 className="mb-3">Locação cadastrada com sucesso!</h1>
                            </div>
                            <div className="flex flex-row flex-wrap w-full justify-center mt-7 gap-x-5">
                                <GoodButton onClick={handleFifthMiniModal}>OK</GoodButton>
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