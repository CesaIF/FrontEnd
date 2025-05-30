"use client";

import dynamic from "next/dynamic";
import DarkFooter from "../components/darkfooter";
import Footer from "../components/footer";
import Header from "../components/header";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
import BadButton from "../components/badButton";
import GoodButton from "../components/goodButton";
import Input from "../components/input";
const Modal = dynamic(() => import("../components/modal"));
import { HiPencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import RightButton from "../components/rightButton";
const MiniModal = dynamic(() => import("../components/miniModal"), {ssr:false});
import styles from './Porteiro.module.css';

export default function Porteiros(){

    const [createModal, setCreateModal] = useState(false);
    const [excludeModal, setExcludeModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [popUpModal, setPopUpModal] = useState(false);

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
        setPopUpModal(!popUpModal);
    }

    return(
        <>
        <div className={styles.containerGeral}>
            <Header></Header>
                <main className={styles.containerMain}>
                    <div className={styles.containerInternoUm}>
                        <div>
                            <div className={styles.containerTitle}>
                                <h1 className={styles.titleLocacao}>Porteiros Cadastrados</h1>
                                <button className={styles.butaoAdd} onClick={handleCreateModal}><CiCirclePlus size={35}></CiCirclePlus></button>
                            </div>
                            <div className={styles.line}></div>
                        </div>
                        <div className={styles.containerCards}>
                            <div className={styles.card}>
                                <div>
                                    <h1 className={styles.titleCard}>Nome</h1>
                                </div>
                                <div className={styles.lineCard}></div>
                                <div className={styles.cardInterno}>
                                    <div className={styles.cardIUm}>
                                        <h1>CPF:</h1>
                                        <h1>Data!</h1>
                                    </div>
                                    <div className={styles.cardIUm}>
                                        <h1>Telefone:</h1>
                                        <h1>Data!</h1>
                                    </div>
                                    <div className={styles.cardIUm}>
                                        <h1>Email:</h1>
                                        <h1>Data!</h1>
                                    </div>
                                </div>
                                <div className={styles.cardButao}>
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
                        <div className={styles.containerModal}>
                            <div className={styles.containerInternoModal}>
                                <h1 className="text-3xl">Cadastrar Porteiro</h1>
                                <form className={styles.formAdd}>
                                    <div className={styles.input}><Input type={"text"} placeholder={"\"12345678910\""} maxLength={11} label={"CPF"}></Input></div>
                                    <div className={styles.input}><Input type={"text"} placeholder={"\"José Silva Santos\""} maxLength={10} label={"Nome"}></Input></div>
                                    <div className={styles.input}><Input type={"text"} placeholder={"\"exemplo@exemplo.com\""} maxLength={100} label={"Email"}></Input></div>
                                    <div className={styles.input}><Input type={"text"} placeholder={"\"77987654321\""} maxLength={11} label={"Telefone"}></Input></div>
                                    <div className={styles.input}><Input type={"password"} placeholder={"\"Sua Senha aqui\""} maxLength={30} label={"Senha"}></Input></div>
                                </form>
                                <div className={styles.butaoForm}>
                                    <BadButton onClick={handleCreateModal}>Cancelar</BadButton>
                                    <GoodButton onClick={() => {handleCreateModal(); handlePopUpModal();}}>Criar</GoodButton>
                                </div>
                            </div>
                        </div>
                    </Modal>

                    <Modal isOpen={updateModal} onClose={handleUpdateModal}>
                        <div className={styles.containerModal}>
                            <div className={styles.containerInternoModal}>
                                <h1 className="text-3xl">Atualizar Porteiro</h1>
                                <form className={styles.formAdd}>
                                    <div className={styles.input}><Input type={"text"} placeholder={"\"José Silva Santos\""} maxLength={10} label={"Nome"}></Input></div>
                                    <div className={styles.input}><Input type={"text"} placeholder={"\"exemplo@exemplo.com\""} maxLength={100} label={"Email"}></Input></div>
                                    <div className={styles.input}><Input type={"text"} placeholder={"\"77987654321\""} maxLength={11} label={"Telefone"}></Input></div>
                                    <div className={styles.input}><Input type={"password"} placeholder={"\"Sua Senha aqui\""} maxLength={30} label={"Senha"}></Input></div>
                                </form>
                                <div className={styles.butaoForm}>
                                    <BadButton onClick={handleUpdateModal}>Cancelar</BadButton>
                                    <GoodButton onClick={() => {handleUpdateModal(); handlePopUpModal();}}>Atualizar</GoodButton>
                                </div>
                            </div>
                        </div>
                    </Modal>

                    <MiniModal isOpen={excludeModal} onClose={handleExcludeModal}>
                        <div className={styles.containerMinimodal}>
                            <div className={styles.containerInMini}>
                                <h1 className="mb-3">Tem certeza que deseja deletar o Porteiro:</h1>
                                <h1>Data!</h1>
                            </div>
                            <div className={styles.butaoMinimodal}>
                                <GoodButton onClick={handleExcludeModal} >Cancelar</GoodButton>
                                <BadButton onClick={() => {handleExcludeModal(); handlePopUpModal();}}>Deletar</BadButton>
                            </div>
                        </div>
                    </MiniModal>

                    <MiniModal isOpen={popUpModal} onClose={handlePopUpModal}>
                        <div className={styles.containerMinimodal}>
                            <div className={styles.containerInMini}>
                                <h1 className="mb-3">Mensagem de confirmação!</h1>
                                <h1>Data!</h1>
                            </div>
                            <div className={styles.butaoMinimodal}>
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