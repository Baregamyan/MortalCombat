import { getRandomElement, getRandomInt } from '../utils/common';

/**
 * Some names of Mortal Kombat characters.
 */
const NAMES = [
  'Scorpion',
  'Kitana',
  'Liukang',
  'Sonya',
  'subzero',
];

/**
 * Some names weapons that characters use.
 */
const WEAPONS = [
  'Katana',
  'Ice',
  'Fireball',
  'Strom',
  'Titan Hands',
  'Smart Brain',
];

/**
 * Min and max player HP value.
 */
const Hp = {
  MIN: 0,
  MAX: 100,
};

/**
 * Generate player mock data.
 * @return {Object}
 */
const generatePlayer = () => {
  const name = getRandomElement(NAMES);
  const hp = getRandomInt(Hp.MIN, Hp.MAX);
  const img = `http://reactmarathon-api.herokuapp.com/assets/${name.toLowerCase()}.gif`;
  const weapon = getRandomElement(WEAPONS);
  const attack = () => `${name} Fight...`;

  return {
    name,
    hp,
    img,
    weapon,
    attack,
  };
};

export {
  // eslint-disable-next-line import/prefer-default-export
  generatePlayer,
};
