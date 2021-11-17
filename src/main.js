import { getRandomElement, getRandomInt } from './utils/common';
import {
  HP_DEFAULT_VALUE,
  RESULT_CLASS_NAME,
  ResultTitle,
  Hit,
  ATTACK,
} from './const';

/**
 * Container where players appear.
 */
const $arenas = document.querySelector('.arenas');

const $formFight = document.querySelector('.control');

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

/**
 * Returns restart button element.
 * @return {HTMLElement}
 */
function restartButton() {
  const $wrap = createElement('div', 'reloadWrap');
  const $button = createElement('button', 'button');
  $button.setAttribute('type', 'button');
  $button.textContent = 'Restart';

  $button.addEventListener('click', (evt) => {
    evt.preventDefault();
    window.location.reload();
  });

  $wrap.appendChild($button);
  return $wrap;
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

  $formFight.remove();
  $arenas.appendChild($resultTitle);
  $arenas.appendChild(restartButton());
}

function enemyAttack() {
  const hit = getRandomElement(ATTACK);
  const defence = getRandomElement(ATTACK);

  return {
    value: getRandomInt(0, Hit[hit]),
    hit,
    defence,
  };
}

// eslint-disable-next-line consistent-return
$formFight.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const enemy = enemyAttack();

  const attack = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const item of $formFight) {
    if (item.checked) {
      if (item.name === 'hit') {
        attack.value = getRandomInt(0, Hit[item.value]);
        attack.hit = item.value;
      }

      if (item.name === 'defence') {
        attack.defence = item.value;
      }
    }
  }

  if (attack.hit === enemy.defence) {
    enemy.value = 0;
  }

  if (enemy.hit === attack.defence) {
    attack.value = 0;
  }

  player1.changeHp(attack.value);
  player2.changeHp(enemy.value);

  if ((player1.hp === 0) && (player2.hp === 0)) {
    return showResult(ResultTitle.DRAW);
  }

  if (player1.hp === 0) {
    return showResult(ResultTitle.WIN, player2.name);
  }

  if (player2.hp === 0) {
    return showResult(ResultTitle.WIN, player1.name);
  }

  $formFight.reset();
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
