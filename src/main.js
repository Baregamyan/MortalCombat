/**
 * Default player hp value/
 */
const HP_DEFAULT_VALUE = 100;

/**
 * Container where players appear.
 */
const $arenas = document.querySelector('.arenas');

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

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
