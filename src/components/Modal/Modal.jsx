import React, { useContext, useEffect, useState } from "react";
import trashDelete from "../../assets/images/trash-delete-red.png";

import "./Modal.css";
import { UserContext } from "../../context/AuthContext";
import { Input, Button } from "../FormComponents/FormComponents";

const Modal = ({
  dados = [],
  modalTitle = "Feedback",
  comentaryText = "Não informado. Não informado. Não informado.",
  fnGet = null,
  showHideModal = false,
  fnDelete = null,
  fnPost = null,
}) => {

  const { userData } = useContext(UserContext);

  const [dadosComentario, setDadosComentario] = useState({
    idUsuario: "",
    idEvento: "",
    descricao: "",
  });

  useEffect(() => {
    

    fnGet();
  }, []);

  return (
    <form className="modal">
      <article className="modal__box">
        <h3 className="modal__title">
          {modalTitle}
          <span className="modal__close" onClick={() => showHideModal(true)}>
            x
          </span>
        </h3>

        <div className="comentary">
          <h4 className="comentary__title">Comentário</h4>
          <img
            src={trashDelete}
            className="comentary__icon-delete"
            alt="Ícone de uma lixeira"
            onClick={fnDelete}
          />

          <p className="comentary__text">{dados.descricao}</p>
          
          <hr className="comentary__separator" />
        </div>

        <Input
         type={"text"}
         id={"descricao-comentario"}
         required={true}
         additionalClass={"comentary__entry"}
         name={"descricao-comentario"}
         placeholder={"Escreva seu comentário..."}
         manipulationFunction={(e) => {
           setDadosComentario({
             ...dadosComentario,
             descricao: e.target.value
           })
         }}
        />

        <Button
          textButton="Comentar"
          additionalClass="comentary__button"
          manipulationFunction={() => {
            fnPost({ dadosComentario });
          }}
        />
      </article>
    </form>
  );
};

export default Modal;
