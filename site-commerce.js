(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const A = (name) => `assets/new-gallery/${name}`;
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money = (v) => Number(v) > 0 ? `₹${Number(v).toLocaleString('en-IN')}` : 'Price to verify';
  const memoryFallback = new Map();
  const safeGet = (key, fallback) => { try { const v = JSON.parse(localStorage.getItem(key)); return v ?? fallback; } catch { return memoryFallback.has(key) ? memoryFallback.get(key) : fallback; } };
  const safeSet = (key, value) => { memoryFallback.set(key, value); try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } };
  const SAVED_KEY = 'blackedFusionV6Saved';
  const BAG_KEY = 'blackedFusionV6Bag';
  const PHOTO_KEY = 'blackedFusionV6FitNotes';
  const shared = { saved: safeGet(SAVED_KEY, []), bag: safeGet(BAG_KEY, []), products: new Map(), current: null, compare: new Set(), fitObjectUrl: null, ageOk: false };

  const innerwear = [
    {id:'s01',name:'Midnight Lace Set',category:'sets',tags:['sanskari','lace','sets','concept'],price:1099,old:1999,badge:'Black & Gold Edit',image:A('product-black-lace.webp'),desc:'Black-lace editorial reference from your project. Product stock, size and materials are not verified.'},
    {id:'s02',name:'Ivory Bloom',category:'comfort',tags:['sanskari','comfort','concept'],price:749,old:1299,badge:'Soft Palette',image:A('product-ivory-bloom.webp'),desc:'Ivory and blush styling reference. Verify the actual SKU, size guide and fabric with the supplier.'},
    {id:'s03',name:'Luxe Burgundy Satin',category:'sets',tags:['sanskari','sets','concept'],price:899,old:1499,badge:'Satin Story',image:A('product-burgundy-satin.webp'),desc:'Burgundy satin still-life concept for the Sanskari Edit lookbook. Illustrative price only.'},
    {id:'s04',name:'Blush Everyday Comfort',category:'comfort',tags:['sanskari','comfort'],price:699,old:1199,badge:'Everyday Edit',image:A('sanskari-card-everyday.webp'),desc:'Everyday comfort styling reference. Size, fabric and availability require verification.'},
    {id:'s05',name:'Cotton Softwear',category:'comfort',tags:['comfort','sanskari'],price:599,old:999,badge:'Softwear',image:A('sanskari-card-cotton.webp'),desc:'Cotton-inspired campaign concept, not a confirmed inventory listing.'},
    {id:'s06',name:'Scarlet Satin Edit',category:'bridal',tags:['sanskari','sets','bridal','concept'],price:949,old:1599,badge:'Scarlet Story',image:A('sanskari-card-scarlet.webp'),desc:'Scarlet colour-story reference from the existing concept assets.'},
    {id:'s07',name:'Blush Lace Detail',category:'sets',tags:['sanskari','lace','sets'],price:899,old:1499,badge:'Lace Detail',image:A('sanskari-card-lace.webp'),desc:'Lace detail lookbook image. Product specifications and price are illustrative.'},
    {id:'s08',name:'Soft Blush Set',category:'comfort',tags:['sanskari','comfort'],price:649,old:1099,badge:'Soft Colour',image:A('sanskari-card-ivory.webp'),desc:'Soft-tone product styling reference from the project library.'},
    {id:'s09',name:'Noir Lace Edit',category:'bras',tags:['sanskari','lace','sets'],price:899,old:1599,badge:'Noir Edit',image:A('sanskari-card-black.webp'),desc:'Noir editorial reference. Please verify commercial rights and real product details.'},
    {id:'s10',name:'Sanskari Campaign · Burgundy',category:'bridal',tags:['sanskari','concept','bridal'],price:0,old:0,badge:'Campaign Visual',image:A('sanskari-campaign-burgundy.webp'),desc:'Campaign poster artwork only, not a product SKU.'},
    {id:'s11',name:'Sanskari Campaign · Black & Gold',category:'bras',tags:['sanskari','concept','lace'],price:0,old:0,badge:'Campaign Visual',image:A('sanskari-editorial-black.webp'),desc:'Black-and-gold campaign poster from your uploads. Use as campaign art rather than product listing.'},
    {id:'s12',name:'Mirror Edit Campaign',category:'bridal',tags:['sanskari','concept'],price:0,old:0,badge:'Campaign Visual',image:A('sanskari-mirror-edit.webp'),desc:'Campaign image for the visual gallery. It is not stock or a verified product.'},
    {id:'s13',name:'Ivory & Blush Lookbook',category:'comfort',tags:['sanskari','comfort','concept'],price:0,old:0,badge:'Lookbook',image:A('library-romantic-blush.webp'),desc:'A softer visual direction for the collection. Supplier product details are not inferred.'},
    {id:'s14',name:'Sweet Face · Dark Mood',category:'sets',tags:['sanskari','lace','concept'],price:0,old:0,badge:'Campaign Visual',image:A('sanskari-campaign-black.webp'),desc:'Campaign concept artwork from the supplied project image set.'}
  ];

  const wellness = [
    {id:'w01',name:'Pink Comfort Massager Concept',category:'device',tags:['device','comfort','pink'],price:589,old:1500,badge:'Product Reference',image:A('wellness-pink-massager-crop.webp'),desc:'Non-graphic product reference image. Identity, product specifications, safety certifications and sample price are not verified.'},
    {id:'w02',name:'Rose Personal Wellness Device',category:'device',tags:['device','pink','comfort'],price:999,old:1999,badge:'Pink Edit',image:A('wellness-pink-device-concept.webp'),desc:'Product concept image. Confirm manufacturer instructions, materials and availability before any real listing.'},
    {id:'w03',name:'Violet Wellness Device',category:'device',tags:['device','violet','comfort'],price:1299,old:2399,badge:'Violet Edit',image:A('wellness-purple-product-crop.webp'),desc:'A violet-toned product reference from the project visuals. Technical claims are not verified.'},
    {id:'w04',name:'Wearable Comfort Ring',category:'accessory',tags:['accessory','wearable','ring'],price:533,old:1499,badge:'Accessory Reference',image:A('wellness-wearable-comfort-ring.jpg'),desc:'Accessory reference only. Confirm size, material, safe-use guidance and supplier details.'},
    {id:'w05',name:'Care Bottle Concept',category:'care',tags:['care','bottle','labels'],price:299,old:699,badge:'Care Reference',image:A('wellness-care-bottle-concept.webp'),desc:'Packaging/care visual reference. Ingredient details, use directions and regulatory compliance have not been checked.'},
    {id:'w06',name:'Dark Product Range',category:'reference',tags:['reference','range','dark'],price:0,old:0,badge:'Range Visual',image:A('wellness-hero.webp'),desc:'Studio-style concept visual for art direction; individual items are not confirmed stock.'},
    {id:'w07',name:'Teal-Pink Comfort Device',category:'device',tags:['device','teal','pink'],price:899,old:1799,badge:'Colour Reference',image:A('wellness-blue-comfort-concept.webp'),desc:'Existing repository reference. Verify the exact real product and all specifications with the supplier.'},
    {id:'w08',name:'Compact Device Duo',category:'device',tags:['device','compact','duo'],price:799,old:1699,badge:'Duo Reference',image:A('wellness-mini-wellness-duo.webp'),desc:'Product reference image. Seller claims, material and product identity require confirmation.'},
    {id:'w09',name:'Soft Wand Concept',category:'device',tags:['device','wand','soft'],price:1299,old:2499,badge:'Soft Touch',image:A('wellness-soft-wand-concept.webp'),desc:'Device reference. The image is not a substitute for a verified supplier listing or safety instructions.'},
    {id:'w10',name:'Lavender Comfort Device',category:'device',tags:['device','lavender','comfort'],price:1199,old:2299,badge:'Lavender Edit',image:A('wellness-purple-concept.webp'),desc:'Existing product-style reference, not verified inventory.'},
    {id:'w11',name:'Black Comfort Device',category:'device',tags:['device','black','comfort'],price:1099,old:1999,badge:'Black Edit',image:A('wellness-black-comfort-concept.webp'),desc:'Dark product-style reference. Check authenticity, care guidance and safety details before sale.'},
    {id:'w12',name:'Premium Care & Accessory Flatlay',category:'lifestyle',tags:['lifestyle','care','accessory'],price:0,old:0,badge:'Lifestyle Visual',image:A('wellness-lifestyle.webp'),desc:'Lifestyle/campaign visual for the separate adult section, not an item listing.'},
    {id:'w13',name:'Gold Detail Device',category:'device',tags:['device','gold','detail'],price:1199,old:2199,badge:'Detail Reference',image:A('wellness-gold-comfort-concept.webp'),desc:'Product styling reference only; verify supplier, exact model and material before use.'},
    {id:'w14',name:'Body Care & Wellness Mood',category:'lifestyle',tags:['lifestyle','care','mood'],price:0,old:0,badge:'Lifestyle Visual',image:A('wellness-care-bottle-crop.webp'),desc:'Non-graphic campaign styling reference. Does not make a medical or safety claim.'}
  ];
  const boards = [
    {name:'Sanskari · Raat Shareef Hai',image:A('board-02.webp'),desc:'Burgundy/gold campaign poster.'},
    {name:'Sanskari · Sweet Face, Dark Mood',image:A('board-03.webp'),desc:'Black-and-gold editorial poster.'},
    {name:'Sanskari · Mirror Edit',image:A('board-04.webp'),desc:'Campaign poster for mood and typography reference.'},
    {name:'Sanskari · Blue & Gold',image:A('board-05.webp'),desc:'Blue-tone campaign art.'},
    {name:'Sanskari · Entry Impression',image:A('board-06.webp'),desc:'Entry campaign direction.'},
    {name:'Sanskari · Gold Editorial',image:A('board-07.webp'),desc:'Gold-tone styling reference.'},
    {name:'Black Lace Lookbook',image:A('board-08.webp'),desc:'Separate product lookbook still life.'},
    {name:'Ivory & Blush Lookbook',image:A('board-09.webp'),desc:'Separate soft-tone lookbook still life.'},
    {name:'Wellness Studio Lookbook',image:A('board-10.webp'),desc:'Non-graphic wellness product still life.'},
    {name:'Wide Campaign',image:A('board-01.webp'),desc:'Landscape campaign reference.'}
  ];
  const spinFrames = [
    {img:A('concept-frame-01.webp'),label:'Burgundy campaign'}, {img:A('concept-frame-02.webp'),label:'Black and gold'},
    {img:A('concept-frame-03.webp'),label:'Mirror edit'}, {img:A('concept-frame-04.webp'),label:'Blue and gold'},
    {img:A('concept-frame-05.webp'),label:'Entry campaign'}, {img:A('concept-frame-06.webp'),label:'Gold editorial'},
    {img:A('concept-frame-07.webp'),label:'Black lace still life'}, {img:A('concept-frame-08.webp'),label:'Ivory and blush'}
  ];
  [...innerwear,...wellness].forEach(p => shared.products.set(p.id,p));

  function toast(message) {
    const node = $('#toast');
    if (!node) return;
    node.textContent = message; node.classList.add('show');
    window.clearTimeout(toast.timer); toast.timer = window.setTimeout(() => node.classList.remove('show'), 2200);
  }
  function updateCounts() {
    shared.saved = safeGet(SAVED_KEY, []); shared.bag = safeGet(BAG_KEY, []);
    $$('[data-saved-count]').forEach(n => n.textContent = shared.saved.length);
    $$('[data-bag-count]').forEach(n => n.textContent = shared.bag.reduce((n,p) => n + (p.qty||1), 0));
  }
  function renderCard(p, type='innerwear') {
    const tags = [...new Set([p.category, ...(p.tags||[]), type])].join(' ');
    const saved = shared.saved.some(x=>x.id===p.id);
    const oldPrice = p.old>0 ? `<del>${money(p.old)}</del>` : '';
    const price = p.price>0 ? money(p.price) : 'Price verify karo';
    return `<article class="shop-card" data-product-id="${esc(p.id)}" data-product-name="${esc(p.name)}" data-category="${esc(p.category)}" data-tags="${esc(tags)}" data-price="${Number(p.price)||0}" data-featured="${Number(p.featured)||50}">
      <button type="button" class="shop-media" data-site-details="${esc(p.id)}" aria-label="Open ${esc(p.name)} details"><img src="${esc(p.image)}" data-fallback="${esc(p.fallback||A(type==='wellness'?'wellness-hero.webp':'library-ivory-blush.webp'))}" alt="${esc(p.name)}" loading="lazy"><span class="product-badge">${esc(p.badge||'Reference')}</span></button>
      <div class="product-title-row"><h3>${esc(p.name)}</h3></div><p class="product-kicker">${type==='wellness'?'WELLNESS 18+ REFERENCE':'SANSKARI EDIT LOOKBOOK'}</p><p class="product-description">${esc(p.desc)}</p>
      <div class="product-price-row"><strong>${price}</strong>${oldPrice}</div>
      <div class="commerce-card-actions"><button type="button" class="site-card-add" data-site-add="${esc(p.id)}">Add to demo bag</button><button type="button" class="site-card-save" data-site-save="${esc(p.id)}" aria-pressed="${String(saved)}">${saved?'♥ Saved':'♡ Save'}</button></div>
      <button type="button" class="site-card-details" data-site-details="${esc(p.id)}">View details ↗</button>
    </article>`;
  }
  function renderGrid(el, list, type) { if (!el) return; el.innerHTML = list.length ? list.map(p=>renderCard(p,type)).join('') : '<div class="empty"><strong>Koi reference nahi mila.</strong>Search ya category change karke dekho.</div>'; imageFallbacks(); }
  function renderHome() {
    renderGrid($('#homeGrid'), innerwear.slice(0,6), 'innerwear');
    renderGrid($('#wellnessHomeGrid'), wellness.filter(p=>['device','accessory','care'].includes(p.category)).slice(0,4), 'wellness');
    const grid = $('#boardsGrid');
    if (grid) grid.innerHTML = boards.map((b,i)=>`<button class="board-card" type="button" data-board="${i}"><img src="${esc(b.image)}" alt="${esc(b.name)}" loading="lazy"><span>${esc(b.name)} →</span></button>`).join('');
  }
  function activeFilter(group) { return document.querySelector(`[data-filter-group="${group}"] .filter.active`)?.dataset.filter || 'all'; }
  const filterState = {sanskari:'all',wellness:'all'};
  function syncPills(group) {
    $$(`[data-group="${group}"][data-filter]`).forEach(btn=>{
      const value = btn.dataset.filter;
      btn.classList.toggle('active', value===filterState[group]);
      btn.classList.toggle('is-active', value===filterState[group]);
      if (btn.tagName==='BUTTON') btn.setAttribute('aria-pressed',String(value===filterState[group]));
    });
  }
  function filterAndSort(group) {
    const isS = group==='sanskari';
    const grid = $(isS?'#sanskariGrid':'#wellnessGrid');
    if (!grid) return;
    const list = isS ? innerwear : wellness;
    const search = ($(isS?'#sanskariSearch':'#wellnessSearch')?.value||'').trim().toLowerCase();
    const cat = $(isS?'#sanskariCategory':'#wellnessCategory')?.value||'all';
    const mode = $(isS?'#sanskariSort':'#wellnessSort')?.value||'featured';
    let rows = list.filter(p=>{
      const tags=[p.category,...(p.tags||[])];
      const chosen=filterState[group];
      const okFilter=chosen==='all'||tags.includes(chosen);
      const okCat=cat==='all'||tags.includes(cat);
      const okSearch=!search||(p.name+' '+p.desc+' '+tags.join(' ')).toLowerCase().includes(search);
      return okFilter&&okCat&&okSearch;
    });
    if(mode==='name') rows.sort((a,b)=>a.name.localeCompare(b.name));
    else if(mode==='priceLow'||mode==='price-asc') rows.sort((a,b)=>(a.price||Infinity)-(b.price||Infinity));
    else if(mode==='priceHigh'||mode==='price-desc') rows.sort((a,b)=>(b.price||0)-(a.price||0));
    else rows.sort((a,b)=>(a.featured??50)-(b.featured??50));
    renderGrid(grid,rows,group==='wellness'?'wellness':'innerwear');
    const count = isS ? $('#sanskariCount') : $('#wellCount');
    const result = isS ? $('#sanskariResults') : $('#wellnessResults');
    if(count) count.textContent=`${rows.length} ${isS?'styles':'references'}`;
    if(result) result.textContent=`${rows.length} ${isS?'styles mil gaye':'references found'}`;
    syncPills(group);
    if(isS){
      $$('[data-filter="all"][data-group="sanskari"]').forEach(n=>n.setAttribute('aria-pressed',String(filterState.sanskari==='all')));
    }
    populateCompareOptions();
  }
  function initFilters() {
    for (const group of ['sanskari','wellness']) {
      if (!$('#sanskariGrid') && group==='sanskari') continue;
      if (!$('#wellnessGrid') && group==='wellness') continue;
      $$(`[data-group="${group}"][data-filter]`).forEach(btn=>btn.addEventListener('click',e=>{
        filterState[group]=btn.dataset.filter||'all';
        const catSelect=$(group==='sanskari'?'#sanskariCategory':'#wellnessCategory');
        if(catSelect && [...catSelect.options].some(option=>option.value===filterState[group])) catSelect.value=filterState[group];
        syncPills(group);
        if (btn.tagName==='A') { e.preventDefault(); $(group==='sanskari'?'#sanskariGrid':'#wellnessGrid')?.scrollIntoView({behavior:'smooth',block:'start'}); }
        filterAndSort(group);
      }));
      const search=$(group==='sanskari'?'#sanskariSearch':'#wellnessSearch');
      const category=$(group==='sanskari'?'#sanskariCategory':'#wellnessCategory');
      const sort=$(group==='sanskari'?'#sanskariSort':'#wellnessSort');
      search?.addEventListener('input',()=>filterAndSort(group));
      category?.addEventListener('change',()=>filterAndSort(group));
      sort?.addEventListener('change',()=>filterAndSort(group));
      $(group==='sanskari'?'#sanskariReset':'#wellnessReset')?.addEventListener('click',()=>{
        filterState[group]='all'; if(search)search.value='';if(category)category.value='all';if(sort)sort.value='featured';filterAndSort(group);toast('Filters reset ho gaye.');
      });
      filterAndSort(group);
    }
  }
  function setSaved(id) {
    const p=shared.products.get(id); if(!p)return;
    const index=shared.saved.findIndex(x=>x.id===id);
    if(index>=0){shared.saved.splice(index,1);toast('Saved list se remove ho gaya.');}
    else{shared.saved.push({id:p.id,name:p.name,image:p.image,price:p.price||0,desc:p.desc});toast('Style save ho gaya ♡');}
    safeSet(SAVED_KEY,shared.saved);updateCounts();syncSavedButtons();renderSavedGrid();
  }
  function syncSavedButtons(){
    shared.saved=safeGet(SAVED_KEY,[]);
    $$('[data-site-save]').forEach(b=>{const on=shared.saved.some(p=>p.id===b.dataset.siteSave);b.textContent=on?'♥ Saved':'♡ Save';b.setAttribute('aria-pressed',String(on));});
    if(shared.current){const b=$('#detailSave');if(b){const on=shared.saved.some(p=>p.id===shared.current.id);b.textContent=on?'♥ Saved':'♡ Save style';}}
  }
  function addBag(id){
    const p=shared.products.get(id);if(!p)return;
    shared.bag=safeGet(BAG_KEY,[]);const found=shared.bag.find(x=>x.id===id);
    if(found)found.qty=(found.qty||1)+1;else shared.bag.push({id:p.id,name:p.name,image:p.image,price:p.price||0,desc:p.desc,qty:1});
    safeSet(BAG_KEY,shared.bag);updateCounts();renderBag();toast('Demo bag mein add ho gaya.');
  }
  function openOverlay(id){const el=$(id.startsWith('#')?id:'#'+id);if(!el)return;el.classList.add('open');document.body.style.overflow='hidden';}
  function closeOverlay(id){const el=$(id.startsWith('#')?id:'#'+id);if(!el)return;el.classList.remove('open');if(!$('.overlay.open')&&!$('.age-overlay.open'))document.body.style.overflow='';}
  function showDetails(id){const p=shared.products.get(id);if(!p)return;shared.current=p;
    const title=$('#detailTitle'),image=$('#detailImage'),desc=$('#detailDesc'),price=$('#detailPrice');
    if(title)title.textContent=p.name;if(image){image.src=p.image;image.alt=p.name;image.onerror=()=>{image.onerror=null;image.src=A('library-ivory-blush.webp');};}
    if(desc)desc.textContent=p.desc||'Visual reference only. Supplier details verify karna.';
    if(price)price.textContent=`${p.price>0?'Illustrative sample price: '+money(p.price):'No price shown'} · Live stock/offer confirm nahi hai.`;
    const add=$('#detailAdd'),save=$('#detailSave');if(add)add.onclick=()=>addBag(p.id);if(save)save.onclick=()=>setSaved(p.id);syncSavedButtons();openOverlay('detailOverlay');
  }
  function renderSavedGrid(){const grid=$('#savedGrid'),empty=$('#savedEmpty');if(!grid)return;const picks=shared.saved.map(x=>shared.products.get(x.id)||x);grid.innerHTML=picks.length?picks.map(p=>renderCard(p,innerwear.some(x=>x.id===p.id)?'innerwear':'wellness')).join(''):'';if(empty)empty.classList.toggle('hidden',picks.length>0);grid.classList.toggle('hidden',picks.length===0);}
  function openSaved(){shared.saved=safeGet(SAVED_KEY,[]);renderSavedGrid();openOverlay('savedOverlay');}
  function renderBag(){const box=$('#bagItems'),empty=$('#bagEmpty'),totalWrap=$('#bagTotalWrap'),total=$('#bagTotal');if(!box)return;shared.bag=safeGet(BAG_KEY,[]);box.innerHTML=shared.bag.map((p,i)=>`<div class="bag-row"><img src="${esc(p.image||A('library-ivory-blush.webp'))}" alt="" onerror="this.onerror=null;this.src='${A('library-ivory-blush.webp')}'"><div><h3>${esc(p.name)}</h3><div class="micro">${money(p.price)} · demo item</div><div class="qty"><button type="button" data-qty="-1" data-bag-id="${esc(p.id)}" aria-label="Reduce quantity">−</button><span>${Number(p.qty)||1}</span><button type="button" data-qty="1" data-bag-id="${esc(p.id)}" aria-label="Increase quantity">+</button></div></div><button class="remove" type="button" data-bag-remove="${esc(p.id)}">Remove</button></div>`).join('');if(empty)empty.classList.toggle('hidden',shared.bag.length>0);if(totalWrap)totalWrap.classList.toggle('hidden',shared.bag.length===0);const amount=shared.bag.reduce((n,p)=>n+(Number(p.price)||0)*(Number(p.qty)||1),0);if(total)total.textContent=money(amount);updateCounts();}
  function openBag(){renderBag();openOverlay('bagOverlay');}
  function renderCompare(){const a=$('#compareA')?.value,b=$('#compareB')?.value,out=$('#compareResult');if(!out)return;if(!a||!b){out.classList.remove('hidden');out.textContent='Dono references choose karo. Same item ko do baar select nahi karna.';return;}if(a===b){out.classList.remove('hidden');out.textContent='Comparison ke liye do alag references choose karo.';return;}const p=[shared.products.get(a),shared.products.get(b)].filter(Boolean);out.classList.remove('hidden');out.innerHTML=`<div class="compare-results">${p.map(x=>`<article><img src="${esc(x.image)}" alt="${esc(x.name)}"><h4>${esc(x.name)}</h4><p>Category: ${esc(x.category||'reference')}<br>Sample value: ${x.price?money(x.price):'Price to verify'}<br>${esc(x.desc)}</p></article>`).join('')}</div>`;}
  function populateCompareOptions(){const a=$('#compareA'),b=$('#compareB');if(!a&&!b)return;const prevA=a?.value,prevB=b?.value;const opts=wellness.map(p=>`<option value="${esc(p.id)}">${esc(p.name)}</option>`).join('');for(const sel of [a,b])if(sel){sel.innerHTML='<option value="">Choose one</option>'+opts;if(sel===a&&prevA)sel.value=prevA;if(sel===b&&prevB)sel.value=prevB;}}
  function initWellnessGate(){const gate=$('#ageOverlay');if(!gate)return;let accepted=false;try{accepted=sessionStorage.getItem('blackedWellnessV6Age')==='yes';}catch{}if(accepted){gate.classList.remove('open');}else{gate.classList.add('open');document.body.style.overflow='hidden';}$('#confirmAge')?.addEventListener('click',()=>{try{sessionStorage.setItem('blackedWellnessV6Age','yes');}catch{}gate.classList.remove('open');document.body.style.overflow='';toast('Welcome. Supplier claims phir bhi verify karna.');});$('#declineAge')?.addEventListener('click',()=>{window.location.href='storefront.html';});}
  function initFitStudio(){
    const photo=$('#fitPhoto'),garment=$('#fitGarment');
    $('#fitPhotoUpload')?.addEventListener('change',e=>{const file=e.target.files?.[0];if(!file)return;if(!file.type.startsWith('image/')){toast('Image file choose karo.');return;}if(shared.fitObjectUrl)URL.revokeObjectURL(shared.fitObjectUrl);shared.fitObjectUrl=URL.createObjectURL(file);if(photo){photo.src=shared.fitObjectUrl;photo.onerror=null;}});
    const styles={black:A('fit-set-black.webp'),ivory:A('fit-set-ivory.webp'),scarlet:A('fit-set-burgundy.webp'),bow:A('fit-set-ivory.webp')};
    function apply(){if(!garment)return;const scale=Number($('#fitScale')?.value||36),x=Number($('#fitX')?.value||31),y=Number($('#fitY')?.value||28),opacity=Number($('#fitOpacity')?.value||90);garment.style.width=scale+'%';garment.style.left=x+'%';garment.style.top=y+'%';garment.style.opacity=(opacity/100).toString();}
    $('#fitStyle')?.addEventListener('change',e=>{if(garment)garment.src=styles[e.target.value]||styles.black;});['#fitScale','#fitX','#fitY','#fitOpacity'].forEach(s=>$(s)?.addEventListener('input',apply));apply();
    $('#saveFitNotes')?.addEventListener('click',()=>{const ok=safeSet(PHOTO_KEY,{notes:$('#fitNotes')?.value||''});const status=$('#fitNotesStatus');if(status)status.textContent=ok?'Notes is device ke local storage mein save ho gayi.':'Notes save nahi ho paayi.';});
    $('#clearFitNotes')?.addEventListener('click',()=>{if($('#fitNotes'))$('#fitNotes').value='';try{localStorage.removeItem(PHOTO_KEY);}catch{}if($('#fitNotesStatus'))$('#fitNotesStatus').textContent='Notes clear kar di gayi.';});
    const savedNotes=safeGet(PHOTO_KEY,{});if($('#fitNotes')&&savedNotes.notes)$('#fitNotes').value=savedNotes.notes;
    $('#resetFit')?.addEventListener('click',()=>{if($('#fitPhotoUpload'))$('#fitPhotoUpload').value='';if(shared.fitObjectUrl)URL.revokeObjectURL(shared.fitObjectUrl);shared.fitObjectUrl=null;if(photo)photo.src=A('sanskari-hero.webp');if($('#fitScale'))$('#fitScale').value=36;if($('#fitX'))$('#fitX').value=31;if($('#fitY'))$('#fitY').value=28;if($('#fitOpacity'))$('#fitOpacity').value=90;apply();toast('Preview reset ho gaya.');});
    let spinIndex=0;const spinImg=$('#spinImage'),spinRange=$('#spinRange'),label=$('#spinLabel'),thumbs=$('#spinThumbs');
    const drawSpin=(idx)=>{spinIndex=(idx+spinFrames.length)%spinFrames.length;if(spinImg){spinImg.src=spinFrames[spinIndex].img;spinImg.alt=`Concept frame ${spinIndex+1}: ${spinFrames[spinIndex].label}`;}if(spinRange)spinRange.value=String(spinIndex);if(label)label.textContent=`${String(spinIndex+1).padStart(2,'0')} / ${spinFrames.length} · ${spinFrames[spinIndex].label}`;if(thumbs){$$('button',thumbs).forEach((b,i)=>b.classList.toggle('active',i===spinIndex));}};
    if(thumbs)thumbs.innerHTML=spinFrames.map((f,i)=>`<button type="button" data-spin="${i}" aria-label="Show angle ${i+1}"><img src="${esc(f.img)}" alt=""></button>`).join('');
    $('#spinPrev')?.addEventListener('click',()=>drawSpin(spinIndex-1));$('#spinNext')?.addEventListener('click',()=>drawSpin(spinIndex+1));spinRange?.addEventListener('input',()=>drawSpin(Number(spinRange.value)));thumbs?.addEventListener('click',e=>{const b=e.target.closest('[data-spin]');if(b)drawSpin(Number(b.dataset.spin));});drawSpin(0);
  }
  function initBoyfriend(){
    const dates={
      cozy:{low:'Ghar par chai/coffee, favourite snacks aur 20-minute phone-free catch-up. Dono apni pasand ki playlist choose karo.',medium:'Quiet café mein coffee ke baad short walk. Pehle timing aur travel dono ke comfort ke hisaab se set kar lo.',special:'Dinner reservation shortlist karo, lekin booking se pehle timing, budget aur food preferences discuss karo.'},
      playful:{low:'Board game ya quiz night: har person 5 fun questions choose kare.',medium:'Bowling, arcade ya mini-golf; activity choose karte waqt dono ki interest check karo.',special:'Activity + dessert plan banao, with a flexible backup if venue busy ho.'},
      creative:{low:'Ek saath simple recipe banao ya sketch challenge karo.',medium:'Pottery/painting workshop ya bookstore browse + coffee.',special:'Workshop tickets and dinner plan research karo; availability separately confirm karni hogi.'},
      outdoors:{low:'Nearby park mein sunset walk, paani aur light snacks ke saath.',medium:'Botanical garden ya heritage walk; weather aur travel time check karo.',special:'Day-trip shortlist banao, then transport, timings and cost together confirm karo.'}
    };
    $('#makeDate')?.addEventListener('click',()=>{const mood=$('#dateMood')?.value||'cozy',budget=$('#dateBudget')?.value||'low';const out=$('#dateResult');if(out){out.textContent=dates[mood]?.[budget]||dates.cozy.low;out.classList.remove('hidden');}});
    const messages={
      sweet:{thinking:'Aaj tum yaad aaye, socha bas message kar doon. Hope tumhara din achha ja raha hai ❤️',date:'Is week saath thoda time nikaalein? Tum jo comfortable feel karo, waise plan banate hain.',thanks:'Mere saath time spend karne aur mujhe samajhne ke liye thank you. I really appreciate it.',talk:'Aaj thoda baat karne ka mann hai. Jab tum free aur comfortable ho, bata dena.'},
      playful:{thinking:'Guess who randomly tumhare baare mein soch raha tha? 😄 Hope day smooth ja raha hai.',date:'Mini date plan karein? Snacks, walk ya tumhari favourite activity — choice tumhari.',thanks:'Thanks for being you. Ab treat ka chance meri taraf se? 😄',talk:'Ek random question: perfect chill evening tumhare liye kaisi hoti hai?'},
      honest:{thinking:'Aaj tumhari yaad aayi, aur main honestly batana chahta tha. Hope you are doing okay.',date:'Main tumhare saath quality time spend karna chahta/chahti hoon. Tumhare schedule aur comfort ke hisaab se plan karein?',thanks:'Jo support tumne diya, uski value karta/karti hoon. Thank you for listening.',talk:'Kuch baat share karni hai. Tum kab calmly baat karne ke liye free hoge/hogi?'},
      apology:{thinking:'Agar meri kisi baat se bura laga ho, I am sorry. Main samajhna chahta/chahti hoon, jab tum ready ho.',date:'Main things ko better karna chahta/chahti hoon. Kya hum dono ke liye comfortable time par calmly baat kar sakte hain?',thanks:'Mujhe realize hua ki mujhe aur dhyaan se sunna chahiye tha. I am sorry, aur main improve karna chahta/chahti hoon.',talk:'Main apni baat explain karne se pehle tumhari baat sunna chahta/chahti hoon. Jab ready ho, baat karte hain.'}
    };
    $('#makeMessage')?.addEventListener('click',()=>{const tone=$('#messageTone')?.value||'sweet',moment=$('#messageMoment')?.value||'thinking',out=$('#messageResult');if(out){out.textContent=messages[tone][moment];out.classList.remove('hidden');}});
    $('#copyMessage')?.addEventListener('click',async()=>{const text=$('#messageResult')?.textContent||'';if(!text||$('#messageResult')?.classList.contains('hidden')){toast('Pehle message create karo.');return;}try{await navigator.clipboard.writeText(text);toast('Message copy ho gaya.');}catch{const ta=document.createElement('textarea');ta.value=text;document.body.append(ta);ta.select();let ok=false;try{ok=document.execCommand('copy')}catch{}ta.remove();toast(ok?'Message copy ho gaya.':'Message ko manually select karke copy karo.');}});
    const prompts=['What helps you feel appreciated and understood?','Aaj kal tum kis cheez ko lekar excited ho?','Hum dono ki favourite simple memory kaunsi hai?','When you need space, what is the best way to communicate that?','Ek chhoti si cheez kya hai jo tumhare din ko better bana deti hai?','Is month koi new activity try karna chahoge/chahogi?'];let idx=0;$('#nextPrompt')?.addEventListener('click',()=>{idx=(idx+1)%prompts.length;if($('#promptResult'))$('#promptResult').textContent=prompts[idx];});
  }
  function initWellnessTools(){
    $('#runCompare')?.addEventListener('click',renderCompare);
    $('#runWellFinder')?.addEventListener('click',()=>{const who=$('#finderWho')?.value||'self',priority=$('#finderPriority')?.value||'comfort',out=$('#finderResult');if(!out)return;let msg='Start with readable manufacturer instructions, verified materials and a clear cleaning guide.';if(who==='couple')msg='Pehle preferences aur boundaries par relaxed conversation karo. Choose a product only after both feel comfortable.';if(who==='learning')msg='General care information se start karo. Medical concern ho toh qualified healthcare professional se advice lo.';if(priority==='privacy')msg+=' Packaging and privacy policies ko seller se confirm karo; images alone se confidentiality guarantee nahi hoti.';if(priority==='care')msg+=' Ingredient/material lists, cleaning instructions, warranty and product identity ko original seller se verify karo.';out.textContent=msg;out.classList.remove('hidden');});
  }
  function initOverlays(){
    $$('[data-open-bag]').forEach(b=>b.addEventListener('click',openBag));$$('[data-open-saved]').forEach(b=>b.addEventListener('click',openSaved));
    $$('[data-close]').forEach(b=>b.addEventListener('click',()=>closeOverlay(b.dataset.close)));
    $$('.overlay').forEach(o=>o.addEventListener('click',e=>{if(e.target===o)closeOverlay(o.id)}));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'){const o=$('.overlay.open');if(o)closeOverlay(o.id);}});
    $('#clearBag')?.addEventListener('click',()=>{shared.bag=[];safeSet(BAG_KEY,shared.bag);renderBag();toast('Demo bag clear ho gaya.');});
    $('#bagItems')?.addEventListener('click',e=>{const rm=e.target.closest('[data-bag-remove]'),qty=e.target.closest('[data-qty]');if(rm){shared.bag=shared.bag.filter(x=>x.id!==rm.dataset.bagRemove);safeSet(BAG_KEY,shared.bag);renderBag();return;}if(qty){const item=shared.bag.find(x=>x.id===qty.dataset.bagId);if(!item)return;item.qty=Math.max(1,(item.qty||1)+Number(qty.dataset.qty));safeSet(BAG_KEY,shared.bag);renderBag();}});
    document.addEventListener('click',e=>{
      const detail=e.target.closest('[data-site-details]');if(detail){showDetails(detail.dataset.siteDetails);return;}
      const add=e.target.closest('[data-site-add]');if(add){addBag(add.dataset.siteAdd);return;}
      const save=e.target.closest('[data-site-save]');if(save){setSaved(save.dataset.siteSave);return;}
      const board=e.target.closest('[data-board]');if(board){const item=boards[Number(board.dataset.board)];if(item){$('#boardTitle').textContent=item.name;$('#boardImage').src=item.image;$('#boardImage').alt=item.name;openOverlay('boardOverlay');}}
    });
  }
  function imageFallbacks(){
    $$('img[data-fallback]').forEach(img=>{img.addEventListener('error',()=>{const f=img.dataset.fallback;if(f&&img.src!==new URL(f,location.href).href){img.src=f;img.removeAttribute('data-fallback');}else{img.style.visibility='hidden';}}, {once:true});});
  }
  renderHome();initFilters();initWellnessGate();initFitStudio();initBoyfriend();initWellnessTools();initOverlays();updateCounts();syncSavedButtons();imageFallbacks();renderBag();
})();
