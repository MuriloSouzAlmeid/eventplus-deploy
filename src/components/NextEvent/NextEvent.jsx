import React from "react";
import "./NextEvent.css";
import { useNavigate } from "react-router-dom";

import { Tooltip } from "react-tooltip";

// importar a função lá do arquivo stringFunction (destructuring)
import { dateFormatDbToView } from "../../Utils/stringFunctions";

const NextEvent = ({ title, description, eventDate, idEvent, detalhar }) => {
  
  return (
    <article className="event-card">
      <h2 className="event-card__title">{title}</h2>

      <p
        className="event-card__description"
        
        data-tooltip-id={idEvent}
        data-tooltip-content={description}
        data-tooltip-place="top"
      >
        <Tooltip id={idEvent} className="tooltip" />
        {description.substr(0, 15)} ...
      </p>

      <p className="event-card__description">
        {/* aplicar a função pra converter a data */}
        {dateFormatDbToView(eventDate)}
      </p>

      <a
        className="event-card__connect-link"
        onClick={() => {
          detalhar(idEvent);
        }}
      >
        Detalhes
      </a>
    </article>
  );
};

export default NextEvent;
