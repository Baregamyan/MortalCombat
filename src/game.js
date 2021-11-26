import Player from './player';
import {
  Action,
  HP_DEFAULT_VALUE,
  ResultTitle,
  RESULT_CLASS_NAME,
} from './const';
import { createElement, render, RenderPosition } from './utils/render';
import { adaptLogMessage, createLog, logTemplate } from './utils/log';
import { createRestartButton } from './utils/game';
import { getRandomElement } from './utils/common';
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
    this.players = data.map((player) => new Player(player));
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
   * Generate and adapt log message of any event according the event type.
   * @param {string} type - Event type.
   * @return {string}
   */
  generateLogMessage(type) {
    const log = {};
    log.text = getRandomElement(logTemplate[type]);
    log.time = new Date();

    switch (type) {
      case Action.START:
        log.playerName = this.player.name;
        log.enemyName = this.enemy.name;
        break;
      case Action.END:
        log.winnerName = this.winner.name;
        log.loserName = this.loser.name;
        break;
      case Action.DEFENCE:
        log.attackerName = this.attacker.name;
        log.defenderName = this.defender.name;
        break;
      case Action.HIT:
        log.attackerName = this.attacker.name;
        log.defenderName = this.defender.name;
        log.currentHp = this.defender.hp;
        log.damage = this.attacker.action.value;
        log.maxHp = HP_DEFAULT_VALUE;
        break;
      case Action.DRAW:
        break;
      default:
        throw new Error(`Unknow action type ${type}`);
    }
    this.logs.push(log);
    return adaptLogMessage[type](log);
  }

  /**
   * Show log message in the chat.
   * @param {string} type - Log message.
   */
  showLog(type) {
    const $log = createLog(this.generateLogMessage(type));
    render(this.$chat, $log, RenderPosition.AFTERBEGIN);
  }
}
