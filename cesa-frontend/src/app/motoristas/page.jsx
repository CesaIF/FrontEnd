"use client";

import dynamic from "next/dynamic";
import Header from "../components/header";
import Footer from "../components/footer";
import { CiCirclePlus } from "react-icons/ci";
import { useState, useEffect } from "react";
const Modal = dynamic(() => import("../components/modal"), { ssr: false });
import BadButton from "../components/badButton";
import styles from "./Motoristas.module.css";
import Ginput from "../components/gInput";
import { useAuth } from "../hooks/useAuth";

export default function Veiculos() {
  useAuth();

  const [motoristas, setMotoristas] = useState([]);
  const [motoristaEditando, setMotoristaEditando] = useState({
    nome: "",
    telefone: "",
    email: "",
  });

  useEffect(() => {
    const fetchMotoristas = async () => {
      try {
        const token = localStorage.getItem("token");
        const receberAPI = await fetch(
          `${process.env.NEXT_PUBLIC_LOCAL}/motoristas`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await receberAPI.json();
        console.log("Tipo de data:", typeof data); //Apagar isso depois 
        console.log("É array?", Array.isArray(data));//Apagar isso depois 
        console.log("Conteúdo:", data);//Apagar isso depois 
        setMotoristas(data);
      } catch (error) {
        console.error("Ero ao buscar motorista".error);
      }
    };
    fetchMotoristas();
  }, []);
  //Para realizar editar o motorista selecionado
  const handleEditarMotorista = (motorista) => {
    setMotoristaEditando(motorista);
    handleExpandModal();
    //handleUpdateModal(); // abre o modal
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmacaoIsOpen, setConfirmacaoIsOpen] = useState(false);
  const [confirmacao, setConfirmacao] = useState("cadastrado");
  const [expandModal, setExpandModal] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [updateModal, setUpdateModal] = useState(false);

  function renderConfirmacao() {
    switch (confirmacao) {
      case "cadastrado":
        return (
          <>
            <div className={styles.containerInMini}>
              <h1 className="mb-3">Motorista cadastrado com sucesso!</h1>
              <h1>Data!</h1>
            </div>
            <div className={styles.butaoForm}>
              <BadButton
                colorHover={"#769b6a"}
                cor={"#48793c"}
                onClick={handleConfirmacaoIsOpen}
              >
                Ok
              </BadButton>
            </div>
          </>
        );

      case "deletado":
        return (
          <>
            <div className={styles.containerInMini}>
              <h1 className="mb-3">Motorista deletado com sucesso!</h1>
            </div>
            <div className={styles.butaoForm}>
              <BadButton
                colorHover={"#769b6a"}
                cor={"#48793c"}
                onClick={handleConfirmacaoIsOpen}
              >
                Ok
              </BadButton>
            </div>
          </>
        );

      case "editado":
        return (
          <>
            <div className={styles.containerInMini}>
              <h1 className="mb-3">Motorista editado com sucesso!</h1>
            </div>
            <div className={styles.butaoForm}>
              <BadButton
                colorHover={"#769b6a"}
                cor={"#48793c"}
                onClick={handleConfirmacaoIsOpen}
              >
                Ok
              </BadButton>
            </div>
          </>
        );

      case "deletar":
        return (
          <>
            <div className={styles.containerInMini}>
              <h1 className="mb-3">Tem certeza que deseja deletar?</h1>
              <h1>Data!</h1>
            </div>
            <div className={styles.butaoForm}>
              <BadButton
                textColor={"#48793c"}
                colorHover={"#a3bc98"}
                cor={"#d1dec7"}
                onClick={handleConfirmacaoIsOpen}
              >
                Cancelar
              </BadButton>
              <BadButton
                colorHover={"#769b6a"}
                cor={"#48793c"}
                onClick={() => {
                  setConfirmacao("deletado");
                }}
              >
                Deletar
              </BadButton>
            </div>
          </>
        );

      default:
        return null;
    }
  }

  function handleConfirmacaoIsOpen() {
    setConfirmacaoIsOpen(!confirmacaoIsOpen);
  }

  function handleOpenModal() {
    setModalIsOpen(!modalIsOpen);
  }

  function handleExpandModal() {
    setExpandModal(!expandModal);
  }

  function handleUpdateModal() {
    setUpdateModal(!updateModal);
  }

  return (
    <>
      <div
        className={`${styles.containerGeral} ${isOpen ? styles.asideOpen : ""}`}
      >
        <Header
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          isOpen={isOpen}
        ></Header>
        <main className={styles.containerMain}>
          <div className={styles.containerInternoUm}>
            <div>
              <div className={styles.containerTitle}>
                <h1 className={styles.titleLocacao}>Motoristas Cadstrados</h1>
                <button className={styles.butaoAdd} onClick={handleOpenModal}>
                  <CiCirclePlus size={35}></CiCirclePlus>
                </button>
              </div>
              <div className={styles.line}></div>
            </div>

            <div className={styles.containerCard}>
              {motoristas.length === 0 ? (
                <p>Nenhum motorista cadastrado.</p>
              ) : (motoristas.map((motorista) => (
                  <div
                    key={motorista.cpf}
                    onClick={() => {handleEditarMotorista(motorista)}}
                    className={styles.card}
                  >
                    <div>
                      <span className={styles.titleCardTres}>
                        {motorista.nome}
                      </span>
                    </div>
                    <div>
                      <span className={styles.titleCard}>
                        {`CPF: `+motorista.cpf}</span>
                    </div>
                    <div>
                      <span className={styles.titleCard}>
                        {`Telefone: `+motorista.telefone}
                      </span>
                    </div>
                    <div>
                      <span className={styles.titleCardDois}>
                        {`Email: `+motorista.email}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          {/*Modal para a cadastrar motorista*/}
          <Modal isOpen={modalIsOpen} onClose={handleOpenModal}>
            <div className={styles.containerModal}>
              <div className={styles.containerInternoModal}>
                <h1 className="text-3xl">Cadastro de Motoristas</h1>
                <form className={styles.formAdd}>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={'"João Barreto Hünnerbein"'}
                      maxLength={200}
                      label={"Nome"}
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={'"joaobarreto@email.com"'}
                      maxLength={200}
                      label={"Email"}
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={'"123.456.789-10"'}
                      maxLength={14}
                      label={"CPF"}
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={'"(77) 12345-6789"'}
                      maxLength={15}
                      label={"Telefone"}
                    ></Ginput>
                  </div>
                </form>
                <div className={styles.butaoForm}>
                  <BadButton
                    textColor={"#48793c"}
                    colorHover={"#a3bc98"}
                    cor={"#d1dec7"}
                    onClick={handleOpenModal}
                  >
                    Cancelar
                  </BadButton>
                  <BadButton
                    colorHover={"#769b6a"}
                    cor={"#48793c"}
                    onClick={() => {
                      handleOpenModal();
                      handleConfirmacaoIsOpen();
                      setConfirmacao("cadastrado");
                    }}
                  >
                    Cadastrar Motoristas
                  </BadButton>
                </div>
              </div>
            </div>
          </Modal>

          {/*Modal para a atualizar motorista*/}

          <Modal isOpen={updateModal} onClose={handleUpdateModal}>
            <div className={styles.containerModal}>
              <div className={styles.containerInternoModal}>
                <h1 className="text-3xl">Atualizar Motoristas</h1>
                <form className={styles.formAdd}>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={'""'}
                      maxLength={200}
                      label={"Nome"}
                      value={motoristaEditando.nome}
                      onChange={(e) =>
                        setMotoristaEditando({
                          ...motoristaEditando,
                          nome: e.target.value,
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={'""'}
                      maxLength={200}
                      label={"Telefone"}
                      value={motoristaEditando.telefone}
                      onChange={(e) =>
                        setMotoristaEditando({
                          ...motoristaEditando,
                          telefone: e.target.value,
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={'""'}
                      maxLength={200}
                      label={"Email"}
                      value={motoristaEditando.email}
                      onChange={(e) =>
                        setMotoristaEditando({
                          ...motoristaEditando,
                          email: e.target.value,
                        })
                      }
                    ></Ginput>
                  </div>
                </form>
                <div className={styles.butaoForm}>
                  <BadButton
                    textColor={"#48793c"}
                    colorHover={"#a3bc98"}
                    cor={"#d1dec7"}
                    onClick={handleUpdateModal}
                  >
                    Cancelar
                  </BadButton>
                  <BadButton
                    colorHover={"#769b6a"}
                    cor={"#48793c"}
                    onClick={async () => {
                      const token = localStorage.getItem("token");
                      const response = await fetch(
                        `${process.env.NEXT_PUBLIC_LOCAL}/motoristas/${motoristaEditando.cpf}`,
                        {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify({
                            cpf: motoristaEditando.cpf,
                            nome: motoristaEditando.nome,
                            email: motoristaEditando.email,
                            telefone: motoristaEditando.telefone,
                          }),
                        }
                      );
                      const data = await response.json();
                      if (response.ok) {
                        alert("Motorista atualizado com sucesso! ");
                        handleUpdateModal();
                        handleConfirmacaoIsOpen();
                        setConfirmacao("editado");
                      } else {
                        alert(data.message || "Erro ao atualizar motorista");
                      }
                    }}
                  >
                    Atualizar Motorista
                  </BadButton>
                </div>
              </div>
            </div>
          </Modal>

          <Modal isOpen={expandModal} onClose={handleExpandModal}>
            <div className={styles.containerExpand}>
              <span className={styles.titleCardQuatro}>
                Painel de Motoristas
              </span>
              <BadButton
                onClick={() => {
                  handleExpandModal();
                  handleConfirmacaoIsOpen();
                  setConfirmacao("deletar");
                }}
                textColor={"#48793c"}
                colorHover={"#a3bc98"}
                cor={"#d1dec7"}
                buttonWidth={"400px"}
              >
                Deletar
              </BadButton>
              <BadButton
                onClick={() => {
                  handleExpandModal();
                  handleUpdateModal();
                }}
                colorHover={"#769b6a"}
                cor={"#48793c"}
                buttonWidth={"400px"}
              >
                Atualizar
              </BadButton>
              <BadButton
                onClick={handleExpandModal}
                colorHover={"#181818"}
                buttonWidth={"400px"}
              >
                Fechar
              </BadButton>
            </div>
          </Modal>

          <Modal isOpen={confirmacaoIsOpen} onClose={handleConfirmacaoIsOpen}>
            <div className={styles.containerModal}>{renderConfirmacao()}</div>
          </Modal>
        </main>
        <div className={styles.footer}>
          <Footer></Footer>
        </div>
      </div>
    </>
  );
}
