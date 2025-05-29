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
import './styles.css';

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
            <div className="container-geral">
                <Header></Header>
                <main className="container-main">
                    <div className="container-interno-um">
                        <div>
                            <div className="container-title">
                                <h1 className="title-locacao">Locações Agendadas</h1>
                                <button className="butao-add" onClick={handleOpenModal}><CiCirclePlus size={35}></CiCirclePlus></button>
                            </div>
                            <div className="line"></div>
                        </div>
                        <div>
                            <div className="card-locacao">
                                <div className="parte-um-card">
                                    <div className="container-um">
                                        <div className="container-l-um">
                                            <h1 className="">ID:</h1>
                                            <h1 className="">Data!</h1>
                                        </div>
                                        <div className="container-l-um">
                                            <h1 className="">Placa:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                        <div className="container-l-um">
                                            <h1 className="">Km Saída:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                        <div className="container-l-um">
                                            <h1 className="">Km Chegada:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                    </div>
                                    <div className="container-l-dois">
                                        <h1 className="mr-5">Itinerário: </h1>
                                        <h1>Data!</h1>
                                    </div>
                                    <div className="container-l-dois">
                                        <h1 className="mr-5">Motivo da Saída: </h1>
                                        <h1>Data!</h1>
                                    </div>
                                </div>
                                <div className="parte-um-card">
                                    <div className="container-dois">
                                        <div className="container-l-tres">
                                            <h1>Data e Hora de Saída:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                        <div className="container-l-tres">
                                            <h1>Data e Hora de Chegada:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                    </div>
                                    <div className="container-tres">
                                        <div className="container-l-quatro">
                                            <h1 className="mr-2">ADM:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                        <div className="container-l-quatro">
                                            <h1 className="mr-2">Porteiro:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                        <div className="container-l-quatro">
                                            <h1 className="mr-2">Motorista:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                    </div>
                                    <div className="container-quatro">
                                        <div>
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
                    <div className="container-interno-um">
                        <div>
                            <div className="container-title">
                                <h1 className="title-locacao">Locações Iniciadas</h1>
                            </div>
                            <div className="line"></div>
                        </div>
                        <div>
                            <div className="card-locacao">
                                <div className="parte-um-card">
                                    <div className="container-um">
                                        <div className="container-l-um">
                                            <h1 className="">ID:</h1>
                                            <h1 className="">Data!</h1>
                                        </div>
                                        <div className="container-l-um">
                                            <h1 className="">Placa:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                        <div className="container-l-um">
                                            <h1 className="">Km Saída:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                        <div className="container-l-um">
                                            <h1 className="">Km Chegada:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                    </div>
                                    <div className="container-l-dois">
                                        <h1 className="mr-5">Itinerário: </h1>
                                        <h1>Data!</h1>
                                    </div>
                                    <div className="container-l-dois">
                                        <h1 className="mr-5">Motivo da Saída: </h1>
                                        <h1>Data!</h1>
                                    </div>
                                </div>
                                <div className="container-parte-um">
                                    <div className="container-dois">
                                        <div className="container-l-tres">
                                            <h1>Data e Hora de Saída:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                        <div className="container-l-tres">
                                            <h1>Data e Hora de Chegada:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                    </div>
                                    <div className="container-tres">
                                        <div className="container-l-quatro">
                                            <h1 className="mr-2">ADM:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                        <div className="container-l-quatro">
                                            <h1 className="mr-2">Porteiro:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                        <div className="container-l-quatro">
                                            <h1 className="mr-2">Motorista:</h1>
                                            <h1>Data!</h1>
                                        </div>
                                    </div>
                                    <div className="container-quatro">
                                        <div>
                                            <GoodButton onClick={handleThirdMiniModal}>Finalizar</GoodButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Modal isOpen={modalIsOpen} onClose={handleOpenModal}>
                        <div className="container-modal">
                            <div className="container-interno-modal">
                                <h1 className="text-3xl">Cadastro de Locação</h1>
                                <form className="form-add">
                                    <div className="input"><ChoiceBox label={"Veículo"}>Escolha o Veículo!</ChoiceBox></div>
                                    <div className="input"><ChoiceBox label={"Motorista"}>Escolha o Motorista!</ChoiceBox></div>
                                    <div className="input"><Textarea label={"Itinerário"} placeholder={"Descreva o Itinerário"} maxLength={300} rows={3}></Textarea></div>
                                    <div className="input"><Textarea label={"Motivo da Saída"} placeholder={"Descreva o motivo da Saída"} maxLength={300} rows={3}></Textarea></div>
                                </form>
                                <div className="butao-form">
                                    <BadButton onClick={handleOpenModal}>Cancelar</BadButton>
                                    <GoodButton onClick={handleFifthMiniModal}>Criar</GoodButton>
                                </div>
                            </div>
                        </div>
                    </Modal>

                    <MiniModal isOpen={miniModal} onClose={handleMiniModal}>
                        <div className="container-minimodal">
                            <div className="container-in-mini">
                                <h1 className="mb-3">Tem certeza que deseja deletar a locação?</h1>
                                <h1>Data!</h1>
                            </div>
                            <div className="butao-minimodal">
                                <RightButton onClick={handleMiniModal}>Cancelar</RightButton>
                                <BadButton>Deletar</BadButton>
                            </div>
                        </div>

                    </MiniModal>

                    <MiniModal isOpen={secondMiniModal} onClose={handleSecondMiniModal}>
                        <div className="container-minimodal">
                            <div className="container-in-mini">
                                <h1 className="mb-3">Deseja iniciar a locação?</h1>
                                <h1 className="text-red-700">Essa ação é irreversível!</h1>
                            </div>
                            <div className="butao-minimodal">
                                <GoodButton onClick={handleSecondMiniModal}>Cancelar</GoodButton>
                                <BadButton>Iniciar</BadButton>
                            </div>
                        </div>
                    </MiniModal>

                    <MiniModal isOpen={thirdMiniModal} onClose={handleThirdMiniModal}>
                        <div className="container-minimodal">
                            <div className="container-in-mini">
                                <h1 className="mb-3">Deseja Finalizar A Locação?</h1>
                                <h1 className="text-red-700">Essa ação é irreversível!</h1>
                            </div>
                            <div className="butao-minimodal">
                                <GoodButton onClick={handleThirdMiniModal} >Cancelar</GoodButton>
                                <BadButton>Finalizar</BadButton>
                            </div>
                        </div>
                    </MiniModal>

                    <MiniModal isOpen={fourthMiniModal} onClose={handleFourthMiniModal}>
                        <div className="container-minimodal">
                            <div className="container-in-mini">
                                <h1 className="mb-3">Você não tem permissão pra isso!</h1>
                            </div>
                            <div className="butao-minimodal">
                                <BadButton onClick={handleFourthMiniModal}>OK</BadButton>
                            </div>
                        </div>
                    </MiniModal>

                    <MiniModal isOpen={fifthMiniModal} onClose={handleFifthMiniModal}>
                        <div className="container-minimodal">
                            <div className="container-in-mini">
                                <h1 className="mb-3">Locação cadastrada com sucesso!</h1>
                            </div>
                            <div className="butao-minimodal">
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