
// "use client" porque está rodando no lado do cliente.
"use client";

// todos os módulos usados na página.

//importação do dynamic para aumentar desempenho e renderizar dinamicamente os modais (evitam renderizar conteúdo não utilizado.)
import dynamic from "next/dynamic";
import Header from "./components/header";
import Footer from "./components/footer";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
const Modal = dynamic(() => import("./components/modal"), {ssr: false});
import Textarea from "./components/textarea";
import ChoiceBox from "./components/choicebox";
import BadButton from "./components/badButton";
import styles from './Dashboard.module.css';
import Ginput from "./components/gInput";

// exportação da página principal a ser chamada nas rotas.
export default function Dashboard(){

    // constante de abrem e fecham os modais.
    const [modalIsOpen, setModalIsOpen] = useState(false);
    // constante que abre e fecha os modais de confirmação.
    const [confirmacaoIsOpen, setConfirmacaoIsOpen] = useState(false);
    // constante que abre e fecha o menu lateral.
    const [isOpen, setIsOpen] = useState(true);
    // constante que altera o conteúdo dos modais.
    const [modalContent, setModalContent] = useState('cadastro');
    // constante que altera o conteúdo do modal de confirmação.
    const [confirmacao, setConfirmacao] = useState('cadastrado');
    // constante que altera o tipo de modal de expansão dos dados que vai inferir na funcionalidade deles.
    const [expandType, setExpandType] = useState(1);

    // função que renderiza os botões que dependerão do tipo do modal de expansão.
    function renderExpandType(){
        switch (expandType) {
            case 1:
                return(
                    <>
                        <BadButton colorHover={"#a3bc98"} textColor={"#48793c"} cor={"#d1dec7"} onClick={handleOpenModal}>Fechar</BadButton>
                        <BadButton onClick={() => {handleOpenModal(); handleConfirmacaoIsOpen(); setConfirmacao('deletar');}} colorHover={"#dd4f33"} cor={"#bd3b26"}>Deletar</BadButton>
                        <BadButton colorHover={"#181818"} cor={"black"} onClick={() => {setModalContent('edicao')}}>Editar</BadButton>
                        <BadButton onClick={() => {setConfirmacao('iniciar'); handleOpenModal(); handleConfirmacaoIsOpen();}} colorHover={"#769b6a"} cor={"#48793c"}>Iniciar</BadButton>
                    </>
                )

            case 2:
                return(
                    <>
                        <BadButton colorHover={"#a3bc98"} textColor={"#48793c"} cor={"#d1dec7"} onClick={handleOpenModal}>Fechar</BadButton>
                        <BadButton onClick={() => {setConfirmacao('finalizar'); handleOpenModal(); handleConfirmacaoIsOpen();}} colorHover={"#769b6a"} cor={"#48793c"}>Finalizar</BadButton>
                    </>
                )
        
            default:
                return null;
        }
    }

    
    // função que muda o texto dos modais de confirmação conforme necessário.
    // os cases são declarados nos onClick{}.
    function renderContentConfirmacao(){
        switch (confirmacao) {
            case 'cadastrado':
                return(
                    <>
                        <div className={styles.containerModal}>
                            <h1 className="mb-3">Locação cadastrada com sucesso!</h1>
                        </div>
                        <div className={styles.butaoForm}>
                            <BadButton onClick={handleConfirmacaoIsOpen}>OK</BadButton>
                        </div>
                    </>
                )
            
            case 'deletado':
                return(
                    <>
                        <div className={styles.containerModal}>
                            <h1 className="mb-3">Locação deletada com sucesso!</h1>
                        </div>
                        <div className={styles.butaoForm}>
                            <BadButton onClick={handleConfirmacaoIsOpen}>OK</BadButton>
                        </div>
                    </>
                )
            
            case 'editado':
                return(
                    <>
                        <div className={styles.containerModal}>
                            <h1 className="mb-3">Locação editada com sucesso!</h1>
                        </div>
                        <div className={styles.butaoForm}>
                            <BadButton onClick={handleConfirmacaoIsOpen}>OK</BadButton>
                        </div>
                    </>
                )

            case 'acesso':
                return(
                    <>
                        <div className={styles.containerModal}>
                            <h1 className="mb-3">Você não tem permissão pra isso!</h1>
                        </div>
                        <div className={styles.butaoForm}>
                            <BadButton onClick={handleConfirmacaoIsOpen}>OK</BadButton>
                        </div>
                    </>
                )

            case 'deletar':
                return(
                    <>
                        <div className={styles.containerModal}>
                            <h1 className="mb-3">Você tem certeza que quer deletar a locação?</h1>
                        </div>
                        <div className={styles.butaoForm}>
                            <BadButton onClick={handleConfirmacaoIsOpen}>Ok</BadButton>
                            <BadButton onClick={() => {handleConfirmacaoIsOpen(); setConfirmacao('deletado')}}>Deletar</BadButton>
                        </div>
                    </>
                )

            case 'iniciar':
                return(
                    <>
                        <div className={styles.containerModal}>
                            <h1 className="mb-3">Você tem certeza que quer iniciar a locação?</h1>
                        </div>
                        <div className={styles.butaoForm}>
                            <BadButton onClick={handleConfirmacaoIsOpen}>Ok</BadButton>
                            <BadButton onClick={() => {handleConfirmacaoIsOpen();}}>Deletar</BadButton>
                        </div>
                    </>
                )

            case 'finalizar':
                return(
                    <>
                        <div className={styles.containerModal}>
                            <h1 className="mb-3">Você tem certeza que quer finalizar a locação?</h1>
                        </div>
                        <div className={styles.butaoForm}>
                            <BadButton onClick={handleConfirmacaoIsOpen}>Ok</BadButton>
                            <BadButton onClick={() => {handleConfirmacaoIsOpen();}}>Deletar</BadButton>
                        </div>
                    </>
                )
        
            default:
                return null;
        }
    }

    // mudar conteúdo da modal dinamicamente quando algum content da modal for alterado.
    // cases são os tipos de conteúdos a serem exibidos, são definidos nos onClick={}.
    function renderContentModal(){
        switch (modalContent) {
            case 'cadastro':
                return(
                    <>
                        <div className={styles.containerModal}>
                            <div className={styles.containerInternoModal}>
                                <h1 className="text-3xl">Cadastro de Locação</h1>
                                <form className={styles.formAdd}>
                                    <div className={styles.input}><ChoiceBox label={"Veículo"}>Escolha o Veículo!</ChoiceBox></div>
                                    <div className={styles.input}><ChoiceBox label={"Motorista"}>Escolha o Motorista!</ChoiceBox></div>
                                    <div className={styles.input}><Textarea label={"Itinerário"} placeholder={"Descreva o Itinerário"} maxLength={300} rows={2}></Textarea></div>
                                    <div className={styles.input}><Textarea label={"Motivo da Saída"} placeholder={"Descreva o motivo da Saída"} maxLength={300} rows={2}></Textarea></div>
                                    <div className={styles.input}><Ginput label={"Data Prevista"} placeholder={"10/02/2020"} maxLength={300}></Ginput></div>
                                </form>
                                <div className={styles.butaoForm}>
                                    <BadButton textColor={"#48793c"} colorHover={"#a3bc98"} cor={"#d1dec7"} onClick={handleOpenModal}>Cancelar</BadButton>
                                    <BadButton colorHover={"#769b6a"} cor={"#48793c"} onClick={() => {handleOpenModal(); handleConfirmacaoIsOpen(); setConfirmacao('cadastrado')}}>Criar Locação</BadButton>
                                </div>
                            </div>
                        </div>
                    </>
                );
            
            case 'edicao':
                return(
                    <>
                        <div className={styles.containerModal}>
                            <div className={styles.containerInternoModal}>
                                <h1 className="text-3xl">Editar Locação</h1>
                                <form className={styles.formAdd}>
                                    <div className={styles.input}><ChoiceBox label={"Veículo"}>Escolha o Veículo!</ChoiceBox></div>
                                    <div className={styles.input}><ChoiceBox label={"Motorista"}>Escolha o Motorista!</ChoiceBox></div>
                                    <div className={styles.input}><Textarea label={"Itinerário"} placeholder={"Descreva o Itinerário"} maxLength={300} rows={3}></Textarea></div>
                                    <div className={styles.input}><Textarea label={"Motivo da Saída"} placeholder={"Descreva o motivo da Saída"} maxLength={300} rows={3}></Textarea></div>
                                    <div className={styles.input}><Ginput label={"Data Prevista"} placeholder={"10/02/2020"} maxLength={300}></Ginput></div>
                                </form>
                                <div className={styles.butaoForm}>
                                    <BadButton textColor={"#48793c"} colorHover={"#a3bc98"} cor={"#d1dec7"} onClick={handleOpenModal}>Cancelar</BadButton>
                                    <BadButton colorHover={"#769b6a"} cor={"#48793c"} onClick={() => {setConfirmacao('editado'); handleConfirmacaoIsOpen(); handleOpenModal();}}>Editar</BadButton>
                                </div>
                            </div>
                        </div>
                    </>
                )

            case 'expand':
                return(
                    <>
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
                        <div className={styles.butaoExpand}>
                            {renderExpandType()}
                        </div>
                    </>
                )

            default:
                return null;
        }
    }
    
    // função que abre e fecha os modais quando chamada.
    function handleOpenModal(){
        setModalIsOpen(!modalIsOpen);
    }

    function handleConfirmacaoIsOpen(){
        setConfirmacaoIsOpen(!confirmacaoIsOpen);
    }

    
    // Página principal que chama todos os outros processos.
    return(
        <>
            <div className={`${styles.containerGeral} ${isOpen ? styles.asideOpen : ''}`}>
                <Header background={"white"} onClick={() => {setIsOpen(!isOpen)}} isOpen={isOpen}></Header>
                <main className={styles.containerMain}>
                    <div className={styles.containerInternoUm}>
                        <div>
                            <div className={styles.containerTitle}>
                                <h1 className={styles.titleLocacao}>Locações Agendadas</h1>
                                <button className={styles.butaoAdd} onClick={() => {handleOpenModal(); setModalContent('cadastro');}}><CiCirclePlus size={35}></CiCirclePlus></button>
                            </div>
                            <div className={styles.line}></div>
                        </div>
                        <div className={styles.containerCard}>
                            <div onClick={() => {handleOpenModal(); setModalContent('expand'); setExpandType(1)}} className={styles.cardLocacao}>
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
                    <div className={styles.containerInternoUm}>
                        <div>
                            <div className={styles.containerTitle}>
                                <h1 className={styles.titleLocacao}>Locações Iniciadas</h1>
                            </div>
                            <div className={styles.line}></div>
                        </div>
                        
                        <div className={styles.containerCard}>
                            <div onClick={() => {handleOpenModal(); setModalContent('expand'); setExpandType(2);}} className={styles.cardLocacao}>
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

                    <Modal width={"1000px"} isOpen={modalIsOpen} onClose={handleOpenModal}>
                        {renderContentModal()}
                    </Modal>

                    <Modal isOpen={confirmacaoIsOpen} onClose={handleConfirmacaoIsOpen}>
                        <div className={styles.containerInternoUm}>
                            {renderContentConfirmacao()}
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