import { getRandomElement } from './utils/common';
import { logTemplate, humanizeTime } from './utils/log';
import { render, RenderPosition } from './utils/render';

/**
 * Log of event.
 */
export default class Log {
  /**
   * @param {HTMLElement} $container - Container where log needs to be render.
   * @param {Object} time - Date of log's creating.
   * @param {string} type - Type of log.
   */
  constructor(
    $container,
    time,
    type,
  ) {
    this.$container = $container;
    this.time = time;
    this.type = type;
    this.template = getRandomElement(logTemplate[this.type]);
  }

  /**
   * Create end return log element.
   * @return {HTMLElement}
   */
  get $element() {
    const element = document.createElement('p');
    element.textContent = this.text;

    return element;
  }

  /**
   * Render log in container.
   */
  show() {
    render(this.$container, this.$element, RenderPosition.AFTERBEGIN);
  }

  /**
   * Create start game event log text.
   * @param {string} playerName
   * @param {string} enemyName
   */
  start(
    playerName,
    enemyName,
  ) {
    this.text = this.template
      .replace('[player1]', playerName)
      .replace('[player2]', enemyName)
      .replace('[time]', humanizeTime(this.time));
  }

  /**
   * Create end game event log text.
   * @param {string} winnerName
   * @param {string} loserName
   */
  end(
    winnerName,
    loserName,
  ) {
    this.text = this.template
      .replace('[playerWins]', winnerName)
      .replace('[playerLose]', loserName);
  }

  /**
   * Create player of enemy defence event log text.
   * @param {string} attackerName
   * @param {string} defenderName
   */
  defence(
    attackerName,
    defenderName,
  ) {
    const time = humanizeTime(this.time);
    const message = this.template
      .replace('[playerKick]', attackerName)
      .replace('[playerDefence]', defenderName);

    this.text = `${time}: ${message}`;
  }

  /**
   * Create player of enemy hit event log text.
   * @param {string} attackerName
   * @param {string} defenderName
   * @param {string} defenderHp
   * @param {string} damage
   * @param {string} maxHp
   */
  hit(
    attackerName,
    defenderName,
    defenderHp,
    damage,
    maxHp,
  ) {
    const time = humanizeTime(this.time);
    const message = this.template
      .replace('[playerKick]', attackerName)
      .replace('[playerDefence]', defenderName);
    this.text = `${time} ${message}  -${damage} [${defenderHp}/${maxHp}]`;
  }

  /**
   * Create draw game event log text.
   */
  draw() {
    this.text = this.template;
  }
}
