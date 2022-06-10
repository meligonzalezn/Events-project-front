/**
 * 
 * @param {string} string 
 * @returns string con formato capitalize.
 */
function capitalizeWord(string) {
  return string.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
}

export {capitalizeWord}