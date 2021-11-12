/**
* Generate random init.
* @param {number} a
* @param {number} b
* @return {number} - Random number between the "a" param and the the "b" param.
*/
const getRandomInt = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

/**
 * Returns random element from Array.
 * @param {Array} array - Array of elements.
 * @return - Random element;
 */
const getRandomElement = (array) => {
  if (array.length === 0) {
    throw new Error('Array is empty.');
  }
  return array[getRandomInt(0, array.length - 1)];
};

export {
  getRandomInt,
  getRandomElement,
};
