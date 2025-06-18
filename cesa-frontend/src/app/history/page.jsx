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

export default function History() {
  useAuth();
  const [locacoes, setLocacoes] = useState([]);

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

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [expandModal, setExpandModal] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  function handleOpenModal() {
    setModalIsOpen(!modalIsOpen);
  }
  function handleExpandModal(locacoes) {
    setExpandModal(locacoes);
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
                <h1 className={styles.titleLocacao}>Locações Finalizadas</h1>
                <button className={styles.butaoAdd} onClick={handleOpenModal}>
                  <CiCirclePlus size={35}></CiCirclePlus>
                </button>
              </div>
              <div className={styles.line}></div>
            </div>
            <div className={styles.containerCard}>
              {locacoes.length === 0 ? (
                <p>Nenhuma locação cadastrada.</p>
              ) : (
                locacoes.map((locacoes) => (
                  <div
                    key={locacoes.id}
                    onClick={() => {
                      handleExpandModal(locacoes);
                    }}
                    className={styles.cardLocacao}
                  >
                    <div>
                      <div className={styles.containerTitles}>
                        <span className={styles.titleCard}>
                          {`#ID: ` + locacoes.id}
                        </span>
                      </div>
                      <div>
                        <span className={styles.titleCard}>
                          {`Itinerario: ` + locacoes.itinerario}
                        </span>
                      </div>
                      <div>
                        <span className={styles.titleCardDois}>
                          {`Veiculo: ` + locacoes.veiculo_placa_fk}
                        </span>
                      </div>

                      <div>
                        <span className={styles.titleCardDois}>
                          {`Motorista: ` + locacoes.motorista_cpf_fk}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <Modal
            width={"1000px"}
            isOpen={expandModal}
            onClose={handleExpandModal}
          >
            <div className={styles.containerModalGeral}>
              {locacoes.map((locacoes) => (
                <div key={locacoes.id} className={styles.modalExpand}>
                  <div className={styles.itemUm}>
                    <div className={styles.itemInternoUm}>
                      <h1>ID:</h1>
                      <h1> {locacoes.id} </h1>
                    </div>
                  </div>
                  <div className={styles.itemUm}>
                    <div className={styles.itemInternoUm}>
                      <h1>Saída:</h1>
                      <h1> {locacoes.data_saida} </h1>
                    </div>
                  </div>
                  <div className={styles.itemUm}>
                    <div className={styles.itemInternoUm}>
                      <h1>Chegada:</h1>
                      <h1> {locacoes.data_chegada} </h1>
                    </div>
                  </div>
                  <div className={styles.itemUm}>
                    <div className={styles.itemInternoUm}>
                      <h1>Quilometragem de Saida:</h1>
                      <h1> {locacoes.km_saida} </h1>
                    </div>
                  </div>
                  <div className={styles.itemUm}>
                    <div className={styles.itemInternoUm}>
                      <h1>Quilometragem de Chegada:</h1>
                      <h1> {locacoes.km_chegada} </h1>
                    </div>
                  </div>

                  <div className={styles.partDois}>
                    <div className={styles.itemPartUm}>
                      <h1>Itinerario:</h1>
                      <h1> {locacoes.itinerario} </h1>
                    </div>
                  </div>

                  <div className={styles.partDois}>
                    <div className={styles.itemPartUm}>
                      <h1>Motivo da saida:</h1>
                      <h1>{locacoes.motivo_saida}</h1>
                    </div>
                  </div>

                  <div className={styles.partDois}>
                    <div className={styles.itemPartUm}>
                      <h1>Autorização:</h1>
                      <h1>{locacoes.autorizacao}</h1>
                    </div>
                  </div>

                  <div className={styles.partDois}>
                    <div className={styles.itemPartUm}>
                      <h1>Motorista:</h1>
                      <h1>{locacoes.motorista_cpf_fk}</h1>
                    </div>
                  </div>

                  <div className={styles.partDois}>
                    <div className={styles.itemPartUm}>
                      <h1>Veiculo:</h1>
                      <h1>{locacoes.veiculo_placa_fk}</h1>
                    </div>
                  </div>

                  <div className={styles.partDois}>
                    <div className={styles.itemPartUm}>
                      <h1>Gestor:</h1>
                      <h1>{locacoes.gestor_cpf_fk}</h1>
                    </div>
                  </div>

                  <div className={styles.partDois}>
                    <div className={styles.itemPartUm}>
                      <h1>Porteiro Saida:</h1>
                      <h1>{locacoes.porteiro_saida_fk}</h1>
                    </div>
                  </div>

                  <div className={styles.partDois}>
                    <div className={styles.itemPartUm}>
                      <h1>Porteiro Chegada:</h1>
                      <h1>{locacoes.porteiro_chegada_fk}</h1>
                    </div>
                  </div>

                  <div className={styles.partDois}>
                    <div className={styles.itemPartUm}>
                      <h1>Observação saida:</h1>
                      <h1>{locacoes.observacao_saida}</h1>
                    </div>
                  </div>

                  <div className={styles.partDois}>
                    <div className={styles.itemPartUm}>
                      <h1>Observação chegada:</h1>
                      <h1>{locacoes.observacao_chegada}</h1>
                    </div>
                  </div>
                </div>
              ))}

              <div className={styles.butaoForm}>
                <BadButton
                  colorHover={"#a3bc98"}
                  textColor={"#48793c"}
                  cor={"#d1dec7"}
                  onClick={handleExpandModal}
                >
                  Fechar
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
