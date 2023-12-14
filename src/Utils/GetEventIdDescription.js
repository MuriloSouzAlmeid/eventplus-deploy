export const GetIdEventDescription = (eventId, manipulationFunction, navegador) => {
    manipulationFunction(eventId);
    navegador(`/detalhes-evento/${eventId}`);
    localStorage.setItem("idEvento", eventId)
}