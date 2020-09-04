(function () {

  const Tag = {
    H1: `h1`,
    H2: `h2`,
    H3: `h3`,
    H4: `h4`,
    H5: `h5`,
    H6: `h6`,
    A: `a`,
  }

  const NodeType = {
    HEADER: `header`,
    LINK: `link`,
    LANDMARK: `landmark`,
  };

  const KeyCode = {
    H: 72,
    L: 76,
    M: 77,
  };

  const checkTag = (element) => {
      return Tag[element.tagName] ? true : false;
  };

  const checkAriaAttr = (element) => {
    return element.hasAttribute(`role`) ? true : false;
  };

  const collectNodes = (element) => {
    const isNeededTag = checkTag(element);

      if (isNeededTag) {
        nodeContainer.push(element);
      }
      if (checkAriaAttr(element) && !isNeededTag) {
        nodeContainer.push(element);
      }
      if (element.children.length > 0) {
        for (let i = 0; i < element.children.length ; i++) {
          collectNodes(element.children[i])
        }
      }
  };

  const findNodeIndex = (start, nodeType) => {
    start = start === null || start > nodeContainer.length ? 0 : start + 1;

    for (let i = start; i < nodeContainer.length; i++) {
      if (nodeType === `header` && Tag[nodeContainer[i].tagName]) {
        if (Tag[nodeContainer[i].tagName] === Tag.A) {
          continue;
        }
        return i;
        break;
      }
      if (nodeType === `link` && Tag[nodeContainer[i].tagName] === Tag.A) {
        return i;
        break;
      }
      if (nodeType === `landmark` && !Tag[nodeContainer[i].tagName]) {
        return i;
        break;
      }
    }
  };

  const removeActiveClass = () => {
    nodeContainer[currentNodeIndex].classList.remove(`active`);
  };

  const addActiveClass = (nodeType) => {
    currentNodeIndex = findNodeIndex(currentNodeIndex, nodeType);
      nodeContainer[currentNodeIndex].classList.add(`active`);
  };


  let nodeContainer = [];
  let currentNodeIndex = null;

  collectNodes(document.body);

  document.addEventListener(`keydown`, (evt) => {
    if (evt.keyCode === KeyCode.H) {
      if (currentNodeIndex !== null) {
        removeActiveClass();
      }
      addActiveClass(NodeType.HEADER);
    }
    if (evt.keyCode === KeyCode.L) {
      if (currentNodeIndex !== null) {
        removeActiveClass();
      }
      addActiveClass(NodeType.LINK);
    }
    if (evt.keyCode === KeyCode.M) {
      if (currentNodeIndex !== null) {
        removeActiveClass();
      }
      addActiveClass(NodeType.LANDMARK);
    }

  });
})();
