(function () {

  const Header = {
    H1: `h1`,
    H2: `h2`,
    H3: `h3`,
    H4: `h4`,
    H5: `h5`,
    H6: `h6`,
  };

  const Link = `A`;

  const NodeType = {
    HEADER: `header`,
    LINK: `link`,
    LANDMARK: `landmark`,
  };

  const InputType  = {
    BUTTON: `button`,
    CHECKBOX: `checkbox`,
    COLOR: `color`,
    DATE: `date`,
    EMAIL: `email`,
    FILE: `file`,
    HIDDEN: `hidden`,
    IMAGE: `image`,
    MONTH: `month`,
    NUMBER: `number`,
    PASSWORD: `password`,
    RADIO: `radio`,
    RANGE: `range`,
    RESET: `reset`,
    SEARCH: `search`,
    SUBMIT: `submit`,
    TEL: `tel`,
    TEXT: `text`,
    TIME: `time`,
    URL: `url`,
    WEEK: `week`,
  };

  const KeyCode = {
    H: 72,
    L: 76,
    M: 77,
    ARROW_UP: 38,
    ARROW_DOWN: 40,
  };

  let nodeContainer = [];
  let currentNodeIndex = null;
  let upToDownDirection = true;

  const checkHeader = (element) => {
    return Boolean(Header[element.tagName]);
  };

  const checkLink = (element) => {
    return Link === element.tagName;
  };

  const checkAriaAttr = (element) => {
    return element.hasAttribute(`role`);
  };

  const addNeededNode = (element) => {
    if (checkHeader(element)) {
      nodeContainer.push([element, NodeType.HEADER]);
    } else if (checkLink(element)) {
      nodeContainer.push([element, NodeType.LINK]);
    } else if (checkAriaAttr(element)) {
      nodeContainer.push([element, NodeType.LANDMARK]);
    }
  };

  const addNeededChildrenNode = (element) => {
    if (element.children.length > 0) {
      for (let i = 0; i < element.children.length; i++) {
        addNeededNode(element.children[i])
        addNeededChildrenNode(element.children[i]);
      }
    }
  };

  const collectNodeList = (element) => {
    nodeContainer = [];
    addNeededNode(element);
    addNeededChildrenNode(element);
  };

  const findNodeIndex = (index, nodeType) => {
    const length = nodeContainer.length;
    let resIndex = undefined;// ** зачем нужен resIndex с let

    if (upToDownDirection) {
      const start = typeof index === `number` ? (index < length ? index + 1 : 0) : 0;
      const maxElementIndex = length + start;
      for (let i = start; i < maxElementIndex + start; i++) {// ** Зачем тут к maxElementIndex прибовлять newIndex
        const newIndex = i % length;
        if (nodeContainer[newIndex][1] === nodeType) {
          return newIndex;
        }
      }
    }

    if (!upToDownDirection) {
      const defaultIndex = length - 1;
      let start = typeof index === `number` ? (index > 0 ? index - 1 : defaultIndex) : defaultIndex;
      const minElementIndex = -length - start;
      if (start === 0 && nodeContainer[start][1] !== nodeType) {
        start = defaultIndex;
      }
      for (let i = start; i > minElementIndex; i--) {
        const newIndex = Math.abs(i) % length;

        if (nodeContainer[newIndex][1] === nodeType) {
          return newIndex;
        }
      }
    }

    return resIndex;
  };

  const toggleClassActive = (nodeType) => {
    const newIndex = findNodeIndex(currentNodeIndex, nodeType);
    if (typeof newIndex === `number`) {
      currentNodeIndex = newIndex;
      nodeContainer.forEach((node) => node[0].classList.remove(`active`));
      nodeContainer[currentNodeIndex][0].classList.add(`active`);
    }
  };

  document.addEventListener(`keydown`, (evt) => {

    collectNodeList(document.body);

    if (evt.keyCode === KeyCode.H) {
      toggleClassActive(NodeType.HEADER);
    }
    if (evt.keyCode === KeyCode.L) {
      toggleClassActive(NodeType.LINK);
    }
    if (evt.keyCode === KeyCode.M) {
      toggleClassActive(NodeType.LANDMARK);
    }
    if (evt.keyCode === KeyCode.ARROW_UP) {
      upToDownDirection = false;
    }
    if (evt.keyCode === KeyCode.ARROW_DOWN) {
      upToDownDirection = true;
    }
  });
})();
