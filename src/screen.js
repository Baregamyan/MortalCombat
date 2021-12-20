import ChooseScreen from './choose-screen';
import Api from './api';
import { Url } from './const';

const $parent = document.querySelector('.parent');
const $player = document.querySelector('.player');

const api = new Api(Url);
const chooseScreen = new ChooseScreen($parent, $player, api);

chooseScreen.init();
