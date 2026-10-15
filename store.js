(function () {
  var PACK = window.PACK_DATA || {};
  var EGGS = window.EGGS || [];
  var RAR = window.RARITY_CSS || {};

  function renderStore() {
    var grid = document.getElementById('store-grid');
    if (!grid) return;
    grid.innerHTML = EGGS.map(function (egg) {
      var isBoost = egg.name === '2x Booster';
      return '<div class="egg-card" data-pack="' + egg.name + '">' +
        (isBoost ? '' : '<button type="button" class="odds-btn" data-odds="' + egg.name + '" title="View odds">?</button>') +
        '<img class="egg-img" src="' + egg.img + '" alt="' + egg.name + '" onerror="this.style.opacity=0.3">' +
        '<div class="name">' + egg.name + '</div>' +
        '<div class="price">0 ' + egg.currency + '</div>' +
      '</div>';
    }).join('');
  }

  function openOdds(name) {
    var items = PACK[name];
    if (!items) return;
    document.getElementById('odds-title').textContent = name;
    document.getElementById('odds-list').innerHTML = items.map(function (it) {
      var c = RAR[it.r] || '#d1d5db';
      return '<li class="odds-row"><div class="odds-icon"><img src="' + it.i + '" alt=""></div>' +
        '<div class="odds-info"><div class="odds-name">' + it.n + '</div>' +
        '<div class="odds-rarity" style="color:' + c + '">' + it.r + '</div></div>' +
        '<div class="odds-pct">' + it.p + '</div></li>';
    }).join('');
    document.getElementById('odds-overlay').classList.add('open');
  }

  document.addEventListener('click', function (e) {
    var odds = e.target.closest('[data-odds]');
    if (odds) {
      e.preventDefault();
      e.stopPropagation();
      openOdds(odds.getAttribute('data-odds'));
      return;
    }
  });

  document.getElementById('odds-close').onclick = function () {
    document.getElementById('odds-overlay').classList.remove('open');
  };
  document.getElementById('odds-overlay').onclick = function (e) {
    if (e.target === this) this.classList.remove('open');
  };

  window.renderStore = renderStore;
})();
