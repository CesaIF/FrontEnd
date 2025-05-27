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

export default function Motoristas(){

    const [createModal, setCreateModal] = useState(false);
    const [excludeModal, setExcludeModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [PopUpModal, setPopUpModal] = useState(false);

    function handleCreateModal(){
        setCreateModal(!createModal);
    }

    function handleExcludeModal(){
        setExcludeModal(!excludeModal);
    }

    function handleUpdateModal(){
        setUpdateModal(!updateModal);
    }

    function handlePopUpModal(){
        setPopUpModal(!PopUpModal);
    }

    return(
        <>
        <div className="flex flex-col h-[100vh] selection:bg-green-500 selection:text-white font-outfit font-medium">
            <Header></Header>
                <main className="flex flex-1 py-16 px-6 bg-white shrink-0 flex-col items-center font-outfit font-medium text-neutral-700">
                    <div className="w-[70%] mt-5">
                        <div>
                            <div className="flex flex-row justify-between items-center">
                                <h1 className="text-2xl">Motoristas Cadastrados</h1>
                                <button className="py-2 px-2 hover:bg-neutral-200 rounded-2xl" onClick={handleCreateModal}><CiCirclePlus size={35}></CiCirclePlus></button>
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
                                    <div className="flex flex-row mt-3 bg-white rounded-lg p-1">
                                        <h1 className="mr-5">CPF:</h1>
                                        <h1>Data!</h1>
                                    </div>
                                    <div className="flex flex-row mt-3 bg-white rounded-lg p-1">
                                        <h1 className="mr-5">Telefone:</h1>
                                        <h1>Data!</h1>
                                    </div>
                                    <div className="flex flex-row mt-3 bg-white rounded-lg p-1">
                                        <h1 className="mr-5">Email:</h1>
                                        <h1>Data!</h1>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div className="">
                                        <BadButton onClick={handleExcludeModal}><MdDelete></MdDelete></BadButton>
                                    </div>
                                    <div>
                                        <RightButton onClick={handleUpdateModal}><HiPencilAlt></HiPencilAlt></RightButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Modal isOpen={createModal} onClose={handleCreateModal}>
                        <div className="flex flex-col justify-center items-center w-full px-7 py-4">
                            <div className="flex flex-col justify-center items-center w-full">
                                <h1 className="text-3xl">Cadastrar Motorista</h1>
                                <form className="w-full mt-10 flex flex-col gap-6">
                                    <div className="flex justify-center"><Input type={"text"} placeholder={"\"12345678910\""} maxLength={11} label={"CPF"}></Input></div>
                                    <div className="flex justify-center"><Input type={"text"} placeholder={"\"José Silva Santos\""} maxLength={100} label={"Nome"}></Input></div>
                                    <div className="flex justify-center"><Input type={"text"} placeholder={"\"77987654321\""} maxLength={11} label={"Telefone"}></Input></div>
                                    <div className="flex justify-center"><Input type={"text"} placeholder={"\"exemplo@exemplo.com\""} maxLength={100} label={"Email"}></Input></div>
                                </form>
                                <div className="flex flex-row justify-between items-center mt-10 w-[80%]">
                                    <BadButton onClick={handleCreateModal}>Cancelar</BadButton>
                                    <GoodButton onClick={() => {handleCreateModal(); handlePopUpModal();}}>Criar</GoodButton>
                                </div>
                            </div>
                        </div>
                    </Modal>

                    <Modal isOpen={updateModal} onClose={handleUpdateModal}>
                        <div className="flex flex-col justify-center items-center w-full px-7 py-4">
                            <div className="flex flex-col justify-center items-center w-full">
                                <h1 className="text-3xl">Atualizar Motorista</h1>
                                <form className="w-full mt-10 flex flex-col gap-6">
                                    <div className="flex justify-center"><Input type={"text"} placeholder={"\"José Silva Santos\""} maxLength={100} label={"Nome"}></Input></div>
                                    <div className="flex justify-center"><Input type={"text"} placeholder={"\"77987654321\""} maxLength={11} label={"Telefone"}></Input></div>
                                    <div className="flex justify-center"><Input type={"text"} placeholder={"\"exemplo@exemplo.com\""} maxLength={100} label={"Email"}></Input></div>
                                </form>
                                <div className="flex flex-row justify-between items-center mt-10 w-[80%]">
                                    <BadButton onClick={handleUpdateModal}>Cancelar</BadButton>
                                    <GoodButton onClick={() => {handleUpdateModal(); handlePopUpModal();}}>Atualizar</GoodButton>
                                </div>
                            </div>
                        </div>
                    </Modal>

                    <MiniModal isOpen={excludeModal} onClose={handleExcludeModal}>
                        <div className="flex flex-col justify-center items-center">
                            <div className="flex flex-col justify-center items-center text-lg flex-wrap">
                                <h1 className="mb-3">Tem certeza que deseja deletar o Motorista:</h1>
                                <h1>Data!</h1>
                            </div>
                            <div className="flex flex-row flex-wrap w-full justify-center mt-7 gap-x-5">
                                <GoodButton onClick={handleExcludeModal}>Cancelar</GoodButton>
                                <BadButton onClick={() => {handleExcludeModal(); handlePopUpModal();}}>Deletar</BadButton>
                            </div>
                        </div>
                    </MiniModal>

                    <MiniModal isOpen={PopUpModal} onClose={handlePopUpModal}>
                        <div className="flex flex-col justify-center items-center">
                            <div className="flex flex-col justify-center items-center text-lg flex-wrap">
                                <h1 className="mb-3">Mensagem de confirmação!</h1>
                                <h1>Data!</h1>
                            </div>
                            <div className="flex flex-row flex-wrap w-full justify-center mt-7 gap-x-5">
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