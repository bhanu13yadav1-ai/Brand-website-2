(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const ageGate = $('#ageGate');
  const ageConfirm = $('#ageConfirm');
  let ageAccepted = false;
  try { ageAccepted = sessionStorage.getItem('blackedWellness18Plus') === 'yes'; } catch (_) { ageAccepted = false; }
  if (ageAccepted) ageGate?.classList.add('is-hidden');
  else { document.body.classList.add('age-locked'); ageConfirm?.focus({preventScroll:true}); }
  ageConfirm?.addEventListener('click', () => {
    try { sessionStorage.setItem('blackedWellness18Plus', 'yes'); } catch (_) { /* session storage may be blocked */ }
    ageGate?.classList.add('is-hidden');
    document.body.classList.remove('age-locked');
    $('#productSearch')?.focus({preventScroll:true});
  });

  const products = $$('.product-card');
  const toastEl = $('#toast');
  let toastTimer;
  const keySaved = 'blackedWellnessSavedV2';
  const saved = new Set(readSaved());
  const compared = new Set();
  let selectedDialogId = null;
  let savedOnly = false;
  let activeFilter = 'all';
  let activeCategory = 'all';

  function readSaved() {
    try { const value = JSON.parse(localStorage.getItem(keySaved) || '[]'); return Array.isArray(value) ? value : []; }
    catch { return []; }
  }
  function storeSaved() {
    try { localStorage.setItem(keySaved, JSON.stringify([...saved])); }
    catch { toast('Browser storage unavailable — saved list iss session tak hi ho sakti hai.'); }
  }
  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2300);
  }
  function productById(id) { return products.find(card => card.dataset.id === id); }
  function productName(id) { return productById(id)?.dataset.name || 'Wellness pick'; }

  function syncSaved() {
    $$('#savedCount').forEach(el => el.textContent = String(saved.size));
    $$('[data-save]').forEach(btn => {
      const yes = saved.has(btn.dataset.save);
      btn.setAttribute('aria-pressed', String(yes));
      btn.textContent = yes ? '♥' : '♡';
      btn.setAttribute('aria-label', `${yes ? 'Remove saved' : 'Save'} ${productName(btn.dataset.save)}`);
    });
    renderSavedDrawer();
  }
  function setSaved(id) {
    if (saved.has(id)) { saved.delete(id); toast('Saved list se remove kar diya.'); }
    else { saved.add(id); toast('Pick save ho gayi — My Picks mein dekho.'); }
    storeSaved(); syncSaved(); applyFilters();
  }
  function renderSavedDrawer() {
    const list = $('#savedItems');
    if (!list) return;
    if (!saved.size) { list.innerHTML = '<p class="drawer-hint">Abhi koi pick save nahi hai. Heart icon se apne favourites save karo.</p>'; return; }
    list.innerHTML = [...saved].map(id => {
      const card = productById(id); if (!card) return '';
      const image = card.dataset.img; const price = card.querySelector('.price-row strong')?.textContent || 'Reference only';
      return `<article class="saved-item"><img src="${image}" alt=""><div><strong>${escapeHtml(card.dataset.name)}</strong><small>${escapeHtml(price)} · screenshot reference</small><button type="button" data-unsave="${id}">Remove from saved</button></div></article>`;
    }).join('');
  }
  function escapeHtml(value) { return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }

  function applyFilters() {
    const term = ($('#productSearch')?.value || '').trim().toLocaleLowerCase();
    const sort = $('#sortProducts')?.value || 'featured';
    const visible = [];
    products.forEach(card => {
      const cats = (card.dataset.cats || '').split(/\s+/);
      const matchesFilter = activeFilter === 'all' || cats.includes(activeFilter);
      const matchesCategory = activeCategory === 'all' || cats.includes(activeCategory);
      const matchesSaved = !savedOnly || saved.has(card.dataset.id);
      const content = `${card.dataset.name} ${card.dataset.short} ${card.textContent}`.toLocaleLowerCase();
      const matchesSearch = !term || content.includes(term);
      const show = matchesFilter && matchesCategory && matchesSaved && matchesSearch;
      card.hidden = !show;
      if (show) visible.push(card);
    });
    visible.sort((a, b) => {
      if (sort === 'price-asc') { const ap=Number(a.dataset.price), bp=Number(b.dataset.price); return (ap>=999999?Infinity:ap) - (bp>=999999?Infinity:bp); }
      if (sort === 'price-desc') { const ap=Number(a.dataset.price), bp=Number(b.dataset.price); return (bp>=999999?-Infinity:bp) - (ap>=999999?-Infinity:ap); }
      if (sort === 'name') return a.dataset.name.localeCompare(b.dataset.name);
      return Number(a.dataset.featured) - Number(b.dataset.featured);
    });
    const grid = $('#productGrid');
    visible.forEach(card => grid.appendChild(card));
    $('#resultCount').textContent = `${visible.length} ${visible.length === 1 ? 'reference pick' : 'reference picks'}${savedOnly ? ' · saved list' : ''}`;
    $('#noResults').hidden = visible.length !== 0;
  }
  function setCategory(category) {
    activeCategory = category;
    activeFilter = category;
    $$('.category').forEach(btn => { const yes = btn.dataset.category === category; btn.classList.toggle('is-active', yes); btn.setAttribute('aria-pressed', String(yes)); });
    $$('.filter-chip').forEach(btn => { const yes = btn.dataset.filter === category; btn.classList.toggle('is-active', yes); btn.setAttribute('aria-pressed', String(yes)); });
    applyFilters();
    if (category !== 'all') $('#picks').scrollIntoView({behavior:'smooth',block:'start'});
  }
  function setFilter(filter) {
    activeFilter = filter;
    activeCategory = 'all';
    $$('.category').forEach(btn => { const yes = btn.dataset.category === 'all'; btn.classList.toggle('is-active', yes); btn.setAttribute('aria-pressed', String(yes)); });
    $$('.filter-chip').forEach(btn => { const yes = btn.dataset.filter === filter; btn.classList.toggle('is-active', yes); btn.setAttribute('aria-pressed', String(yes)); });
    applyFilters();
  }

  // Mobile navigation
  const menu = $('#menuToggle'); const nav = $('#siteNav');
  menu?.addEventListener('click', () => {
    const isOpen = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!isOpen));
    menu.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
    nav.classList.toggle('is-open', !isOpen);
  });
  $$('#siteNav a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('is-open'); menu?.setAttribute('aria-expanded','false'); menu?.setAttribute('aria-label','Open menu');
  }));

  $$('.category').forEach(btn => btn.addEventListener('click', () => setCategory(btn.dataset.category)));
  $$('.filter-chip').forEach(btn => btn.addEventListener('click', () => setFilter(btn.dataset.filter)));
  $('#productSearch')?.addEventListener('input', applyFilters);
  $('#sortProducts')?.addEventListener('change', applyFilters);
  $('#clearFilters')?.addEventListener('click', () => {
    $('#productSearch').value = ''; $('#sortProducts').value = 'featured';
    savedOnly = false; $('#savedOnlyToggle').setAttribute('aria-pressed','false');
    setCategory('all'); toast('Filters reset ho gaye.');
  });
  $('#savedOnlyToggle')?.addEventListener('click', () => {
    openDrawer();
  });
  document.addEventListener('click', e => {
    const save = e.target.closest('[data-save]');
    if (save) setSaved(save.dataset.save);
    const remove = e.target.closest('[data-unsave]');
    if (remove) { saved.delete(remove.dataset.unsave); storeSaved(); syncSaved(); applyFilters(); toast('Saved pick remove ho gayi.'); }
    const open = e.target.closest('[data-open]');
    if (open) openProduct(open.dataset.open);
    const cmp = e.target.closest('[data-compare]') || e.target.closest('.compare-label')?.querySelector('[data-compare]');
    if (cmp) toggleCompare(cmp.dataset.compare, cmp.checked);
  });

  const productDialog = $('#productDialog');
  function openProduct(id) {
    const card = productById(id); if (!card || !productDialog) return;
    selectedDialogId = id;
    $('#dialogTitle').textContent = card.dataset.name;
    $('#dialogImage').src = card.dataset.img;
    $('#dialogImage').alt = card.dataset.name + ' — reference crop';
    $('#dialogDescription').textContent = card.dataset.detail || card.dataset.short;
    $('#dialogPrice').textContent = `${card.querySelector('.price-row strong')?.textContent || 'Price not verified'} · screenshot reference only`;
    $('#dialogSave').textContent = saved.has(id) ? '♥ Saved — remove from shortlist' : '♡ Save this pick';
    if (!productDialog.open) productDialog.showModal();
    document.body.classList.add('dialog-open');
  }
  function closeProduct() { if (productDialog?.open) productDialog.close(); document.body.classList.remove('dialog-open'); }
  $('#dialogClose')?.addEventListener('click', closeProduct);
  productDialog?.addEventListener('click', e => { if (e.target === productDialog) closeProduct(); });
  productDialog?.addEventListener('close', () => document.body.classList.remove('dialog-open'));
  $('#dialogSave')?.addEventListener('click', () => { if (selectedDialogId) { setSaved(selectedDialogId); $('#dialogSave').textContent = saved.has(selectedDialogId) ? '♥ Saved — remove from shortlist' : '♡ Save this pick'; } });

  // Saved-list side drawer
  const drawer = $('#savedDrawer'); const backdrop = $('#drawerBackdrop');
  function openDrawer() { drawer.hidden = false; backdrop.hidden = false; $('#savedOnlyToggle')?.setAttribute('aria-expanded','true'); document.body.classList.add('dialog-open'); }
  function closeDrawer() { drawer.hidden = true; backdrop.hidden = true; $('#savedOnlyToggle')?.setAttribute('aria-expanded','false'); document.body.classList.remove('dialog-open'); }
  $('#closeSaved')?.addEventListener('click', closeDrawer); backdrop?.addEventListener('click', closeDrawer);
  $('#clearSaved')?.addEventListener('click', () => { saved.clear(); storeSaved(); syncSaved(); applyFilters(); toast('Saved list clear ho gayi.'); });

  // Compare up to two picks without creating a fake cart or checkout.
  function toggleCompare(id, checked) {
    if (checked) {
      if (compared.size >= 2) { const box = $(`[data-compare="${id}"]`); if (box) box.checked = false; toast('Compare mein maximum 2 picks select kar sakte ho.'); return; }
      compared.add(id);
    } else compared.delete(id);
    const bar = $('#compareBar'); bar.hidden = compared.size === 0;
    $('#compareCount').textContent = `${compared.size} ${compared.size === 1 ? 'pick' : 'picks'} selected`;
  }
  $('#clearCompare')?.addEventListener('click', () => { compared.clear(); $$('[data-compare]').forEach(box => box.checked = false); $('#compareBar').hidden = true; });
  const compareDialog = $('#compareDialog');
  $('#compareNow')?.addEventListener('click', () => {
    if (compared.size < 2) { toast('Side-by-side compare ke liye 2 picks select karo.'); return; }
    $('#compareContent').innerHTML = [...compared].map(id => {
      const card = productById(id); const price = card.querySelector('.price-row strong')?.textContent || 'Reference only';
      return `<article class="compare-item"><img src="${card.dataset.img}" alt=""><h3>${escapeHtml(card.dataset.name)}</h3><strong>${escapeHtml(price)}</strong><p>${escapeHtml(card.dataset.short)}</p><p>Verify: material, seller, item contents, current price and warranty.</p></article>`;
    }).join('');
    compareDialog.showModal();
  });
  $('#compareClose')?.addEventListener('click', () => compareDialog.close());
  compareDialog?.addEventListener('click', e => { if (e.target === compareDialog) compareDialog.close(); });

  // Comfort Finder: only general preferences, no intimate history or personal photo.
  $('#comfortForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const goal = String(data.get('goal') || 'beginner');
    const form = String(data.get('form') || 'compact');
    const experience = String(data.get('experience') || 'yes');
    const suggestions = new Set();
    if (goal === 'beginner' || experience === 'yes') suggestions.add('starter');
    if (form === 'compact' || goal === 'beginner') suggestions.add('mini');
    if (form === 'app' || goal === 'couples') suggestions.add('app');
    if (form === 'wand' || goal === 'wand') suggestions.add('wand');
    const chosen = [...suggestions].slice(0,3);
    $('#finderResult').innerHTML = `<strong>Tumhari starting shortlist ready hai.</strong><br>Yeh general browsing suggestion hai, fit/safety guarantee nahi. Product specs aur source ko verify karna.<div>${chosen.map(id=>`<a href="#picks" data-finder-pick="${id}">${escapeHtml(productName(id))} →</a>`).join('<br>')}</div>`;
    $('#finderResult').hidden = false;
    $('#finderResult').scrollIntoView({behavior:'smooth',block:'nearest'});
  });
  $('#finderResult')?.addEventListener('click', e => {
    const a = e.target.closest('[data-finder-pick]'); if (!a) return;
    e.preventDefault(); setCategory('all'); $('#productSearch').value = productName(a.dataset.finderPick); applyFilters();
    setTimeout(() => { $('#productSearch').value = ''; applyFilters(); openProduct(a.dataset.finderPick); }, 150);
  });

  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeDrawer(); document.body.classList.remove('dialog-open'); } });
  syncSaved(); applyFilters();
})();
