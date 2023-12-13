import React, { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Title from "../../components/Title/Title";

const TestePage = () => {
  useEffect(()=>{
    localStorage.setItem("teste", "Olá");
  },[])

  return (
    <div>
      <Title titleText={"Página de Testes"} />
    </div>
  );
};

export default TestePage;
