import { HP_DEFAULT_VALUE, NAMES } from '../const';
import { getRandomElement } from '../utils/common';

/**
 * Generate path to palyer's character gif.
 * @param {string} name - Character name.
 * @return {string}
 */
const generateImg = (name) => `http://reactmarathon-api.herokuapp.com/assets/${name.toLowerCase()}.gif`;

/**
 * Player's mock.
 * @param {number} number - Player's number.
 * @return {Object} - Player's mock data.
 */
export default function generatePlayer(number) {
  const player = number;
  const name = getRandomElement(NAMES);
  const hp = HP_DEFAULT_VALUE;
  const img = generateImg(name);

  return {
    player,
    name,
    hp,
    img,
  };
}
