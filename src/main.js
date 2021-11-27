import createPlayers from './mock/create-players';
import Game from './game';

/**
 * Default players count.
 */
const PLAYERS_COUNT = 2;

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
const players = createPlayers(PLAYERS_COUNT);

/**
 * Create the game.
 */
const game = new Game(element);

/**
 * Start the game.
 */
game.init(players);
