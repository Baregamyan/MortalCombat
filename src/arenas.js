import Game from './game';
import Api from './api';
import { Url } from './const';
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

const api = new Api(Url);

/**
 * Create the game.
 */
const game = new Game(element, api);
game.init(players);

/**
 * Start the game.
 */
// game.init(players);
