import React, { useEffect, useState } from "react";
import Title from "../../components/Title/Title";

const TestePage = () => {
  const [mensagem, setMensagem] = useState("");

  useEffect(()=>{
    localStorage.setItem("teste", "Olá");

    setMensagem(localStorage.getItem("teste"))
  },[])

  return (
    <div>
      <Title titleText={"Página de Testes"} />
      <p>{mensagem}</p>
    </div>
  );
};

export default TestePage;
