(function () {
  function route() {
    var path = location.pathname.replace(/\/$/, '') || '/';
    if (path === '/' || path === '/index.html') path = '/store';
    document.querySelectorAll('.page').forEach(function (p) { p.classList.remove('active'); });
    document.querySelectorAll('.navlink').forEach(function (a) { a.removeAttribute('aria-current'); });
    if (path === '/collection') {
      document.getElementById('page-collection').classList.add('active');
      var n = document.querySelector('a[data-route="collection"]');
      if (n) n.setAttribute('aria-current', 'page');
      if (window.renderCollection) window.renderCollection();
    } else {
      document.getElementById('page-store').classList.add('active');
      var n2 = document.querySelector('a[data-route="store"]');
      if (n2) n2.setAttribute('aria-current', 'page');
      if (window.renderStore) window.renderStore();
    }
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-route]');
    if (!a) return;
    e.preventDefault();
    history.pushState(null, '', '/' + a.getAttribute('data-route'));
    route();
  });
  window.addEventListener('popstate', route);

  fetch('/packs.json').then(function (r) { return r.json(); }).then(function (data) {
    window.PACK_DATA = data.PACK_DATA;
    window.EGGS = data.EGGS;
    window.RARITY_CSS = data.RARITY_CSS;
    window.WORTH = data.WORTH;
    route();
  }).catch(function (err) {
    console.error(err);
    route();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.overlay.open').forEach(function (o) { o.classList.remove('open'); });
    }
  });
})();
