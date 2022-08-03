/**
 * 
 * @param {string} string 
 * @returns string con formato capitalize.
 */
function capitalizeWord(string) {
  return string.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
}

/**
 * Separa el año y el mes de un string con el formato 'yyyy-MM'
 * @param {string} s 
 */
function splitYearAndMonth(s) {
  let yearAndMonth = s.split('-');
  let year = parseInt(yearAndMonth[0]);
  let month = parseInt(yearAndMonth[1]);
  return [year, month];
}

export { capitalizeWord, splitYearAndMonth }