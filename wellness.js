(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Mobile navigation
  const menuToggle = $('#menuToggle');
  const topNav = $('#topNav');
  if (menuToggle && topNav) {
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!open));
      menuToggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
      topNav.classList.toggle('is-open', !open);
    });
    $$('a', topNav).forEach(link => link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      topNav.classList.remove('is-open');
    }));
  }

  // Category rail and filter chips share a single active filter.
  const cards = $$('.product-card');
  const categoryButtons = $$('[data-category-filter]');
  const filterButtons = $$('[data-product-filter]');
  const searchInput = $('#productSearch');
  const resultCount = $('#resultCount');
  const noResults = $('#noResults');
  let activeCategory = 'all';
  function applyFilters() {
    const query = (searchInput?.value || '').trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const categoryMatch = activeCategory === 'all' || card.dataset.category === activeCategory;
      const searchMatch = !query || `${card.dataset.name || ''} ${card.dataset.description || ''} ${card.dataset.category || ''}`.toLowerCase().includes(query);
      const show = categoryMatch && searchMatch;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (resultCount) resultCount.textContent = `${visible} concept ${visible === 1 ? 'card' : 'cards'}`;
    if (noResults) noResults.hidden = visible !== 0;
  }
  function selectCategory(value) {
    activeCategory = value;
    categoryButtons.forEach(button => {
      const on = button.dataset.categoryFilter === value;
      button.classList.toggle('is-active', on);
      button.setAttribute('aria-pressed', String(on));
    });
    filterButtons.forEach(button => {
      const on = button.dataset.productFilter === value;
      button.classList.toggle('is-active', on);
      button.setAttribute('aria-pressed', String(on));
    });
    applyFilters();
  }
  categoryButtons.forEach(button => button.addEventListener('click', () => {
    selectCategory(button.dataset.categoryFilter);
    $('#shop')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
  filterButtons.forEach(button => button.addEventListener('click', () => selectCategory(button.dataset.productFilter)));
  searchInput?.addEventListener('input', applyFilters);

  // Save controls are intentionally temporary: nothing is stored or transmitted.
  $$('[data-save]').forEach(button => button.addEventListener('click', () => {
    const saved = button.getAttribute('aria-pressed') === 'true';
    button.setAttribute('aria-pressed', String(!saved));
    button.textContent = saved ? '♡' : '♥';
    button.setAttribute('aria-label', `${saved ? 'Save' : 'Unsave'} ${button.closest('.product-card')?.dataset.name || 'concept'} concept`);
  }));

  // Product details dialog contains only information grounded in the selected card.
  const productDialog = $('#productDialog');
  const dialogTitle = $('#dialogTitle');
  const dialogDescription = $('#dialogDescription');
  const dialogFocus = $('#dialogFocus');
  const dialogMaterial = $('#dialogMaterial');
  const dialogClose = $('#dialogClose');
  $$('[data-open-product]').forEach(button => button.addEventListener('click', () => {
    const card = button.closest('.product-card');
    if (!card || !productDialog) return;
    if (dialogTitle) dialogTitle.textContent = card.dataset.name || 'Wellness concept';
    if (dialogDescription) dialogDescription.textContent = card.dataset.description || '';
    if (dialogFocus) dialogFocus.textContent = card.dataset.focus || 'Personal comfort and informed choice';
    if (dialogMaterial) dialogMaterial.textContent = card.dataset.material || 'Not confirmed';
    if (typeof productDialog.showModal === 'function') productDialog.showModal();
    else productDialog.setAttribute('open', '');
  }));
  function closeDialog() {
    if (!productDialog) return;
    if (typeof productDialog.close === 'function') productDialog.close();
    else productDialog.removeAttribute('open');
  }
  dialogClose?.addEventListener('click', closeDialog);
  productDialog?.addEventListener('click', event => {
    if (event.target === productDialog) closeDialog();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      topNav?.classList.remove('is-open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    }
  });

  // Local-only comfort guide. No network request and no persistent storage.
  const comfortForm = $('#comfortForm');
  const guideResult = $('#guideResult');
  comfortForm?.addEventListener('submit', event => {
    event.preventDefault();
    const experience = $('#experience')?.value || 'new';
    const goal = $('input[name="goal"]:checked', comfortForm)?.value || 'relax';
    const deviceSize = $('#deviceSize')?.value || 'unsure';
    const material = $('#material')?.value || 'unsure';
    const stageText = {
      new: 'Start by comparing beginner-friendly options with simple controls, clear instructions and a return/care policy you understand.',
      exploring: 'Compare a small shortlist by material disclosure, control options, size, noise information and cleaning requirements.',
      specific: 'Write down your must-have features, then verify each one against the manufacturer’s official specifications.'
    }[experience];
    const goalText = {
      relax: 'For relaxation, look at comfort, grip, intensity range and how easy the item is to clean.',
      couples: 'For couples, talk through preferences first and choose controls and product dimensions that feel comfortable for everyone.',
      sensory: 'For sensory play, agree on boundaries and a pause/stop signal before choosing any accessories.'
    }[goal];
    const sizeText = {
      compact: 'Your selected preference: compact and easy to handle.',
      standard: 'Your selected preference: a mid-size form factor.',
      larger: 'Your selected preference: a larger form factor. Verify the exact dimensions before purchasing.',
      unsure: 'No size preference selected — compare verified dimensions and choose at your own pace.'
    }[deviceSize];
    const materialText = {
      silicone: 'Check the specific item’s material disclosure and compatibility with any lubricant or cleaner.',
      hard: 'Check the manufacturer’s description of the hard-body material, finish and cleaning instructions.',
      compare: 'Prioritise clear material information from the manufacturer; do not rely on colour or appearance alone.',
      unsure: 'If material information is unclear, ask the seller or choose a listing with complete, verified specifications.'
    }[material];
    if (guideResult) {
      guideResult.textContent = `${stageText} ${goalText} ${sizeText} ${materialText} These are general shopping pointers, not medical advice or a fit guarantee.`;
      guideResult.classList.add('is-visible');
      guideResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  // Age gate is a self-attestation only; it is not age/identity verification.
  const ageGate = $('#ageGate');
  const confirmAge = $('#confirmAge');
  try {
    if (sessionStorage.getItem('blackedWellness18plus') === 'yes') ageGate?.classList.add('is-hidden');
  } catch (_) { /* Storage may be blocked; keep the gate available in memory. */ }
  confirmAge?.addEventListener('click', () => {
    ageGate?.classList.add('is-hidden');
    try { sessionStorage.setItem('blackedWellness18plus', 'yes'); } catch (_) { /* no persistence required */ }
    $('#categories')?.setAttribute('tabindex', '-1');
    $('#categories')?.focus({ preventScroll: true });
  });
  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
