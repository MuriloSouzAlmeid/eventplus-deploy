import React, { useContext, useEffect, useState } from "react";
import "./DetalhesEventoPage.css";

import { useParams } from "react-router-dom";

import {
  commentaryEventResource,
  eventsResource,
} from "../../Services/Service";

import MainContent from "../../components/MainContent/MainContent";
import Container from "../../components/Container/Container";
import Title from "../../components/Title/Title";
import { EventIdDescription } from "../../context/EventIdDescription";
import { UserContext } from "../../context/AuthContext";

import { dateFormatDbToView } from "../../Utils/stringFunctions";

import api from "../../Services/Service";

import TableCm from "./TableCm/TableCm";

const DetalhesEventoPage = () => {
  // const [idEvento, setIdEvento] = useState("");
  const [detalhesEvento, setDetalhesEvento] = useState(null);
  const [comentariosEvento, setComentariosEvento] = useState(null);
  const { userData } = useContext(UserContext);

  const { idEvento } = useParams();

  const loadEventDetail = async (idEvento) => {
    const retornoDetalhesEvento = await api.get(
      `${eventsResource}/${idEvento}`
    );

    if (userData.role === "Administrador") {
      const retornoComentarios = await api.get(
        `${commentaryEventResource}/ListarComentariosPorEvento/${idEvento}`
      );

      setComentariosEvento(retornoComentarios.data);
    } else {
      const retornoComentarios = await api.get(
        `${commentaryEventResource}/ListarSomenteExibe/${idEvento}`
      );

      setComentariosEvento(retornoComentarios.data);
    }

    console.log(comentariosEvento);

    setDetalhesEvento(retornoDetalhesEvento.data);

    console.log(retornoDetalhesEvento.data);
  };

  useEffect(() => {
    // setIdEvento(localStorage.getItem("idEvento"));

    loadEventDetail(idEvento);

    console.log(detalhesEvento);
  }, [userData.userId]);

  return (
    <MainContent>
      <Container>
        <action>
          <Title
            titleText={"Detalhes do Evento"}
            additionalClass={"custom-title"}
          />
          <h2>Título: {detalhesEvento.nomeEvento}</h2>
          <p>Descrição: {detalhesEvento.descricao}</p>
          <p>Data: {dateFormatDbToView(detalhesEvento.dataEvento)}</p>
        </action>
        

        <TableCm dados={comentariosEvento}/>
      </Container>
    </MainContent>
  );
};

export default DetalhesEventoPage;
