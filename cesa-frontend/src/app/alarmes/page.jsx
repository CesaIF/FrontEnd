"use client";

import dynamic from "next/dynamic";
import Header from "../components/header";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
const Modal = dynamic(() => import("../components/modal"), { ssr: false });
import BadButton from "../components/badButton";
import styles from "./Alarmes.module.css";
import Ginput from "../components/gInput";
import { useAuth } from "../hooks/useAuth";
import Pagination from "../components/pagination";
import { usePagination } from "../hooks/usePagination";
import {
  initializeAlertNotifications,
  isAlertSeen,
  markAlertAsSeen,
} from "../utils/alertNotifications";

export default function Alarmes() {
  useAuth();
  const [alarmes, setAlarmes] = useState([]);
  const [alarmesEditando, setAlarmesEditando] = useState(null);
  const { currentPage, setCurrentPage, totalPages, paginatedItems: paginatedAlarmes } = usePagination(alarmes, 12);
  const [conteudo, setConteudo] = useState("");
  const [visualizados, setVisualizados] = useState([]);

  useEffect(() => {
    const fetchAlarmes = async () => {
      try {
        const token = localStorage.getItem("token");
        const receberAPI = await fetch(
          `${process.env.NEXT_PUBLIC_LOCAL}/alertas`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await receberAPI.json();
        const lista = Array.isArray(data) ? data : [];
        initializeAlertNotifications(lista);
        setAlarmes(lista);
        setVisualizados(lista.filter((alarme) => isAlertSeen(alarme.id)).map((alarme) => String(alarme.id)));
      } catch (error) {
        console.error("Erro ao buscar os alertas do sistemas".error);
      }
    };
    fetchAlarmes();
  }, []);

  const handleEditarVeiculo = (alarme) => {
    markAlertAsSeen(alarme.id);
    setVisualizados((prev) =>
      prev.includes(String(alarme.id)) ? prev : [...prev, String(alarme.id)],
    );
    setAlarmesEditando(alarme);
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
                <h1 className={styles.titleLocacao}>Alarmes disparados pelo sistema</h1>
              </div>
              <div className={styles.line}></div>
            </div>

            <div className={styles.containerCard}>
              {alarmes.length === 0 ? (
                <p>Nenhum alarmes.</p>
              ) : (
                paginatedAlarmes.map((alarmes) => (
                  <div
                    key={alarmes.id}
                    onClick={() => {
                      handleEditarVeiculo(alarmes);
                    }}
                    className={`${styles.card} ${
                      visualizados.includes(String(alarmes.id)) ? "" : styles.cardNovo
                    }`}
                  >
                    {!visualizados.includes(String(alarmes.id)) && (
                      <span className={styles.badgeNovo}>Novo</span>
                    )}
                    <div>
                      <span className={styles.titleCardTres}>
                        {alarmes.placa_evento}
                      </span>
                    </div>
                    <div>
                      <span className={styles.titleCard}>
                        {`Observação: ` + alarmes.observacoes}
                      </span>
                    </div>
                    <div>
                      <span className={styles.titleCard}>
                        {`ID: ` + alarmes.id}
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
          {/*Modal para o painel*/}
          <Modal isOpen={expandModal} onClose={handleExpandModal}>
            <div className={styles.containerExpand}>
              <span className={styles.titleCardQuatro}>Painel de Alarmes</span>
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
                      `${process.env.NEXT_PUBLIC_LOCAL}/alertas/${alarmesEditando?.id}`,
                      {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                      },
                    );
                    if (response.ok) {
                      setAlarmes((prev) =>
                        prev.filter((m) => m.id !== alarmesEditando.id),
                      );
                      handleNoticeIsOpen();
                      handleDeletarIsOpen();
                      setConteudo("Alarme deletado com sucesso!");
                    } else {
                      let mensagem = "Erro ao deletar alarme";
                      try {
                        const erro = await response.json();
                        mensagem = erro.error || erro.message || mensagem;
                      } catch {
                        mensagem = `Erro ${response.status} ao deletar o alarme.`;
                      }
                      handleNoticeIsOpen();
                      setConteudo(mensagem);
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
