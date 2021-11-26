import { createElement } from './utils/render';

/**
 * Player.
 */
export default class Player {
  /**
   * @param {number} player - Unique number of player.
   * @param {string} name - Character name.
   * @param {number} hp - Current player's health.
   * @param {string} img - Path to gif image of character.
   */
  constructor(
    {
      player, name, hp, img,
    },
  ) {
    this.player = player;
    this.name = name;
    this.hp = hp;
    this.img = img;
    this.action = {};
  }

  /**
   * Change player's health.
   */
  changeHp() {
    this.hp -= this.action.damage;

    if (this.hp <= 0) {
      this.hp = 0;
    }

    this.renderHP();
  }

  /**
   * Render health line according hp value.
   */
  renderHP() {
    this.elHP.style.width = `${this.hp}%`;
  }

  /**
   * Player miss.
   */
  miss() {
    this.action.value = 0;
  }

  /**
   * Get health line element.
   * @readonly
   */
  get elHP() {
    return document.querySelector(`.player${this.player} .life`);
  }

  /**
   * Get player element.
   * @readonly
   */
  get element() {
    const $player = createElement('div', `player${this.player}`);
    const $porgressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = `${this.hp}%`;
    $name.innerText = this.name;
    $img.src = this.img;

    $porgressbar.appendChild($name);
    $porgressbar.appendChild($life);

    $character.appendChild($img);

    $player.appendChild($porgressbar);
    $player.appendChild($character);

    return $player;
  }
}
