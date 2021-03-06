/**
 * Possible render position.
 */
const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

/**
 * Create element from tag and class names.
 * @param {string} tag - Tag name.
 * @param {string | undefined} className - Needed class for element or nothing.
 * @return {HTMLElement}
 */
const createElement = (tag, className) => {
  const $tag = document.createElement(tag);

  if (className) {
    if (Array.isArray(className)) {
      className.forEach((name) => $tag.classList.add(name));
    } else {
      $tag.classList.add(className);
    }
  }

  return $tag;
};

/**
 * Render child element in to container.
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
