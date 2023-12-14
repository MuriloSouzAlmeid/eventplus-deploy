import React from "react";
import "./TableCm.css";

const TableCm = ({ dados = null }) => {
  return (
    <table className="tbal-data">
      <thead className="tbal-data__head">
        <tr className="tbal-data__head-row tbal-data__head-row--red-color">
          <th className="tbal-data__head-title tbal-data__head-title--big">
            1
          </th>
          <th className="tbal-data__head-title tbal-data__head-title--big">
            2
          </th>
          <th className="tbal-data__head-title tbal-data__head-title--big">
            3
          </th>
        </tr>
      </thead>
      <tbody className="tbal-data__head-row">
        {dados.map((comentario) => {
          return (
            <tr className="table-data__head-row">
              <td className="tbal-data__data tbal-data__data--little">{}</td>
              <td className="tbal-data__data tbal-data__data--little">2</td>
              <td className="tbal-data__data tbal-data__data--little">3</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableCm;
