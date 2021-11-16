import { getRandomInt } from './utils/common';
import {
  HP_DEFAULT_VALUE,
  RESULT_CLASS_NAME,
  DamageValue,
  ResultTitle,
} from './const';

/**
 * Container where players appear.
 */
const $arenas = document.querySelector('.arenas');

const $randomButton = document.querySelector('.button');

/**
 * Create element from tag and class names.
 * @param {string} tag - Tag name.
 * @param {string | undefined} className - Needed class for element or nothing.
 * @return {HTMLElement}
 */
function createElement(tag, className) {
  const $tag = document.createElement(tag);

  if (className) {
    $tag.classList.add(className);
  }

  return $tag;
}

/**
 * Create player HTML element.
 * @param {Object} playerObj - Players' parameters.
 * @return {HTMLElement}
 */
function createPlayer(playerObj) {
  const $player = createElement('div', `player${playerObj.player}`);
  const $porgressbar = createElement('div', 'progressbar');
  const $character = createElement('div', 'character');
  const $life = createElement('div', 'life');
  const $name = createElement('div', 'name');
  const $img = createElement('img');

  $life.style.width = `${playerObj.hp}%`;
  $name.innerText = playerObj.name;
  $img.src = playerObj.img;

  $porgressbar.appendChild($name);
  $porgressbar.appendChild($life);

  $character.appendChild($img);

  $player.appendChild($porgressbar);
  $player.appendChild($character);

  return $player;
}

/**
 * Change player's hp.
 * @param {Object} player - Player's param.
 */
function changeHp(value) {
  if (this.hp <= 0) {
    this.hp = 0;
    return;
  }

  this.hp -= value;
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

const player1 = {
  player: 1,
  name: 'SCORPION',
  hp: HP_DEFAULT_VALUE,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  attack(name) {
    // eslint-disable-next-line no-console
    console.log(`${name} Fight...`);
  },
  changeHp,
  renderHP,
  elHP,
};

const player2 = {
  player: 2,
  name: 'LIUKANG',
  hp: HP_DEFAULT_VALUE,
  img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
  attack(name) {
    // eslint-disable-next-line no-console
    console.log(`${name} Fight...`);
  },
  changeHp,
  renderHP,
  elHP,
};

/**
 * Render result title.
 * @param {HTMLElement} result - Result title.
 */
function showResult(message, playerName) {
  if (!message) {
    return;
  }

  const $resultTitle = createElement('div', RESULT_CLASS_NAME);

  $resultTitle.innerHTML = playerName
    ? `${playerName} ${message}`
    : message;

  $randomButton.setAttribute('disabled', true);
  $arenas.appendChild($resultTitle);
}

// eslint-disable-next-line consistent-return
$randomButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  player1.changeHp(getRandomInt(DamageValue.MIN, DamageValue.MAX));
  player2.changeHp(getRandomInt(DamageValue.MIN, DamageValue.MAX));

  if ((player1.hp === 0) && (player2.hp === 0)) {
    return showResult(ResultTitle.DRAW);
  }

  if (player1.hp === 0) {
    return showResult(ResultTitle.WIN, player2.name);
  }

  if (player2.hp === 0) {
    return showResult(ResultTitle.WIN, player1.name);
  }
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
