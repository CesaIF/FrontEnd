'use client';

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
import { TbPasswordUser } from "react-icons/tb";

export default function Porteiros() {
  useAuth();

  const [conteudo, setConteudo] = useState("");
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
    role: "porteiro",
  });
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");

  useEffect(() => {
    const fetchPorteiros = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_LOCAL}/usuario`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
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

  const handleEditarSenha = async (cpf) => {

    const token = localStorage.getItem("token");

    fetch(`${process.env.NEXT_PUBLIC_LOCAL}/usuario/alter/${cpf}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        senha: senha
      })
    }).
    then(async (res) => {
      const data = await res.json();

      if (res.ok) {
        handleNoticeIsOpen();
        setConteudo("Senha alterada com sucesso!");
      } else {
        handleNoticeIsOpen();
        setConteudo(data.error || "Erro ao alterar senha");
      }
    }).
    catch ((err) => {
      console.error(err);
    });

  }

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deletarIsOpen, setConfirmacaoIsOpen] = useState(false);
  const [expandModal, setExpandModal] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [updateModal, setUpdateModal] = useState(false);
  const [noticeIsOpen, setNoticeIsOpen] = useState(false);
  const [senhaModal, setSenhaModal] = useState(false);

  function handleSenhaModal() {
    setSenhaModal(!senhaModal);
  }

  function handleNoticeIsOpen() {
    setNoticeIsOpen(!noticeIsOpen);
  }

  function handleOpenModal() {
    setModalIsOpen(!modalIsOpen);
  }

  function handleDeletarIsOpen() {
    setConfirmacaoIsOpen(!deletarIsOpen);
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
                <h1 className={styles.titleLocacao}>Porteiros Cadastrados</h1>
                <div className={styles.buttons}>
                  <div className={styles.butaoAdd} onClick={handleSenhaModal}>
                    <TbPasswordUser size={35}/>
                  </div>
                  <div className={styles.butaoAdd} onClick={handleOpenModal}>
                    <CiCirclePlus size={35} />
                  </div>
                </div>
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
                      maxLength={16}
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
                        `${process.env.NEXT_PUBLIC_LOCAL}/usuario/porteiro`,
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
                        handleNoticeIsOpen();
                        setConteudo("Cadastrado com sucesso");

                        setnovoPorteiro({
                          cpf: "",
                          email: "",
                          nome: "",
                          senha: "",
                          telefone: "",
                          role: "porteiro",
                        });
                      } else {
                        handleNoticeIsOpen();
                        setConteudo(
                          porteiroCadastrado.error || "Erro ao cadastrar "
                        );
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
                        handleNoticeIsOpen();
                        setConteudo(data.message);
                      } else {
                        handleNoticeIsOpen();
                        setConteudo(data.error || "Erro ao atualizar usuario");
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

          <Modal isOpen={senhaModal} onClose={handleSenhaModal}>
            <div className={styles.containerModal}>
              <div className={styles.containerInternoModal}>
                <h1 className="text-3xl">Atualizar Senha de Porteiro</h1>
                <form className={styles.formAdd}>
                  <div className={styles.choiceboxContainer}>
                    <select value={cpf} onChange={(e) => setCpf(e.target.value)}>
                      <label>Escolha o porteiro a editar a senha</label>

                      <option className={styles.choicebox}>Escolha um porteiro</option>

                      {porteiro.map((porteiro) => (
                        <option key={porteiro.cpf} value={porteiro.cpf}>{porteiro.nome}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.input}>
                    <Ginput
                      type={"password"}
                      placeholder={""}
                      maxLength={50}
                      label={"Senha"}
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                    ></Ginput>
                  </div>
                </form>
                <div className={styles.butaoForm}>
                  <BadButton
                    textColor={"#48793c"}
                    colorHover={"#a3bc98"}
                    cor={"#d1dec7"}
                    onClick={handleSenhaModal}
                  >
                    Cancelar
                  </BadButton>
                  <BadButton
                    colorHover={"#769b6a"}
                    cor={"#48793c"}
                    onClick={() => {handleEditarSenha(cpf); handleSenhaModal();}}
                  >
                    Atualizar
                  </BadButton>
                </div>
              </div>
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
                      handleNoticeIsOpen();
                      handleDeletarIsOpen();
                      setConteudo("Porteiro deletado com sucesso!");
                    } else {
                      const erro = await response.json();
                      handleNoticeIsOpen();
                      setConteudo(erro.error || "Erro ao deletar porteiro");
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
                <h1> {conteudo} </h1>
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
