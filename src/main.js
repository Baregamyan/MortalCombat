import {
  getRandomElement,
  getRandomInt,
} from './utils/common';

import {
  HP_DEFAULT_VALUE,
  RESULT_CLASS_NAME,
  ResultTitle,
  Hit,
  ATTACK,
  Action,
} from './const';

import {
  adaptLogMessage,
  logTemplate,
  createLog,
} from './utils/log';

import {
  render,
  RenderPosition,
  createElement,
} from './utils/render';

import {
  changeHp,
  renderHP,
  elHP,
  createPlayer,
} from './utils/player';

/**
 * Container where players appear.
 */
const $arenas = document.querySelector('.arenas');

const $formFight = document.querySelector('.control');

const $chat = document.querySelector('.chat');

/**
 * Returns restart button element.
 * @return {HTMLElement}
 */
const restartButton = () => {
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
};

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
const showResult = (message, playerName) => {
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
};

const enemyAttack = () => {
  const hit = getRandomElement(ATTACK);
  const defence = getRandomElement(ATTACK);

  return {
    value: getRandomInt(0, Hit[hit]),
    hit,
    defence,
  };
};

/**
 * Show log in the chat.
 * @param {string} message - Log message.
 */
const showLog = (message) => {
  const $log = createLog(message);
  render($chat, $log, RenderPosition.AFTERBEGIN);
};

// eslint-disable-next-line consistent-return
$formFight.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const enemy = enemyAttack();

  const attack = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const item of $formFight) {
    if (item.checked) {
      if (item.name === Action.HIT) {
        attack.value = getRandomInt(0, Hit[item.value]);
        attack.hit = item.value;
      }

      if (item.name === Action.DEFENCE) {
        attack.defence = item.value;
      }
    }
  }

  if (attack.hit === enemy.defence) {
    enemy.value = 0;
    const messageTemplate = getRandomElement(logTemplate[Action.DEFENCE]);
    showLog(
      adaptLogMessage[Action.DEFENCE](
        new Date(),
        messageTemplate,
        player1.name,
        player2.name,
      ),
    );
  }

  if (enemy.hit === attack.defence) {
    attack.value = 0;
    const messageTemplate = getRandomElement(logTemplate[Action.DEFENCE]);
    showLog(
      adaptLogMessage[Action.DEFENCE](
        new Date(),
        messageTemplate,
        player2.name,
        player1.name,
      ),
    );
  }

  player1.changeHp(attack.value);
  player2.changeHp(enemy.value);

  /**
   * If the player gets some damage.
   */
  if (attack.value !== 0) {
    const messageTemplate = getRandomElement(logTemplate[Action.HIT]);
    showLog(
      adaptLogMessage[Action.HIT](
        new Date(),
        messageTemplate,
        player2.name,
        player1.name,
        attack.value,
        player1.hp,
        HP_DEFAULT_VALUE,
      ),
    );
  }

  /**
   * If an enemy gets some damage.
   */
  if (enemy.value !== 0) {
    const messageTemplate = getRandomElement(logTemplate[Action.HIT]);
    showLog(
      adaptLogMessage[Action.HIT](
        new Date(),
        messageTemplate,
        player1.name,
        player2.name,
        enemy.value,
        player2.hp,
        HP_DEFAULT_VALUE,
      ),
    );
  }

  if ((player1.hp === 0) && (player2.hp === 0)) {
    showLog(
      adaptLogMessage[Action.DRAW](
        logTemplate[Action.DRAW],
      ),
    );
    return showResult(ResultTitle.DRAW);
  }

  if (player1.hp === 0) {
    const messageTemplate = getRandomElement(logTemplate[Action.END]);
    showLog(
      adaptLogMessage[Action.END](
        messageTemplate,
        player2.name,
        player1.name,
      ),
    );
    return showResult(ResultTitle.WIN, player2.name);
  }

  if (player2.hp === 0) {
    const messageTemplate = getRandomElement(logTemplate[Action.END]);
    showLog(
      adaptLogMessage[Action.END](
        messageTemplate,
        player1.name,
        player2.name,
      ),
    );
    return showResult(ResultTitle.WIN, player1.name);
  }

  $formFight.reset();
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

/**
 * Show start log.
 */
showLog(
  adaptLogMessage[Action.START](
    new Date(),
    logTemplate[Action.START],
    player1.name,
    player2.name,
  ),
);
