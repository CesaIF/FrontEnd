"use client";

import dynamic from "next/dynamic";
import Header from "../components/header";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
const Modal = dynamic(() => import("../components/modal"), { ssr: false });
import BadButton from "../components/badButton";
import styles from "./Manutencao.module.css";
import { CiCirclePlus } from "react-icons/ci";
import { useAuth } from "../hooks/useAuth";
import Pagination from "../components/pagination";
import { usePagination } from "../hooks/usePagination";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FaFileExport } from "react-icons/fa6";
import Ginput from "../components/gInput";
import { IoClose } from "react-icons/io5";

export default function Manutencao() {
  useAuth();
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  const [manutencao, setManutencao] = useState([]);
  const { currentPage, setCurrentPage, totalPages, paginatedItems: paginatedManutencoes } = usePagination(manutencao, 12);
  const [isOpen, setIsOpen] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedManutencao, setSelectedManutencao] = useState(null);
  const [conteudo, setConteudo] = useState("");
  const [noticeIsOpen, setNoticeIsOpen] = useState(false);
  const [dateIsOpen, setDateIsOpen] = useState(false);

  const [veiculo, setVeiculo] = useState([]);

  const [novaManutencao, setNovaManutencao] = useState({
    placa_manutencao: "",
    tipo_manutencao: "",
    quant_dias: "",
    km_manutencao: "",
    servico: "",
    data_manutencao: "",
    valor_manutencao: "",
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
          `${process.env.NEXT_PUBLIC_LOCAL}/manutencao`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();
        setManutencao(data);
      } catch (error) {
        console.error("Erro ao buscar manutenções", error);
      }
    };
    fetchLocacoes();
  }, []);

  function handleOpenModal() {
    setModalIsOpen(!modalIsOpen);
  }

  function handleExpandModal(manutencao) {
    setSelectedManutencao(manutencao);
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
                <h1 className={styles.titlemanutencao}> Manutenção </h1>
                <div className={styles.titleActions}>
                  <button
                    className={styles.butaoAdd}
                    onClick={handleOpenModal}
                    title="Adicionar"
                    aria-label="Adicionar"
                  >
                    <CiCirclePlus size={35} />
                  </button>
                  <button
                    className={styles.butaoAdd}
                    onClick={handleDateIsOpen}
                    title="Exportar"
                    aria-label="Exportar"
                  >
                    <FaFileExport size={35} />
                  </button>
                </div>
              </div>
              <div className={styles.line}></div>
            </div>

            <div className={styles.containerCard}>
              {manutencao.length === 0 ? (
                <p>Nenhuma manutencao cadastrada.</p>
              ) : (
                paginatedManutencoes.map((manutencao) => (
                  <div
                    key={manutencao.id}
                    onClick={() => handleExpandModal(manutencao)}
                    className={styles.cardmanutencao}
                  >
                    <div>
                      <div className={styles.containerTitles}>
                        <span className={styles.titleCard}>
                          {`#ID: ` + manutencao.id}
                        </span>
                      </div>
                      <div>
                        <span className={styles.titleCard}>
                          {`Placa: ` + manutencao.placa_manutencao}
                        </span>
                      </div>
                      <div>
                        <span className={styles.titleCardDois}>
                          {`Tipo da manutenção: ` + manutencao.tipo_manutencao}
                        </span>
                      </div>
                      <div>
                        <span className={styles.titleCardDois}>
                          {`Valor: R$ ` + manutencao.valor_manutencao}
                        </span>
                      </div>
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

          {/*Modal para a cadastrar Manutenções*/}
          <Modal isOpen={modalIsOpen} onClose={handleOpenModal}>
            <div className={styles.containerModal}>
              <div className={styles.containerInternoModal}>
                <h1 className="text-3xl">Cadastro de Manutenções</h1>
                <form className={styles.formAdd}>
                  <div className={styles.input}>
                    <div className={styles.choiceboxContainer}>
                      <select
                        className={styles.choicebox}
                        value={novaManutencao.placa_manutencao}
                        onChange={(e) =>
                          setNovaManutencao({
                            ...novaManutencao,
                            placa_manutencao: e.target.value,
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
                      placeholder={"EX: 'Preventiva ou Corretiva'"}
                      maxLength={50}
                      label={"Tipo de manutenção "}
                      value={novaManutencao.tipo_manutencao}
                      onChange={(e) =>
                        setNovaManutencao({
                          ...novaManutencao,
                          tipo_manutencao: e.target.value,
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"number"}
                      placeholder={"EX: '2'"}
                      maxLength={30}
                      label={"Quantidade(s) de dia(s) de serviço(s)"}
                      value={novaManutencao.quant_dias}
                      onChange={(e) =>
                        setNovaManutencao({
                          ...novaManutencao,
                          quant_dias: parseInt(e.target.value),
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
                      value={novaManutencao.km_manutencao}
                      onChange={(e) =>
                        setNovaManutencao({
                          ...novaManutencao,
                          km_manutencao: parseInt(e.target.value),
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={"EX: 'Troca do óleo da direção Hidraulica'"}
                      maxLength={400}
                      label={"Serviço(s)"}
                      value={novaManutencao.servico}
                      onChange={(e) =>
                        setNovaManutencao({
                          ...novaManutencao,
                          servico: e.target.value,
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"date"}
                      label={"Data do serviço(s)"}
                      value={novaManutencao.data_manutencao}
                      onChange={(e) =>
                        setNovaManutencao({
                          ...novaManutencao,
                          data_manutencao: e.target.value,
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"number"}
                      placeholder={"EX: '123.00'"}
                      maxLength={300}
                      label={"Valor da manutenção"}
                      value={novaManutencao.valor_manutencao}
                      onChange={(e) =>
                        setNovaManutencao({
                          ...novaManutencao,
                          valor_manutencao: parseInt(e.target.value),
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
                      value={novaManutencao.numero_nota}
                      onChange={(e) =>
                        setNovaManutencao({
                          ...novaManutencao,
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
                        `${process.env.NEXT_PUBLIC_LOCAL}/manutencao/cadastro`,
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify(novaManutencao),
                        },
                      );
                      if (response.ok) {
                        const manutencaoCadastrado = await response.json();
                        setVeiculos((prev) => [...prev, manutencaoCadastrado]);

                        handleNoticeIsOpen();
                        handleOpenModal();
                        setConteudo("Manutenção cadastrada com sucesso!");

                        setNovaManutencao({
                          placa_manutencao: "",
                          tipo_manutencao: "",
                          quant_dias: "",
                          km_manutencao: "",
                          servico: "",
                          data_manutencao: "",
                          valor_manutencao: "",
                          numero_nota: "",
                        });
                      } else {
                        const erro = await response.json();
                        handleNoticeIsOpen();
                        setConteudo(
                          erro.error || "Erro ao cadastrar manutenção",
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
            {selectedManutencao && (
              <div className={styles.containerModalGeral}>
                <div className={styles.containerUpModal}>
                  <div className={styles.titleExpand}>
                    <h1>Manutenção detalhada:</h1>
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
                    { label: "ID", value: selectedManutencao.id },
                    {
                      label: "Tipo de manutenção",
                      value: selectedManutencao.tipo_manutencao,
                    },
                    {
                      label: "Veículo",
                      value: `${selectedManutencao.modelo_veiculo} - ${selectedManutencao.placa_manutencao}`,
                    },
                    {
                      label: "Dias de serviços",
                      value: selectedManutencao.quant_dias,
                    },
                    {
                      label: "Quilometragem",
                      value: selectedManutencao.km_manutencao,
                    },
                    {
                      label: "Serviço(s) realizado(s)",
                      value: selectedManutencao.servico,
                    },

                    {
                      label: "Data da manutenção",
                      value: formatarData(selectedManutencao.data_manutencao),
                    },
                    {
                      label: "Valor da manutenção",
                      value: selectedManutencao.valor_manutencao,
                    },
                    {
                      label: "Número da nota",
                      value: selectedManutencao.numero_nota,
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
