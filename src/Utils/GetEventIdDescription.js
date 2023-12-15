export const GetIdEventDescription = (eventId, navegador) => {
    navegador(`/detalhes-evento/${eventId}`);
}