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

export default function Veiculos() {
  useAuth();
  const [veiculos, setVeiculos] = useState([]);
  const [veiculosEditando, setVeiculosEditando] = useState({
    modelo: "",
    cor: "",
    tipo: "",
    km: "",
    ano: "",
  });
  const [novoVeiculo, setNovoVeiculos] = useState({
    placa: "",
    modelo: "",
    cor: "",
    tipo: "",
    km: "",
    ano: "",
  });

  useEffect(() => {
    const fetchVeiculos = async () => {
      try {
        const token = localStorage.getItem("token");
        const receberAPI = await fetch(
          `${process.env.NEXT_PUBLIC_LOCAL}/veiculos`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await receberAPI.json();
        setVeiculos(data);
      } catch (error) {
        console.error("Erro ao buscar veiculos".error);
      }
    };
    fetchVeiculos();
  }, []);

  const handleEditarVeiculo = (veiculo) => {
    setVeiculosEditando(veiculo);
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
              <h1 className="mb-3">Veículo cadastrado com sucesso!</h1>
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
              <h1 className="mb-3">Veículo deletado com sucesso!</h1>
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
              <h1 className="mb-3">Veículo editado com sucesso!</h1>
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
      
      case "ativar":
        return (
          <>
          <div className={styles.containerInMini}>
              <Ginput
                type={"text"}
                placeholder={"UAI9999"}
                maxLength={30}
                label={"Digite a placa do veículo a ser ativado!"}
              ></Ginput>
            </div>
            <div className={styles.butaoForm}>
              <BadButton
                colorHover={"#769b6a"}
                cor={"#48793c"}
                onClick={handleConfirmacaoIsOpen}
              >
                Cancelar
              </BadButton>
              <BadButton
                colorHover={"#769b6a"}
                cor={"#48793c"}
                onClick={handleConfirmacaoIsOpen}
              >
                Ativar
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
                    `${process.env.NEXT_PUBLIC_LOCAL}/veiculos/${veiculosEditando.placa}`,
                    {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  if (response.ok) {
                    setVeiculos((prev) =>
                      prev.filter((m) => m.placa !== veiculosEditando.placa)
                    );
                    setConfirmacao("deletado");
                  } else {
                    const erro = await response.json();
                    alert(erro.message || "Erro ao deletar veiculos");
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

  function handleConfirmacaoIsOpen() {
    setConfirmacaoIsOpen(!confirmacaoIsOpen);
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
                <h1 className={styles.titleLocacao}>Veículos Cadstrados</h1>
                <button className={styles.butaoAdd} onClick={handleOpenModal}>
                  <CiCirclePlus size={35}></CiCirclePlus>
                </button>
              </div>
              <div className={styles.line}></div>
            </div>

            <div className={styles.containerCard}>
              {veiculos.length === 0 ? (
                <p>Nenhum veiculo cadastrado.</p>
              ) : (
                veiculos.map((veiculo) => (
                  <div
                    key={veiculo.placa}
                    onClick={() => {
                      handleEditarVeiculo(veiculo);
                    }}
                    className={styles.card}
                  >
                    <div>
                      <span className={styles.titleCardTres}>
                        {veiculo.modelo}
                      </span>
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
                      <span className={styles.titleCard}>
                        {`Km: ` + veiculo.km}
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
                      placeholder={'ABC-1234'}
                      maxLength={200}
                      label={"Placa"}
                      value={novoVeiculo.placa}
                      onChange={(e) =>
                        setNovoVeiculos({
                          ...novoVeiculo,
                          placa: e.target.value,
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={'Corsa'}
                      maxLength={200}
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
                      placeholder={'Branco'}
                      maxLength={100}
                      label={"Cor"}
                      value={novoVeiculo.cor}
                      onChange={(e) =>
                        setNovoVeiculos({ ...novoVeiculo, cor: e.target.value })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={'Hatch'}
                      maxLength={100}
                      label={"Tipo"}
                      value={novoVeiculo.tipo}
                      onChange={(e) =>
                        setNovoVeiculos({
                          ...novoVeiculo,
                          tipo: e.target.value,
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"number"}
                      placeholder={"22568"}
                      maxLength={300}
                      label={"Km"}
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
                      placeholder={"2022"}
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
                        `${process.env.NEXT_PUBLIC_LOCAL}/veiculos`,
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify(novoVeiculo),
                        }
                      );
                      if (response.ok) {
                        const veiculoCadastrado = await response.json();
                        setVeiculos((prev) => [...prev, veiculoCadastrado]);

                        handleConfirmacaoIsOpen();
                        handleOpenModal();
                        setConfirmacao("cadastrado");

                        setNovoVeiculos({
                          placa: "",
                          modelo: "",
                          cor: "",
                          tipo: "",
                          km: "",
                          ano: "",
                        });
                      } else {
                        const erro = await response.json();
                        alert(erro.message || "Erro ao cadastrar veiculo");
                      }
                    }}
                  >
                    Cadastrar Veículo
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
                      placeholder={''}
                      maxLength={200}
                      label={"Modelo"}
                      value={veiculosEditando.modelo}
                      onChange={(e) =>
                        setVeiculosEditando({
                          ...veiculosEditando,
                          modelo: e.target.value,
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={"Branco"}
                      maxLength={7}
                      label={"Cor"}
                      value={veiculosEditando.cor}
                      onChange={(e) =>
                        setVeiculosEditando({ ...veiculosEditando, cor: e.target.value })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"text"}
                      placeholder={"Hatch"}
                      maxLength={30}
                      label={"Tipo"}
                      value={veiculosEditando.tipo}
                      onChange={(e) =>
                        setVeiculosEditando({
                          ...veiculosEditando,
                          tipo: e.target.value,
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"number"}
                      placeholder={"22568"}
                      maxLength={300}
                      label={"Km"}
                      value={veiculosEditando.km}
                      onChange={(e) =>
                        setVeiculosEditando({
                          ...veiculosEditando,
                          km: parseInt(e.target.value),
                        })
                      }
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      type={"number"}
                      placeholder={"2022"}
                      maxLength={30}
                      label={"Ano"}
                      value={veiculosEditando.ano}
                      onChange={(e) =>
                        setVeiculosEditando({
                          ...veiculosEditando,
                          ano: parseInt(e.target.value),
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
                        }
                      );
                      const data = await response.json();
                      if (response.ok) {
                        setVeiculos((prevVeiculos) =>
                          prevVeiculos.map((m) =>
                            m.placa === veiculosEditando.placa
                              ? veiculosEditando
                              : m
                          )
                        );
                        handleUpdateModal();
                        handleConfirmacaoIsOpen();
                        setConfirmacao("editado");
                      } else {
                        alert(data.message || "Erro ao atualizar veiculo");
                      }
                    }}
                  >
                    Atualizar Veículo
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
                onClick={() => {
                  handleExpandModal();
                  handleConfirmacaoIsOpen();
                  setConfirmacao("ativar");
                }}
                colorHover={"#fdbc4d"}
                cor={"#fca61d"}
                buttonWidth={"400px"}
              >
              Ativar
              </BadButton>
              <BadButton
                onClick={handleExpandModal}
                colorHover={"#fdbc4d"}
                cor={"#fca61d"}
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
