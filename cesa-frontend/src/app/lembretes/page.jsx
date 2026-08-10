"use client";

import dynamic from "next/dynamic";
import Header from "../components/header";
import Footer from "../components/footer";
import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
const Modal = dynamic(() => import("../components/modal"), { ssr: false });
import BadButton from "../components/badButton";
import styles from "./Lembretes.module.css";
import Ginput from "../components/gInput";
import { useAuth } from "../hooks/useAuth";

export default function Veiculos() {
  useAuth();
  const [Lembrete, setLembrete] = useState([]);
  const [veiculo, setVeiculo] = useState([]);
  const [lembreteEditando, setLembreteEditando] = useState({
    placa_lembrete: "",
    km_condicao: "",
    informacao: "",
  });
  const [novoLembrete, setNovoLembrete] = useState({
    placa_lembrete: "",
    km_condicao: "",
    informacao: "",
  });
  const [conteudo, setConteudo] = useState("");

  // fetch que pega dados dos veículos.
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${process.env.NEXT_PUBLIC_LOCAL}/veiculos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();

        if (res.ok) {
          setVeiculo(data);
        } else {
          console.log("Erro ao encontrar veículos");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const fetchVeiculos = async () => {
      try {
        const token = localStorage.getItem("token");
        const receberAPI = await fetch(
          `${process.env.NEXT_PUBLIC_LOCAL}/lembretes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await receberAPI.json();
        setLembrete(data);
      } catch (error) {
        console.error("Erro ao buscar Lembrete".error);
      }
    };
    fetchVeiculos();
  }, []);

  const handleEditarLembrete = (lembrete) => {
    setLembreteEditando(lembrete);
    handleExpandModal();
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deletarIsOpen, setDeletarIsOpen] = useState(false);
  const [expandModal, setExpandModal] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [updateModal, setUpdateModal] = useState(false);
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
                <h1 className={styles.titleLocacao}>Lembretes Cadastrados</h1>
                <button className={styles.butaoAdd} onClick={handleOpenModal}>
                  <CiCirclePlus size={35}></CiCirclePlus>
                </button>
              </div>
              <div className={styles.line}></div>
            </div>

            <div className={styles.containerCard}>
              {Lembrete.length === 0 ? (
                <p>Nenhum lembrete cadastrado.</p>
              ) : (
                Lembrete.map((lembrete) => (
                  <div
                    key={lembrete.id}
                    onClick={() => {
                      handleEditarLembrete(lembrete);
                    }}
                    className={styles.card}
                  >
                    <div>
                      <span className={styles.titleCardTres}>
                        {lembrete.placa_lembrete}
                      </span>
                    </div>
                    <div>
                      <span className={styles.titleCard}>
                        {`ID: ` + lembrete.id}
                      </span>
                    </div>
                    <div>
                      <span className={styles.titleCard}>
                        {`Informação: ` + lembrete.informacao}
                      </span>
                    </div>
                    <div>
                      <span className={styles.titleCard}>
                        {`Criado em : ` +
                          new Date(lembrete.criado_em).toLocaleDateString(
                            "pt-BR",
                          )}
                        ,
                      </span>
                    </div>
                    <div>
                      <span className={styles.titleCardDois}>
                        {`Quilometragem: ` + lembrete.km_condicao}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          {/*Modal para a cadastrar lembrete*/}
          <Modal isOpen={modalIsOpen} onClose={handleOpenModal}>
            <div className={styles.containerModal}>
              <div className={styles.containerInternoModal}>
                <h1 className="text-3xl">Cadastro de Lembrete</h1>
                <form className={styles.formAdd}>
                  <div className={styles.input}>
                    <div className={styles.choiceboxContainer}>
                      <select
                        value={novoLembrete.placa_lembrete}
                        onChange={(e) =>
                          setNovoLembrete({
                            ...novoLembrete,
                            placa_lembrete: e.target.value,
                          })
                        }
                      >
                        <option value="">Escolha o Veículo</option>

                        {veiculo.map((veiculos) => (
                          <option key={veiculos.placa} value={veiculos.placa}>
                            {veiculos.modelo} - {veiculos.placa}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"number"}
                      placeholder={"EX: '22568'"}
                      maxLength={300}
                      label={"Quilometragem de condição"}
                      value={novoLembrete.km_condicao}
                      onChange={(e) =>
                        setNovoLembrete({
                          ...novoLembrete,
                          km_condicao: parseInt(e.target.value),
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={"EX: 'Trocar óleo do motor"}
                      maxLength={500}
                      label={"Informação "}
                      value={novoLembrete.informacao}
                      onChange={(e) =>
                        setNovoLembrete({
                          ...novoLembrete,
                          informacao: e.target.value,
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
                        `${process.env.NEXT_PUBLIC_LOCAL}/lembretes/cadastro`,
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify(novoLembrete),
                        },
                      );
                      if (response.ok) {
                        const veiculoCadastrado = await response.json();
                        setLembrete((prev) => [...prev, veiculoCadastrado]);

                        handleNoticeIsOpen();
                        handleOpenModal();
                        setConteudo("VLembrete cadastrado com sucesso!");

                        setNovoLembrete({
                          placa_lembrete: "",
                          km_condicao: "",
                          informacao: "",
                        });
                      } else {
                        const erro = await response.json();
                        handleNoticeIsOpen();
                        setConteudo(erro.error || "Erro ao cadastrar lembrete");
                      }
                    }}
                  >
                    Cadastrar
                  </BadButton>
                </div>
              </div>
            </div>
          </Modal>
          {/*Modal para a atualizar lembrete*/}
          <Modal isOpen={updateModal} onClose={handleUpdateModal}>
            <div className={styles.containerModal}>
              <div className={styles.containerInternoModal}>
                <h1 className="text-3xl">Atualizar Lembrete</h1>
                <form className={styles.formAdd}>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={""}
                      maxLength={200}
                      label={"Placa"}
                      value={lembreteEditando.placa_lembrete}
                      onChange={(e) =>
                        setLembreteEditando({
                          ...lembreteEditando,
                          placa_lembrete: e.target.value.toUpperCase(),
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"number"}
                      placeholder={"2022"}
                      maxLength={30}
                      label={"Quilometragem de condição"}
                      value={lembreteEditando.km_condicao}
                      onChange={(e) =>
                        setLembreteEditando({
                          ...lembreteEditando,
                          km_condicao: parseInt(e.target.value),
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={"Branco"}
                      maxLength={400}
                      label={"Informação"}
                      value={lembreteEditando.informacao}
                      onChange={(e) =>
                        setLembreteEditando({
                          ...lembreteEditando,
                          informacao: e.target.value,
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
                        `${process.env.NEXT_PUBLIC_LOCAL}/lembretes/atualizar/${lembreteEditando.id}`,
                        {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify({
                            placa_lembrete: lembreteEditando.placa_lembrete,
                            km_condicao: lembreteEditando.km_condicao,
                            informacao: lembreteEditando.informacao,
                          }),
                        },
                      );
                      const data = await response.json();
                      if (response.ok) {
                        setLembrete((prevVeiculos) =>
                          prevVeiculos.map((m) =>
                            m.id === lembreteEditando.id ? lembreteEditando : m,
                          ),
                        );
                        handleUpdateModal();
                        handleNoticeIsOpen();
                        setConteudo("Lembrete editado com sucesso!");
                      } else {
                        handleNoticeIsOpen();
                        setConteudo(data.error || "Erro ao atualizar lembrete");
                      }
                    }}
                  >
                    Atualizar
                  </BadButton>
                </div>
              </div>
            </div>
          </Modal>
          {/*Modal para o painel*/}
          <Modal isOpen={expandModal} onClose={handleExpandModal}>
            <div className={styles.containerExpand}>
              <span className={styles.titleCardQuatro}>
                Painel de Lembretes
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
                      `${process.env.NEXT_PUBLIC_LOCAL}/lembretes/deletar/${lembreteEditando.id}`,
                      {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                      },
                    );
                    if (response.ok) {
                      setLembrete((prev) =>
                        prev.filter((m) => m.id !== lembreteEditando.id),
                      );
                      handleNoticeIsOpen();
                      handleDeletarIsOpen();
                      setConteudo("Lembrete deletado com sucesso!");
                    } else {
                      const erro = await response.json();
                      handleNoticeIsOpen();
                      setConteudo(erro.error || "Erro ao deletar Lembrete");
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
