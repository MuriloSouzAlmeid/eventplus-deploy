export const GetIdEventDescription = (eventId, manipulationFunction, navegador) => {
    manipulationFunction(eventId);
    navegador("/detalhes-evento");
    localStorage.setItem("idEvento", eventId)
}