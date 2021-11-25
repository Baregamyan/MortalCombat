import { Action } from '../const';

const logTemplate = {
  [Action.START]: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
  [Action.END]: [
    'Результат удара [playerWins]: [playerLose] - труп',
    '[playerLose] погиб от удара бойца [playerWins]',
    'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
  ],
  [Action.HIT]: [
    '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
    '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
    '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
    '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
    '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
    '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
    '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
    '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
    '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
    '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
    '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
    '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
    '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
    '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
    '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
    '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
    '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
    '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
  ],
  [Action.DEFENCE]: [
    '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
    '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
    '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
    '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
    '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
    '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
  ],
  [Action.DRAW]: 'Ничья - это тоже победа!',
};

/**
 * Returns formatted date as hh:mm.
 * @param {Object} date - Date.
 * @returns {string}
 */
const humanizeTime = (date) => {
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${hour}:${minutes}`;
};

/**
 * FIXME: Minimize repeated JSDoc params?
 * Adapt log message.
 */
const adaptLogMessage = {

  /**
   * @param {Object} time - Time of action.
   * @param {string} text - Log message template.
   * @param {string} playerName - Player's character name.
   * @param {string} enemyName - Enemy's character name.
   * @return {string}
   */
  [Action.START]: (
    {
      time,
      text,
      playerName,
      enemyName,
    },
  ) => text
    .replace('[player1]', playerName)
    .replace('[player2]', enemyName)
    .replace('[time]', humanizeTime(time)),

  /**
   * @param {string} text - Log message template.
   * @param {string} loserName - Lose player's character name.
   * @return {string}
   */
  [Action.END]: (
    {
      text,
      winnerName,
      loserName,
    },
  ) => text
    .replace('[playerWins]', winnerName)
    .replace('[playerLose]', loserName),

  /**
   * @param {Object} time - Time of action.
   * @param {string} text - Log message template.
   * @param {string} attacker - Attacker player's character name.
   * @param {string} defencer - Defencer player's character name.
   * @param {number} damage - Defencer damage value.
   * @param {number} currentHp - Current defencer hp value after get damage.
   * @param {number} maxHp - Maximum player hp.
   * @return {string}
   */
  [Action.HIT]: (
    {
      time,
      text,
      attackerName,
      defenderName,
      damage,
      currentHp,
      maxHp,
    },
  ) => {
    const message = text
      .replace('[playerKick]', attackerName)
      .replace('[playerDefence]', defenderName);
    return `${humanizeTime(time)} ${message}  -${damage} [${currentHp}/${maxHp}]`;
  },

  /**
   * @param {Object} time - Time of action.
   * @param {string} text - Log message template.
   * @param {string} attacker - Attacker player's character name.
   * @param {string} defencer - Defencer player's character name.
   * @return {string}
   */
  [Action.DEFENCE]: (
    {
      time,
      text,
      attackerName,
      defenderName,
    },
  ) => {
    const message = text
      .replace('[playerKick]', attackerName)
      .replace('[playerDefence]', defenderName);
    return `${humanizeTime(time)} ${message}`;
  },

  /**
   * @param {string} text - Log message template.
   * @return {string}
   */
  [Action.DRAW]: (
    {
      text,
    },
  ) => text,
};

/**
 * Create log HTML element.
 * @param {string} text - Log's message.
 * @returns {HTMLElement}
 */
const createLog = (text) => {
  const element = document.createElement('p');
  element.textContent = text;

  return element;
};

export {
  humanizeTime,
  createLog,
  adaptLogMessage,
  logTemplate,
};
