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
import { useAuth } from "../hooks/useAuth";

export default function History(){
    useAuth();

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

                    <Modal width={"1000px"} isOpen={expandModal} onClose={handleExpandModal}>
                        <div className={styles.containerModalGeral}>
                            <div className={styles.modalExpand}>
                                <div className={styles.partUm}>

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

                                <div className={styles.partDois}>
                                    <div className={styles.itemPartUm}>
                                        <h1>Gestor:</h1>
                                        <h1>Data!</h1>
                                    </div>
                                    <div className={styles.itemPartUm}>
                                        <h1>Motorista:</h1>
                                        <h1>Data!</h1>
                                    </div>
                                </div>

                                <div className={styles.partDois}>
                                    <div className={styles.itemPartUm}>
                                        <h1>Porteiro Saída</h1>
                                        <h1>Data!</h1>
                                    </div>
                                    <div className={styles.itemPartUm}>
                                        <h1>Porteiro Chegada</h1>
                                        <h1>Data!</h1>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.butaoForm}>
                                <BadButton colorHover={"#a3bc98"} textColor={"#48793c"} cor={"#d1dec7"} onClick={handleExpandModal}>Fechar</BadButton>
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