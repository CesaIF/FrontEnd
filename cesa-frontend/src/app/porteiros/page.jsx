"use client";

import dynamic from "next/dynamic";
import Header from "../components/header";
import Footer from "../components/footer";
import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
const Modal = dynamic(() => import("../components/modal"), { ssr: false });
import BadButton from "../components/badButton";
import styles from "./Porteiro.module.css";
import Ginput from "../components/gInput";
import { useAuth } from "../hooks/useAuth";

export default function Porteiros() {
  useAuth();
  const [porteiro, setPorteiro] = useState([]);
  const [porteiroEditando, setPorteiroEditando] = useState({
    email: "",
    nome: "",
    telefone: "",
    role: "",
  });
  const [novoPorteiro, setnovoPorteiro] = useState({
    cpf: "",
    email: "",
    nome: "",
    senha: "",
    telefone: "",
    role: "",
  });

  useEffect(() => {
    const fetchPorteiros = async () => {
      try {
        const toke = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_LOCAL}/usuario`,
          {
            headers: {
              Authorization: `Bearer ${toke}`,
            },
          }
        );
        const data = await response.json();
        setPorteiro(data);
      } catch (error) {
        console.error("Erro ao buscar porteiros:", error);
      }
    };
    fetchPorteiros();
  }, []);

  const handleEditarPorteiro = (porteiro) => {
    setPorteiroEditando(porteiro);
    handleExpandModal();
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
              <h1 className="mb-3">Porteiro cadastrado com sucesso!</h1>
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
              <h1 className="mb-3">Porteiro deletado com sucesso!</h1>
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
              <h1 className="mb-3">Porteiro editado com sucesso!</h1>
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
                onClick={async () => {
                  const token = localStorage.getItem("token");
                  const response = await fetch(
                    `${process.env.NEXT_PUBLIC_LOCAL}/usuario/${porteiroEditando.cpf}`,
                    {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  if (response.ok) {
                    setPorteiro((prev) =>
                      prev.filter((m) => m.cpf !== porteiroEditando.cpf)
                    );
                    setConfirmacao("deletado");
                  } else {
                    const erro = await response.json();
                    alert(erro.error || "Erro ao deletar porteiro");
                  }
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

  function handleOpenModal() {
    setModalIsOpen(!modalIsOpen);
  }

  function handleConfirmacaoIsOpen() {
    setConfirmacaoIsOpen(!confirmacaoIsOpen);
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
                <h1 className={styles.titleLocacao}>Porteiros Cadstrados</h1>
                <button className={styles.butaoAdd} onClick={handleOpenModal}>
                  <CiCirclePlus size={35}></CiCirclePlus>
                </button>
              </div>
              <div className={styles.line}></div>
            </div>

            <div className={styles.containerCard}>
              {porteiro.length === 0 ? (
                <p>Nenhum porteiro cadastrado</p>
              ) : (
                porteiro.map((porteiro) => (
                  <div
                    key={porteiro.cpf}
                    onClick={() => {
                      handleEditarPorteiro(porteiro);
                    }}
                    className={styles.card}
                  >
                    <div>
                      <span className={styles.titleCardTres}>
                        {porteiro.nome}
                      </span>
                    </div>
                    <div>
                      <span className={styles.titleCard}>
                        {`CPF: ` + porteiro.cpf}
                      </span>
                    </div>
                    <div>
                      <span className={styles.titleCard}>
                        {`Telefone: ` + porteiro.telefone}
                      </span>
                    </div>
                    <div>
                      <span className={styles.titleCard}>
                        {`Email: ` + porteiro.email}
                      </span>
                    </div>
                    <div>
                      <span className={styles.titleCardDois}>
                        {`Cargo: ` + porteiro.role}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          {/*Modal para a cadastrar porteiro*/}
          <Modal isOpen={modalIsOpen} onClose={handleOpenModal}>
            <div className={styles.containerModal}>
              <div className={styles.containerInternoModal}>
                <h1 className="text-3xl">Cadastro de Porteiros</h1>
                <form className={styles.formAdd}>
                  <div className={styles.input}>
                    <Ginput
                      type="text"
                      placeholder="123.456.789-00"
                      maxLength={14}
                      label="Cpf"
                      value={novoPorteiro.cpf}
                      mask="000.000.000-00"
                      onChange={(e) =>
                        setnovoPorteiro({
                          ...novoPorteiro,
                          cpf: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={"joaobarreto@email.com"}
                      maxLength={200}
                      label={"Email"}
                      value={novoPorteiro.email}
                      onChange={(e) =>
                        setnovoPorteiro({
                          ...novoPorteiro,
                          email: e.target.value,
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={"São Gustavo"}
                      maxLength={200}
                      label={"Nome"}
                      value={novoPorteiro.nome}
                      onChange={(e) =>
                        setnovoPorteiro({
                          ...novoPorteiro,
                          nome: e.target.value,
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"password"}
                      placeholder={"Digite sua senha"}
                      maxLength={250}
                      label={"Senha"}
                      value={novoPorteiro.senha}
                      onChange={(e) =>
                        setnovoPorteiro({
                          ...novoPorteiro,
                          senha: e.target.value,
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type="text"
                      placeholder="(99) 99999-9999"
                      maxLength={15}
                      label="Telefone"
                      value={novoPorteiro.telefone}
                      mask="(00) 0 0000-0000"
                      onChange={(e) =>
                        setnovoPorteiro({
                          ...novoPorteiro,
                          telefone: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={"Digite se porteiro ou gestor"}
                      maxLength={250}
                      label={"Role"}
                      value={novoPorteiro.role}
                      onChange={(e) =>
                        setnovoPorteiro({
                          ...novoPorteiro,
                          role: e.target.value,
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
                        `${process.env.NEXT_PUBLIC_LOCAL}/usuario`,
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify(novoPorteiro),
                        }
                      );
                      const porteiroCadastrado = await response.json();
                      if (response.ok) {
                        setPorteiro((prev) => [...prev, porteiroCadastrado]);

                        handleOpenModal();
                        handleConfirmacaoIsOpen();
                        setConfirmacao("cadastrado");

                        setnovoPorteiro({
                          cpf: "",
                          email: "",
                          nome: "",
                          senha: "",
                          telefone: "",
                          role: "",
                        });
                      } else {
                        alert(porteiroCadastrado.error || "Erro ao cadastrar ");
                      }
                    }}
                  >
                    Cadastrar
                  </BadButton>
                </div>
              </div>
            </div>
          </Modal>
          {/*Modal para a atualizar porteiro*/}
          <Modal isOpen={updateModal} onClose={handleUpdateModal}>
            <div className={styles.containerModal}>
              <div className={styles.containerInternoModal}>
                <h1 className="text-3xl">Atualizar Porteiros</h1>
                <form className={styles.formAdd}>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={""}
                      maxLength={200}
                      label={"Email"}
                      value={porteiroEditando.email}
                      onChange={(e) =>
                        setPorteiroEditando({
                          ...porteiroEditando,
                          email: e.target.value,
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={""}
                      maxLength={200}
                      label={"Nome"}
                      value={porteiroEditando.nome}
                      onChange={(e) =>
                        setPorteiroEditando({
                          ...porteiroEditando,
                          nome: e.target.value,
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={""}
                      maxLength={35}
                      label={"Telefone"}
                      value={porteiroEditando.telefone}
                      mask="(00) 0 0000-0000"
                      onChange={(e) =>
                        setPorteiroEditando({
                          ...porteiroEditando,
                          telefone: e.target.value,
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={""}
                      maxLength={50}
                      label={"Role"}
                      value={porteiroEditando.role}
                      onChange={(e) =>
                        setPorteiroEditando({
                          ...porteiroEditando,
                          role: e.target.value,
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
                        `${process.env.NEXT_PUBLIC_LOCAL}/usuario/${porteiroEditando.cpf}`,
                        {
                          method: "PUT",
                          headers: {
                            "Content-type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify({
                            cpf: porteiroEditando.cpf,
                            email: porteiroEditando.email,
                            nome: porteiroEditando.nome,
                            telefone: porteiroEditando.telefone,
                            role: porteiroEditando.role,
                          }),
                        }
                      );
                      const data = await response.json();
                      if (response.ok) {
                        setPorteiro((prevPorteiro) =>
                          prevPorteiro.map((m) =>
                            m.cpf === porteiroEditando.cpf
                              ? porteiroEditando
                              : m
                          )
                        );
                        handleUpdateModal();
                        handleConfirmacaoIsOpen();
                        setConfirmacao("editado");
                      } else {
                        alert(data.error || "Erro ao atualizar usuario");
                      }
                    }}
                  >
                    Atualizar
                  </BadButton>
                </div>
              </div>
            </div>
          </Modal>

          <Modal isOpen={expandModal} onClose={handleExpandModal}>
            <div className={styles.containerExpand}>
              <span className={styles.titleCardQuatro}>
                Painel de Porteiros
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
