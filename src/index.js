(function () {

  const Header = {
    H1: `h1`,
    H2: `h2`,
    H3: `h3`,
    H4: `h4`,
    H5: `h5`,
    H6: `h6`,
  }

  const Link = `A`;

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
    return Link === element.tagName;
  };

  const checkAriaAttr = (element) => {
    return element.hasAttribute(`role`) ? true : false;
  };

  // помимо этой переменной нужны еще коллекции, который возвращаются методом document.getElementByTagName(); и подобные
  // коллекции хороши тем, что они автоматически обновляются при добавлении нового конетнта
  // поэтому функцию collectNodes нам нужно выполнять КАЖДЫЙ РАЗ при нажатии на кнопку
  const collectNodes = (element) => {
      if (checkHeader(element)) {
        nodeContainer.push([element, NodeType.HEADER]);
      } else if (checkLink(element)) {
        nodeContainer.push([element, NodeType.LINK]);
      } else if (checkAriaAttr(element)) {
        nodeContainer.push([element, NodeType.LANDMARK]);
      }
      if (element.children.length > 0) {
        for (let i = 0; i < element.children.length; i++) {
          collectNodes(element.children[i])
        }
      }
  };

  const findNodeIndex = (start, nodeType) => {
    const newIndex = start === null || start > nodeContainer.length ? 0 : start + 1;

    for (let i = newIndex; i < nodeContainer.length; i++) {
      if (nodeContainer[i][1] === nodeType) {
        return i;
      }
    }
    return nodeContainer.findIndex((node => node[1] === nodeType));
  };

  const toggleClassActive = (nodeType) => {
    const newIndex = findNodeIndex(currentNodeIndex, nodeType);
      currentNodeIndex = newIndex;

      nodeContainer.forEach((node) => node[0].classList.remove(`active`));
      nodeContainer[currentNodeIndex][0].classList.add(`active`);
  };

  document.addEventListener(`keydown`, (evt) => {
    collectNodes(document.body);
    if (evt.keyCode === KeyCode.H) {
      toggleClassActive(NodeType.HEADER);
    }
    if (evt.keyCode === KeyCode.L) {
      toggleClassActive(NodeType.LINK);
    }
    if (evt.keyCode === KeyCode.M) {
      toggleClassActive(NodeType.LANDMARK);
    }
    // Тут nodeContainer = []; - для очистки, что бы в nodeContainer не копились теги с каждым событием
    nodeContainer = [];
  });
})();
