import { createElement } from './utils/render';

export default class Player {
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

  changeHp() {
    this.hp -= this.action.damage;

    if (this.hp <= 0) {
      this.hp = 0;
    }

    this.renderHP();
  }

  renderHP() {
    this.elHP.style.width = `${this.hp}%`;
  }

  miss() {
    this.action.value = 0;
  }

  get elHP() {
    return document.querySelector(`.player${this.player} .life`);
  }

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
