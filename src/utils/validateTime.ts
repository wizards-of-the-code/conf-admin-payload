/**
 * Validate time for format HH:mm
 * @param {string} time Time in string format.
 * @returns true if time is correct, Error string if otherwise.
 */
async function validateTime(time: string) {
  const regex = /^(0?[1-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

  if(regex.test(time)) {
    return true;
  };

  return 'Введите время в формате {HH:mm} (например: 9:15).';
}

export default validateTime;