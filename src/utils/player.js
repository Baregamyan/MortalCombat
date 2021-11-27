import { Action, Hit, ATTACK } from '../const';

import {
  getRandomElement,
} from './common';

// FIXME: Merge functions to 'createAction' function ?
/**
 * Create player action param.
 * @param {Array} controls - Player's controls.
 * @return {Object} - Player's action.
 */
const createPlayerAction = (controls) => {
  const action = {};

  controls.forEach((control) => {
    if (control.checked) {
      if (control.name === Action.HIT) {
        action.hit = control.value;
        action.value = Hit[control.value];
      }

      if (control.name === Action.DEFENCE) {
        action.defence = control.value;
      }
    }
  });

  return action;
};

/**
 * Create enemy player action param.
 * @return {Object}
 */
const createEnemyAction = () => {
  const hit = getRandomElement(ATTACK);
  const defence = getRandomElement(ATTACK);

  return {
    value: Hit[hit],
    hit,
    defence,
  };
};

export {
  createPlayerAction,
  createEnemyAction,
};
