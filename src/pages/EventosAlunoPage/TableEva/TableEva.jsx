import React from "react";
import comentaryIcon from "../../../assets/images/comentary-icon.svg";
import trashDelete from "../../../assets/images/trash-delete.svg";
import { dateFormatDbToView } from "../../../Utils/stringFunctions";
import Toggle from "../../../components/Toggle/Toggle";
import iconeDetalhes from "../../../assets/images/detail-icon-black.png";
// importa a biblioteca de tootips ()
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

// import trashDelete from "../../../assets/images/trash-delete.svg";
import "./TableEva.css";

const TableEva = ({
  dados,
  fnConnect = null,
  fnShowModal = null,
  carregarDetalhes = null,
}) => {
  return (
    <table className="tbal-data">
      <thead className="tbal-data__head">
        <tr className="tbal-data__head-row tbal-data__head-row--red-color">
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Evento
          </th>
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Data
          </th>
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Detalhes
          </th>
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        {dados.map((e) => {
          return (
            <tr className="tbal-data__head-row" key={Math.random()}>
              <td className="tbal-data__data tbal-data__data--big">
                {e.nomeEvento}
              </td>

              <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                {/* {e.dataEvento} */}
                {dateFormatDbToView(e.dataEvento)}
              </td>

              <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                <img
                  className="tbal-data__icon"
                  src={iconeDetalhes}
                  alt=""
                  onClick={() => {
                    carregarDetalhes(e.idEvento);
                  }}
                />
              </td>

              <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                {new Date(e.dataEvento) < new Date(Date.now()) ? (
                  <img
                    className="tbal-data__icon"
                    idevento={e.idEvento}
                    src={comentaryIcon}
                    alt=""
                    onClick={() => {
                      fnShowModal(e.idEvento);
                    }}
                  />
                ) : null}

                <Toggle
                  manipulationFunction={() => {
                    fnConnect(
                      e.situacao ? true : false,
                      e.idEvento,
                      e.idPresencaEvento,
                      e.dataEvento
                    );
                  }}
                  toggleActive={e.situacao}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableEva;
