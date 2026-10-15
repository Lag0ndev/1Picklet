(function () {
  var ready = false;

  function setActive(route) {
    var store = document.getElementById('page-store');
    var col = document.getElementById('page-collection');
    var navS = document.getElementById('nav-store');
    var navC = document.getElementById('nav-collection');
    if (!store || !col) return;

    if (route === 'collection') {
      store.classList.remove('active');
      col.classList.add('active');
      if (navS) navS.removeAttribute('aria-current');
      if (navC) navC.setAttribute('aria-current', 'page');
      document.title = 'Collection | Picklet';
      if (window.renderCollection) window.renderCollection();
    } else {
      col.classList.remove('active');
      store.classList.add('active');
      if (navC) navC.removeAttribute('aria-current');
      if (navS) navS.setAttribute('aria-current', 'page');
      document.title = 'Store | Picklet';
      if (window.renderStore) window.renderStore();
    }
  }

  function routeFromPath() {
    var path = (location.pathname || '/').replace(/\/$/, '') || '/';
    if (path === '/' || path === '/index.html') path = '/store';
    setActive(path === '/collection' ? 'collection' : 'store');
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-route]');
    if (!a) return;
    e.preventDefault();
    var r = a.getAttribute('data-route');
    history.pushState(null, '', '/' + r);
    setActive(r);
  });
  window.addEventListener('popstate', routeFromPath);

  function boot() {
    if (ready) return;
    ready = true;
    routeFromPath();
  }

  fetch('/packs.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      window.PACK_DATA = data.PACK_DATA || {};
      window.EGGS = data.EGGS || [];
      window.RARITY_CSS = data.RARITY_CSS || {};
      window.WORTH = data.WORTH || {};
      boot();
    })
    .catch(function (err) {
      console.error('Failed to load packs.json', err);
      window.PACK_DATA = window.PACK_DATA || {};
      window.EGGS = window.EGGS || [];
      window.RARITY_CSS = window.RARITY_CSS || {};
      window.WORTH = window.WORTH || {};
      boot();
    });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.overlay.open').forEach(function (o) {
        o.classList.remove('open');
        o.hidden = true;
      });
    }
  });
})();
