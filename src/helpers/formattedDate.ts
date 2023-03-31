export const formattedDate = () => {
    const currentDate = new Date()
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // month is zero-indexed, so add 1
    const year = currentDate.getFullYear();
    const formatDate = `${day}-${month < 10 ? '0' : ''}${month}-${year}`;
    return formatDate;
}

export const isDayShift = () => {
    const now = new Date(); // obtener la hora actual
    const hours = now.getHours(); // obtener la hora actual
    const minutes = now.getMinutes(); // obtener los minutos actuales
  
    if (hours < 15) {
      // si la hora es antes de las 3pm, es cierto
      return true;
    } else if (hours === 15 && minutes <= 30) {
      // si la hora es 3pm y los minutos son 30 o menos, es cierto
      return true;
    } else {
      // de lo contrario, es falso
      return false;
    }
  }