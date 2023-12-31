import React, { useContext, useEffect, useState } from "react";
import "./DetalhesEventoPage.css";

import { useParams } from "react-router-dom";

import MainContent from "../../components/MainContent/MainContent";
import Container from "../../components/Container/Container";
import Titulo from "../../components/Titulo/Titulo";
import { UserContext } from "../../context/AuthContext";

import { dateFormatDbToView } from "../../Utils/stringFunctions";

import api from "../../services/Service";

import { logDOM } from "@testing-library/react";

const DetalhesEventoPage = () => {
  const { idEvento } = useParams();
  const { userData } = useContext(UserContext);

  const [detalhesEvento, setDetalhesEvento] = useState({
    nome: "",
    descricao: "",
    data: "",
    tipo: ""
  });
  const [comentariosEvento, setComentariosEvento] = useState([]);

  useEffect(() => {
    console.log(idEvento);

    const carregarDetalhesEvento = async () => {
      try {
        const retornoDetalhes = await api.get(`/Evento/${idEvento}`);

        console.log(retornoDetalhes.data);

        const { nomeEvento, descricao, dataEvento, tiposEvento, ...resto } =
          retornoDetalhes.data;

        setDetalhesEvento({
          nome: nomeEvento,
          descricao: descricao,
          data: dataEvento,
          tipo: tiposEvento.titulo,
        });

        console.log(detalhesEvento);

        if (userData.perfil === "Administrador") {
          const retornoComentarios = await api.get(
            `/ComentariosEvento/ListarComentariosPorEvento/${idEvento}`
          );

          setComentariosEvento(retornoComentarios.data);
        } else {
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
        <article className={"detalhes-evento-box"}>
          <Titulo
            titleText={"Detalhes do Evento"}
            additionalClass={"custom-title"}
          />
          <br />
          <h2>Título: {detalhesEvento.nome}</h2>
          <br />
          <p>Descrição: {detalhesEvento.descricao}</p>
          <p>Tipo de Evento: {detalhesEvento.tipo}</p>
          <p>Data: {dateFormatDbToView(detalhesEvento.data)}</p>
        </article>
        {/* <TableCm dados={comentariosEvento}/> */}
        <div className={"comentarios-evento-section"}>
          <h2>Comentários</h2>
          {new Date(detalhesEvento.data) > new Date(Date.now()) ? (
            <p>Só é possível comentar em um evento que já aconteceu</p>
          ) : comentariosEvento.length > 0 ? (
            comentariosEvento.map((c) => {
              return (
                <>
                  <p>Usuario: {c.usuario.nome}</p>
                  <p>Comentário: {c.descricao}</p>
                  <br />
                </>
              );
            })
          ) : (
            <p>Ainda não há comentários para este evento</p>
          )}
        </div>
      </Container>
    </MainContent>
  );
};

export default DetalhesEventoPage;
