(function () {
  var ITEMS = null;
  var current = null;

  var LOCK =
    '<svg class="lock" viewBox="0 0 384 512" aria-hidden="true">' +
    '<path fill="currentColor" d="M128 96v64h128V96c0-35.3-28.7-64-64-64s-64 28.7-64 64zM64 160V96C64 25.3 121.3-32 192-32S320 25.3 320 96v64c35.3 0 64 28.7 64 64v224c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64z"/>' +
    '</svg>';

  function ensureItems() {
    if (ITEMS) return ITEMS;
    ITEMS = [];
    var PACK = window.PACK_DATA || {};
    var WORTH = window.WORTH || {};
    Object.keys(PACK).forEach(function (pack) {
      (PACK[pack] || []).forEach(function (it) {
        ITEMS.push({
          pack: pack,
          n: it.n,
          r: it.r,
          p: it.p,
          i: it.i,
          worth: WORTH[it.r] || 10,
          owned: 0
        });
      });
    });
    return ITEMS;
  }

  function openOverlay(el) {
    el.hidden = false;
    el.classList.add('open');
  }
  function closeOverlay(el) {
    el.classList.remove('open');
    el.hidden = true;
  }

  function renderCollection() {
    var list = ensureItems();
    var sectionsEl = document.getElementById('col-sections');
    if (!sectionsEl) return;

    var by = {};
    list.forEach(function (it, i) {
      it._i = i;
      (by[it.pack] = by[it.pack] || []).push(it);
    });

    document.getElementById('col-total').textContent = String(list.length);
    document.getElementById('col-owned').textContent = String(
      list.filter(function (x) { return x.owned > 0; }).length
    );

    var h = '';
    Object.keys(by).forEach(function (p) {
      h += '<section class="col-section"><h2>' + p + '</h2><div class="col-grid">';
      by[p].forEach(function (it) {
        h +=
          '<button type="button" class="col-tile" data-i="' + it._i + '" title="' + it.n + '" aria-label="' + it.n + '">' +
            '<img src="' + it.i + '" alt="" loading="lazy" draggable="false">' +
            LOCK +
          '</button>';
      });
      h += '</div></section>';
    });
    sectionsEl.innerHTML = h;
  }

  function openItem(it) {
    current = it;
    var RAR = window.RARITY_CSS || {};
    document.getElementById('item-name').textContent = it.n;
    var rar = document.getElementById('item-rarity');
    rar.textContent = it.r + ' \u00b7 ' + it.p;
    rar.style.color = RAR[it.r] || 'var(--rarity-common)';
    document.getElementById('item-img').src = it.i;
    document.getElementById('item-img').alt = it.n;
    document.getElementById('item-owned').textContent = it.owned + ' owned';
    document.getElementById('item-worth').textContent =
      'Worth ' + Number(it.worth).toLocaleString() + ' coins each';
    var can = it.owned > 0;
    document.getElementById('item-sell').disabled = !can;
    document.getElementById('item-list').disabled = !can;
    document.getElementById('item-equip').disabled = !can;
    openOverlay(document.getElementById('item-overlay'));
  }

  document.getElementById('col-sections').addEventListener('click', function (e) {
    var t = e.target.closest('.col-tile');
    if (!t) return;
    var list = ensureItems();
    var it = list[+t.getAttribute('data-i')];
    if (it) openItem(it);
  });

  var itemOverlay = document.getElementById('item-overlay');
  document.getElementById('item-close').onclick = function () { closeOverlay(itemOverlay); };
  itemOverlay.addEventListener('click', function (e) {
    if (e.target === itemOverlay) closeOverlay(itemOverlay);
  });

  var sellOverlay = document.getElementById('sell-overlay');
  var sellQty = document.getElementById('sell-qty');
  document.getElementById('item-sell').onclick = function () {
    if (!current || current.owned < 1) return;
    document.getElementById('sell-text').textContent =
      'How many "' + current.n + '" would you like to sell?';
    sellQty.min = 1;
    sellQty.max = current.owned;
    sellQty.value = 1;
    openOverlay(sellOverlay);
  };
  document.getElementById('sell-minus').onclick = function () {
    sellQty.value = Math.max(1, (+sellQty.value || 1) - 1);
  };
  document.getElementById('sell-plus').onclick = function () {
    sellQty.value = Math.min(+sellQty.max || 1, (+sellQty.value || 1) + 1);
  };
  document.getElementById('sell-cancel').onclick = function () { closeOverlay(sellOverlay); };
  document.getElementById('sell-ok').onclick = function () {
    if (!current) return;
    var q = Math.max(1, Math.min(current.owned, +sellQty.value || 1));
    current.owned = Math.max(0, current.owned - q);
    closeOverlay(sellOverlay);
    openItem(current);
    document.getElementById('col-owned').textContent = String(
      ensureItems().filter(function (x) { return x.owned > 0; }).length
    );
  };
  sellOverlay.addEventListener('click', function (e) {
    if (e.target === sellOverlay) closeOverlay(sellOverlay);
  });

  window.renderCollection = renderCollection;
})();
