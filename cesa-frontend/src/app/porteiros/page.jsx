"use client";

import dynamic from "next/dynamic";
import Header from "../components/header";
import Footer from "../components/footer";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
const Modal = dynamic(() => import("../components/modal"), {ssr: false});
import BadButton from "../components/badButton";
import styles from './Porteiro.module.css';
import Ginput from "../components/gInput";
import { useAuth } from "../hooks/useAuth";

export default function Porteiros(){
    useAuth();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [confirmacaoIsOpen, setConfirmacaoIsOpen] = useState(false);
    const [confirmacao, setConfirmacao] = useState('cadastrado');
    const [expandModal, setExpandModal] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const [updateModal, setUpdateModal] = useState(false);

    function renderConfirmacao(){
        switch (confirmacao) {
            case 'cadastrado':
                return(
                    <>
                    <div className={styles.containerInMini}>
                        <h1 className="mb-3">Porteiro cadastrado com sucesso!</h1>
                        <h1>Data!</h1>
                    </div>
                    <div className={styles.butaoForm}>
                        <BadButton colorHover={"#769b6a"} cor={"#48793c"} onClick={handleConfirmacaoIsOpen}>Ok</BadButton>
                    </div>
                    </>
                )

            case 'deletado':
                return(
                    <>
                    <div className={styles.containerInMini}>
                        <h1 className="mb-3">Porteiro deletado com sucesso!</h1>
                    </div>
                    <div className={styles.butaoForm}>
                        <BadButton colorHover={"#769b6a"} cor={"#48793c"} onClick={handleConfirmacaoIsOpen}>Ok</BadButton>
                    </div>
                    </>
                )

            case 'editado':
                return(
                    <>
                    <div className={styles.containerInMini}>
                        <h1 className="mb-3">Porteiro editado com sucesso!</h1>
                    </div>
                    <div className={styles.butaoForm}>
                        <BadButton colorHover={"#769b6a"} cor={"#48793c"} onClick={handleConfirmacaoIsOpen}>Ok</BadButton>
                    </div>
                    </>
                )

            case 'deletar':
                return(
                    <>
                    <div className={styles.containerInMini}>
                        <h1 className="mb-3">Tem certeza que deseja deletar?</h1>
                    </div>
                    <div className={styles.butaoForm}>
                        <BadButton textColor={"#48793c"} colorHover={"#a3bc98"} cor={"#d1dec7"} onClick={handleConfirmacaoIsOpen}>Cancelar</BadButton>
                        <BadButton colorHover={"#769b6a"} cor={"#48793c"} onClick={() => {setConfirmacao('deletado')}}>Deletar</BadButton>
                    </div>
                    </>
                )
        
            default:
                return null;
        }
    }
    
    function handleOpenModal(){
        setModalIsOpen(!modalIsOpen);
    }

    function handleConfirmacaoIsOpen(){
        setConfirmacaoIsOpen(!confirmacaoIsOpen);
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
                                <h1 className={styles.titleLocacao}>Porteiros Cadstrados</h1>
                                <button className={styles.butaoAdd} onClick={handleOpenModal}><CiCirclePlus size={35}></CiCirclePlus></button>
                            </div>
                            <div className={styles.line}></div>
                        </div>
                        
                        <div className={styles.containerCard}>
                            <div onClick={handleExpandModal} className={styles.card}>
                                <div>
                                    <span className={styles.titleCardTres}>Maria Araújo Santos</span>
                                </div>
                                <div>
                                    <span className={styles.titleCard}>#1</span>
                                </div>
                                <div>
                                    <span className={styles.titleCard}>987.654.321-01</span>
                                </div>
                                <div>
                                    <span className={styles.titleCard}>(77) 91234-5678</span>
                                </div>
                                <div>
                                    <span className={styles.titleCardDois}>maria@email.com</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Modal isOpen={modalIsOpen} onClose={handleOpenModal}>
                        <div className={styles.containerModal}>
                            <div className={styles.containerInternoModal}>
                                <h1 className="text-3xl">Cadastro de Porteiros</h1>
                                <form className={styles.formAdd}>
                                    <div className={styles.input}><Ginput type={"text"} placeholder={"\"João Barreto Hünnerbein\""} maxLength={200} label={"Nome"}></Ginput></div>
                                    <div className={styles.input}><Ginput type={"text"} placeholder={"\"joaobarreto@email.com\""} maxLength={200} label={"Email"}></Ginput></div>
                                    <div className={styles.input}><Ginput type={"text"} placeholder={"\"123.456.789-10\""} maxLength={14} label={"CPF"}></Ginput></div>
                                    <div className={styles.input}><Ginput type={"text"} placeholder={"\"(77) 12345-6789\""} maxLength={15} label={"Telefone"}></Ginput></div>
                                    <div className={styles.input}><Ginput type={"text"} placeholder={"\"Digite sua senha\""} maxLength={30} label={"Senha"}></Ginput></div>
                                </form>
                                <div className={styles.butaoForm}>
                                    <BadButton textColor={"#48793c"} colorHover={"#a3bc98"} cor={"#d1dec7"} onClick={handleOpenModal}>Cancelar</BadButton>
                                    <BadButton colorHover={"#769b6a"} cor={"#48793c"} onClick={() => {handleOpenModal(); handleConfirmacaoIsOpen(); setConfirmacao('cadastrado')}}>Cadastrar Porteiro</BadButton>
                                </div>
                            </div>
                        </div>
                    </Modal>

                    <Modal isOpen={updateModal} onClose={handleUpdateModal}>
                        <div className={styles.containerModal}>
                            <div className={styles.containerInternoModal}>
                                <h1 className="text-3xl">Atualizar Porteiros</h1>
                                <form className={styles.formAdd}>
                                    <div className={styles.input}><Ginput type={"text"} placeholder={"\"João Barreto Hünnerbein\""} maxLength={200} label={"Nome"}></Ginput></div>
                                    <div className={styles.input}><Ginput type={"text"} placeholder={"\"joaobarreto@email.com\""} maxLength={200} label={"Email"}></Ginput></div>
                                    <div className={styles.input}><Ginput type={"text"} placeholder={"\"(77) 12345-6789\""} maxLength={15} label={"Telefone"}></Ginput></div>
                                    <div className={styles.input}><Ginput type={"text"} placeholder={"\"Digite sua senha\""} maxLength={30} label={"Senha"}></Ginput></div>
                                </form>
                                <div className={styles.butaoForm}>
                                    <BadButton textColor={"#48793c"} colorHover={"#a3bc98"} cor={"#d1dec7"} onClick={handleUpdateModal} >Cancelar</BadButton>
                                    <BadButton colorHover={"#769b6a"} cor={"#48793c"} onClick={() => {handleUpdateModal(); handleConfirmacaoIsOpen(); setConfirmacao('editado')}}>Atualizar Porteiro</BadButton>
                                </div>
                            </div>
                        </div>
                    </Modal>

                    <Modal isOpen={expandModal} onClose={handleExpandModal}>
                        <div className={styles.containerExpand}>
                            <span className={styles.titleCardQuatro}>Painel de Porteiros</span>
                            <BadButton onClick={() => {handleExpandModal(); handleConfirmacaoIsOpen(); setConfirmacao('deletar')}} textColor={"#48793c"} colorHover={"#a3bc98"} cor={"#d1dec7"} buttonWidth={"400px"}>Deletar</BadButton>
                            <BadButton onClick={() => {handleExpandModal(); handleUpdateModal();}} colorHover={"#769b6a"} cor={"#48793c"} buttonWidth={"400px"}>Atualizar</BadButton>
                            <BadButton onClick={handleExpandModal} colorHover={"#fdbc4d"} cor={"#fca61d"} buttonWidth={"400px"}>Fechar</BadButton>
                        </div>
                    </Modal>

                    <Modal isOpen={confirmacaoIsOpen} onClose={handleConfirmacaoIsOpen}>
                        <div className={styles.containerModal}>
                            {renderConfirmacao()}
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