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
import Pagination from "../components/pagination";
import { usePagination } from "../hooks/usePagination";
import { FaFileExport } from "react-icons/fa6";
import SearchBar from "../components/searchBar";
import { exportarPdf } from "../utils/exportPdf";

export default function Motoristas() {
  useAuth();

  const [motoristas, setMotoristas] = useState([]);
  // MELHORIA FRONT-END: termo enviado para GET /motoristas?nome=...
  const [buscaNome, setBuscaNome] = useState("");
  const { currentPage, setCurrentPage, totalPages, paginatedItems: paginatedMotoristas } = usePagination(motoristas, 12);
  const [motoristaEditando, setMotoristaEditando] = useState({
    nome: "",
    email: "",
    portaria: "",
    vencimento: "",
  });
  const [novoMotorista, setNovoMotorista] = useState({
    nome: "",
    email: "",
    portaria: "",
    vencimento: "",
  });

  useEffect(() => {
    // MELHORIA FRONT-END: pequena espera evita uma requisição a cada tecla digitada.
    const timer = setTimeout(async () => {
      try {
        const token = localStorage.getItem("token");
        const params = new URLSearchParams();
        if (buscaNome.trim()) params.set("nome", buscaNome.trim());

        const receberAPI = await fetch(
          `${process.env.NEXT_PUBLIC_LOCAL}/motoristas?${params.toString()}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const data = await receberAPI.json();
        setMotoristas(data);
        setCurrentPage(1);
      } catch (error) {
        console.error("Erro ao buscar motorista", error);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [buscaNome, setCurrentPage]);
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
  const handleBaixar = async () => {
    try {
      // MELHORIA FRONT-END: usa a nova exportação unificada; com busca ativa exporta apenas o filtro.
      await exportarPdf({
        entidade: "motoristas",
        body: buscaNome.trim()
          ? { modo: "filtro", nome: buscaNome.trim() }
          : { modo: "todos" },
        nomeArquivo: "RelacaoMotoristas.pdf",
      });
      handleNoticeIsOpen();
      setConteudo("Arquivo baixado com sucesso!");
    } catch (error) {
      handleNoticeIsOpen();
      setConteudo(error.message);
    }
  };

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

  // Destaca motoristas cuja portaria já venceu. A comparação é feita
  // somente pela data para evitar diferenças de fuso horário.
  function portariaVencida(vencimento) {
    if (!vencimento) return false;

    const dataTexto = String(vencimento).split("T")[0];
    const [ano, mes, dia] = dataTexto.split("-").map(Number);
    if (!ano || !mes || !dia) return false;

    const dataVencimento = new Date(ano, mes - 1, dia);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return dataVencimento < hoje;
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
                <h1 className={styles.titleLocacao}>Motoristas Cadastrados</h1>
                <div className={styles.buttons}>
                  <div className={styles.butaoAdd} onClick={handleBaixar}>
                    <FaFileExport size={35} />
                  </div>
                  <div className={styles.butaoAdd} onClick={handleOpenModal}>
                    <CiCirclePlus size={35} />
                  </div>
                </div>
              </div>
              <div className={styles.line}></div>
            </div>

            <div className={styles.filterArea}>
              <SearchBar
                value={buscaNome}
                onChange={(e) => setBuscaNome(e.target.value)}
                placeholder="Pesquisar motorista por nome..."
              />
            </div>

            <div className={styles.containerCard}>
              {motoristas.length === 0 ? (
                <p>Nenhum motorista cadastrado.</p>
              ) : (
                paginatedMotoristas.map((motorista) => (
                  <div
                    key={motorista.id}
                    onClick={() => {
                      handleEditarMotorista(motorista);
                    }}
                    className={`${styles.card} ${
                      portariaVencida(motorista.vencimento)
                        ? styles.portariaVencida
                        : ""
                    }`}
                  >
                    <div className={styles.cardHeader}>
                      <span className={styles.titleCardTres}>
                        {motorista.nome}
                      </span>
                      {portariaVencida(motorista.vencimento) && (
                        <span className={styles.statusVencido}>
                          Portaria vencida
                        </span>
                      )}
                    </div>
                    <div>
                      <span className={styles.titleCard}>
                        {`Portaria: ` + motorista.portaria}
                      </span>
                    </div>
                    <div>
                      <span className={styles.titleCard}>
                        {`Vencimento: ` +
                          new Date(motorista.vencimento).toLocaleDateString(
                            "pt-BR"
                          )}
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
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
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
                      placeholder={"Admael Santos"}
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
                      placeholder={"admael@gmail.com"}
                      maxLength={200}
                      label={"E-mail"}
                      value={novoMotorista.email}
                      onChange={(e) =>
                        setNovoMotorista({
                          ...novoMotorista,
                          email: e.target.value,
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={"024/2025"}
                      maxLength={200}
                      label={"Portaria"}
                      value={novoMotorista.portaria}
                      mask={"000/0000"}
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
                      type={"date"}
                      placeholder={"09/07/2025"}
                      maxLength={200}
                      label={"Vencimento da portaria"}
                      value={novoMotorista.vencimento}
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
                          nome: "",
                          email: "",
                          portaria: "",
                          vencimento: "",
                        });
                      } else {
                        const mensage = await response.json();
                        handleNoticeIsOpen();
                        setConteudo(
                          mensage.error || "Erro ao cadastrar motorista"
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

          {/*Modal para a atualizar motorista*/}
          <Modal isOpen={updateModal} onClose={handleUpdateModal}>
            <div className={styles.containerModal}>
              <div className={styles.containerInternoModal}>
                <h1 className="text-3xl">Atualizar Motoristas</h1>
                <form className={styles.formAdd}>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={"Admael Santos"}
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
                      placeholder={"admael@gmail.com"}
                      maxLength={200}
                      label={"E-mail"}
                      value={motoristaEditando.email}
                      onChange={(e) =>
                        setMotoristaEditando({
                          ...motoristaEditando,
                          email: e.target.value,
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={"024/2025"}
                      maxLength={200}
                      label={"Portaria"}
                      value={motoristaEditando.portaria}
                      mask={"000/0000"}
                      onChange={(e) =>
                        setMotoristaEditando({
                          ...motoristaEditando,
                          portaria: e.target.value,
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"date"}
                      placeholder={"09/07/2025"}
                      maxLength={200}
                      label={"Vencimento da portaria"}
                      value={motoristaEditando.vencimento}
                      onChange={(e) =>
                        setMotoristaEditando({
                          ...motoristaEditando,
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
                        `${process.env.NEXT_PUBLIC_LOCAL}/motoristas/${motoristaEditando.id}`,
                        {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify({
                            nome: motoristaEditando.nome,
                            email: motoristaEditando.email,
                            portaria: motoristaEditando.portaria,
                            vencimento: motoristaEditando.vencimento,
                          }),
                        }
                      );
                      const data = await response.json();
                      if (response.ok) {
                        setMotoristas((prevMotoristas) =>
                          prevMotoristas.map((m) =>
                            m.id === motoristaEditando.id
                              ? motoristaEditando
                              : m
                          )
                        );
                        handleUpdateModal();
                        handleNoticeIsOpen();
                        setConteudo("Motorista editado com sucesso!");
                      } else {
                        handleNoticeIsOpen();
                        setConteudo(
                          data.error || "Erro ao atualizar motorista"
                        );
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
                      `${process.env.NEXT_PUBLIC_LOCAL}/motoristas/${motoristaEditando.id}`,
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
                        prev.filter((m) => m.id !== motoristaEditando.id)
                      );
                      handleNoticeIsOpen();
                      handleDeletarIsOpen();
                      setConteudo("Motorista deletado com sucesso!");
                    } else {
                      const erro = await response.json();
                      handleNoticeIsOpen();
                      setConteudo(
                        erro.message || "Erro ao deletar motorista. "
                      );
                    }
                  }}
                >
                  Deletar
                </BadButton>
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
