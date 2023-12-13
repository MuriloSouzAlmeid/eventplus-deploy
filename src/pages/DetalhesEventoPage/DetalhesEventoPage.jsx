import React, { useContext, useEffect, useState } from 'react';
import "./DetalhesEventoPage.css";

import { commentaryEventResource, eventsResource } from '../../Services/Service';

import MainContent from '../../components/MainContent/MainContent';
import Container from '../../components/Container/Container';
import Title from '../../components/Title/Title';
import { EventIdDescription } from '../../context/EventIdDescription';
import { UserContext } from '../../context/AuthContext';

import api from '../../Services/Service';

const DetalhesEventoPage = () => {
    const [idEvento, setIdEvento] = useState("");
    const [detalhesEvento, setDetalhesEvento] = useState({});
    const {userData} = useContext(UserContext);

    const loadEventDetail = async (idEvento) => {
        const retornoDetalhesEvento = await api.get(`${eventsResource}/${idEvento}`);

        setDetalhesEvento(retornoDetalhesEvento.data);
    }

    useEffect(()=>{
        setIdEvento(localStorage.getItem("idEvento"));

        loadEventDetail(idEvento);

        console.log(detalhesEvento);
    },[userData.userId])

    return (
        <MainContent>
            <Container>
                <Title titleText={"Detalhes do Evento"} additionalClass={"custom-title"}/>
                <span>{idEvento}</span>
            </Container>
        </MainContent>
    );
};

export default DetalhesEventoPage;