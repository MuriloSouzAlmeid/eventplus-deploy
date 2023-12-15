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

import { dateFormateDbToView } from "../../Utils/stringFunctions";

import api from "../../Services/Service";

import TableCm from "./TableCm/TableCm";
import { logDOM } from "@testing-library/react";

const DetalhesEventoPage = () => {
  const { idEvento } = useParams();
  const { userData } = useContext(UserContext);

  const [detalhesEvento, setDetalhesEvento] = useState({});
  const [comentariosEvento, setComentariosEvento] = useState([]);

  useEffect(() => {
    console.log(idEvento);

    const carregarDetalhesEvento = async () => {
      try {
        const retornoDetalhes = await api.get(`${eventsResource}/${idEvento}`);

        const { nomeEvento, descricao, dataEvento, tiposEvento, ...resto } =
          retornoDetalhes.data;

        setDetalhesEvento({
          nome: nomeEvento,
          descricao: descricao,
          data: dateFormateDbToView(dataEvento),
          tipo: tiposEvento.titulo,
        });

        if(userData.role === "Administrador"){
          const retornoComentarios = await api.get(
            `/ComentariosEvento/ListarComentariosPorEvento/${idEvento}`
          );
  
          setComentariosEvento(retornoComentarios.data);
        }else{
          const retornoComentarios = await api.get(
            `/ComentariosEvento/ListarSomenteExibe/${idEvento}`
          );
  
          setComentariosEvento(retornoComentarios.data);
        }

        console.log(comentariosEvento);
      } catch (erro) {
        console.log(erro);
      }
    };

    carregarDetalhesEvento();

    console.log(detalhesEvento);
  }, [userData.userId]);

  return (
    <MainContent>
      <Container>
        <article>
          <Title
            titleText={"Detalhes do Evento"}
            additionalClass={"custom-title"}
          />
          <br />
          <h2>Título: {detalhesEvento.nome}</h2>
            <br />
          <p>Descrição: {detalhesEvento.descricao}</p>
          <p>Tipo de Evento: {detalhesEvento.tipo}</p>
          <p>Data: {detalhesEvento.data}</p>
        </article>
        <br />
        {/* <TableCm dados={comentariosEvento}/> */}
        <div>
          <h2>Comentários</h2>
          {comentariosEvento.map((c) => {
            return (
              <>
                <p>Usuario: {c.usuario.nome}</p>
                <p>Comentário: {c.descricao}</p>
                <br />
              </>
            );
          })}
        </div>
      </Container>
    </MainContent>
  );
};

export default DetalhesEventoPage;
