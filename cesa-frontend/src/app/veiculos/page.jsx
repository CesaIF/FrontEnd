"use client";

import DarkFooter from "../components/darkfooter";
import Footer from "../components/footer";
import Header from "../components/header";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
import Modal from "../components/modal";
import BadButton from "../components/badButton";
import GoodButton from "../components/goodButton";
import Input from "../components/input";
import { HiPencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import RightButton from "../components/rightButton";
import MiniModal from "../components/miniModal";

export default function Veiculos(){

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [miniModal, setMiniModal] = useState(false);
    const [secondModalIsOpen, setSecondModalIsOpen] = useState(false);
    const [secondMiniModal, setSecondMiniModal] = useState(false);

    function handleOpenModal(){
        setModalIsOpen(!modalIsOpen);
    }

    function handleMiniModal(){
        setMiniModal(!miniModal);
    }

    function handleOpenSecondModal(){
        setSecondModalIsOpen(!secondModalIsOpen);
    }

    function handleSecondMiniModal(){
        setSecondMiniModal(!secondMiniModal);
    }

    return(
        <>
        <div className="flex flex-col h-[100vh] selection:bg-green-500 selection:text-white">
            <Header></Header>
                <main className="flex flex-1 py-16 px-6 bg-white shrink-0 flex-col items-center font-outfit font-medium text-neutral-700">
                    <div className="w-[70%] mt-5">
                        <div>
                            <div className="flex flex-row justify-between items-center">
                                <h1 className="text-2xl">Veículos Cadastrados</h1>
                                <button className="py-2 px-2 hover:bg-neutral-200 rounded-2xl" onClick={handleOpenModal}><CiCirclePlus size={35}></CiCirclePlus></button>
                            </div>
                            <div className="bg-neutral-600 h-[1px] mt-4"></div>
                        </div>
                        <div className="grid lg:grid-cols-3 gap-4 not-sm:grid-cols-1 sm:grid-cols-1 md:grid-cols-2">
                            <div className="bg-neutral-100 border-b-8 border-r-8 border-l-2 border-t-2 mt-[2rem] rounded-2xl px-7 py-7 flex flex-col justify-between items-center w-full">
                                <div>
                                    <h1 className="text-[30px]">Data!</h1>
                                </div>
                                <div className="bg-neutral-700 h-[1px] w-full mt-5"></div>
                                <div className="flex flex-col justify-between items-center">
                                    <div className="flex flex-row mt-3 bg-white p-1 rounded-lg">
                                        <h1 className="mr-5">Cor:</h1>
                                        <h1>Data!</h1>
                                    </div>
                                    <div className="flex flex-row mt-3 bg-white p-1 rounded-lg">
                                        <h1 className="mr-5">Placa:</h1>
                                        <h1>Data!</h1>
                                    </div>
                                    <div className="flex flex-row mt-3 bg-white p-1 rounded-lg">
                                        <h1 className="mr-5">Km:</h1>
                                        <h1>Data!</h1>
                                    </div>
                                    <div className="flex flex-row mt-3 bg-white p-1 rounded-lg">
                                        <h1 className="mr-5">Ano:</h1>
                                        <h1>Data!</h1>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div className="">
                                        <BadButton onClick={handleMiniModal}><MdDelete></MdDelete></BadButton>
                                    </div>
                                    <div>
                                        <RightButton onClick={handleOpenSecondModal}><HiPencilAlt></HiPencilAlt></RightButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Modal isOpen={modalIsOpen} onClose={handleOpenModal}>
                        <div className="flex flex-col justify-center items-center w-full px-7 py-4">
                            <div className="flex flex-col justify-center items-center w-full">
                                <h1 className="text-3xl">Cadastrar Veículos</h1>
                                <form className="w-full mt-10 flex flex-col gap-6">
                                    <div className="flex justify-center"><Input type={"text"} placeholder={"\"Corsa\""} maxLength={20} label={"Modelo"}></Input></div>
                                    <div className="flex justify-center"><Input type={"text"} placeholder={"\"Amarelo\""} maxLength={20} label={"Cor"}></Input></div>
                                    <div className="flex justify-center"><Input type={"text"} placeholder={"\"ABC1234\""} maxLength={7} label={"Placa"}></Input></div>
                                    <div className="flex justify-center"><Input type={"number"} placeholder={"\"135000\""} maxLength={10} label={"Kilometragem"}></Input></div>
                                    <div className="flex justify-center"><Input type={"text"} placeholder={"\"2025\""} maxLength={4} label={"Ano de lançamento"}></Input></div>
                                </form>
                                <div className="flex flex-row justify-between items-center mt-10 w-[80%]">
                                    <BadButton onClick={handleOpenModal}>Cancelar</BadButton>
                                    <GoodButton onClick={() => {handleOpenModal(); handleSecondMiniModal();}}>Criar</GoodButton>
                                </div>
                            </div>
                        </div>
                    </Modal>

                    <Modal isOpen={secondModalIsOpen} onClose={handleOpenSecondModal}>
                        <div className="flex flex-col justify-center items-center w-full px-7 py-4">
                            <div className="flex flex-col justify-center items-center w-full">
                                <h1 className="text-3xl">Atualizar Veículos</h1>
                                <form className="w-full mt-10 flex flex-col gap-6">
                                    <div className="flex justify-center"><Input type={"text"} placeholder={"\"Corsa\""} maxLength={20} label={"Modelo"}></Input></div>
                                    <div className="flex justify-center"><Input type={"text"} placeholder={"\"Amarelo\""} maxLength={20} label={"Cor"}></Input></div>
                                    <div className="flex justify-center"><Input type={"text"} placeholder={"\"ABC1234\""} maxLength={7} label={"Placa"}></Input></div>
                                    <div className="flex justify-center"><Input type={"number"} placeholder={"\"135000\""} maxLength={10} label={"Kilometragem"}></Input></div>
                                    <div className="flex justify-center"><Input type={"text"} placeholder={"\"2025\""} maxLength={4} label={"Ano de lançamento"}></Input></div>
                                </form>
                                <div className="flex flex-row justify-between items-center mt-10 w-[80%]">
                                    <BadButton onClick={handleOpenSecondModal}>Cancelar</BadButton>
                                    <GoodButton onClick={() => {handleOpenSecondModal(); handleSecondMiniModal();}}>Atualizar</GoodButton>
                                </div>
                            </div>
                        </div>
                    </Modal>

                    <MiniModal isOpen={miniModal} onClose={handleMiniModal}>
                        <div className="flex flex-col justify-center items-center">
                            <div className="flex flex-col justify-center items-center text-lg flex-wrap">
                                <h1 className="mb-3">Tem certeza que deseja deletar o veículo:</h1>
                                <h1>Data!</h1>
                            </div>
                            <div className="flex flex-row flex-wrap w-full justify-center mt-7 gap-x-5">
                                <GoodButton onClick={handleMiniModal} >Cancelar</GoodButton>
                                <BadButton onClick={() => {handleMiniModal(); handleSecondMiniModal();}}>Deletar</BadButton>
                            </div>
                        </div>
                    </MiniModal>

                    <MiniModal isOpen={secondMiniModal} onClose={handleSecondMiniModal}>
                        <div className="flex flex-col justify-center items-center">
                            <div className="flex flex-col justify-center items-center text-lg flex-wrap">
                                <h1 className="mb-3">Veículo Cadastrado com Sucesso!</h1>
                            </div>
                            <div className="flex flex-row flex-wrap w-full justify-center mt-7 gap-x-5">
                                <GoodButton onClick={handleSecondMiniModal} >OK</GoodButton>
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