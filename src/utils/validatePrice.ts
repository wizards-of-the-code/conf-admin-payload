async function validatePrice(inputValue: string) {
    const regex = /^\d+(\.\d+)?$/;

  if (regex.test(inputValue) && parseFloat(inputValue) >= 0) {
    return true;
  }

  return 'Введите числовое значение больше 0';
}

export default validatePrice;