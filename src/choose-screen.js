import { createElement, render } from './utils/render';

const DEFAULT_AVATAR = 'http://reactmarathon-api.herokuapp.com/assets/mk/avatar/11.png';

export default class ChooseScreen {
  constructor(
    $parent,
    $player,
    api,
  ) {
    this.$parent = $parent;
    this.$player = $player;
    this.api = api;

    this.character = {};

    this.showedCharacter = null;

    this.handleCharacterMouseover = this.handleCharacterMouseover.bind(this);
    this.handleCharacterMouseout = this.handleCharacterMouseout.bind(this);
    this.handleCharacterClick = this.handleCharacterClick.bind(this);
  }

  init() {
    this.renderEmptyCharacter();
    this.api.getCharacters()
      .then((characters) => this.renderCharacters(characters));
  }

  renderCharacters(characters) {
    characters.forEach((character) => {
      const { name, id, avatar } = character;
      const alt = name;
      this.character[id] = character;
      const $character = this.createCharacter(
        {
          name,
          id,
          avatar,
          alt,
        },
      );

      $character.addEventListener('mouseover', this.handleCharacterMouseover);
      $character.addEventListener('click', this.handleCharacterClick);
      render(this.$parent, $character);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  createCharacter(
    {
      avatar,
      id,
      alt,
      isDisabled,
    },
  ) {
    const element = createElement('div', ['character', `div${id}`]);

    if (isDisabled) {
      element.classList.add('disabled');
    }

    element.dataset.id = id;

    const img = createElement('img');
    img.setAttribute('src', avatar);

    if (alt) {
      img.setAttribute('alt', alt);
    }

    render(element, img);
    return element;
  }

  handleCharacterMouseover(evt) {
    if (evt.target.tagName === 'DIV') {
      this.showCharacter(evt.target.dataset.id);
      evt.target.addEventListener('mouseout', this.handleCharacterMouseout);
    }
  }

  showCharacter(id) {
    const { img } = this.character[id];

    if (!this.$showedCharacter) {
      this.$showedCharacter = createElement('img');
      render(this.$player, this.$showedCharacter);
    }

    if (img === this.$showedCharacter.src) {
      return;
    }
    this.$showedCharacter.setAttribute('src', img);
  }

  renderEmptyCharacter() {
    const $element = this.createCharacter({
      avatar: DEFAULT_AVATAR,
      isDisabled: true,
      id: 11,
    });

    render(this.$parent, $element);
  }

  enemyChoose(character) {
    this.enemy = character;
    this.startGame();
  }

  startGame() {
    localStorage.setItem('player1', JSON.stringify(this.player));
    localStorage.setItem('player2', JSON.stringify(this.enemy));
    window.location.pathname = '/arenas.html';
  }

  handleCharacterClick(evt) {
    if (evt.target.tagName === 'DIV') {
      evt.target.classList.add('active');
      this.player = this.character[evt.target.dataset.id];
      document.querySelectorAll('.character').forEach((character) => {
        character.removeEventListener('click', this.handleCharacterClick);
        character.removeEventListener('mouseover', this.handleCharacterMouseover);
        character.removeEventListener('mouseout', this.handleCharacterMouseout);
      });

      window.setTimeout(() => {
        this.api.getRandomCharacter()
          .then((enemy) => this.enemyChoose(enemy));
      }, 500);
    }
  }

  handleCharacterMouseout(evt) {
    if (evt.target.tagName === 'DIV') {
      evt.target.removeEventListener('mouseout', this.handleCharacterMouseout);
      this.$showedCharacter.remove();
      this.$showedCharacter = null;
    }
  }
}
