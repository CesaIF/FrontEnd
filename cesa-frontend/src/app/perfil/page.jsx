"use client";

import dynamic from "next/dynamic";
import Header from "../components/header";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
const Modal = dynamic(() => import("../components/modal"), { ssr: false });
import BadButton from "../components/badButton";
import styles from "./Perfil.module.css";
import Ginput from "../components/gInput";
import { useAuth } from "../hooks/useAuth";
import Head from "next/head";

export default function Perfil() {
  useAuth();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noticeIsOpen, setNoticeIsOpen] = useState(false);
  const [confirmacao, setConfirmacao] = useState("cadastrado");
  const [isOpen, setIsOpen] = useState(true);
  const [updateModal, setUpdateModal] = useState(false);
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [editarEmail, setEditarEmail] = useState("");
  const [nome, setNome] = useState("");
  const [editarNome, setEditarNome] = useState("");
  const [senha, setSenha] = useState("");
  const [editarSenha, setEditarSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [editarTelefone, setEditarTelefone] = useState("");
  const cargo = "gestor";
  const [conteudo, setConteudo] = useState("");
  const [gestor, setGestor] = useState("");
  const [passIsOpen, setPassIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const res = await fetch("${process.env.NEXT_PUBLIC_LOCAL}/usuario", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cpf: cpf,
        email: email,
        nome: nome,
        senha: senha,
        telefone: telefone,
        role: cargo,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      handleNoticeIsOpen();
      handleOpenModal();
      setConteudo("Gestor cadastrado com sucesso!");
    } else {
      handleNoticeIsOpen();
      setConteudo(data.error);
    }
  };

  const handleEditarGestor = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const cpfGestor = localStorage.getItem("cpf");

    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL}/usuario/${cpfGestor}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cpf: cpfGestor,
        email: editarEmail,
        nome: editarNome,
        telefone: editarTelefone,
        role: cargo,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      handleNoticeIsOpen();
      handleUpdateModal();
      setConteudo("Dados editados com sucesso!");
    } else {
      handleNoticeIsOpen();
      setConteudo(data.error);
    }
  };

  const handleEditarSenha = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const cpfGestor = localStorage.getItem("cpf");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL}/usuario/alter/${cpfGestor}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senha: editarSenha,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        handleNoticeIsOpen();
        setConteudo("Senha alterada com sucesso!");
      } else {
        handleNoticeIsOpen();
        setConteudo(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const cpfGestor = localStorage.getItem("cpf");

    fetch(`${process.env.NEXT_PUBLIC_LOCAL}/usuario/${cpfGestor}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const data = await res.json();
        console.log("Dados", data);

        if (res.ok) {
          setGestor(data);
        } else {
          alert("Erro ao identificar usuário!");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const preencherForm = async () => {
    const token = localStorage.getItem("token");

    const cpfGestor = localStorage.getItem("cpf");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL}/usuario/${cpfGestor}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        setEditarNome(data.nome);
        setEditarEmail(data.email);
        setEditarTelefone(data.telefone);
      } else {
        alert("Erro ao encontrar usuários!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  function handleOpenModal() {
    setModalIsOpen(!modalIsOpen);
  }

  function handlePassModal() {
    setPassIsOpen(!passIsOpen);
  }

  function handleNoticeIsOpen() {
    setNoticeIsOpen(!noticeIsOpen);
  }

  function handleUpdateModal() {
    setUpdateModal(!updateModal);
    preencherForm();
  }

  return (
    <>
      <Head>
        <title>Perfil do Gestor</title>
        <link rel="icon" href="/cesaicon.ico"></link>
      </Head>
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
                {gestor && gestor.nome && (
                  <h1 key={gestor.cpf} className={styles.titleLocacao}>
                    Bem-vindo, {gestor.nome}
                  </h1>
                )}
              </div>
              <div className={styles.line}></div>
            </div>

            <div className={styles.containerCard}>
              <div className={styles.card}>
                <div>
                  <h1 className={styles.titleCardTres}>Editar Senha</h1>
                </div>
                <div>
                  <h1 className={styles.titleCard}>
                    Edite sua senha clicando abaixo:
                  </h1>
                </div>
                <div>
                  <BadButton
                    buttonWidth={"15rem"}
                    onClick={handlePassModal}
                    colorHover="#a3bc98"
                    cor="#769b6a"
                  >
                    Editar Senha
                  </BadButton>
                </div>
              </div>

              <div className={styles.card}>
                <div>
                  <h1 className={styles.titleCardTres}>Editar Dados</h1>
                </div>
                <div>
                  <h1 className={styles.titleCard}>
                    Edite seus dados e sua senha clicando abaixo:
                  </h1>
                </div>
                <div>
                  <BadButton
                    buttonWidth={"15rem"}
                    onClick={handleUpdateModal}
                    colorHover="#a3bc98"
                    cor="#769b6a"
                  >
                    Editar Dados
                  </BadButton>
                </div>
              </div>

              <div className={styles.card}>
                <div>
                  <h1 className={styles.titleCardTres}>Cadastrar Gestor</h1>
                </div>
                <div>
                  <h1 className={styles.titleCard}>
                    Cadastre um novo gestor clicando abaixo:
                  </h1>
                </div>
                <div>
                  <BadButton
                    buttonWidth={"15rem"}
                    onClick={handleOpenModal}
                    colorHover="#a3bc98"
                    cor="#769b6a"
                  >
                    Cadastrar Gestor
                  </BadButton>
                </div>
              </div>
            </div>
          </div>
          {/* Modal para cadastrar Gestor */}
          <Modal isOpen={modalIsOpen} onClose={handleOpenModal}>
            <div className={styles.containerModal}>
              <div className={styles.containerInternoModal}>
                <h1 className="text-3xl">Cadastrar Gestor</h1>
                <form onSubmit={handleSubmit} className={styles.formAdd}>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={"João Barreto Hünnerbein"}
                      maxLength={200}
                      label={"Nome"}
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={"joaobarreto@email.com"}
                      maxLength={200}
                      label={"Email"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={"123.456.789-10"}
                      maxLength={14}
                      label={"CPF"}
                      value={cpf}
                      mask={"000.000.000-00"}
                      onChange={(e) => setCpf(e.target.value)}
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={"(77) 12345-6789"}
                      maxLength={16}
                      label={"Telefone"}
                      value={telefone}
                      mask={"(00) 0 0000-0000"}
                      onChange={(e) => setTelefone(e.target.value)}
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"password"}
                      placeholder={"Digite sua senha"}
                      maxLength={30}
                      label={"Senha"}
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                    ></Ginput>
                  </div>
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
                      type={"submit"}
                    >
                      Cadastrar
                    </BadButton>
                  </div>
                </form>
              </div>
            </div>
          </Modal>
          {/* Modal para atualizar dados de gestor */}
          <Modal isOpen={updateModal} onClose={handleUpdateModal}>
            <div className={styles.containerModal}>
              <div className={styles.containerInternoModal}>
                <h1 className="text-3xl">Atualizar Dados</h1>
                <form onSubmit={handleEditarGestor} className={styles.formAdd}>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      maxLength={200}
                      label={"Nome"}
                      value={editarNome}
                      onChange={(e) => setEditarNome(e.target.value)}
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      maxLength={200}
                      label={"Email"}
                      value={editarEmail}
                      onChange={(e) => setEditarEmail(e.target.value)}
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      maxLength={15}
                      label={"Telefone"}
                      value={editarTelefone}
                      mask={"(00) 0 0000-0000"}
                      onChange={(e) => setEditarTelefone(e.target.value)}
                    ></Ginput>
                  </div>
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
                      type={"submit"}
                    >
                      Atualizar Dados
                    </BadButton>
                  </div>
                </form>
              </div>
            </div>
          </Modal>

          <Modal isOpen={passIsOpen} onClose={handlePassModal}>
            <div className={styles.containerModal}>
              <div className={styles.containerInternoModal}>
                <h1 className="text-3xl">Cadastrar Gestor</h1>
                <form onSubmit={handleEditarSenha} className={styles.formAdd}>
                  <div className={styles.input}>
                    <Ginput
                      type={"password"}
                      placeholder={"Digite sua senha"}
                      maxLength={30}
                      label={"Senha"}
                      value={editarSenha}
                      onChange={(e) => setEditarSenha(e.target.value)}
                    ></Ginput>
                  </div>
                  <div className={styles.butaoForm}>
                    <BadButton
                      textColor={"#48793c"}
                      colorHover={"#a3bc98"}
                      cor={"#d1dec7"}
                      onClick={handlePassModal}
                    >
                      Cancelar
                    </BadButton>
                    <BadButton
                      colorHover={"#769b6a"}
                      cor={"#48793c"}
                      type={"submit"}
                    >
                      Editar
                    </BadButton>
                  </div>
                </form>
              </div>
            </div>
          </Modal>

          <Modal
            width={"400px"}
            isOpen={noticeIsOpen}
            onClose={handleNoticeIsOpen}
          >
            <div className={styles.containerModal}>
              <div className={styles.containerInMini}>
                <h1 className="mb-3">{conteudo}</h1>
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
