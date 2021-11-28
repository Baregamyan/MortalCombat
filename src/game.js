import Player from './player';
import Log from './log';
import {
  Action,
  HP_DEFAULT_VALUE,
  ResultTitle,
  RESULT_CLASS_NAME,
} from './const';
import { createElement } from './utils/render';
import { createRestartButton } from './utils/game';
import { createEnemyAction, createPlayerAction } from './utils/player';

/**
 * Game.
 */
export default class Game {
  /**
   * @param {HTMLElement} $arena - Battle container.
   * @param {HTMLElement} $formFight - Form with battle controls.
   * @param {HTMLElement} $chat - Container of logs.
   */
  constructor(
    {
      $arena,
      $formFight,
      $chat,
    },
  ) {
    this.$arena = $arena;
    this.$formFight = $formFight;
    this.$chat = $chat;
  }

  /**
   * Start the game.
   * @param {Array} data - Players.
   */
  init(data) {
    this.players = data.map((player, index) => {
      const adaptedPlayer = {
        ...player,
        player: index + 1,
      };
      return new Player(adaptedPlayer);
    });
    this.logs = [];
    this.winner = null;
    this.loser = null;

    [this.player, this.enemy] = this.players;

    this.handleFormFightSubmit = this.handleFormFightSubmit.bind(this);
    this.$formFight.addEventListener('submit', this.handleFormFightSubmit);

    this.renderPlayers();
  }

  /**
   * On form fight submit handler. Runs every after 'Fight' button pressed.
   * @param {Object} evt - Event.
   */
  handleFormFightSubmit(evt) {
    evt.preventDefault();
    this.player.action = createPlayerAction(Object.values(evt.target));
    this.enemy.action = createEnemyAction();

    this.fight();
  }

  /**
   * Fight event. Players attack each other and try to defence from hit.
   */
  fight() {
    this.players.forEach((player) => {
      this.attacker = player;
      // FIXME: Rewrite according O(log n) optimization(?).
      this.defender = this.players
        .filter((defender) => defender !== this.attacker)
        .shift();
      this.hit();
    });

    this.$formFight.reset();
    this.checkGameStatus();
  }

  /**
   * Attacking player hits (or miss) defender.
   */
  hit() {
    if (this.attacker.action.hit === this.defender.action.defence) {
      this.miss();
      return;
    }
    this.defender.action.damage = this.attacker.action.value;
    this.defender.changeHp();

    this.showLog(Action.HIT);
  }

  /**
   * Check players health after any hit in order to check is the game has to be ended.
   * @return
   */
  checkGameStatus() {
    if (this.player.hp === 0 && this.enemy.hp === 0) {
      this.draw();
      return;
    }

    if (this.player.hp === 0 || this.enemy.hp === 0) {
      this.win();
    }
  }

  /**
   * Draw event. If after fight event (players hit each other) players health equal to zero.
   */
  draw() {
    this.showLog(Action.DRAW);
    this.showResult(ResultTitle.DRAW);
    this.finish();
  }

  /**
   * Finish the game.
   */
  finish() {
    this.$arena.appendChild(createRestartButton());
    this.$formFight.remove();
  }

  /**
   * Win event. If some of players has health equal to zero finish the game.
   */
  win() {
    // FIXME: Rewrite according DRY.
    if (this.player.hp === 0) {
      this.loser = this.player;
      this.winner = this.enemy;
    }

    if (this.enemy.hp === 0) {
      this.loser = this.enemy;
      this.winner = this.player;
    }

    this.showLog(Action.END);
    this.showResult(ResultTitle.WIN, this.winner.name);
    this.finish();
  }

  /**
   * Miss event. Player missed when attacking player hits to defended defender's part of body.
   */
  miss() {
    this.attacker.miss();
    this.showLog(Action.DEFENCE);
  }

  createLog(type) {
    return new Log(
      this.$chat,
      new Date(),
      type,
    );
  }

  /**
   * Render players in a game area. Runs when the game just started.
   */
  renderPlayers() {
    this.players.forEach((player) => this.$arena.appendChild(player.element));
    this.showLog(Action.START);
  }

  /**
   * Show result message of the game ending.
   * @param {string} message - Result text.
   * @param {string | undefined} playerName - Winner player name if we have a winner.
   */
  showResult(message, playerName) {
    const $resultTitle = createElement('div', RESULT_CLASS_NAME);

    $resultTitle.innerHTML = playerName
      ? `${playerName} ${message}`
      : message;

    this.$formFight.remove();
    this.$arena.appendChild($resultTitle);
    this.$arena.appendChild(createRestartButton());
  }

  /**
   * Show log message in the chat.
   * @param {string} type - Log message.
   */
  showLog(type) {
    const log = new Log(
      this.$chat,
      new Date(),
      type,
    );

    switch (type) {
      case Action.START:
        log.start(this.player.name, this.enemy.name);
        break;
      case Action.END:
        log.end(this.winner.name, this.loser.name);
        break;
      case Action.DEFENCE:
        log.defence(this.attacker.name, this.defender.name);
        break;
      case Action.HIT:
        log.hit(
          this.attacker.name,
          this.defender.name,
          this.defender.hp,
          this.attacker.action.value,
          HP_DEFAULT_VALUE,
        );
        break;
      case Action.DRAW:
        log.draw();
        break;
      default:
        throw new Error(`Unknow action type ${type}`);
    }
    this.logs.push(log);
    log.show();
  }
}
