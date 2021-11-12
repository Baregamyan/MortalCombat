import { generatePlayer } from './mock/player';
import { createElement, render } from './utils/render';

const PLAYERS_COUNT = 2;

/**
 * @param {string} playerClass - Name of player element class.
 * @param {string} name - Character name.
 * @param {number} hp - Player health points.
 * @param {string} image - Path to character image.
 * @return {string} - HTML string template.
 */
const getPlayerTemplate = (playerClass, { name, img }) => {
  const characterName = name.toUpperCase();

  return (
    `<div class="${playerClass}">
      <div class="progressbar">
        <div class="life"></div>
        <div class="name">${characterName}</div>
      </div>
      <div class="character">
        <img src="${img}" />
      </div>
    </div>`
  );
};

const arenasElement = document.querySelector('.arenas');

const players = new Array(PLAYERS_COUNT).fill().map(generatePlayer);

/**
 * Render player.
 * @param {string} playerClass - Name of player element class.
 * @param {Object} player - Player data.
 */
const createPlayer = (playerClass, player) => {
  const element = createElement(getPlayerTemplate(playerClass, player));
  const lifeElement = element.querySelector('.life');

  lifeElement.style.width = `${player.hp}%`;

  render(arenasElement, element);
};

/**
 * Render players in array.
 * @param {Array} array - Array of players.
 */
const createPlayers = (playersArray) => {
  playersArray.forEach((player, index) => {
    const playerClass = `player${index + 1}`;
    createPlayer(playerClass, player);
  });
};

createPlayers(players);
