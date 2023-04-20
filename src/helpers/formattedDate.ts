export const formattedDate = () => {
    const currentDate = new Date()
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    //@ts-ignore
    const formattedDate = currentDate.toLocaleDateString('en-GB', options);
    return formattedDate.replace(/\//g, '-')
}

export const isDayShift = () => {
    const now = new Date(); // obtener la hora actual
    const hours = now.getHours(); // obtener la hora actual
    const minutes = now.getMinutes(); // obtener los minutos actuales

    if (hours < 16) {
        // si la hora es antes de las 3pm, es cierto
        return true;
    } else if (hours === 16 && minutes <= 30) {
        // si la hora es 3pm y los minutos son 30 o menos, es cierto
        return true;
    } else {
        // de lo contrario, es falso
        return false;
    }
}