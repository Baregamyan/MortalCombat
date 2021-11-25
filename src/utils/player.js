import { createElement } from './render';

/**
 * Create player HTML element.
 * @param {Object} playerObj - Players' parameters.
 * @return {HTMLElement}
 */
const createPlayer = (playerObj) => {
  const {
    player,
    name,
    hp,
    img,
  } = playerObj;

  const $player = createElement('div', `player${player}`);
  const $porgressbar = createElement('div', 'progressbar');
  const $character = createElement('div', 'character');
  const $life = createElement('div', 'life');
  const $name = createElement('div', 'name');
  const $img = createElement('img');

  $life.style.width = `${hp}%`;
  $name.innerText = name;
  $img.src = img;

  $porgressbar.appendChild($name);
  $porgressbar.appendChild($life);

  $character.appendChild($img);

  $player.appendChild($porgressbar);
  $player.appendChild($character);

  return $player;
};

/**
 * Change player's hp.
 * @param {Object} player - Player's param.
 */
function changeHp(value) {
  this.hp -= value;

  if (this.hp <= 0) {
    this.hp = 0;
  }

  this.renderHP();
}

/**
 * Returns HP line element.
 * @return {HTMLElement}
 */
function elHP() {
  return document.querySelector(`.player${this.player} .life`);
}

function renderHP() {
  // eslint-disable-next-line no-return-assign
  return this.elHP().style.width = `${this.hp}%`;
}

export {
  createPlayer,
  changeHp,
  elHP,
  renderHP,
};
