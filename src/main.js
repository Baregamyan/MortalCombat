import { getRandomInt } from './utils/common';

/**
 * Default player hp value/
 */
const HP_DEFAULT_VALUE = 100;

const DamageValue = {
  MIN: 1,
  MAX: 20,
};

/**
 * Container where players appear.
 */
const $arenas = document.querySelector('.arenas');

const $randomButton = document.querySelector('.button');

const player1 = {
  player: 1,
  name: 'SCORPION',
  hp: HP_DEFAULT_VALUE,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  attack(name) {
    // eslint-disable-next-line no-console
    console.log(`${name} Fight...`);
  },
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
};

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
 * @param {string} classPlayer - Player element's class name.
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
 * Create win title.
 * @param {Object} player - Player's param.
 * @return {HTMLElement}
 */
function playerWin(player) {
  const $loseTitle = createElement('div', 'winTitle');
  $loseTitle.innerText = `${player.name} wins`;

  return $loseTitle;
}

/**
 * Create draw title.
 * @return {HTMLElement}
 */
function playersDraw() {
  const $drawTitle = createElement('div', 'drawTitle');
  $drawTitle.innerHTML = 'Ha, draw! You are all losers!';

  return $drawTitle;
}

/**
 * Change player's hp.
 * @param {Object} player - Player's param.
 */
function changeHp(player) {
  const playerClass = `player${player.player}`;
  const $playerLive = document.querySelector(`.${playerClass} .life`);
  // eslint-disable-next-line no-param-reassign
  player.hp -= getRandomInt(DamageValue.MIN, DamageValue.MAX);

  if (player.hp < 0) {
  // eslint-disable-next-line no-param-reassign
    player.hp = 0;
  }

  $playerLive.style.width = `${player.hp}%`;
}

/**
 * Render result title.
 * @param {HTMLElement} result - Result title.
 */
function showResult(result) {
  if (!result) {
    return;
  }

  $randomButton.setAttribute('disabled', true);
  $arenas.appendChild(result);
}

// eslint-disable-next-line consistent-return
$randomButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  changeHp(player1);
  changeHp(player2);

  if ((player1.hp === 0) && (player2.hp === 0)) {
    return showResult(playersDraw());
  }

  if (player1.hp === 0) {
    return showResult(playerWin(player2));
  }

  if (player2.hp === 0) {
    return showResult(playerWin(player1));
  }
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
