"use client";

import dynamic from "next/dynamic";
import Header from "../components/header";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
const Modal = dynamic(() => import("../components/modal"), { ssr: false });
import BadButton from "../components/badButton";
import styles from "./Abastecimento.module.css";
import { CiCirclePlus } from "react-icons/ci";
import { useAuth } from "../hooks/useAuth";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FaFileExport } from "react-icons/fa6";
import Ginput from "../components/gInput";
import { IoClose } from "react-icons/io5";

export default function Abastecimento() {
  useAuth();
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  const [abastecimento, setAbastecimento] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedAbastecimento, setSelectedManutencao] = useState(null);
  const [conteudo, setConteudo] = useState("");
  const [noticeIsOpen, setNoticeIsOpen] = useState(false);
  const [dateIsOpen, setDateIsOpen] = useState(false);
  const [veiculo, setVeiculo] = useState([]);

  const [novaAbastecimento, setNovaAbastecimento] = useState({
    placa_abastecimento: "",
    tipo_combustivel: "",
    valor_abastecimento: "",
    km_abastecimento: "",
    posto_abastecimento: "",
    data_abastecimento: "",
    numero_nota: "",
  });

  function handleDateIsOpen() {
    setDateIsOpen(!dateIsOpen);
  }

  function handleNoticeIsOpen() {
    setNoticeIsOpen(!noticeIsOpen);
  }

  const handleBaixar = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL}/relatorio/gerarcsv`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dataInicio,
            dataFim,
          }),
        },
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Relatorio.csv";
        document.body.appendChild(a);
        a.click();
        a.remove();

        handleDateIsOpen();
        handleNoticeIsOpen();
        setConteudo("Arquivo baixado com sucesso!");
      } else {
        // tenta ler erro como texto
        const errorText = await response.text();
        handleNoticeIsOpen();
        setConteudo("Erro ao baixar: " + errorText);
      }
    } catch (error) {
      handleNoticeIsOpen();
      setConteudo("Erro inesperado: " + error.message);
    }
  };

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
    const fetchLocacoes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_LOCAL}/combustivel`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();
        setAbastecimento(data);
      } catch (error) {
        console.error("Erro ao buscar manutenções", error);
      }
    };
    fetchLocacoes();
  }, []);

  function handleOpenModal() {
    setModalIsOpen(!modalIsOpen);
  }

  function handleExpandModal(abastecimento) {
    setSelectedManutencao(abastecimento);
    setIsDetailModalOpen(true);
  }

  function handleCloseExpandModal() {
    setSelectedManutencao(null);
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
                <h1 className={styles.titlemanutencao}> Abastecimentos </h1>
                <button className={styles.butaoAdd} onClick={handleOpenModal}>
                  <CiCirclePlus size={35}></CiCirclePlus>
                </button>
                <button className={styles.butaoAdd} onClick={handleDateIsOpen}>
                  <FaFileExport size={35} />
                </button>
              </div>
              <div className={styles.line}></div>
            </div>

            <div className={styles.containerCard}>
              {abastecimento.length === 0 ? (
                <p>Nenhumo abastecimento cadastrado.</p>
              ) : (
                abastecimento.map((abastecimento) => (
                  <div
                    key={abastecimento.id}
                    onClick={() => handleExpandModal(abastecimento)}
                    className={styles.cardmanutencao}
                  >
                    <div>
                      <div className={styles.containerTitles}>
                        <span className={styles.titleCard}>
                          {`#ID: ` + abastecimento.id}
                        </span>
                      </div>
                      <div>
                        <span className={styles.titleCard}>
                          {`Placa: ` + abastecimento.placa_abastecimento}
                        </span>
                      </div>
                      <div>
                        <span className={styles.titleCardDois}>
                          {`Tipo de combustível: ` +
                            abastecimento.tipo_combustivel}
                        </span>
                      </div>
                      <div>
                        <span className={styles.titleCardDois}>
                          {`Valor: R$ ` + abastecimento.valor_abastecimento}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/*Modal para a cadastrar Abastecimentos*/}
          <Modal isOpen={modalIsOpen} onClose={handleOpenModal}>
            <div className={styles.containerModal}>
              <div className={styles.containerInternoModal}>
                <h1 className="text-3xl">Cadastro de Abastecimentos</h1>
                <form className={styles.formAdd}>
                  <div className={styles.input}>
                    <div className={styles.choiceboxContainer}>

                      <select
                        value={novaAbastecimento.placa_abastecimento}
                        onChange={(e) =>
                          setNovaAbastecimento({
                            ...novaAbastecimento,
                            placa_abastecimento: e.target.value,
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
                      type={"text"}
                      placeholder={"EX: 'Gasolina/Disel/Álcool'"}
                      maxLength={50}
                      label={"Tipo do combustível "}
                      value={novaAbastecimento.tipo_combustivel}
                      onChange={(e) =>
                        setNovaAbastecimento({
                          ...novaAbastecimento,
                          tipo_combustivel: e.target.value,
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"number"}
                      placeholder={"EX: 'R$222.00'"}
                      maxLength={30}
                      label={"Valor do Abastecimento"}
                      value={novaAbastecimento.valor_abastecimento}
                      onChange={(e) =>
                        setNovaAbastecimento({
                          ...novaAbastecimento,
                          valor_abastecimento: parseInt(e.target.value),
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"number"}
                      placeholder={"EX: '22568'"}
                      maxLength={300}
                      label={"Quilometragem"}
                      value={novaAbastecimento.km_abastecimento}
                      onChange={(e) =>
                        setNovaAbastecimento({
                          ...novaAbastecimento,
                          km_abastecimento: parseInt(e.target.value),
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={"EX: 'Posto Americo Nogueiro-Itapetinga'"}
                      maxLength={400}
                      label={"Nome do Posto e/ou Cidade"}
                      value={novaAbastecimento.posto_abastecimento}
                      onChange={(e) =>
                        setNovaAbastecimento({
                          ...novaAbastecimento,
                          posto_abastecimento: e.target.value,
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"date"}
                      label={"Data do abastecimento"}
                      value={novaAbastecimento.data_abastecimento}
                      onChange={(e) =>
                        setNovaAbastecimento({
                          ...novaAbastecimento,
                          data_abastecimento: e.target.value,
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"number"}
                      placeholder={"EX: 'Se tiver caso negativo coleque 123'"}
                      maxLength={30}
                      label={"Número da nota fiscal "}
                      value={novaAbastecimento.numero_nota}
                      onChange={(e) =>
                        setNovaAbastecimento({
                          ...novaAbastecimento,
                          numero_nota: parseInt(e.target.value),
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
                        `${process.env.NEXT_PUBLIC_LOCAL}/combustivel/cadastro`,
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify(novaAbastecimento),
                        },
                      );
                      if (response.ok) {
                        const abastecimentoCadastrado = await response.json();
                        setVeiculos((prev) => [
                          ...prev,
                          abastecimentoCadastrado,
                        ]);

                        handleNoticeIsOpen();
                        handleOpenModal();
                        setConteudo("Abastecimento cadastrado com sucesso!");

                        setNovaAbastecimento({
                          placa_abastecimento: "",
                          tipo_combustivel: "",
                          valor_abastecimento: "",
                          km_abastecimento: "",
                          posto_abastecimento: "",
                          data_abastecimento: "",
                          numero_nota: "",
                        });
                      } else {
                        const erro = await response.json();
                        handleNoticeIsOpen();
                        setConteudo(
                          erro.error || "Erro ao cadastrar abastecimento",
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

          <Modal
            width={"700px"}
            isOpen={isDetailModalOpen}
            onClose={handleCloseExpandModal}
          >
            {selectedAbastecimento && (
              <div className={styles.containerModalGeral}>
                <div className={styles.containerUpModal}>
                  <div className={styles.titleExpand}>
                    <h1>Abastecimento detalhado:</h1>
                  </div>
                  <div
                    className={styles.butaoClose}
                    onClick={handleCloseExpandModal}
                  >
                    <IoClose size={35} />
                  </div>
                </div>
                <div className={styles.modalExpand}>
                  {[
                    { label: "ID", value: selectedAbastecimento.id },
                    {
                      label: "Tipo de combustível",
                      value: selectedAbastecimento.tipo_combustivel,
                    },
                    {
                      label: "Veículo",
                      value: selectedAbastecimento.placa_abastecimento,
                    },
                    {
                      label: "Valor do abastecimento",
                      value: selectedAbastecimento.valor_abastecimento,
                    },
                    {
                      label: "Quilometragem",
                      value: selectedAbastecimento.km_abastecimento,
                    },
                    {
                      label: "Posto e/ou Cidade de abastecimento",
                      value: selectedAbastecimento.posto_abastecimento,
                    },

                    {
                      label: "Data do abastecimento",
                      value: formatarData(
                        selectedAbastecimento.data_abastecimento,
                      ),
                    },
                    {
                      label: "Número da nota",
                      value: selectedAbastecimento.numero_nota,
                    },
                  ].map((item, index) => (
                    <div key={index} className={styles.itemPartUm}>
                      <h1>{item.label}:</h1>
                      <h1>{item.value || "—"}</h1>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Modal>

          <Modal isOpen={dateIsOpen} onClose={handleDateIsOpen} width={"450px"}>
            <div className={styles.containerModal}>
              <div className={styles.containerInMini}>
                <h1>Exportar Dados CSV:</h1>
              </div>
              <div className={styles.containerInput}>
                <Ginput
                  type={"date"}
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                  placeholder={"Digite a data início"}
                />
                <Ginput
                  type={"date"}
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                  placeholder={"Digite a data final"}
                />
              </div>
              <div className={styles.butaoBaixar}>
                <BadButton
                  textColor={"#48793c"}
                  cor={"#d1dec7"}
                  colorHover={"#a3bc98"}
                  onClick={handleDateIsOpen}
                >
                  Cancelar
                </BadButton>
                <BadButton
                  cor={"#48793c"}
                  colorHover={"#769b6a"}
                  onClick={handleBaixar}
                >
                  Baixar
                </BadButton>
              </div>
            </div>
          </Modal>

          <Modal
            isOpen={noticeIsOpen}
            onClose={handleNoticeIsOpen}
            width={"400px"}
          >
            <div className={styles.containerModal}>
              <div className={styles.containerInMini}>
                <h1>{conteudo}</h1>
              </div>
              <div className={styles.butaoMini}>
                <BadButton
                  onClick={handleNoticeIsOpen}
                  colorHover={"#769b6a"}
                  cor={"#48793c"}
                >
                  OK
                </BadButton>
              </div>
            </div>
          </Modal>
        </main>

        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </>
  );
}
