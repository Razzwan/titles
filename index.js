(function () {
  let currentElement = null;
  const titlesH1 = document.getElementsByTagName('h1');

  document.addEventListener('keypress', function(element) {
    if (element.key === 'h') {
      // 1. снять с предыдущего элемента дополнительные стили с граниецей
      console.log('Мы нажали кнопку H');
      if (currentElement) {
        currentElement.classList.remove('active');
      }

      // 2. добавть новому элементу границу
      currentElement = titlesH1.item(0);
      currentElement.classList.add('active');
    }
  });

  console.log('elements', titlesH1);
})();
