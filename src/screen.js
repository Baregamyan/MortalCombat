import ChooseScreen from './choose-screen';
import Api from './api';

const PLAYERS_URL = 'https://reactmarathon-api.herokuapp.com/api/mk/players';

const RANDOM_URL = 'https://reactmarathon-api.herokuapp.com/api/mk/player/choose';

const FIGHT_URL = 'http://reactmarathon-api.herokuapp.com/api/mk/player/fight';

const $parent = document.querySelector('.parent');
const $player = document.querySelector('.player');

const api = new Api(PLAYERS_URL, RANDOM_URL, FIGHT_URL);
const chooseScreen = new ChooseScreen($parent, $player, api);

chooseScreen.init();
