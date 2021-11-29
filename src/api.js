const Method = {
  GET: 'GET',
  POST: 'POST',
};

export default class Api {
  constructor(
    {
      CHARACTERS,
      RANDOM_CHARACTER,
      FIGHT,
    },
  ) {
    this.charactersUrl = CHARACTERS;
    this.randomCharacterUrl = RANDOM_CHARACTER;
    this.fightUrl = FIGHT;
  }

  getCharacters() {
    const options = {
      method: Method.GET,
    };
    return this.load(this.charactersUrl, options)
      .then(Api.toJSON);
  }

  getRandomCharacter() {
    const options = {
      method: Method.GET,
    };
    return this.load(this.randomCharacterUrl, options)
      .then(Api.toJSON);
  }

  postHit(action) {
    const { hit, defence } = action;
    const options = {
      method: Method.POST,
      body: JSON.stringify({
        hit,
        defence,
      }),
    };

    return this.load(this.fightUrl, options)
      .then(Api.toJSON);
  }

  // eslint-disable-next-line class-methods-use-this
  load(url, options) {
    return fetch(
      url,
      options,
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
