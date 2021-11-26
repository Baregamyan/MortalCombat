import { createElement } from './render';

/**
 * Create and returns restart button.
 * @return {HTMLElement}
 */
const createRestartButton = () => {
  const $wrap = createElement('div', 'reloadWrap');
  const $button = createElement('button', 'button');
  $button.setAttribute('type', 'button');
  $button.textContent = 'Restart';

  $button.addEventListener('click', (evt) => {
    evt.preventDefault();
    window.location.reload();
  });

  $wrap.appendChild($button);
  return $wrap;
};

export {
  // eslint-disable-next-line import/prefer-default-export
  createRestartButton,
};
