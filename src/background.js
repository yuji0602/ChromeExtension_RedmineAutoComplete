let changed = false;

document.addEventListener('DOMNodeInserted', function () {
  if (changed === false) {
    return;
  }
  changed = false;

  setTimeout(function () {
    setUp();
  }, 500);
}, true);
