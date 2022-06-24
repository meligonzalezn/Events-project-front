/**
 * 
 * @param {string} word Palabra que se busca.
 * @param {object[]} candidates Objetos en los que se buscará en
 *                              un texto específico.
 * @param {string} key Clave que indica en que campo del objeto
 *                     se hará la búsqueda.
 * 
 * @returns object[]. Objetos que contienen la palabra 'word' en
 *                    el campo indicado por 'key'.
 */
function findAllWithWord(word, candidates, key) {
  let foundObjects = [];
  let wordLower = word.toLowerCase();

  for (let i = 0; i < candidates.length; i++) {
    if (candidates[i][key].toLowerCase().search(wordLower) != -1) {
      foundObjects.push(candidates[i]);
    }
  }

  console.log(foundObjects);

  return foundObjects;
}

export { findAllWithWord }