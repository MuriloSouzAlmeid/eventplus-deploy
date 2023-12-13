import React from "react";
import comentaryIcon from "../../../assets/images/comentary-icon.svg";
import { dateFormateDbToView } from "../../../Utils/stringFunctions";
import ToggleSwitch from "../../../components/Toggle/Toggle";

import iconeDetalhes from "../../../assets/images/detail-icon-black.png";
// importa a biblioteca de tootips ()
import "react-tooltip/dist/react-tooltip.css";
// import { Tooltip } from "react-tooltip";

// import trashDelete from "../../../assets/images/trash-delete.svg";
import "./TableEvA.css";

const Table = ({ dados, fnConnect = null, fnShowModal = null, detalhar = null }) => {
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
                {dateFormateDbToView(e.dataEvento)}
              </td>

              <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                <img
                  className="tbal-data__icon"
                  src={iconeDetalhes}
                  alt=""
                  onClick={() => {
                    detalhar(e.idEvento)
                  }}
                />
                
              </td>

              <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                {/* imagem do comentário - abre o modal */}
                { (new Date(e.dataEvento) > new Date (Date.now())) ? (
                  <> 
                  <img
                    className="tbal-data__icon"
                    // idevento={e.idEvento}
                    src={comentaryIcon}
                    alt=""
                    onClick={() => {
                      fnShowModal(e.idEvento);
                    }}
                  />
                <ToggleSwitch
                  toggleActive={e.situacao}
                  manipulationFunction={
                    new Date(e.dataEvento) > Date.now()
                      ? () => {
                          fnConnect(
                            e.idEvento,
                            e.situacao ? "unconnect" : "connect",
                            e.idPresencaEvento //parâmetro opcional
                          );
                        }
                      : () => {
                          alert("Evento não está mais disponível");
                        }
                  }
                />
                </>) : null}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
