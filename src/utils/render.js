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
    $tag.classList.add(className);
  }

  return $tag;
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
