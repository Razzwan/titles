(function () {
  const ACTIVE_CLASS = 'active128731';

  const HEADER_TAG = {
    H1: `h1`,
    H2: `h2`,
    H3: `h3`,
    H4: `h4`,
    H5: `h5`,
    H6: `h6`,
  };

  const LINK_TAG = `A`;
  const INPUT_TAG = [`INPUT`, `TEXTAREA`];

  const NODE_TYPE = {
    HEADER: `header`,
    LINK: `link`,
    LANDMARK: `landmark`,
  };

  const KEY_CODE = {
    H: 72,
    L: 76,
    M: 77,
    ARROW_UP: 38,
    ARROW_DOWN: 40,
  };

  // const HOT_KEYS = [`ctrlKey`, `altKey`, `shiftKey `];

  let nodeContainer = [];
  let currentNodeIndex = null;
  let upToDownDirection = true;

  const checkIsHeader = (element) => {
    return Boolean(HEADER_TAG[element.tagName]);
  };

  const checkIsLink = (element) => {
    return LINK_TAG === element.tagName;
  };

  const checkIsAriaAttr = (element) => {
    return element.hasAttribute(`role`);
  };

  const addNeededNode = (element) => {
    if (checkIsHeader(element)) {
      nodeContainer.push([element, NODE_TYPE.HEADER]);
    } else if (checkIsLink(element)) {
      nodeContainer.push([element, NODE_TYPE.LINK]);
    } else if (checkIsAriaAttr(element)) {
      nodeContainer.push([element, NODE_TYPE.LANDMARK]);
    }
  };

  const collectAllElementNodes = (element) => {
    addNeededNode(element);
    if (element.children.length > 0) {
      for (let i = 0; i < element.children.length; i++) {
        collectAllElementNodes(element.children[i]);
      }
    }
  };

  const refreshNodeList = (element) => {
    nodeContainer = [];
    collectAllElementNodes(element);
  };

  const findNodeIndex = (prevIndex, nodeType) => {
    const length = nodeContainer.length;

    if (upToDownDirection) {
      const start = typeof prevIndex === `number` ? (prevIndex < length ? prevIndex + 1 : 0) : 0;
      const maxElementIndex = length + start;
      for (let i = start; i < maxElementIndex; i++) {
        const newIndex = i % length;
        if (nodeContainer[newIndex][1] === nodeType) {
          return newIndex;
        }
      }
    } else {
      const defaultIndex = length - 1;
      let start = typeof prevIndex === `number` ? (prevIndex !== 0 ? prevIndex - 1 : defaultIndex) : defaultIndex;
      const minElementIndex = start - length;
      for (let i = start; i > minElementIndex; i--) {
        const newIndex = ((i >= 0) ? i : (length + i)) % length;
        if (nodeContainer[newIndex][1] === nodeType) {
          return newIndex;
        }
      }
    }

    return undefined;
  };

  const toggleClassActive = (nodeType) => {
    const prevIndex = currentNodeIndex;
    const newIndex = findNodeIndex(currentNodeIndex, nodeType);
    if (typeof newIndex === `number`) {
      currentNodeIndex = newIndex;
      if (typeof prevIndex === "number") {
        if (nodeContainer[prevIndex]) {
          nodeContainer[prevIndex][0].classList.remove(ACTIVE_CLASS);
        }
      }
      nodeContainer[currentNodeIndex][0].classList.add(ACTIVE_CLASS);
    }
  };

  const checkIsTargetInput = (evt) => {
    return INPUT_TAG.indexOf(evt.target.tagName) !== -1;
  };

  document.addEventListener(`keydown`, (evt) => {
    const isCurrentTagInput = checkIsTargetInput(evt);

    if (isCurrentTagInput) {
      return;
    }

    refreshNodeList(document.body);

    if (evt.keyCode === KEY_CODE.H) {
      toggleClassActive(NODE_TYPE.HEADER);
    }
    if (evt.keyCode === KEY_CODE.L) {
      toggleClassActive(NODE_TYPE.LINK);
    }
    if (evt.keyCode === KEY_CODE.M) {
      toggleClassActive(NODE_TYPE.LANDMARK);
    }
    if (evt.keyCode === KEY_CODE.ARROW_UP) {
      upToDownDirection = false;
    }
    if (evt.keyCode === KEY_CODE.ARROW_DOWN) {
      upToDownDirection = true;
    }
  });

  (function addStyle() {
    const css = `.${ACTIVE_CLASS} { background: yellow; border: 1px solid red; }`,
      head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style');

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet){
      // This is required for IE8 and below.
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  })();
})();
