// "use client" porque está rodando no lado do cliente.
"use client";

// todos os módulos usados na página.

//importação do dynamic para aumentar desempenho e renderizar dinamicamente os modais (evitam renderizar conteúdo não utilizado.)
import dynamic from "next/dynamic";
import Header from "../components/header";
import Footer from "../components/footer";
import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
const Modal = dynamic(() => import("../components/modal"), { ssr: false });
import Textarea from "../components/textarea";
import BadButton from "../components/badButton";
import styles from "./Dashboard.module.css";
import Ginput from "../components/gInput";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAuth } from "../hooks/useAuth";
import { FcShipped } from "react-icons/fc";

// exportação da página principal a ser chamada nas rotas.
export default function Dashboard() {

  // constantes de funcionamento geral da página.

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmacaoIsOpen, setConfirmacaoIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [modalContent, setModalContent] = useState("cadastro");
  const [confirmacao, setConfirmacao] = useState("cadastrado");
  const [expandType, setExpandType] = useState(1);
  const [popUp, setPopUp] = useState(false);
  const [popUpPosition, setPopUpPosition] = useState({ x: 0, y: 0 });
  const [widthModal, setWidthModal] = useState("1000px");
  const popUpRef = useRef(null);

  // função que verifica se tem algum login feito.
  useAuth();

  const [locacoesAgendadas, setLocacoesAgendadas] = useState([]);
  const [locacoes, setLocacoes] = useState([]);
  const [veiculo, setVeiculo] = useState([]);
  const [motorista, setMotorista] = useState([]);

  const [itinerario, setItinerario] = useState("");
  const [motivo, setMotivo] = useState("");
  const [dataSaida, setDataSaida] = useState("");
  const [dataChegada, setDataChegada] = useState("");
  const [observacaoSaida, setObservacaoSaida] = useState("");
  const [placaSelecionada, setPlacaSelecionada] = useState("");
  const [motoristaSelecionado, setMotoristaSelecionado] = useState("");
  const [locacaoSelecionada, setLocacaoSelecionada] = useState("");
  const [observacaoEntrada, setObservacaoEntrada] = useState("");
  const [kmChegada, setKmChegada] = useState("");
  const [autorizacao, setAutorizacao] = useState("");

  const [placaEdicao, setPlacaEdicao] = useState("");
  const [motoristaEdicao, setMotoristaEdicao] = useState("");
  const [itinerarioEdicao, setItinerarioEdicao] = useState("");
  const [motivoEdicao, setMotivoEdicao] = useState("");
  const [dataSaidaEdicao, setDataSaidaEdicao] = useState("");
  const [dataChegadaEdicao, setDataChegadaEdicao] = useState("");
  const [autorizacaoEdicao, setAutorizacaoEdicao] = useState("");

  const [indexSelecionado, setIndexSelecionado] = useState(null);
  const [conteudo, setConteudo] = useState("");
  const [noticeIsOpen, setNoticeIsOpen] = useState(false);
  const [gestores, setGestores] = useState([]);
  const [usuario, setUsuario] = useState(null);

  
  const [clickPlaca, setClickPlaca] = useState(false);
  const [clickMotorista, setClickMotorista] = useState(false);
  const [clickPlacaEdicao, setClickPlacaEdicao] = useState(false);
  const [clickMotoristaEdicao, setClickMotoristaEdicao] = useState(false);

  // função que cria data formatada pra ser utilizada no input de edição.
  function formatarData(data) {
    const d = new Date(data);
    const offset = d.getTimezoneOffset();
    const localDate = new Date(d.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
  }

  // adiciona aos inputs da edição os dados da locação selecionada
  useEffect(() => {
    if(modalContent === "edicao" && locacaoSelecionada){
      console.log("A locação:", locacaoSelecionada);
      setPlacaEdicao(locacaoSelecionada.veiculo_placa_fk || "");
      setItinerarioEdicao(locacaoSelecionada.itinerario || "");
      setMotivoEdicao(locacaoSelecionada.motivo_saida || "");
      setAutorizacaoEdicao(locacaoSelecionada.autorizacao || "");

      if (locacaoSelecionada.data_saida) {
        setDataSaidaEdicao(formatarData(locacaoSelecionada.data_saida));
      }

      if (locacaoSelecionada.data_chegada) {
        setDataChegadaEdicao(formatarData(locacaoSelecionada.data_chegada));
      }

    }
  }, [modalContent, locacaoSelecionada]);

  // fetch dados de locação iniciada.
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${process.env.NEXT_PUBLIC_LOCAL}/locacoes/ativos`, {
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
            console.log(data.error || "Erro ao buscar dados");
        }
    })
    .catch((err) => {
        console.log("Erro de conexão");
        console.error(err);
    })
  }, []);

  // fetch que pega dados dos veículos.
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${process.env.NEXT_PUBLIC_LOCAL}/veiculos`, {
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
        console.log("Erro ao encontrar veículos");
      }
    })
    .catch((err) => {
      console.error(err);
    })
  }, []);

  // fetch que pega dados dos motoristas.
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${process.env.NEXT_PUBLIC_LOCAL}/motoristas`, {
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
        console.log("Erro ao encontrar motoristas");
      }
    })
    .catch((err) => {
      console.error(err);
    })
  }, []);

  // fetch que mostra as locações não iniciadas.
  useEffect(() => {

    const token = localStorage.getItem("token")

    fetch(`${process.env.NEXT_PUBLIC_LOCAL}/locacoes`, {
      headers:{
        "Authorization": `Bearer ${token}`,
      },
    })
    .then(async(res) => {
      const data = await res.json();

      if(res.ok){
        setLocacoesAgendadas(data);
      } else {
        console.log(data.error);
      }
    })
    .catch((err) => {
      console.error(err);
    })
  }, []);

  // função que pega usuários por cpf.
  useEffect(() => {
    const token = localStorage.getItem("token");

    const cpfUsuario = localStorage.getItem("cpf");

    fetch(`${process.env.NEXT_PUBLIC_LOCAL}/usuario/porteiro/${cpfUsuario}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    }).
    then(async (res) => {
      const data = await res.json();

      if(res.ok) {
        setUsuario(data);
      } else {
        console.log(data.error);
      }
    }).
    catch((err) => {
      console.error(err);
    });

  }, []);

  // fetch que mostra dados do gestor.
  useEffect(() => {
    
    const token = localStorage.getItem("token");

    fetch(`${process.env.NEXT_PUBLIC_LOCAL}/usuario/gestor`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).
    then(async (res) => {
      const data = await res.json();

      if (res.ok){
        setGestores(data);
      } else {
        console.log("Erro ao encontrar gestores");
      }
    }).
    catch((err) => {
      console.error(err);
    });

  }, []);

  // fetch que cria locação.
  const handleCriarLocacao = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const cpfGestor = localStorage.getItem("cpf");

    if (!motoristaSelecionado) {
      handleNoticeIsOpen();
      setConteudo("Escolha o motorista");
    } else {

      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL}/locacoes`, {
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
          autorizacao: autorizacao,
          motorista_fk: motoristaSelecionado,
          gestor_cpf_fk: cpfGestor,
          veiculo_placa_fk: placaSelecionada,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        handleOpenModal();
        setMotoristaSelecionado("");
        setPlacaSelecionada("");
        setItinerario("");
        setMotivo("");
        handleNoticeIsOpen();
        setConteudo("Locação criada com sucesso!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        handleNoticeIsOpen();
        setConteudo(data.error);
      }
    }
  }

  // função que inicia uma locação.
  const handleIniciarLocacao = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const cpfPorteiro = localStorage.getItem("cpf");

      const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL}/locacoes/saida/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          porteiro_saida_fk: cpfPorteiro,
          observacao_saida: observacaoSaida,
        })
      })

      const data = await res.json();

      if(res.ok){
        handleNoticeIsOpen();
        handleConfirmacaoIsOpen();
        setConteudo("Locação iniciada com sucesso!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        handleConfirmacaoIsOpen();
        handleNoticeIsOpen();
        setConteudo(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // função que finaliza uma locação.
  const handleFinalizarLocacao = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const cpfPorteiro = localStorage.getItem("cpf");

      const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL}/locacoes/entrada/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          km_chegada: kmChegada,
          porteiro_chegada_fk: cpfPorteiro,
          observacao_entrada: observacaoEntrada,
        })
      })

      const data = await res.json();

      if(res.ok){
        handleConfirmacaoIsOpen();
        handleNoticeIsOpen();
        setConteudo("Locação finalizada com sucesso!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        handleConfirmacaoIsOpen();
        handleNoticeIsOpen();
        setConteudo(data.error);
      }

    } catch (err) {
      console.error(err);
    }
  }

  // função que edita uma locação.
  const handleEditarLocacao = async (id) => {
    const token = localStorage.getItem("token");
    const cpfGestor = localStorage.getItem("cpf");

    if (!motoristaEdicao){
      handleNoticeIsOpen();
      setConteudo("Escolha o Motorista");
    } else {

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL}/locacoes/atualizar/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          data_saida: dataSaidaEdicao,
          data_chegada: dataChegadaEdicao,
          itinerario: itinerarioEdicao,
          motivo_saida: motivoEdicao,
          autorizacao: autorizacaoEdicao,
          motorista_fk: motoristaEdicao,
          veiculo_placa_fk: placaEdicao,
        })
      });

      const data = await res.json();

      if (res.ok){
        handleOpenModal();
        handleNoticeIsOpen();
        setConteudo("Locação atualizada com sucesso!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        handleNoticeIsOpen();
        setConteudo(data.error);
      }
      } catch (error) {
        console.error(error);
      }
    }
  }

  // função que deleta uma locação.
  const handleDeletarLocacao = async (id) => {
    const token = localStorage.getItem("token");

    id = locacaoSelecionada.id;

    try {

      const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL}/locacoes/deletar/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();

      if (res.ok) {
        handleNoticeIsOpen();
        setConteudo("Locação deletada com sucesso!");
        handleConfirmacaoIsOpen();
        setTimeout(() => {
          window.location.reload();
        })
      } else {
        handleNoticeIsOpen();
        setConteudo(data.error);
      }

    } catch (err) {
      console.error(err);
    }
    
  }

  // função que fecha o pop-up modal ao clicar na tela fora dele.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target)) {
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
  function handlePopUp(e, index) {
    e.stopPropagation();
    setPopUp(!popUp);
    const x = e.pageX;
    const y = e.pageY;
    setPopUpPosition({ x, y });
    setIndexSelecionado(index);
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
      case "deletar":
        return (
          <>
            <div>
              <div className={styles.containerInMini}>
                <h1 className="mb-3">
                  Você tem certeza que quer deletar a locação?
                </h1>
              </div>
              <div className={styles.butaoMini}>
                <BadButton onClick={handleConfirmacaoIsOpen} 
                  textColor={"#48793c"}
                  colorHover={"#a3bc98"}
                  cor={"#d1dec7"} >Fechar</BadButton>
                <BadButton
                  onClick={() => {
                    handleDeletarLocacao();
                    handleConfirmacaoIsOpen();
                  }}
                  colorHover={"#769b6a"}
                  cor={"#48793c"}
                >
                  Deletar
                </BadButton>
              </div>
            </div>
          </>
        );

      case "iniciar":
        return (
          <>
            <div className={styles.containerConfirm}>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleIniciarLocacao(locacaoSelecionada.id);
              }}>
                <div className={styles.containerInMini}>
                  <Textarea
                    label={"Observações:"}
                    maxLength={300}
                    rows={2}
                    value={observacaoSaida}
                    placeholder={"\"O carro apresenta algum problema.\""}
                    onChange={(e) => setObservacaoSaida(e.target.value)}
                  ></Textarea>
                </div>
                <div className={styles.butaoMini}>
                  <BadButton 
                    textColor={"#48793c"}
                    colorHover={"#a3bc98"}
                    cor={"#d1dec7"} 
                    onClick={handleConfirmacaoIsOpen}>Fechar</BadButton>
                  <BadButton
                    colorHover={"#769b6a"}
                    cor={"#48793c"}
                    type={"submit"}
                  >
                    Iniciar
                  </BadButton>
                </div>
              </form>
            </div>
          </>
        );

      case "finalizar":
        return (
          <>
            <div className={styles.containerConfirm}>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleFinalizarLocacao(locacaoSelecionada.id);
              }}>
                <div className={styles.containerInMini}>
                  <Textarea
                    label={"Observações:"}
                    maxLength={300}
                    rows={2}
                    value={observacaoEntrada}
                    placeholder={"\"O carro apresenta algum problema.\""}
                    onChange={(e) => setObservacaoEntrada(e.target.value)}
                  ></Textarea>
                  <Ginput
                    label={"Quilometragem:"}
                    type={"number"}
                    maxLength={300}
                    value={kmChegada}
                    placeholder={"\"100000\""}
                    onChange={(e) => setKmChegada(e.target.value)}
                  ></Ginput>
                </div>
                <div className={styles.butaoMini}>
                  <BadButton 
                    onClick={handleConfirmacaoIsOpen} 
                    textColor={"#48793c"}
                    colorHover={"#a3bc98"}
                    cor={"#d1dec7"} >Fechar</BadButton>
                  <BadButton
                    colorHover={"#769b6a"}
                    cor={"#48793c"}
                    type={"submit"}
                  >
                    Finalizar
                  </BadButton>
                </div>
              </form>
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
                <form onSubmit={handleCriarLocacao} className={styles.containerForm}>
                  <div className={styles.formAdd}>
                    <div className={styles.input}>

                      <div className={`${styles.choiceboxContainer} ${clickPlaca && placaSelecionada === "" ? styles.erro : ""}`}>
                        <select
                        value={placaSelecionada}
                        onChange={(e) => setPlacaSelecionada(e.target.value)}
                        onBlur={() => setClickPlaca(true)}
                        >
                          <option value={""} className={styles.choicebox}>Escolha o Veículo</option>
                          {veiculo.map((veiculos) => (
                            <option key={veiculos.placa} value={veiculos.placa}>{veiculos.modelo}</option>
                          ))}
                        </select>
                      </div>

                    </div>
                    <div className={styles.input}>

                      <div className={`${styles.choiceboxContainer} ${clickMotorista && motoristaSelecionado === "" ? styles.erro : ""}`}>
                        <select
                        value={motoristaSelecionado}
                        onChange={(e) => setMotoristaSelecionado(e.target.value)}
                        onBlur={() => setClickMotorista(true)}
                        >
                          <option value={""} className={styles.choicebox}>Escolha o Motorista</option>
                          {motorista.map((motoristas) => (
                            <option key={motoristas.id} value={motoristas.id}>{motoristas.nome}</option>
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
                    <div className={styles.input}>
                      <Ginput
                        label={"Autorização"}
                        type={"text"}
                        placeholder={"Rafael Almeida"}
                        maxLength={300}
                        value={autorizacao}
                        onChange={(e) => setAutorizacao(e.target.value)}
                      ></Ginput>
                    </div>
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
                <h1 className="text-3xl">Editar locações</h1>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleEditarLocacao(locacaoSelecionada.id);
                }} 
                className={styles.containerForm}>
                  <div className={styles.formAdd}>
                    <div className={styles.input}>

                      <div className={`${styles.choiceboxContainer} ${clickPlacaEdicao && placaEdicao === "" ? styles.erro : ""}`}>
                        <select
                        value={placaEdicao}
                        onChange={(e) => setPlacaEdicao(e.target.value)}
                        onBlur={() => setClickPlacaEdicao(true)}
                        >
                          <option value={""} className={styles.choicebox}>Escolha o Veículo</option>
                          {veiculo.map((veiculos) => (
                            <option key={veiculos.placa} value={veiculos.placa}>{veiculos.modelo}</option>
                          ))}
                        </select>
                      </div>

                    </div>
                    <div className={styles.input}>

                      <div className={`${styles.choiceboxContainer} ${clickMotoristaEdicao && motoristaEdicao === "" ? styles.erro : ""}`}>
                        <select
                        value={motoristaEdicao}
                        onChange={(e) => setMotoristaEdicao(e.target.value)}
                        onBlur={() => setClickMotoristaEdicao(true)}
                        >
                          <option value={""} className={styles.choicebox}>Escolha o Motorista</option>
                          {motorista.map((motoristas) => (
                            <option key={motoristas.id} value={motoristas.id}>{motoristas.nome}</option>
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
                        value={itinerarioEdicao}
                        onChange={(e) => setItinerarioEdicao(e.target.value)}
                      ></Textarea>
                    </div>
                    <div className={styles.input}>
                      <Textarea
                        label={"Motivo da Saída"}
                        placeholder={"Descreva o motivo da Saída"}
                        maxLength={300}
                        rows={2}
                        value={motivoEdicao}
                        onChange={(e) => setMotivoEdicao(e.target.value)}
                      ></Textarea>
                    </div>
                    <div className={styles.input}>
                      <Ginput
                        label={"Data Prevista de Saída"}
                        type={"datetime-local"}
                        maxLength={300}
                        value={dataSaidaEdicao}
                        onChange={(e) => setDataSaidaEdicao(e.target.value)}
                      ></Ginput>
                    </div>
                    <div className={styles.input}>
                      <Ginput label={"Data Prevista de Chegada"} type={"datetime-local"} maxLength={300} value={dataChegadaEdicao} onChange={(e) => setDataChegadaEdicao(e.target.value)}></Ginput>
                    </div>
                    <div className={styles.input}>
                      <Ginput
                        label={"Autorização"}
                        type={"text"}
                        maxLength={300}
                        value={autorizacaoEdicao}
                        onChange={(e) => setAutorizacaoEdicao(e.target.value)}
                      ></Ginput>
                    </div>
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
                    Editar Locação
                  </BadButton>
                </div>
                </form>
              </div>
            </div>
          </>
        );

      case "expand":
        return (
          <>
          {locacaoSelecionada && (
            <div className={styles.containerModalGeral}>
              <div className={styles.modalExpand}>
                
                <div className={styles.tabelaLinha}>
                  <div className={styles.colunaUm}>
                    <h1>Id:</h1>
                  </div>
                  <div className={styles.colunaDois}>
                    <h1>{locacaoSelecionada.id}</h1>
                  </div>
                </div>

                <div className={styles.tabelaLinha}>
                  <div className={styles.colunaUm}>
                    <h1>Quilometragem ao sair:</h1>
                  </div>
                  <div className={styles.colunaDois}>
                    <h1>{locacaoSelecionada.km_saida}</h1>
                  </div>
                </div>

                <div className={styles.tabelaLinha}>
                  <div className={styles.colunaUm}>
                    <h1>Itinerário:</h1>
                  </div>
                  <div className={styles.colunaDois}>
                    <h1>{locacaoSelecionada.itinerario}</h1>
                  </div>
                </div>

                <div className={styles.tabelaLinha}>
                  <div className={styles.colunaUm}>
                    <h1>Motivo de Saída:</h1>
                  </div>
                  <div className={styles.colunaDois}>
                    <h1>{locacaoSelecionada.motivo_saida}</h1>
                  </div>
                </div>

                <div className={styles.tabelaLinha}>
                  <div className={styles.colunaUm}>
                    <h1>Autorização:</h1>
                  </div>
                  <div className={styles.colunaDois}>
                    <h1>{locacaoSelecionada.autorizacao}</h1>
                  </div>
                </div>

                <div className={styles.tabelaLinha}>
                  <div className={styles.colunaUm}>
                    <h1>Motorista:</h1>
                  </div>
                  <div className={styles.colunaDois}>
                    <h1>{locacaoSelecionada.motorista_fk}</h1>
                  </div>
                </div>

                <div className={styles.tabelaLinha}>
                  <div className={styles.colunaUm}>
                    <h1>Veículo:</h1>
                  </div>
                  <div className={styles.colunaDois}>
                    <h1>{locacaoSelecionada.veiculo_placa_fk}</h1>
                  </div>
                </div>

                <div className={styles.tabelaLinha}>
                  <div className={styles.colunaUm}>
                    <h1>Gestor:</h1>
                  </div>
                  <div className={styles.colunaDois}>
                    {gestores.map((gestoresNome, index) => (
                      gestoresNome.cpf === locacaoSelecionada.gestor_cpf_fk ? (
                        <h1 key={index}>{gestoresNome.nome}</h1>
                      ) : null
                    ))}
                  </div>
                </div>

                <div className={styles.tabelaUltimaLinha}>
                  <div className={styles.colunaUm}>
                    <h1>Observação Saída</h1>
                  </div>
                  <div className={styles.colunaDois}>
                    <h1>{locacaoSelecionada.observacao_saida}</h1>
                  </div>
                </div>

              </div>
              <div className={styles.butaoForm}>{renderExpandType()}</div>
            </div>
          )}
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

  // função que abre o modal de aviso.
  function handleNoticeIsOpen() {
    setNoticeIsOpen(!noticeIsOpen);
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
            <div className={styles.containerWelcome}>
              <h1 className={styles.titleWelcome}>Olá, {usuario?.nome || "Usuário"}</h1>
              <FcShipped size={25}/>
            </div>
            <div>
              <div className={styles.containerTitle}>
                <h1 className={styles.titleLocacao}>Locações Agendadas</h1>
                <button
                  className={styles.butaoAdd}
                  onClick={() => {
                    handleOpenModal();
                    setModalContent("cadastro");
                    setWidthModal("1000px");
                  }}
                >
                  <CiCirclePlus size={35}></CiCirclePlus>
                </button>
              </div>
              <div className={styles.line}></div>
            </div>
            <div className={styles.containerCard}>
              {locacoesAgendadas.length === 0 ? (
                <p>Nenhuma locação agendada</p>
              ) : (
              
                locacoesAgendadas.map((locacaoAgendada, index) => (

                <div
                onContextMenu={(e) => {
                  e.preventDefault();
                  handlePopUp(e, index);
                }}
                onClick={() => {
                  handleOpenModal();
                  setModalContent("expand");
                  setExpandType(1);
                  setLocacaoSelecionada(locacaoAgendada);
                  setWidthModal("700px");
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
                    <span className={styles.titleCardDois}>{locacaoAgendada.motorista_fk}</span>
                  </div>
                </div>
                <div className={styles.threeDotsContainer}>
                  <button onClick={(e) => handlePopUp(e, index)} className={styles.threeDots}>
                    <BsThreeDotsVertical />
                  </button>
                </div>
              </div>

              )))}
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
                {locacoes.length === 0 ? (
                  <p>Nenhuma locação iniciada</p>
                ) : (
                
                locacoes.map((locacao, index) => (
                    <div
                    onClick={() => {
                    handleOpenModal();
                    setModalContent("expand");
                    setExpandType(2);
                    setLocacaoSelecionada(locacao);
                    setWidthModal("700px");
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
                )))}
              
            </div>
          </div>

          <Modal
            width={widthModal}
            isOpen={modalIsOpen}
            onClose={handleOpenModal}
          >
            {renderContentModal()}
          </Modal>

          <Modal
            isOpen={noticeIsOpen}
            onClose={handleNoticeIsOpen}
            width={"400px"}
          >
            <div className={styles.containerModal}>
              <div className={styles.containerInMini}>
                <h1 className="mb-3">{conteudo}</h1>
              </div>
              <div className={styles.butaoMini}>
                <BadButton onClick={handleNoticeIsOpen} colorHover={"#769b6a"} cor={"#48793c"} >OK</BadButton>
              </div>
            </div>
          </Modal>

          <Modal isOpen={confirmacaoIsOpen} onClose={handleConfirmacaoIsOpen}>
            <div className={styles.containerInternoConfirm}>
              {renderContentConfirmacao()}
            </div>
          </Modal>

          {popUp && (
            <div
              ref={popUpRef}
              style={{ top: popUpPosition.y, left: popUpPosition.x }}
              className={styles.popUp}
            >
              <div className={styles.containerPopUp}>
                <BadButton
                  colorHover={"#769b6a"}
                  cor={"#48793c"}
                  onClick={() => {
                    const locacaoEditavel = locacoesAgendadas[indexSelecionado];
                    setLocacaoSelecionada(locacaoEditavel);
                    handleOpenModal();
                    setModalContent("edicao");
                    setWidthModal("1000px");
                  }}
                >
                  Editar
                </BadButton>
                <BadButton
                  onClick={() => {
                    const locacaoToDelete = locacoesAgendadas[indexSelecionado];
                    setLocacaoSelecionada(locacaoToDelete);
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