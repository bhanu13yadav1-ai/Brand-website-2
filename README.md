# BLACKED — Intimates + After Dark Wellness (Big Update V1.6)

V1.6 builds on the existing V1.5 project and preserves the separate Intimates, After Dark 18+, and Women's Wellness experiences.

## New in V1.6
- Added a mobile-first interactive 9-frame angle viewer inside After Dark. Use the slider, left/right controls, keyboard arrows, or drag horizontally to switch frames.
- Added a generated black wand-massager product concept portrait and nine optimized WebP angle-study frames.
- Added a direct “View 360° angle demo” shortcut to the massager card.
- Clear disclosure that this is an illustrative angle study—not a true manufacturer-supplied 360° spin and not proof of a real stocked product.
- Preserved the branded homepage campaign, independent After Dark 18+ tab, existing intimatewear, Wellness Studio, local wishlist, compare, demo bag, style finder and manual garment-cutout Fit Studio.

## Product truth and limitations
The massager portrait and 9 angle frames are generated concept visuals. They are not photographs of a confirmed supplier SKU; angles are not guaranteed to be geometrically exact. Actual pricing, inventory, material, measurements, supplier, charging, water resistance, legal labelling and product rights need verification before commercial listing.

The cart remains a demo. There is no live inventory, checkout/payment integration, account backend, or AI virtual try-on provider. The Fit Studio requires a user photo plus a separately supplied transparent garment PNG; it is manual placement only, not automatic fitting. Wellness-questionnaire answers remain in page memory only (not saved or sent). The 18+ gate is only a front-end confirmation, not formal age verification.

## Deploy from Android / GitHub Pages
1. Download and extract the ZIP.
2. In the existing repo, replace `index.html`, `styles.css`, `app.js`, `VERSION.txt`, `README.md`, `RESEARCH-AND-UPGRADE-PLAN.md`, and `TEST-NOTES.md`.
3. Upload the entire `assets/` folder, including the new `wand-massager-studio.webp` and all `wand-360-frame-*.webp` files, plus the existing concept/crop assets.
4. Preserve the existing repository's legacy `ref-*`, `design-*`, and `syrn-*.svg` images because the Intimates and Fit Studio features still reference them.
5. Commit and wait for GitHub Pages to publish. On Android, hard-refresh/reopen the page if the old cached version remains.
6. Test age gate; nav; Intimates filters; After Dark search/filters/sort; 360 slider/arrows/drag/keyboard controls; product detail; wishlist; compare; demo bag; Wellness questions and reset; photo plus transparent PNG upload; overlay size/position/rotate; and PNG export.

## Research starting points
- Baymard Institute, Product List UX: https://baymard.com/research-articles/current-state-product-list-and-filtering
- Baymard Institute, Mobile E-Commerce Usability: https://baymard.com/research/mcommerce-usability
- Google web.dev, Core Web Vitals: https://web.dev/articles/vitals
- ASCI Code for Self-Regulation in Advertising: https://www.ascionline.in/the-asci-code/
- Planned Parenthood, Sex Toys and Safety: https://www.plannedparenthood.org/learn/sex-pleasure-and-sexual-dysfunction/sex-and-pleasure/sex-toys
- FASHN, Virtual Try-On API docs: https://docs.fashn.ai/api-reference/tryon-v1-6
