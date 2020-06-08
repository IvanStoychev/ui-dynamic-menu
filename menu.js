const myModule = (function () {
  'use strict';
  const dropZone = document.getElementById('drop-file');
  const navBar = document.getElementById('nav-bar');
  const readProgress = document.getElementById('read-progress');
  const reader = new FileReader();

  function addMenuElement(itemData, hasSubitems, caret) {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.setAttribute('href', itemData.link);
    link.textContent = itemData.label;
    li.appendChild(link);

    if (hasSubitems) {
      const span = document.createElement('span');
      span.setAttribute('class', caret);
      link.appendChild(span);
    }

    return li;
  }

  function isNotEmpty(arr) {
    return !!arr.length
  }

  function traverse(items, navBarElement) {
    Object.keys(items).forEach(function (k) {
      const topMenuElement = addMenuElement(items[k], !!items[k].subitems.length, "caret caret-down");

      if (isNotEmpty(items[k].subitems)) {
        const ul = document.createElement('ul');
        traverseSubElements(items[k].subitems, topMenuElement, ul);
      }

      navBarElement.appendChild(topMenuElement);
    });
  }

  function traverseSubElements(items, element, container) {
    Object.keys(items).forEach(function (k) {
      const submenuElement = addMenuElement(items[k], !!items[k].subitems.length, "caret caret-right");

      if (container) {
        container.appendChild(submenuElement);
      } else {
        element.appendChild(submenuElement);
      }

      if (isNotEmpty(items[k].subitems)) {
        const ul = document.createElement('ul');
        traverseSubElements(items[k].subitems, submenuElement, ul);
      }
    });

    if (container) element.appendChild(container);
  }

  function parseJson(jsonContent) {
    navBar.textContent = '';
    var jsonObject = '';

    try {
      jsonObject = JSON.parse(jsonContent);
    } catch (e) {
      alert("Invalid JSON!");
      return;
    }

    traverse(jsonObject.items, navBar);
  }

  navBar.addEventListener('click', event => {
    if (event.target.tagName.toLowerCase() === 'a') {
      const event = new CustomEvent('select', {
        detail: event.target
      });
      navBar.dispatchEvent(event);
    }
  });

  reader.addEventListener('load', (event) => {
    readProgress.textContent = '';
    parseJson(event.target.result);
  });

  reader.addEventListener('progress', (event) => {
    if (event.loaded && event.total) {
      const percent = (event.loaded / event.total) * 100;
      readProgress.textContent = `File reading progress: ${Math.round(percent)}%`;
    }
  });

  if (window.FileList && window.File) {
    dropZone.addEventListener('dragover', event => {
      event.stopPropagation();
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';
    });

    dropZone.addEventListener('drop', event => {
      event.stopPropagation();
      event.preventDefault();
      const files = event.dataTransfer.files;

      if (files.length > 1) {
        alert("Please only drop a single file!");
        return;
      }

      reader.readAsText(files[0]);
    });
  }
  return {};
})();