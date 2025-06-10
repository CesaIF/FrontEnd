"use client";

import dynamic from "next/dynamic";
import Header from "../components/header";
import Footer from "../components/footer";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
const Modal = dynamic(() => import("../components/modal"), {ssr: false});
import BadButton from "../components/badButton";
import styles from './Motoristas.module.css';
import Ginput from "../components/gInput";

export default function Veiculos(){

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [sureModal, setSureModal] = useState(false);
    const [popUpModal, setPopUpModal] = useState(false);
    const [expandModal, setExpandModal] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const [updateModal, setUpdateModal] = useState(false);
    
    function handleOpenModal(){
        setModalIsOpen(!modalIsOpen);
    }

    function handleSureModal(){
        setSureModal(!sureModal);
    }

    function handlePopUpModal(){
      setPopUpModal(!popUpModal);
    }

    function handleExpandModal(){
        setExpandModal(!expandModal);
    }

    function handleUpdateModal(){
        setUpdateModal(!updateModal);
    }

    return(
        <>
            <div className={`${styles.containerGeral} ${isOpen ? styles.asideOpen : ''}`}>
                <Header onClick={() => {setIsOpen(!isOpen)}} isOpen={isOpen}></Header>
                <main className={styles.containerMain}>
                    <div className={styles.containerInternoUm}>
                        <div>
                            <div className={styles.containerTitle}>
                                <h1 className={styles.titleLocacao}>Motoristas Cadstrados</h1>
                                <button className={styles.butaoAdd} onClick={handleOpenModal}><CiCirclePlus size={35}></CiCirclePlus></button>
                            </div>
                            <div className={styles.line}></div>
                        </div>
                        
                        <div className={styles.containerCard}>
                            <div onClick={handleExpandModal} className={styles.card}>
                                <div>
                                    <span className={styles.titleCardTres}>João Souza Brito</span>
                                </div>
                                <div>
                                    <span className={styles.titleCard}>#1</span>
                                </div>
                                <div>
                                    <span className={styles.titleCard}>123.456.789-10</span>
                                </div>
                                <div>
                                    <span className={styles.titleCard}>(77) 98765-4321</span>
                                </div>
                                <div>
                                    <span className={styles.titleCardDois}>joaosouzabrito@email.com</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Modal isOpen={modalIsOpen} onClose={handleOpenModal}>
                        <div className={styles.containerModal}>
                            <div className={styles.containerInternoModal}>
                                <h1 className="text-3xl">Cadastro de Motoristas</h1>
                                <form className={styles.formAdd}>
                                    <div className={styles.input}><Ginput type={"text"} placeholder={"\"João Barreto Hünnerbein\""} maxLength={200} label={"Nome"}></Ginput></div>
                                    <div className={styles.input}><Ginput type={"text"} placeholder={"\"joaobarreto@email.com\""} maxLength={200} label={"Email"}></Ginput></div>
                                    <div className={styles.input}><Ginput type={"text"} placeholder={"\"123.456.789-10\""} maxLength={14} label={"CPF"}></Ginput></div>
                                    <div className={styles.input}><Ginput type={"text"} placeholder={"\"(77) 12345-6789\""} maxLength={15} label={"Telefone"}></Ginput></div>
                                </form>
                                <div className={styles.butaoForm}>
                                    <BadButton textColor={"#48793c"} colorHover={"#a3bc98"} cor={"#d1dec7"} onClick={handleOpenModal}>Cancelar</BadButton>
                                    <BadButton colorHover={"#769b6a"} cor={"#48793c"} onClick={handlePopUpModal}>Cadastrar Motoristas</BadButton>
                                </div>
                            </div>
                        </div>
                    </Modal>

                    <Modal isOpen={updateModal} onClose={handleUpdateModal}>
                        <div className={styles.containerModal}>
                            <div className={styles.containerInternoModal}>
                                <h1 className="text-3xl">Atualizar Motoristas</h1>
                                <form className={styles.formAdd}>
                                    <div className={styles.input}><Ginput type={"text"} placeholder={"\"João Barreto Hünnerbein\""} maxLength={200} label={"Nome"}></Ginput></div>
                                    <div className={styles.input}><Ginput type={"text"} placeholder={"\"joaobarreto@email.com\""} maxLength={200} label={"Email"}></Ginput></div>
                                    <div className={styles.input}><Ginput type={"text"} placeholder={"\"(77) 12345-6789\""} maxLength={15} label={"Telefone"}></Ginput></div>
                                </form>
                                <div className={styles.butaoForm}>
                                    <BadButton textColor={"#48793c"} colorHover={"#a3bc98"} cor={"#d1dec7"} onClick={handleUpdateModal} >Cancelar</BadButton>
                                    <BadButton colorHover={"#769b6a"} cor={"#48793c"} onClick={() => {handleUpdateModal(); handlePopUpModal();}}>Atualizar Motorista</BadButton>
                                </div>
                            </div>
                        </div>
                    </Modal>

                    <Modal isOpen={expandModal} onClose={handleExpandModal}>
                        <div className={styles.containerExpand}>
                            <span className={styles.titleCardQuatro}>Painel de Motoristas</span>
                            <BadButton onClick={() => {handleSureModal(); handleExpandModal();}} textColor={"#48793c"} colorHover={"#a3bc98"} cor={"#d1dec7"} buttonWidth={"400px"}>Deletar</BadButton>
                            <BadButton onClick={() => {handleExpandModal(); handleUpdateModal();}} colorHover={"#769b6a"} cor={"#48793c"} buttonWidth={"400px"}>Atualizar</BadButton>
                            <BadButton onClick={handleExpandModal} colorHover={"#181818"} buttonWidth={"400px"}>Fechar</BadButton>
                        </div>
                    </Modal>

                    <Modal isOpen={sureModal} onClose={handleSureModal}>
                        <div className={styles.containerModal}>
                            <div className={styles.containerInMini}>
                                <h1 className="mb-3">Tem certeza que deseja deletar?</h1>
                                <h1>Data!</h1>
                            </div>
                            <div className={styles.butaoForm}>
                                <BadButton textColor={"#48793c"} colorHover={"#a3bc98"} cor={"#d1dec7"} onClick={handleSureModal}>Cancelar</BadButton>
                                <BadButton colorHover={"#769b6a"} cor={"#48793c"} onClick={() => {handleSureModal(); handlePopUpModal();}}>Deletar</BadButton>
                            </div>
                        </div>
                    </Modal>

                    <Modal isOpen={popUpModal} onClose={handlePopUpModal}>
                        <div className={styles.containerMinimodal}>
                            <div className={styles.containerInMini}>
                                <h1 className="mb-3">Veículo cadastrada com sucesso!</h1>
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