/**
 * Possible render position.
 */
const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

/**
 * Transfrom string template to DOM element.
 * @param {string} template - HTML template needed to be a DOM element.
 * @return {HTMLElement}
 */
const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

/**
 * Render child element in to container.
 * Use append and prepend insteed of appendChild because more flexability in render position.
 * @param {HTMLElement} container
 * @param {HTMLElement} child
 * @param {string} place
 */
const render = (container, child, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
    default:
      throw new Error(`Wrong render position: ${place}`);
  }
};

export {
  RenderPosition,
  createElement,
  render,
};
