"use client";

import Header from "../components/header";
import Footer from "../components/footer";
import DarkFooter from "../components/darkfooter";
import { CiCirclePlus } from "react-icons/ci";
import CardLocacao from "../components/cardLocacao";
import { useState } from "react";
import Modal from "../components/modal";
import Input from "../components/input";
import Textarea from "../components/textarea";

export default function Dashboard(){

    const [modalIsOpen, setModalIsOpen] = useState(false);

    function handleOpenModal(){
        setModalIsOpen(!modalIsOpen);
    }

    return(
        <>
            <div className="flex flex-col h-[100vh]">
                <Header></Header>
                <main className="flex flex-1 py-16 px-6 bg-white shrink-0 flex-col items-center font-cormorant text-neutral-700">
                    <div className="w-[60%] mt-5">
                        <div>
                            <div className="flex flex-row justify-between items-center">
                                <h1 className="text-2xl">Locações Agendadas</h1>
                                <button className="py-2 px-2 hover:bg-neutral-200 rounded-2xl" onClick={handleOpenModal}><CiCirclePlus size={35}></CiCirclePlus></button>
                            </div>
                            <div className="bg-neutral-600 h-[1px] mt-4"></div>
                        </div>
                        <div>
                            <CardLocacao></CardLocacao>
                        </div>
                    </div>
                    <div className="w-[60%] mt-16">
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

                    <Modal isOpen={modalIsOpen} onClose={handleOpenModal}>
                        <div className="flex flex-col justify-center items-center w-full">
                            <div className="flex flex-col justify-center items-center w-full">
                                <div className="flex flex-col w-full justify-center items-center">
                                    <form className="w-full">
                                        <div><Input></Input></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </form>
                                </div>
                            </div>
                            <div>
                                <div></div>
                                <div></div>
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