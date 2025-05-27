"use client";

import DarkFooter from "../components/darkfooter";
import Footer from "../components/footer";
import Header from "../components/header";
import GoodButton from "../components/goodButton";
import BadButton from "../components/badButton";
import MiniModal from "../components/miniModal";
import Modal from "../components/modal";
import { useState } from "react";
import Input from "../components/input";

export default function Perfil(){

    const [popUpModal, setPopUpModal] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);

    function handlePopUpModal(){
        setPopUpModal(!popUpModal);
    }

    function handleCreateModal(){
        setCreateModal(!createModal);
    }

    function handleUpdateModal(){
        setUpdateModal(!updateModal);
    }

    return(
        <>
        <div className="flex flex-col h-[100vh] selection:bg-green-500 selection:text-white">
            <Header></Header>
            <main className="flex flex-1 py-16 px-6 bg-white shrink-0 flex-col items-center font-outfit font-medium text-neutral-700">
                <div className="w-[70%] mt-5">
                    <div className="flex flex-col w-full justify-center items-center text-4xl">
                        <div className="flex flex-row w-full justify-center">
                            <h1 className="mr-5">Bem vindo,</h1>
                            <h1>Data!</h1>
                        </div>
                        <div className="w-full bg-neutral-700 h-[1px] mt-5"></div>
                        <div className="grid grid-cols-3 not-sm:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-white border-b-8 border-r-8 border-l-2 border-t-2 mt-[2rem] rounded-2xl px-7 py-7 flex flex-col justify-between items-center w-full text-lg">
                                <h1>Altere seus dados:</h1>
                                <h1 className="mt-4 mb-4">Altere seu nome, CPF, senha ou qualquer outro dado.</h1>
                                <GoodButton onClick={handleUpdateModal}>Alterar Dados</GoodButton>
                            </div>

                            <div className="bg-white border-b-8 border-r-8 border-l-2 border-t-2 mt-[2rem] rounded-2xl px-7 py-7 flex flex-col justify-between items-center w-full text-lg">
                                <h1>Cadastre um novo Gestor</h1>
                                <h1 className="mt-4 mb-4">Cadstre um novo Gestor direto do seu perfil.</h1>
                                <GoodButton onClick={handleCreateModal}>Cadastrar Gestor</GoodButton>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal isOpen={createModal} onClose={handleCreateModal}>
                    <div className="flex flex-col justify-center items-center w-full px-7 py-4">
                        <div className="flex flex-col justify-center items-center w-full">
                            <h1 className="text-3xl">Criar Gestor</h1>
                            <form className="w-full mt-10 flex flex-col gap-6">
                                <div className="flex justify-center"><Input type={"text"} placeholder={"\"José Silva Santos\""} maxLength={10} label={"Nome"}></Input></div>
                                <div className="flex justify-center"><Input type={"text"} placeholder={"\"exemplo@exemplo.com\""} maxLength={100} label={"Email"}></Input></div>
                                <div className="flex justify-center"><Input type={"text"} placeholder={"\"77987654321\""} maxLength={11} label={"Telefone"}></Input></div>
                                <div className="flex justify-center"><Input type={"text"} placeholder={"\"1234678910\""} maxLength={11} label={"CPF"}></Input></div>
                                <div className="flex justify-center"><Input type={"password"} placeholder={"\"Sua Senha aqui\""} maxLength={30} label={"Senha"}></Input></div>
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
                            <h1 className="text-3xl">Atualizar Dados</h1>
                            <form className="w-full mt-10 flex flex-col gap-6">
                                <div className="flex justify-center"><Input type={"text"} placeholder={"\"José Silva Santos\""} maxLength={10} label={"Nome"}></Input></div>
                                <div className="flex justify-center"><Input type={"text"} placeholder={"\"exemplo@exemplo.com\""} maxLength={100} label={"Email"}></Input></div>
                                <div className="flex justify-center"><Input type={"text"} placeholder={"\"77987654321\""} maxLength={11} label={"Telefone"}></Input></div>
                                <div className="flex justify-center"><Input type={"password"} placeholder={"\"Sua Senha aqui\""} maxLength={30} label={"Senha"}></Input></div>
                            </form>
                            <div className="flex flex-row justify-between items-center mt-10 w-[80%]">                                    
                                <BadButton onClick={handleUpdateModal}>Cancelar</BadButton>
                                <GoodButton onClick={() => {handleUpdateModal(); handlePopUpModal();}}>Criar</GoodButton>
                            </div>
                        </div>
                    </div>
                </Modal>

                <MiniModal isOpen={popUpModal} onClose={handlePopUpModal}>
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

                <MiniModal isOpen={popUpModal} onClose={handlePopUpModal}>
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