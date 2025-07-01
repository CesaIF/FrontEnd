"use client";

import dynamic from "next/dynamic";
import Header from "../components/header";
import Footer from "../components/footer";
import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
const Modal = dynamic(() => import("../components/modal"), { ssr: false });
import BadButton from "../components/badButton";
import styles from "./History.module.css";
import { useAuth } from "../hooks/useAuth";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function History() {
  useAuth();
  const [locacoes, setLocacoes] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedLocacao, setSelectedLocacao] = useState(null);

  useEffect(() => {
    const fetchLocacoes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_LOCAL}/locacoes/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setLocacoes(data);
      } catch (error) {
        console.error("Erro ao buscar locações", error);
      }
    };
    fetchLocacoes();
  }, []);

  function handleOpenModal() {
    setModalIsOpen(!modalIsOpen);
  }

  function handleExpandModal(locacao) {
    setSelectedLocacao(locacao);
    setIsDetailModalOpen(true);
  }

  function handleCloseExpandModal() {
    setSelectedLocacao(null);
    setIsDetailModalOpen(false);
  }
//Formata a data que vem do back end
  function formatarData(dataISO) {
    if (!dataISO) return "—";
    try {
      return format(new Date(dataISO), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
        locale: ptBR,
      });
    } catch {
      return "Data inválida";
    }
  }

  return (
    <>
      <div
        className={`${styles.containerGeral} ${isOpen ? styles.asideOpen : ""}`}
      >
        <Header onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />

        <main className={styles.containerMain}>
          <div className={styles.containerInternoUm}>
            <div>
              <div className={styles.containerTitle}>
                <h1 className={styles.titleLocacao}>Locações Finalizadas</h1>
                <button className={styles.butaoAdd} onClick={handleOpenModal}>
                  <CiCirclePlus size={35} />
                </button>
              </div>
              <div className={styles.line}></div>
            </div>

            <div className={styles.containerCard}>
              {locacoes.length === 0 ? (
                <p>Nenhuma locação cadastrada.</p>
              ) : (
                locacoes.map((locacao) => (
                  <div
                    key={locacao.id}
                    onClick={() => handleExpandModal(locacao)}
                    className={styles.cardLocacao}
                  >
                    <div>
                      <div className={styles.containerTitles}>
                        <span className={styles.titleCard}>
                          {`#ID: ` + locacao.id}
                        </span>
                      </div>
                      <div>
                        <span className={styles.titleCard}>
                          {`Itinerario: ` + locacao.itinerario}
                        </span>
                      </div>
                      <div>
                        <span className={styles.titleCardDois}>
                          {`Veiculo: ` + locacao.veiculo_placa_fk}
                        </span>
                      </div>
                      <div>
                        <span className={styles.titleCardDois}>
                          {`Motorista: ` + locacao.motorista_cpf_fk}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <Modal
            width={"700px"}
            isOpen={isDetailModalOpen}
            onClose={handleCloseExpandModal}
          >
            {selectedLocacao && (
              <div className={styles.containerModalGeral}>
                <div className={styles.modalExpand}>
                  {[
                    { label: "ID", value: selectedLocacao.id },
                    { label: "Itinerário", value: selectedLocacao.itinerario },
                    {
                      label: "Veículo",
                      value: selectedLocacao.veiculo_placa_fk,
                    },
                    {
                      label: "Motorista",
                      value: selectedLocacao.motorista_cpf_fk,
                    },
                    {
                      label: "Saída",
                      value: formatarData(selectedLocacao.data_saida),
                    },
                    {
                      label: "Chegada",
                      value: formatarData(selectedLocacao.data_chegada),
                    },

                    { label: "Quilometragem de Saída", value: selectedLocacao.km_saida },
                    { label: "Quilometragem de Chegada", value: selectedLocacao.km_chegada },
                    {
                      label: "Observação Saída",
                      value: selectedLocacao.observacao_saida,
                    },
                    {
                      label: "Observação Chegada",
                      value: selectedLocacao.observacao_entrada,
                    },
                    {
                      label: "Porteiro Saída",
                      value: selectedLocacao.porteiro_saida_fk,
                    },
                    {
                      label: "Porteiro Chegada",
                      value: selectedLocacao.porteiro_chegada_fk,
                    },
                    {
                      label: "Motivo da saída",
                      value: selectedLocacao.motivo_saida,
                    },
                    { label: "Gestor", value: selectedLocacao.gestor_cpf_fk },
                    {
                      label: "Autorização",
                      value: selectedLocacao.autorizacao,
                    },
                  ].map((item, index) => (
                    <div key={index} className={styles.itemPartUm}>
                      <h1>{item.label}:</h1>
                      <h1>{item.value || "—"}</h1>
                    </div>
                  ))}
                </div>

                <div className={styles.butaoForm}>
                  <BadButton
                    colorHover={"#a3bc98"}
                    textColor={"#48793c"}
                    cor={"#d1dec7"}
                    onClick={handleCloseExpandModal}
                  >
                    Fechar
                  </BadButton>
                </div>
              </div>
            )}
          </Modal>
        </main>

        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </>
  );
}
