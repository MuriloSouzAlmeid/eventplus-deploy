import {React, useContext, useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; //v6

// imports dos componentes de página
import HomePage from "../pages/HomePage/HomePage";
import TipoEventos from "../pages/TipoEventosPage/TipoEventosPage";
import EventosPage from "../pages/EventosPage/EventosPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import TestePage from "../pages/TestePage/TestePage";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { PrivateRoute } from "./PrivateRoute";
import EventosAlunoPage from "../pages/EventosAlunoPage/EventosAlunoPage";
import DetalhesEventoPage from "../pages/DetalhesEventoPage/DetalhesEventoPage";

import { EventIdDescription } from "../context/EventIdDescription";

// Componente Rota
const Rotas = () => {
  const [eventId, setEventId] = useState();

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/tipo-eventos"
          element={
            <PrivateRoute redirectTo="/">
              <TipoEventos />
            </PrivateRoute>
          }
        />
        <Route element={<LoginPage />} path="/login" />
      </Routes>

      <EventIdDescription.Provider value={{eventId, setEventId}}>
      <Routes>
        <Route element={<HomePage />} path="/" exact />
        <Route element={<DetalhesEventoPage />} path="/detalhes-evento" />
        <Route
          path="/eventos-aluno"
          element={
            <PrivateRoute redirectTo="/">
              <EventosAlunoPage />
            </PrivateRoute>
          }
        />
        <Route element={<TestePage />} path="/testes" />
        <Route
          path="/eventos"
          element={
            <PrivateRoute redirectTo="/">
              <EventosPage />
            </PrivateRoute>
          }
        />
      </Routes>
      </EventIdDescription.Provider>
      <Footer />
    </BrowserRouter>
  );
};

export default Rotas;
