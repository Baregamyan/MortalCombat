import Game from './game';

/**
 * Game elements.
 */
const element = {
  $arena: document.querySelector('.arenas'),
  $formFight: document.querySelector('.control'),
  $chat: document.querySelector('.chat'),
};

/**
 * Players data.
 */
const players = [
  JSON.parse(localStorage.getItem('player1')),
  JSON.parse(localStorage.getItem('player2')),
];

/**
 * Create the game.
 */
const game = new Game(element);
game.init(players);

/**
 * Start the game.
 */
// game.init(players);
