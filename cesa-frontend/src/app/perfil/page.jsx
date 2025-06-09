"use client";

import dynamic from "next/dynamic";
import Header from "../components/header";
import Footer from "../components/footer";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
const Modal = dynamic(() => import("../components/modal"), {ssr: false});
import BadButton from "../components/badButton";
import styles from './Perfil.module.css';
import Ginput from "../components/gInput";

export default function Perfil(){

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
                                <h1 className={styles.titleLocacao}>Bem-vindo, João Gonçalves de Almeida</h1>
                            </div>
                            <div className={styles.line}></div>
                        </div>
                        
                        <div className={styles.containerCard}>
                            <div className={styles.card}>
                                <div>
                                    <h1 className={styles.titleCardTres}>Editar Dados</h1>
                                </div>
                                <div>
                                    <h1 className={styles.titleCard}>Edite seus dados e sua senha clicando abaixo:</h1>
                                </div>
                                <div>
                                    <BadButton onClick={handleUpdateModal} colorHover="#a3bc98" cor="#769b6a">Editar Dados</BadButton>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Modal isOpen={modalIsOpen} onClose={handleOpenModal}>
                        <div className={styles.containerModal}>
                            <div className={styles.containerInternoModal}>
                                <h1 className="text-3xl">Cadastrar Gestor</h1>
                                <form className={styles.formAdd}>
                                    <div className={styles.input}><Ginput type={"text"} placeholder={"\"João Barreto Hünnerbein\""} maxLength={200} label={"Nome"}></Ginput></div>
                                    <div className={styles.input}><Ginput type={"text"} placeholder={"\"joaobarreto@email.com\""} maxLength={200} label={"Email"}></Ginput></div>
                                    <div className={styles.input}><Ginput type={"text"} placeholder={"\"123.456.789-10\""} maxLength={14} label={"CPF"}></Ginput></div>
                                    <div className={styles.input}><Ginput type={"text"} placeholder={"\"(77) 12345-6789\""} maxLength={15} label={"Telefone"}></Ginput></div>
                                    <div className={styles.input}><Ginput type={"text"} placeholder={"\"Digite sua senha\""} maxLength={30} label={"Senha"}></Ginput></div>
                                </form>
                                <div className={styles.butaoForm}>
                                    <BadButton textColor={"#48793c"} colorHover={"#a3bc98"} cor={"#d1dec7"} onClick={handleOpenModal}>Cancelar</BadButton>
                                    <BadButton colorHover={"#769b6a"} cor={"#48793c"} onClick={handlePopUpModal}>Cadastrar Gestor</BadButton>
                                </div>
                            </div>
                        </div>
                    </Modal>

                    <Modal isOpen={updateModal} onClose={handleUpdateModal}>
                        <div className={styles.containerModal}>
                            <div className={styles.containerInternoModal}>
                                <h1 className="text-3xl">Atualizar Dados</h1>
                                <form className={styles.formAdd}>
                                    <div className={styles.input}><Ginput type={"text"} placeholder={"\"João Barreto Hünnerbein\""} maxLength={200} label={"Nome"}></Ginput></div>
                                    <div className={styles.input}><Ginput type={"text"} placeholder={"\"joaohunner@email.com\""} maxLength={200} label={"Email"}></Ginput></div>
                                    <div className={styles.input}><Ginput type={"text"} placeholder={"\"(77) 12345-6789\""} maxLength={15} label={"Telefone"}></Ginput></div>
                                    <div className={styles.input}><Ginput type={"text"} placeholder={"\"Digite sua senha\""} maxLength={30} label={"Senha"}></Ginput></div>
                                </form>
                                <div className={styles.butaoForm}>
                                    <BadButton textColor={"#48793c"} colorHover={"#a3bc98"} cor={"#d1dec7"} onClick={handleUpdateModal} >Cancelar</BadButton>
                                    <BadButton colorHover={"#769b6a"} cor={"#48793c"} onClick={() => {handleUpdateModal(); handlePopUpModal();}}>Atualizar Dados</BadButton>
                                </div>
                            </div>
                        </div>
                    </Modal>

                    <Modal isOpen={expandModal} onClose={handleExpandModal}>
                        <div className={styles.containerExpand}>
                            <span className={styles.titleCardQuatro}>Painel de Veículos</span>
                            <BadButton onClick={() => {handleSureModal(); handleExpandModal();}} textColor={"#48793c"} colorHover={"#a3bc98"} cor={"#d1dec7"} buttonWidth={"400px"}>Deletar</BadButton>
                            <BadButton onClick={() => {handleExpandModal(); handleUpdateModal();}} colorHover={"#769b6a"} cor={"#48793c"} buttonWidth={"400px"}>Atualizar</BadButton>
                            <BadButton onClick={handleExpandModal} colorHover={"#fdbc4d"} cor={"#fca61d"} buttonWidth={"400px"}>Fechar</BadButton>
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