import React, { useContext, useEffect, useState } from "react";

import "./EventosAlunoPage.css";

import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Titulo/Titulo";
import Table from "./TableEva/TableEva";
import Container from "../../components/Container/Container";
import { Select } from "../../components/FormComponents/FormComponents";
import Spinner from "../../components/Spinner/Spinner";
import Modal from "../../components/Modal/Modal";
import api from "../../services/Service";
import Notification from "../../components/Notification/Notification";

import { UserContext } from "../../context/AuthContext";

import { ActivatedPage } from "../../context/ActivatedPage";
import TiposEventos from "../TiposEventosPage/TiposEventos";
import userEvent from "@testing-library/user-event";

const EventosAlunoPage = () => {
  // contexts
  const { setActivatedPage } = useContext(ActivatedPage);
  // recupera os dados globais do usuário
  const { userData, setUserData } = useContext(UserContext);

  const [eventId, setEventId] = useState("e7049f6a-9b16-4398-82ca-3d5005e65b6c"); 

  // state do menu mobile

  const [notifyUser, setNotifyUser] = useState({});
  const [exibeNavbar, setExibeNavbar] = useState(false);
  const [eventos, setEventos] = useState([]);
  // select mocado
  const [quaisEventos, setQuaisEventos] = useState([
    { value: 1, text: "Todos os eventos" },
    { value: 2, text: "Meus eventos" },
  ]);

  const [tipoEvento, setTipoEvento] = useState("1"); //código do tipo do Evento escolhido
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [comentarioAtual, setComentarioAtual] = useState({});

  async function loadEventsType() {
    setShowSpinner(true);

    try {
      if (tipoEvento === "2") {
        let arrayEventos = [];

        const retornoEventos = await api.get(
          `/PresencasEvento/ListarMInhas/${userData.userId}`
        );

        retornoEventos.data.forEach((elemento) => {
          arrayEventos.push({
            ...elemento.evento,

            //pega a situação do evento
            situacao: elemento.situacao,
            idPresencaEvento: elemento.idPresencaEvento,
          });
        });

        setEventos(arrayEventos);
      } else {
        const retornoEventos = await api.get(`/Evento`);
        const retornoEventosUsuario = await api.get(
          `/PresencasEvento/ListarMInhas/${userData.userId}`
        );

        const listaEventosMarcados = verificarPresenca(
          retornoEventos.data,
          retornoEventosUsuario.data
        );

        console.log(listaEventosMarcados);

        setEventos(listaEventosMarcados);
      }
    } catch (error) {
      console.log(error);
    }

    setShowSpinner(false);
  }

  useEffect(() => {
    setActivatedPage("eventos-aluno");
    loadEventsType();
  }, [tipoEvento, userData.userId]);

  // toggle meus eventos ou todos os eventos
  function myEvents(tpEvent) {
    setTipoEvento(tpEvent);
  }

//ler um comentário
  const loadMyComentary = async () => {
    const promisse = await api.get(`/ComentariosEvento/BuscarPorUsuario?idUsuario=${userData.userId}&idEvento=${eventId}`);

    setComentarioAtual(promisse.data)
  }

  //cadastrar meu comentário
  const postMyComentary = async (dadosComentario) => {
    try{
      const {idUsuario, idEvento, descricao} = dadosComentario;

      await api.post("/ComentariosEvento", {
        exibe: true,
        idUsuario,
        idEvento,
        descricao
      });

      setNotifyUser({
        titleNote: "Comentário publicado com sucesso",
          textNote: `Seu comentário no evento foi publicado com sucesso!`,
          imgIcon: "success",
          imgAlt:
            "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
          showMessage: true,
      });
    }catch(erro){
      console.log(erro);
    }
  }

  //deletar um comentário
  const commentaryRemove = async (idComentary) => {
    alert("Remover o comentário");
  };


  
  const showHideModal = () => {
    setShowModal(showModal ? false : true);
  };

  async function handleConnect(idEvento, conectar, idPresenca = null) {
    if (conectar === true) {
      try {
        const promisse = await api.post("/PresencasEvento", {
          situacao: true,
          idUsuario: userData.userId,
          idEvento: idEvento,
        });

        loadEventsType();

        setNotifyUser({
          titleNote: "Inscrição Realizada com sucesso",
          textNote: `Sua inscrição no evento foi realizada com sucesso!`,
          imgIcon: "success",
          imgAlt:
            "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
          showMessage: true,
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (conectar === false) {
      try {
        const promisse = await api.delete(`/PresencasEvento/${idPresenca}`);

        loadEventsType();

        setNotifyUser({
          titleNote: "Inscrição Cancelada com sucesso",
          textNote: `Sua inscrição no evento foi cancelada com sucesso!`,
          imgIcon: "success",
          imgAlt:
            "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
          showMessage: true,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  const verificarPresenca = (allEvents, userEvents) => {
    for (let x = 0; x < allEvents.length; x++) {
      for (let i = 0; i < userEvents.length; i++) {
        if (allEvents[x].idEvento === userEvents[i].evento.idEvento) {
          allEvents[x].situacao = true;
          allEvents[x].idPresencaEvento = userEvents[i].idPresencaEvento;
          break;
        }
      }
    }

    return allEvents;
  };

  return (
    <>
      <MainContent>
        <Container>
          <Title titleText={"Eventos"} additionalClass="custom-title" />

          <Select
            id="id-tipo-evento"
            name="tipo-evento"
            required={true}
            dados={quaisEventos} // aqui o array dos tipos
            mudaOpcao={(e) => myEvents(e.target.value)} // aqui só a variável state
            selectValue={tipoEvento}
            additionalClass="select-tp-evento"
          />
          <Table
            tableType={tipoEvento}
            dados={eventos}
            fnConnect={handleConnect}
            fnShowModal={showHideModal}
          />
        </Container>
        <Notification {...notifyUser} setNotifyUser={setNotifyUser} />
      </MainContent>

      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {showModal ? (
        <Modal
          dados={comentarioAtual}
          userId={userData.userId}
          showHideModal={showHideModal}
          fnDelete={commentaryRemove}
          fnGet={loadMyComentary}
          fnPost={postMyComentary}
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;
