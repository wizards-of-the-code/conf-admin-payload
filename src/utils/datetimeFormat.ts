function formatDateToDdMmYyyyHHmm(isoDateString: Date): string {
  const date = new Date(isoDateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  const hour = date.getUTCHours().toString().padStart(2, '0');
  const minute = date.getUTCMinutes().toString().padStart(2, '0');

  return `${day}.${month}.${year} ${hour}:${minute}`;
}

export default formatDateToDdMmYyyyHHmm;
