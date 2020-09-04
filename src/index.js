(function () {

  const Header = {
    H1: `h1`,
    H2: `h2`,
    H3: `h3`,
    H4: `h4`,
    H5: `h5`,
    H6: `h6`,
  }
  
  const Link = `a`;

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
  
  let nodeContainer = [];
  let currentNodeIndex = null;

  const checkHeader = (element) => {
      return Header[element.tagName] ? true : false;
  };
  
  const checkLink = (element) => {
    return Boolean(Link[element.tagName]);
  }'

  const checkAriaAttr = (element) => {
    return element.hasAttribute(`role`) ? true : false;
  };

  const collectNodes = (element) => {

      if (checkHeader(element)) {
        nodeContainer.push([element, NodeType.HEADER]);
      } else if (checkLink(element)) {
        nodeContainer.push([element, NodeType.LINK]);
      } else if (checkAriaAttr(element)) {
        nodeContainer.push([element, NodeType.LANDMARK]);
      }
      if (element.children.length > 0) {
        for (let i = 0; i < element.children.length ; i++) {
          collectNodes(element.children[i])
        }
      }
  };

  const findNodeIndex = (start, nodeType) => {
    const newIndex = start === null || start > nodeContainer.length ? 0 : start + 1;

    for (let i = start; i < nodeContainer.length; i++) {
      if (nodeContainer[i][1] === nodeType) {
        return i;
      }
    }
    return undefined;
  };

  const addActiveClass = (nodeType) => {
    const newIndex = findNodeIndex(currentNodeIndex, nodeType);
    if (typeof currentNodeIndex === 'number') {
      currentNodeIndex = newIndex;
      // TODO: удалить ВСЕ КЛАССЫ active из ВСЕХ ЭЛЕМЕНТОВ
      nodeContainer[currentNodeIndex].classList.add(`active`);
    }
  };

  collectNodes(document.body);

  document.addEventListener(`keydown`, (evt) => {
    if (evt.keyCode === KeyCode.H) {
      addActiveClass(NodeType.HEADER);
    }
    if (evt.keyCode === KeyCode.L) {
      addActiveClass(NodeType.LINK);
    }
    if (evt.keyCode === KeyCode.M) {
      addActiveClass(NodeType.LANDMARK);
    }

  });
})();
