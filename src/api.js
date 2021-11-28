const Method = {
  GET: 'GET',
  POST: 'POST',
};

export default class Api {
  constructor(playersUrl, randomUrl, fightUrl) {
    this.playersUrl = playersUrl;
    this.randomUrl = randomUrl;
    this.fightUrl = fightUrl;
  }

  getCharacters() {
    return this.load(this.playersUrl, Method.GET)
      .then(Api.toJSON);
  }

  getRandomCharacter() {
    return this.load(this.randomUrl, Method.GET)
      .then(Api.toJSON);
  }

  postFight() {
    return this.load(this.fightUrl, Method.POST);
  }

  // eslint-disable-next-line class-methods-use-this
  load(url, methodType) {
    return fetch(
      url,
      { method: methodType },
    )
      .then(Api.checkStatus)
      .catch(Api.checkError);
  }

  static checkStatus(response) {
    if (
      response.status < 200 && response.status > 299
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError() {
  }
}
