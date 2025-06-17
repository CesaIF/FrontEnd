// "use client" porque está rodando no lado do cliente.
"use client";

// todos os módulos usados na página.

//importação do dynamic para aumentar desempenho e renderizar dinamicamente os modais (evitam renderizar conteúdo não utilizado.)
import dynamic from "next/dynamic";
import Header from "./components/header";
import Footer from "./components/footer";
import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
const Modal = dynamic(() => import("./components/modal"), { ssr: false });
import Textarea from "./components/textarea";
import ChoiceBox from "./components/choicebox";
import BadButton from "./components/badButton";
import styles from "./Dashboard.module.css";
import Ginput from "./components/gInput";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useAuth } from "./hooks/useAuth";

// exportação da página principal a ser chamada nas rotas.
export default function Dashboard() {

  // constantes de funcionamento geral da página.

  // constante de abrem e fecham os modais.
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // constante que abre e fecha os modais de confirmação.
  const [confirmacaoIsOpen, setConfirmacaoIsOpen] = useState(false);
  // constante que abre e fecha o menu lateral.
  const [isOpen, setIsOpen] = useState(true);
  // constante que altera o conteúdo dos modais.
  const [modalContent, setModalContent] = useState("cadastro");
  // constante que altera o conteúdo do modal de confirmação.
  const [confirmacao, setConfirmacao] = useState("cadastrado");
  // constante que altera o tipo de modal de expansão dos dados que vai inferir na funcionalidade deles.
  const [expandType, setExpandType] = useState(1);
  // constante que altera o valor do popUp e permite que ele seja aberto.
  const [popUp, setPopUp] = useState(false);
  // constante que informa a localização do popUp.
  const [popUpPosition, setPopUpPosition] = useState({ x: 0, y: 0 });
  // constante que inicializa o useRef do popUp.
  const popupRef = useRef(null);

  useAuth();

  // constantes que inicializa dados do cadastro de locação.
  const [locacoesAgendadas, setLocacoesAgendadas] = useState([]);
  const [locacoes, setLocacoes] = useState([]);
  const [erro, setErro] = useState('');
  const [veiculo, setVeiculo] = useState([]);
  const [motorista, setMotorista] = useState([]);
  const [itinerario, setItinerario] = useState("");
  const [motivo, setMotivo] = useState("");
  const [placaSelecionada, setPlacaSelecionada] = useState("");
  const [motoristaSelecionado, setMotoristaSelecionado] = useState("");
  const [dataSaida, setDataSaida] = useState("");
  const [dataChegada, setDataChegada] = useState("");

  // fetch dados de locação iniciada.
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://localhost/locacoes/ativos", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(async (res) => {
        const data = await res.json();

        if (res.ok) {
            setLocacoes(data);
        } else {
            setErro(data.message || "Erro ao buscar dados");
        }
    })
    .catch((err) => {
        setErro("Erro de conexão");
        console.error(err);
    })
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://localhost/veiculos", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`, 
      },
    })
    .then(async (res) => {
      const data = await res.json();

      if (res.ok) {
        setVeiculo(data);
      } else {
        alert("Erro ao encontrar veículos");
      }
    })
    .catch((err) => {
      console.error(err);
    })
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://localhost/motoristas", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`, 
      },
    })
    .then(async (res) => {
      const data = await res.json();

      if (res.ok) {
        setMotorista(data);
      } else {
        alert("Erro ao encontrar motoristas");
      }
    })
    .catch((err) => {
      console.error(err);
    })
  }, []);

  useEffect(() => {

    const token = localStorage.getItem("token")

    fetch("https://localhost/locacoes", {
      headers:{
        "Authorization": `Bearer ${token}`,
      },
    })
    .then(async(res) => {
      const data = await res.json();

      if(res.ok){
        setLocacoesAgendadas(data);
      } else {
        alert(data.message);
      }
    })
    .catch((err) => {
      console.error(err);
    })
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const cpfGestor = localStorage.getItem("cpf");

    const response = await fetch("https://localhost/locacoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        data_saida: dataSaida,
        data_chegada: dataChegada,
        itinerario: itinerario,
        motivo_saida: motivo,
        autorizacao: cpfGestor,
        motorista_cpf_fk: motoristaSelecionado,
        gestor_cpf_fk: cpfGestor,
        veiculo_placa_fk: placaSelecionada,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setMotoristaSelecionado("");
      setPlacaSelecionada("");
      setItinerario("");
      setMotivo("");
      alert("Locação criada com sucesso!");
    } else {
      alert(data.message);
    }
  } 

  // função que fecha o pop-up modal ao clicar na tela fora dele.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopUp(!popUp);
      }
    };

    if (popUp) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popUp]);

  // função que lida com a abertura do pop up de locação.
  function handlePopUp(e) {
    e.stopPropagation();
    setPopUp(!popUp);
    const x = e.pageX;
    const y = e.pageY;
    setPopUpPosition({ x, y });
  }

  // função que renderiza os botões que dependerão do tipo do modal de expansão.
  function renderExpandType() {
    switch (expandType) {
      case 1:
        return (
          <>
            <BadButton
              colorHover={"#a3bc98"}
              textColor={"#48793c"}
              cor={"#d1dec7"}
              onClick={handleOpenModal}
            >
              Fechar
            </BadButton>
            <BadButton
              onClick={() => {
                setConfirmacao("iniciar");
                handleOpenModal();
                handleConfirmacaoIsOpen();
              }}
              colorHover={"#769b6a"}
              cor={"#48793c"}
            >
              Iniciar
            </BadButton>
          </>
        );

      case 2:
        return (
          <>
            <BadButton
              colorHover={"#a3bc98"}
              textColor={"#48793c"}
              cor={"#d1dec7"}
              onClick={handleOpenModal}
            >
              Fechar
            </BadButton>
            <BadButton
              onClick={() => {
                setConfirmacao("finalizar");
                handleOpenModal();
                handleConfirmacaoIsOpen();
              }}
              colorHover={"#769b6a"}
              cor={"#48793c"}
            >
              Finalizar
            </BadButton>
          </>
        );

      default:
        return null;
    }
  }

  // função que muda o texto dos modais de confirmação conforme necessário.
  // os cases são declarados nos onClick{}.
  function renderContentConfirmacao() {
    switch (confirmacao) {
      case "cadastrado":
        return (
          <>
            <div className={styles.containerModal}>
              <h1 className="mb-3">Locação cadastrada com sucesso!</h1>
            </div>
            <div className={styles.butaoForm}>
              <BadButton onClick={handleConfirmacaoIsOpen}>OK</BadButton>
            </div>
          </>
        );

      case "deletado":
        return (
          <>
            <div className={styles.containerModal}>
              <h1 className="mb-3">Locação deletada com sucesso!</h1>
            </div>
            <div className={styles.butaoForm}>
              <BadButton onClick={handleConfirmacaoIsOpen}>OK</BadButton>
            </div>
          </>
        );

      case "editado":
        return (
          <>
            <div className={styles.containerModal}>
              <h1 className="mb-3">Locação editada com sucesso!</h1>
            </div>
            <div className={styles.butaoForm}>
              <BadButton onClick={handleConfirmacaoIsOpen}>OK</BadButton>
            </div>
          </>
        );

      case "acesso":
        return (
          <>
            <div className={styles.containerModal}>
              <h1 className="mb-3">Você não tem permissão pra isso!</h1>
            </div>
            <div className={styles.butaoForm}>
              <BadButton onClick={handleConfirmacaoIsOpen}>OK</BadButton>
            </div>
          </>
        );

      case "deletar":
        return (
          <>
            <div className={styles.containerModal}>
              <h1 className="mb-3">
                Você tem certeza que quer deletar a locação?
              </h1>
            </div>
            <div className={styles.butaoForm}>
              <BadButton onClick={handleConfirmacaoIsOpen}>Ok</BadButton>
              <BadButton
                onClick={() => {
                  handleConfirmacaoIsOpen();
                  setConfirmacao("deletado");
                }}
              >
                Deletar
              </BadButton>
            </div>
          </>
        );

      case "iniciar":
        return (
          <>
            <div className={styles.containerModal}>
              <h1 className="mb-3">
                Você tem certeza que quer iniciar a locação?
              </h1>
            </div>
            <div className={styles.butaoForm}>
              <BadButton onClick={handleConfirmacaoIsOpen}>Ok</BadButton>
              <BadButton
                onClick={() => {
                  handleConfirmacaoIsOpen();
                }}
              >
                Deletar
              </BadButton>
            </div>
          </>
        );

      case "finalizar":
        return (
          <>
            <div className={styles.containerModal}>
              <h1 className="mb-3">
                Você tem certeza que quer finalizar a locação?
              </h1>
            </div>
            <div className={styles.butaoForm}>
              <BadButton onClick={handleConfirmacaoIsOpen}>Ok</BadButton>
              <BadButton
                onClick={() => {
                  handleConfirmacaoIsOpen();
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

  // mudar conteúdo da modal dinamicamente quando algum content da modal for alterado.
  // cases são os tipos de conteúdos a serem exibidos, são definidos nos onClick={}.
  function renderContentModal() {
    switch (modalContent) {
      case "cadastro":
        return (
          <>
            <div className={styles.containerModal}>
              <div className={styles.containerInternoModal}>
                <h1 className="text-3xl">Cadastro de Locação</h1>
                <form onSubmit={handleSubmit} className={styles.formAdd}>
                  <div className={styles.input}>

                    <div className={styles.choiceboxContainer}>
                      <select
                      value={placaSelecionada}
                      onChange={(e) => setPlacaSelecionada(e.target.value)}
                      >
                        <option className={styles.choicebox}>Escolha o Veículo</option>
                        {veiculo.map((veiculos) => (
                          <option key={veiculos.placa} value={veiculos.placa}>{veiculos.modelo}</option>
                        ))}
                      </select>
                    </div>

                  </div>
                  <div className={styles.input}>

                    <div className={styles.choiceboxContainer}>
                      <select
                      value={motoristaSelecionado}
                      onChange={(e) => setMotoristaSelecionado(e.target.value)}
                      >
                        <option className={styles.choicebox}>Escolha o Motorista</option>
                        {motorista.map((motoristas) => (
                          <option key={motoristas.cpf} value={motoristas.cpf}>{motoristas.nome}</option>
                        ))}
                      </select>
                    </div>

                  </div>
                  <div className={styles.input}>
                    <Textarea
                      label={"Itinerário"}
                      placeholder={"Descreva o Itinerário"}
                      maxLength={300}
                      rows={2}
                      value={itinerario}
                      onChange={(e) => setItinerario(e.target.value)}
                    ></Textarea>
                  </div>
                  <div className={styles.input}>
                    <Textarea
                      label={"Motivo da Saída"}
                      placeholder={"Descreva o motivo da Saída"}
                      maxLength={300}
                      rows={2}
                      value={motivo}
                      onChange={(e) => setMotivo(e.target.value)}
                    ></Textarea>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      label={"Data Prevista de Saída"}
                      type={"datetime-local"}
                      maxLength={300}
                      value={dataSaida}
                      onChange={(e) => setDataSaida(e.target.value)}
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput label={"Data Prevista de Chegada"} type={"datetime-local"} maxLength={300} value={dataChegada} onChange={(e) => setDataChegada(e.target.value)}></Ginput>
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
                    Criar Locação
                  </BadButton>
                </div>
                </form>
              </div>
            </div>
          </>
        );

      case "edicao":
        return (
          <>
            <div className={styles.containerModal}>
              <div className={styles.containerInternoModal}>
                <h1 className="text-3xl">Editar Locação</h1>
                <form className={styles.formAdd}>
                  <div className={styles.input}>
                    <ChoiceBox label={"Veículo"}>Escolha o Veículo!</ChoiceBox>
                  </div>
                  <div className={styles.input}>
                    <ChoiceBox label={"Motorista"}>
                      Escolha o Motorista!
                    </ChoiceBox>
                  </div>
                  <div className={styles.input}>
                    <Textarea
                      label={"Itinerário"}
                      placeholder={"Descreva o Itinerário"}
                      maxLength={300}
                      rows={3}
                    ></Textarea>
                  </div>
                  <div className={styles.input}>
                    <Textarea
                      label={"Motivo da Saída"}
                      placeholder={"Descreva o motivo da Saída"}
                      maxLength={300}
                      rows={3}
                    ></Textarea>
                  </div>
                  <div className={styles.input}>
                    <Ginput
                      label={"Data Prevista de Saída"}
                      maxLength={300}
                      type={"datetime-local"}
                    ></Ginput>
                  </div>
                  <div className={styles.input}>
                    <Ginput label={"Data Prevista de Chegada"} maxLength={300} type={"datetime-local"}></Ginput>
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
                    onClick={() => {
                      setConfirmacao("editado");
                      handleConfirmacaoIsOpen();
                      handleOpenModal();
                    }}
                  >
                    Editar
                  </BadButton>
                </div>
              </div>
            </div>
          </>
        );

      case "expand":
        return (
          <>
            <div className={styles.containerModalGeral}>
              <div className={styles.modalExpand}>
                <div className={styles.partUm}>
                  <div className={styles.itemPartUm}>
                    <h1 className="h1">Placa:</h1>
                    <h1 className="h1">Data!</h1>
                  </div>

                  <div className={styles.itemPartUm}>
                    <h1 className="h1">Km Saída:</h1>
                    <h1 className="h1">Data!</h1>
                  </div>

                  <div className={styles.itemPartUm}>
                    <h1 className="h1">Km Chegada:</h1>
                    <h1 className="h1">Data!</h1>
                  </div>
                </div>

                <div className={styles.itemUm}>
                  <div className={styles.itemInternoUm}>
                    <h1>Itinerário:</h1>
                    <h1>Data!</h1>
                  </div>
                </div>

                <div className={styles.itemUm}>
                  <div className={styles.itemInternoUm}>
                    <h1>Motivo da Saída:</h1>
                    <h1>Data!</h1>
                  </div>
                </div>

                <div className={styles.partDois}>
                  <div className={styles.itemPartUm}>
                    <h1>Data e Hora de Saída:</h1>
                    <h1>Data!</h1>
                  </div>
                  <div className={styles.itemPartUm}>
                    <h1>Data e Hora de Chegada:</h1>
                    <h1>Data!</h1>
                  </div>
                </div>

                <div className={styles.partDois}>
                  <div className={styles.itemPartUm}>
                    <h1>Gestor:</h1>
                    <h1>Data!</h1>
                  </div>
                  <div className={styles.itemPartUm}>
                    <h1>Motorista:</h1>
                    <h1>Data!</h1>
                  </div>
                </div>

                <div className={styles.partDois}>
                  <div className={styles.itemPartUm}>
                    <h1>Porteiro Saída</h1>
                    <h1>Data!</h1>
                  </div>
                  <div className={styles.itemPartUm}>
                    <h1>Porteiro Chegada</h1>
                    <h1>Data!</h1>
                  </div>
                </div>
              </div>
              <div className={styles.butaoForm}>{renderExpandType()}</div>
            </div>
          </>
        );

      default:
        return null;
    }
  }

  // função que abre e fecha os modais quando chamada.
  function handleOpenModal() {
    setModalIsOpen(!modalIsOpen);
  }

  // função que abre e fecha os modais menores quando chamada.
  function handleConfirmacaoIsOpen() {
    setConfirmacaoIsOpen(!confirmacaoIsOpen);
  }

  // Página principal que chama todos os outros processos.
  return (
    <>
      <div
        className={`${styles.containerGeral} ${isOpen ? styles.asideOpen : ""}`}
      >
        <Header
          background={"white"}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          isOpen={isOpen}
        ></Header>
        <main className={styles.containerMain}>
          <div className={styles.containerInternoUm}>
            <div>
              <div className={styles.containerTitle}>
                <h1 className={styles.titleLocacao}>Locações Agendadas</h1>
                <button
                  className={styles.butaoAdd}
                  onClick={() => {
                    handleOpenModal();
                    setModalContent("cadastro");
                  }}
                >
                  <CiCirclePlus size={35}></CiCirclePlus>
                </button>
              </div>
              <div className={styles.line}></div>
            </div>
            <div className={styles.containerCard}>
              {locacoesAgendadas.map((locacaoAgendada, index) => (

                <div
                onContextMenu={(e) => {
                  e.preventDefault();
                  handlePopUp(e);
                }}
                onClick={() => {
                  handleOpenModal();
                  setModalContent("expand");
                  setExpandType(1);
                }}
                className={styles.cardLocacao}
                key={index}
              >
                <div className={styles.img}>
                  <img src="https://i.postimg.cc/Fs7ZnVTn/20250603-1649-Cute-Black-Car-simple-compose-01jwvnew1ef6xa5kp9jpyq56mk.png"></img>
                </div>
                <div>
                  <div className={styles.containerTitles}>
                    <span className={styles.titleCard}>#{locacaoAgendada.id}</span>
                  </div>
                  <div className={styles.containerTitles}>
                    <span className={styles.titleCard}>{locacaoAgendada.veiculo_placa_fk}</span>
                  </div>
                  <div>
                    {motorista.map((motoristaLocacao, index) => (
                      locacaoAgendada.motorista_cpf_fk === motoristaLocacao.cpf ? (
                        <span className={styles.titleCardDois} key={index}>{motoristaLocacao.nome}</span>
                      ) : null
                    ))}
                  </div>
                </div>
                <div className={styles.threeDotsContainer}>
                  <button onClick={handlePopUp} className={styles.threeDots}>
                    <BsThreeDotsVertical />
                  </button>
                </div>
              </div>

              ))}
            </div>
          </div>
          <div className={styles.containerInternoUm}>
            <div>
              <div className={styles.containerTitle}>
                <h1 className={styles.titleLocacao}>Locações Iniciadas</h1>
              </div>
              <div className={styles.line}></div>
            </div>

            <div className={styles.containerCard}>
                {locacoes.map((locacao, index) => (
                    <div
                    onClick={() => {
                    handleOpenModal();
                    setModalContent("expand");
                    setExpandType(2);
                    }}
                    className={styles.cardLocacao}
                    key={index}
                    >
                    <div className={styles.img}>
                    <img src="https://i.postimg.cc/Fs7ZnVTn/20250603-1649-Cute-Black-Car-simple-compose-01jwvnew1ef6xa5kp9jpyq56mk.png"></img>
                    </div>
                    <div>
                    <div className={styles.containerTitles}>
                        <span className={styles.titleCard}>#{locacao.id}</span>
                    </div>
                    <div>
                        <span className={styles.titleCard}>{locacao.veiculo_placa_fk}</span>
                    </div>
                    <div>
                        <span className={styles.titleCardDois}>{locacao.itinerario}</span>
                    </div>
                    </div>
                </div>
                ))}
              
            </div>
          </div>

          <Modal
            width={"1000px"}
            isOpen={modalIsOpen}
            onClose={handleOpenModal}
          >
            {renderContentModal()}
          </Modal>

          <Modal isOpen={confirmacaoIsOpen} onClose={handleConfirmacaoIsOpen}>
            <div className={styles.containerInternoUm}>
              {renderContentConfirmacao()}
            </div>
          </Modal>

          {popUp && (
            <div
              ref={popupRef}
              style={{ top: popUpPosition.y, left: popUpPosition.x }}
              className={styles.popUp}
            >
              <div className={styles.containerPopUp}>
                <BadButton
                  colorHover={"#769b6a"}
                  cor={"#48793c"}
                  onClick={() => {
                    handleOpenModal();
                    setModalContent("edicao");
                  }}
                >
                  Editar
                </BadButton>
                <BadButton
                  onClick={() => {
                    handleConfirmacaoIsOpen();
                    setConfirmacao("deletar");
                  }}
                  colorHover={"#dd4f33"}
                  cor={"#bd3b26"}
                >
                  Deletar
                </BadButton>
              </div>
            </div>
          )}
        </main>
        <div className={styles.footer}>
          <Footer></Footer>
        </div>
      </div>
    </>
  );
}
