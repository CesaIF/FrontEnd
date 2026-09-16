"use client";

import dynamic from "next/dynamic";
import Header from "../components/header";
import Footer from "../components/footer";
import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
const Modal = dynamic(() => import("../components/modal"), { ssr: false });
import BadButton from "../components/badButton";
import styles from "./Veiculos.module.css";
import Ginput from "../components/gInput";
import { useAuth } from "../hooks/useAuth";
import Pagination from "../components/pagination";
import { usePagination } from "../hooks/usePagination";
import { FaFileExport } from "react-icons/fa6";
import SearchBar from "../components/searchBar";
import { exportarPdf } from "../utils/exportPdf";

export default function Veiculos() {
  useAuth();
  const [veiculos, setVeiculos] = useState([]);
  // MELHORIA FRONT-END: termo enviado para GET /veiculos?placa=...
  const [buscaPlaca, setBuscaPlaca] = useState("");
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedItems: paginatedVeiculos,
  } = usePagination(veiculos, 12);
  const [veiculosEditando, setVeiculosEditando] = useState({
    modelo: "",
    cor: "",
    tipo: "",
    ano: "",
    chassi: "",
    renavam: "",
    cartao: "",
  });
  const [novoVeiculo, setNovoVeiculos] = useState({
    placa: "",
    modelo: "",
    cor: "",
    tipo: "",
    km: "",
    ano: "",
    chassi: "",
    renavam: "",
    cartao: "",
  });
  // MELHORIA FRONT-END: controla o dropdown de tipo do veículo e a opção de digitação manual.
  const [tipoVeiculoSelecionado, setTipoVeiculoSelecionado] = useState("");
  const [conteudo, setConteudo] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const token = localStorage.getItem("token");
        const params = new URLSearchParams();
        if (buscaPlaca.trim()) params.set("placa", buscaPlaca.trim());

        const receberAPI = await fetch(
          `${process.env.NEXT_PUBLIC_LOCAL}/veiculos?${params.toString()}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const data = await receberAPI.json();
        setVeiculos(data);
        setCurrentPage(1);
      } catch (error) {
        console.error("Erro ao buscar veículos", error);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [buscaPlaca, setCurrentPage]);

  const handleEditarVeiculo = (veiculo) => {
    setVeiculosEditando(veiculo);
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

  const handleBaixar = async () => {
    try {
      // MELHORIA FRONT-END: veículos usam a nova rota /relatorio/exportar/veiculos.
      await exportarPdf({
        entidade: "veiculos",
        body: buscaPlaca.trim()
          ? { modo: "filtro", placa: buscaPlaca.trim() }
          : { modo: "todos" },
        nomeArquivo: "RelacaoVeiculos.pdf",
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

  // O back-end utiliza o campo `ativo` para indicar veículo em trânsito/em uso.
  function veiculoEmTransito(ativo) {
    return ativo === true || ativo === 1 || ativo === "1";
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
                <h1 className={styles.titleLocacao}>Veículos Cadastrados</h1>
                <div className={styles.buttons}>
                  <button
                    className={styles.butaoAdd}
                    onClick={handleBaixar}
                    title="Exportar"
                  >
                    <FaFileExport size={35} />
                  </button>
                  <button className={styles.butaoAdd} onClick={handleOpenModal}>
                    <CiCirclePlus size={35}></CiCirclePlus>
                  </button>
                </div>
              </div>
              <div className={styles.line}></div>
            </div>

            <div className={styles.filterArea}>
              <SearchBar
                value={buscaPlaca}
                onChange={(e) => setBuscaPlaca(e.target.value)}
                placeholder="Pesquisar veículo por placa..."
              />
            </div>

            <div className={styles.containerCard}>
              {veiculos.length === 0 ? (
                <p>Nenhum veiculo cadastrado.</p>
              ) : (
                paginatedVeiculos.map((veiculo) => (
                  <div
                    key={veiculo.placa}
                    onClick={() => {
                      handleEditarVeiculo(veiculo);
                    }}
                    className={`${styles.card} ${
                      veiculoEmTransito(veiculo.ativo)
                        ? styles.veiculoEmTransito
                        : ""
                    }`}
                  >
                    <div className={styles.cardHeader}>
                      <span className={styles.titleCardTres}>
                        {veiculo.modelo}
                      </span>
                      {veiculoEmTransito(veiculo.ativo) && (
                        <span className={styles.statusTransito}>Em trânsito</span>
                      )}
                    </div>
                    <div>
                      <span className={styles.titleCard}>
                        {`Placa: ` + veiculo.placa}
                      </span>
                    </div>
                    <div>
                      <span className={styles.titleCard}>
                        {`Cor: ` + veiculo.cor}
                      </span>
                    </div>
                    <div>
                      <span className={styles.titleCard}>
                        {`Tipo: ` + veiculo.tipo}
                      </span>
                    </div>
                    <div>
                      <span className={styles.titleCardDois}>
                        {`Ano: ` + veiculo.ano}
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
          {/*Modal para a cadastrar veiculo*/}
          <Modal isOpen={modalIsOpen} onClose={handleOpenModal}>
            <div className={styles.containerModal}>
              <div className={styles.containerInternoModal}>
                <h1 className="text-3xl">Cadastro de Veículos</h1>
                <form className={styles.formAdd}>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={"EX: 'ABC1234 ou ABC1D23'"}
                      maxLength={7}
                      label={"Placa"}
                      value={novoVeiculo.placa}
                      onChange={(e) =>
                        setNovoVeiculos({
                          ...novoVeiculo,
                          placa: e.target.value.toUpperCase(),
                        })
                      }
                    />
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={"EX: 'Corsa'"}
                      maxLength={50}
                      label={"Modelo"}
                      value={novoVeiculo.modelo}
                      onChange={(e) =>
                        setNovoVeiculos({
                          ...novoVeiculo,
                          modelo: e.target.value,
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={"EX: 'Branco'"}
                      maxLength={50}
                      label={"Cor"}
                      value={novoVeiculo.cor}
                      onChange={(e) =>
                        setNovoVeiculos({ ...novoVeiculo, cor: e.target.value })
                      }
                    ></Ginput>
                  </div>
                  {/* MELHORIA FRONT-END: tipo do veículo agora é selecionado por dropdown. */}
                  <div className={styles.input}>
                    <div className={styles.choiceboxContainer}>
                      <label className={styles.selectLabel}>Tipo</label>
                      <select
                        className={styles.choicebox}
                        value={tipoVeiculoSelecionado}
                        onChange={(e) => {
                          const valor = e.target.value;
                          setTipoVeiculoSelecionado(valor);
                          setNovoVeiculos({
                            ...novoVeiculo,
                            tipo: valor === "Outro" ? "" : valor,
                          });
                        }}
                      >
                        <option value="">Escolha o tipo</option>
                        <option value="Hatch">Hatch</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Pickup">Pickup</option>
                        <option value="SUV">SUV</option>
                        <option value="Van">Van</option>
                        <option value="Micro-ônibus">Micro-ônibus</option>
                        <option value="Ônibus">Ônibus</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </div>
                  </div>
                  {tipoVeiculoSelecionado === "Outro" && (
                    <div className={styles.input}>
                      <Ginput
                        type={"text"}
                        placeholder={"Digite o tipo do veículo"}
                        maxLength={50}
                        label={"Outro tipo"}
                        value={novoVeiculo.tipo}
                        onChange={(e) =>
                          setNovoVeiculos({
                            ...novoVeiculo,
                            tipo: e.target.value,
                          })
                        }
                      />
                    </div>
                  )}
                  <div className={styles.input}>
                    <Ginput
                      type={"number"}
                      placeholder={"EX: '22568'"}
                      maxLength={300}
                      label={"Quilometragem"}
                      value={novoVeiculo.km}
                      onChange={(e) =>
                        setNovoVeiculos({
                          ...novoVeiculo,
                          km: parseInt(e.target.value),
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"number"}
                      placeholder={"EX: '2022'"}
                      maxLength={30}
                      label={"Ano"}
                      value={novoVeiculo.ano}
                      onChange={(e) =>
                        setNovoVeiculos({
                          ...novoVeiculo,
                          ano: parseInt(e.target.value),
                        })
                      }
                    ></Ginput>
                  </div>

                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={"EX: '8AFER13P8AJ323520'"}
                      maxLength={200}
                      label={"Chassi"}
                      value={novoVeiculo.chassi}
                      onChange={(e) =>
                        setNovoVeiculos({
                          ...novoVeiculo,
                          chassi: e.target.value,
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"number"}
                      placeholder={"EX: '214278620'"}
                      maxLength={100}
                      label={"Renavam"}
                      value={novoVeiculo.renavam}
                      onChange={(e) =>
                        setNovoVeiculos({
                          ...novoVeiculo,
                          renavam: parseInt(e.target.value),
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"number"}
                      placeholder={"EX: '6796000000000001'"}
                      maxLength={300}
                      label={"Cartão"}
                      value={novoVeiculo.cartao}
                      onChange={(e) =>
                        setNovoVeiculos({
                          ...novoVeiculo,
                          cartao: parseInt(e.target.value),
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
                        `${process.env.NEXT_PUBLIC_LOCAL}/veiculos/cadastrar`,
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify(novoVeiculo),
                        },
                      );
                      if (response.ok) {
                        const veiculoCadastrado = await response.json();
                        setVeiculos((prev) => [...prev, veiculoCadastrado]);

                        handleNoticeIsOpen();
                        handleOpenModal();
                        setConteudo("Veículo cadastrado com sucesso!");

                        setNovoVeiculos({
                          placa: "",
                          modelo: "",
                          cor: "",
                          tipo: "",
                          km: "",
                          ano: "",
                          chassi: "",
                          renavam: "",
                          cartao: "",
                        });
                        setTipoVeiculoSelecionado("");
                      } else {
                        const erro = await response.json();
                        handleNoticeIsOpen();
                        setConteudo(erro.error || "Erro ao cadastrar veiculo");
                      }
                    }}
                  >
                    Cadastrar
                  </BadButton>
                </div>
              </div>
            </div>
          </Modal>
          {/*Modal para a atualizar veiculo*/}
          <Modal isOpen={updateModal} onClose={handleUpdateModal}>
            <div className={styles.containerModal}>
              <div className={styles.containerInternoModal}>
                <h1 className="text-3xl">Atualizar Veículos</h1>
                <form className={styles.formAdd}>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={"EX: 'Corsa'"}
                      maxLength={50}
                      label={"Modelo"}
                      value={novoVeiculo.modelo}
                      onChange={(e) =>
                        setNovoVeiculos({
                          ...novoVeiculo,
                          modelo: e.target.value,
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={"EX: 'Branco'"}
                      maxLength={50}
                      label={"Cor"}
                      value={novoVeiculo.cor}
                      onChange={(e) =>
                        setNovoVeiculos({ ...novoVeiculo, cor: e.target.value })
                      }
                    ></Ginput>
                  </div>
                  {/* MELHORIA FRONT-END: tipo do veículo agora é selecionado por dropdown. */}
                  <div className={styles.input}>
                    <div className={styles.choiceboxContainer}>
                      <label className={styles.selectLabel}>Tipo</label>
                      <select
                        className={styles.choicebox}
                        value={tipoVeiculoSelecionado}
                        onChange={(e) => {
                          const valor = e.target.value;
                          setTipoVeiculoSelecionado(valor);
                          setNovoVeiculos({
                            ...novoVeiculo,
                            tipo: valor === "Outro" ? "" : valor,
                          });
                        }}
                      >
                        <option value="">Escolha o tipo</option>
                        <option value="Hatch">Hatch</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Pickup">Pickup</option>
                        <option value="SUV">SUV</option>
                        <option value="Van">Van</option>
                        <option value="Micro-ônibus">Micro-ônibus</option>
                        <option value="Ônibus">Ônibus</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </div>
                  </div>
                  {tipoVeiculoSelecionado === "Outro" && (
                    <div className={styles.input}>
                      <Ginput
                        type={"text"}
                        placeholder={"Digite o tipo do veículo"}
                        maxLength={50}
                        label={"Outro tipo"}
                        value={novoVeiculo.tipo}
                        onChange={(e) =>
                          setNovoVeiculos({
                            ...novoVeiculo,
                            tipo: e.target.value,
                          })
                        }
                      />
                    </div>
                  )}
                  <div className={styles.input}>
                    <Ginput
                      type={"number"}
                      placeholder={"EX: '2022'"}
                      maxLength={30}
                      label={"Ano"}
                      value={novoVeiculo.ano}
                      onChange={(e) =>
                        setNovoVeiculos({
                          ...novoVeiculo,
                          ano: parseInt(e.target.value),
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={"EX: '8AFER13P8AJ323520'"}
                      maxLength={200}
                      label={"Chassi"}
                      value={novoVeiculo.chassi}
                      onChange={(e) =>
                        setNovoVeiculos({
                          ...novoVeiculo,
                          chassi: e.target.value,
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"number"}
                      placeholder={"EX: '214278620'"}
                      maxLength={100}
                      label={"Renavam"}
                      value={novoVeiculo.renavam}
                      onChange={(e) =>
                        setNovoVeiculos({
                          ...novoVeiculo,
                          renavam: parseInt(e.target.value),
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"number"}
                      placeholder={"EX: '6796000000000001'"}
                      maxLength={300}
                      label={"Cartão"}
                      value={novoVeiculo.cartao}
                      onChange={(e) =>
                        setNovoVeiculos({
                          ...novoVeiculo,
                          cartao: parseInt(e.target.value),
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
                        `${process.env.NEXT_PUBLIC_LOCAL}/veiculos/${veiculosEditando.placa}`,
                        {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify({
                            placa: veiculosEditando.placa,
                            modelo: veiculosEditando.modelo,
                            cor: veiculosEditando.cor,
                            tipo: veiculosEditando.tipo,
                            km: veiculosEditando.km,
                            ano: veiculosEditando.ano,
                          }),
                        },
                      );
                      const data = await response.json();
                      if (response.ok) {
                        setVeiculos((prevVeiculos) =>
                          prevVeiculos.map((m) =>
                            m.placa === veiculosEditando.placa
                              ? veiculosEditando
                              : m,
                          ),
                        );
                        handleUpdateModal();
                        handleNoticeIsOpen();
                        setConteudo("Veículo editado com sucesso!");
                      } else {
                        handleNoticeIsOpen();
                        setConteudo(data.error || "Erro ao atualizar veiculo");
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
              <span className={styles.titleCardQuatro}>Painel de Veículos</span>
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
                      `${process.env.NEXT_PUBLIC_LOCAL}/veiculos/${veiculosEditando.placa}`,
                      {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                      },
                    );
                    if (response.ok) {
                      setVeiculos((prev) =>
                        prev.filter((m) => m.placa !== veiculosEditando.placa),
                      );
                      handleNoticeIsOpen();
                      handleDeletarIsOpen();
                      setConteudo("Veículo deletado com sucesso!");
                    } else {
                      const erro = await response.json();
                      handleNoticeIsOpen();
                      setConteudo(erro.error || "Erro ao deletar veiculos");
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
