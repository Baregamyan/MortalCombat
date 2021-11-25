import generatePlayer from './player';

/**
 * Create mock players.
 * @param {number} count - Quantity of needed players.
 * @return {Array}
 */
export default function createPlayers(count) {
  const array = new Array(count).fill();

  array.forEach((item, index) => {
    const player = generatePlayer(index + 1);
    array[index] = player;
  });

  return array;
}
