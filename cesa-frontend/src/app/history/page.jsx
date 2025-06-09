"use client";

import dynamic from "next/dynamic";
import Header from "../components/header";
import Footer from "../components/footer";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
const Modal = dynamic(() => import("../components/modal"), {ssr: false});
import Textarea from "../components/textarea";
import ChoiceBox from "../components/choicebox";
import BadButton from "../components/badButton";
import RightButton from "../components/rightButton";
import styles from './History.module.css';

export default function History(){

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [sureModal, setSureModal] = useState(false);
    const [privilegeModal, setPrivilegeModal] = useState(false);
    const [popUpModal, setPopUpModal] = useState(false);
    const [expandModal, setExpandModal] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    
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
            <div className={`${styles.containerGeral} ${isOpen ? styles.asideOpen : ''}`}>
                <Header onClick={() => {setIsOpen(!isOpen)}} isOpen={isOpen}></Header>
                <main className={styles.containerMain}>
                    <div className={styles.containerInternoUm}>
                        <div>
                            <div className={styles.containerTitle}>
                                <h1 className={styles.titleLocacao}>Locações Finalizadas</h1>
                                <button className={styles.butaoAdd} onClick={handleOpenModal}><CiCirclePlus size={35}></CiCirclePlus></button>
                            </div>
                            <div className={styles.line}></div>
                        </div>
                        <div className={styles.containerCard}>
                            <div onClick={handleExpandModal} className={styles.cardLocacao}>
                                <div className={styles.img}>
                                    <img src="https://i.postimg.cc/Fs7ZnVTn/20250603-1649-Cute-Black-Car-simple-compose-01jwvnew1ef6xa5kp9jpyq56mk.png"></img>
                                </div>
                                <div>
                                    <div className={styles.containerTitles}>
                                        <span className={styles.titleCard}>#2</span>
                                    </div>
                                    <div>
                                        <span className={styles.titleCard}>Fiat - Siena</span>
                                    </div>
                                    <div>
                                        <span className={styles.titleCardDois}>Natal - Rio Grande do Norte</span>
                                    </div>
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
                                    <BadButton textColor={"#48793c"} colorHover={"#a3bc98"} cor={"#d1dec7"} onClick={handleOpenModal}>Cancelar</BadButton>
                                    <BadButton colorHover={"#769b6a"} cor={"#48793c"} onClick={handlePopUpModal}>Criar Locação</BadButton>
                                </div>
                            </div>
                        </div>
                    </Modal>

                    <Modal isOpen={expandModal} onClose={handleExpandModal}>
                        <div className={styles.modalExpand}>
                            <div className={styles.partUm}>
                                <div className={styles.itemPartUm}>
                                    <h1 className="h1">Id:</h1>
                                    <h1 className="h1">Data!</h1>
                                </div>

                                <div className={styles.itemPartUm}>
                                    <h1 className="h1">Placa:</h1>
                                    <h1 className="h1">Data!</h1>
                                </div>

                                <div className={styles.itemPartUm}>
                                    <h1 className="h1">Km Saída:</h1>
                                    <h1 className="h1">Data!</h1>
                                </div>

                                <div className={styles.itemPartUm}>
                                    <h1 className="h1">Km Chegada:</h1>
                                    <h1 className="h1">Data!</h1>
                                </div>
                            </div>

                            <div className={styles.itemUm}>
                                <div className={styles.itemInternoUm}>
                                    <h1>Itinerário:</h1>
                                    <h1>Data!</h1>
                                </div>
                            </div>

                            <div className={styles.itemUm}>
                                <div className={styles.itemInternoUm}>
                                    <h1>Motivo da Saída:</h1>
                                    <h1>Data!</h1>
                                </div>
                            </div>

                            <div className={styles.partDois}>
                                <div className={styles.itemPartUm}>
                                    <h1>Data e Hora de Saída:</h1>
                                    <h1>Data!</h1>
                                </div>
                                <div className={styles.itemPartUm}>
                                    <h1>Data e Hora de Chegada:</h1>
                                    <h1>Data!</h1>
                                </div>
                            </div>

                            <div className={styles.partTres}>
                                <div className={styles.itemPartUm}>
                                    <h1>Gestor:</h1>
                                    <h1>Data!</h1>
                                </div>
                                <div className={styles.itemPartUm}>
                                    <h1>Porteiro:</h1>
                                    <h1>Data!</h1>
                                </div>
                                <div className={styles.itemPartUm}>
                                    <h1>Motorista:</h1>
                                    <h1>Data!</h1>
                                </div>
                            </div>
                            <div className={styles.butaoForm}>
                                <BadButton colorHover={"#fdbc4d"} cor={"#fca61d"} onClick={handleExpandModal}>OK</BadButton>
                            </div>
                        </div>
                    </Modal>

                    <Modal isOpen={sureModal} onClose={handleSureModal}>
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
                    </Modal>

                    <Modal isOpen={privilegeModal} onClose={handlePrivilegeModal}>
                        <div className={styles.containerMinimodal}>
                            <div className={styles.containerInMini}>
                                <h1 className="mb-3">Você não tem permissão pra isso!</h1>
                            </div>
                            <div className={styles.butaoMinimodal}>
                                <BadButton onClick={handlePrivilegeModal}>OK</BadButton>
                            </div>
                        </div>
                    </Modal>

                    <Modal isOpen={popUpModal} onClose={handlePopUpModal}>
                        <div className={styles.containerMinimodal}>
                            <div className={styles.containerInMini}>
                                <h1 className="mb-3">Locação cadastrada com sucesso!</h1>
                            </div>
                            <div className={styles.butaoMinimodal}>
                                <BadButton onClick={handlePopUpModal}>OK</BadButton>
                            </div>
                        </div>
                    </Modal>

                </main>
                <div className={styles.footer}>
                    <Footer></Footer>
                </div>
            </div>
        </>
    )
}