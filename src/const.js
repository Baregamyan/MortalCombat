/**
 * Some names of Mortal Kombat characters.
 */
const NAMES = [
  'Scorpion',
  'Kitana',
  'Liukang',
  'Sonya',
  'Subzero',
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
 * Default player hp value/
 */
const HP_DEFAULT_VALUE = 100;

/**
 * Result title class name,
 */
const RESULT_CLASS_NAME = 'resultTitle';

/**
 * Result text title.
 */
const ResultTitle = {
  DRAW: 'Ha, draw! You are all losers!',
  WIN: 'wins',
};

/**
 * Hit's value.
 */
const Hit = {
  head: 30,
  body: 25,
  foot: 20,
};

/**
 * Possible place for attack.
 */
const ATTACK = Object.keys(Hit);

/**
 * Action type.
 */
const Action = {
  START: 'start',
  END: 'end',
  HIT: 'hit',
  DEFENCE: 'defence',
  DRAW: 'draw',
};

export {
  NAMES,
  WEAPONS,
  HP_DEFAULT_VALUE,
  RESULT_CLASS_NAME,
  ResultTitle,
  Hit,
  ATTACK,
  Action,
};
