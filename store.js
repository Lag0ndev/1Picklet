(function () {
  function openOverlay(el) {
    el.hidden = false;
    el.classList.add('open');
  }
  function closeOverlay(el) {
    el.classList.remove('open');
    el.hidden = true;
  }

  function renderStore() {
    var grid = document.getElementById('store-grid');
    if (!grid) return;
    var EGGS = window.EGGS || [];
    grid.innerHTML = EGGS.map(function (egg) {
      var isBoost = egg.name === '2x Booster';
      return (
        '<div class="egg-card" data-pack="' + egg.name + '">' +
          (isBoost ? '' : '<button type="button" class="odds-btn" data-odds="' + egg.name + '" aria-label="View ' + egg.name + ' odds">?</button>') +
          '<img class="egg-img" src="' + egg.img + '" alt="' + egg.name + '" loading="lazy" onerror="this.style.opacity=0.25">' +
          '<div class="name">' + egg.name + '</div>' +
          '<div class="price">0 ' + egg.currency + '</div>' +
        '</div>'
      );
    }).join('');
  }

  function openOdds(name) {
    var PACK = window.PACK_DATA || {};
    var RAR = window.RARITY_CSS || {};
    var items = PACK[name];
    if (!items) return;
    document.getElementById('odds-title').textContent = name;
    document.getElementById('odds-list').innerHTML = items.map(function (it) {
      var c = RAR[it.r] || 'var(--rarity-common)';
      return (
        '<li class="odds-row">' +
          '<div class="odds-icon"><img src="' + it.i + '" alt="" loading="lazy"></div>' +
          '<div class="odds-info"><div class="odds-name">' + it.n + '</div>' +
          '<div class="odds-rarity" style="color:' + c + '">' + it.r + '</div></div>' +
          '<div class="odds-pct">' + it.p + '</div>' +
        '</li>'
      );
    }).join('');
    openOverlay(document.getElementById('odds-overlay'));
  }

  document.addEventListener('click', function (e) {
    var odds = e.target.closest('[data-odds]');
    if (odds) {
      e.preventDefault();
      e.stopPropagation();
      openOdds(odds.getAttribute('data-odds'));
    }
  });

  var oddsOverlay = document.getElementById('odds-overlay');
  document.getElementById('odds-close').onclick = function () { closeOverlay(oddsOverlay); };
  oddsOverlay.addEventListener('click', function (e) {
    if (e.target === oddsOverlay) closeOverlay(oddsOverlay);
  });

  window.renderStore = renderStore;
})();
