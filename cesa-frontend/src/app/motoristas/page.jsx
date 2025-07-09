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

export default function Motoristas() {
  useAuth();

  const [motoristas, setMotoristas] = useState([]);
  const [motoristaEditando, setMotoristaEditando] = useState({
    nome: "",
    telefone: "",
    email: "",
  });
  const [novoMotorista, setNovoMotorista] = useState({
    portaria: "",
    nome: "",
    telefone: "",
    email: "",
    vencimento: "",
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
        setMotoristas(data);
      } catch (error) {
        console.error("Erro ao buscar motorista", error);
      }
    };
    fetchMotoristas();
  }, []);
  //Para realizar editar o motorista selecionado
  const handleEditarMotorista = (motorista) => {
    setMotoristaEditando(motorista);
    handleExpandModal();
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deletarIsOpen, setDeletarIsOpen] = useState(false);
  const [expandModal, setExpandModal] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [updateModal, setUpdateModal] = useState(false);
  const [conteudo, setConteudo] = useState("");
  const [noticeIsOpen, setNoticeIsOpen] = useState(false);

  function handleNoticeIsOpen() {
    setNoticeIsOpen(!noticeIsOpen);
  }

  function handleDeletarIsOpen() {
    setDeletarIsOpen(!deletarIsOpen);
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
              ) : (
                motoristas.map((motorista) => (
                  <div
                    key={motorista.cpf}
                    onClick={() => {
                      handleEditarMotorista(motorista);
                    }}
                    className={styles.card}
                  >
                    <div>
                      <span className={styles.titleCardTres}>
                        {motorista.nome}
                      </span>
                    </div>
                    <div>
                      <span className={styles.titleCard}>
                        {`CPF: ` + motorista.cpf}
                      </span>
                    </div>
                    <div>
                      <span className={styles.titleCard}>
                        {`Telefone: ` + motorista.telefone}
                      </span>
                    </div>
                    <div>
                      <span className={styles.titleCardDois}>
                        {`Email: ` + motorista.email}
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
                      placeholder={'24/2025'}
                      maxLength={200}
                      label={"Portaria"}
                      value={novoMotorista.portaria}
                      onChange={(e) =>
                        setNovoMotorista({
                          ...novoMotorista,
                          portaria: e.target.value,
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={'Admael Santos'}
                      maxLength={200}
                      label={"Nome"}
                      value={novoMotorista.nome}
                      onChange={(e) =>
                        setNovoMotorista({
                          ...novoMotorista,
                          nome: e.target.value,
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={'(77) 9 9988-8155'}
                      maxLength={200}
                      label={"telefone"}
                      value={novoMotorista.telefone}
                      mask={"(00) 0 0000-0000"}
                      onChange={(e) =>
                        setNovoMotorista({
                          ...novoMotorista,
                          telefone: e.target.value,
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={'user@hotmail.com'}
                      maxLength={200}
                      label={"Email"}
                      value={novoMotorista.email}
                      onChange={(e) =>
                        setNovoMotorista({
                          ...novoMotorista,
                          email: e.target.value,
                        })
                      }
                    ></Ginput>
                    <Ginput
                      type={"text"}
                      placeholder={'09/07/2025'}
                      maxLength={200}
                      label={"Vencimentos da portaria"}
                      value={novoMotorista.portaria}
                      onChange={(e) =>
                        setNovoMotorista({
                          ...novoMotorista,
                          vencimento: e.target.value,
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
                    onClick={handleOpenModal}
                  >
                    Cancelar
                  </BadButton>
                  <BadButton
                    colorHover={"#769b6a"}
                    cor={"#48793c"}
                    onClick={async () => {
                      const token = localStorage.getItem("token");
                      const response = await fetch(
                        `${process.env.NEXT_PUBLIC_LOCAL}/motoristas`,
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify(novoMotorista),
                        }
                      );

                      if (response.ok) {
                        const motoristaCadastrado = await response.json();
                        setMotoristas((prev) => [...prev, motoristaCadastrado]);

                        handleOpenModal();
                        handleNoticeIsOpen();
                        setConteudo("Motorista cadastrado com sucesso!");

                        setNovoMotorista({
                          portaria: "",
                          nome: "",
                          telefone: "",
                          email: "",
                        });
                      } else {
                        const mensage = await response.json();
                        handleNoticeIsOpen();
                        setConteudo(mensage.error || "Erro ao cadastrar motorista");
                      }
                    }}
                  >
                    Cadastrar 
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
                      placeholder={''}
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
                      placeholder={''}
                      maxLength={200}
                      label={"Telefone"}
                      value={motoristaEditando.telefone}
                      mask={"(00) 0 0000-0000"}
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
                      placeholder={''}
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
                        setMotoristas((prevMotoristas) =>
                          prevMotoristas.map((m) =>
                            m.cpf === motoristaEditando.cpf
                              ? motoristaEditando
                              : m
                          )
                        );
                        handleUpdateModal();
                        handleNoticeIsOpen();
                        setConteudo("Motorista editado com sucesso!");
                      } else {
                        handleNoticeIsOpen();
                        setConteudo(data.error || "Erro ao atualizar motorista");
                      }
                    }}
                  >
                    Atualizar 
                  </BadButton>
                </div>
              </div>
            </div>
          </Modal>

          {/*Modal para o painel */}
          <Modal isOpen={expandModal} onClose={handleExpandModal}>
            <div className={styles.containerExpand}>
              <span className={styles.titleCardQuatro}>
                Painel de Motoristas
              </span>
              <BadButton
                onClick={() => {
                  handleExpandModal();
                  handleDeletarIsOpen();
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

          <Modal isOpen={deletarIsOpen} onClose={handleDeletarIsOpen}>
            <div className={styles.containerModal}>
              <div className={styles.containerInMini}>
              <h1 className="mb-3">Tem certeza que deseja deletar?</h1>
            </div>
            <div className={styles.butaoForm}>
              <BadButton
                textColor={"#48793c"}
                colorHover={"#a3bc98"}
                cor={"#d1dec7"}
                onClick={handleDeletarIsOpen}
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
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  if (response.ok) {
                    setMotoristas((prev) =>
                      prev.filter((m) => m.cpf !== motoristaEditando.cpf)
                    );
                    handleNoticeIsOpen();
                    handleDeletarIsOpen();
                    setConteudo("Motorista deletado com sucesso!");
                  } else {
                    const erro = await response.json();
                    handleNoticeIsOpen();
                    setConteudo(erro.message || "Erro ao deletar motorista. ");
                  }
                }}
              >
                Deletar
              </BadButton>
            </div>
            </div>
          </Modal>

          <Modal width={"400px"} isOpen={noticeIsOpen} onClose={handleNoticeIsOpen}>
            <div className={styles.containerModal}>
              <div className={styles.containerInMini}>
                <h1>{conteudo}</h1>
              </div>
              <div className={styles.butaoMini}>
                <BadButton
                  colorHover={"#769b6a"}
                  cor={"#48793c"}
                  onClick={handleNoticeIsOpen}
                >
                  Ok
                </BadButton>
              </div>
            </div>
          </Modal>
        </main>
        <div className={styles.footer}>
          <Footer></Footer>
        </div>
      </div>
    </>
  );
}
