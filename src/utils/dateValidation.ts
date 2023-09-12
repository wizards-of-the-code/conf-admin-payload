async function dateValidation(pickedDate) {
    const pickedDateMs = (new Date(pickedDate)).getTime(); 
    const currentDateMs = (new Date()).getTime();
  
    if (pickedDateMs > currentDateMs) {
      return true;
    }
    return 'Неверная дата!';
  }

export default dateValidation;