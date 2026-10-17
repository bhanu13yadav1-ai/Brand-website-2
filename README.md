# BLACKED INNERWEAR — Fit Studio v0.8.0

**Build:** static HTML + CSS + JavaScript  
**Budget:** designed for ₹0; no AI API, no paid API, no npm install or build tool  
**Target:** Android/mobile-first; GitHub repository friendly

## What is included

- All existing v0.6 files and features are retained; this release is additive. The original ten uploaded reference files remain unchanged.
- Existing 37 catalog references/concepts remain selectable; six additional user-supplied SYRN-branded references are included separately for inspiration, bringing the selection list to 43 entries. This mixed catalogue is not 43 verified products for sale. This is a mixed catalog of BLACKED campaign visuals, owner-supplied concepts, and clearly labelled external-brand references; it is not 37 verified products for sale.
- The latest owner-supplied concept art in the recent uploads is already represented by its matching local reference assets. Duplicate visual variants are not artificially counted as separate physical products.
- External model/product images were cropped from screenshots supplied by the owner to remove the mobile browser and store navigation. They remain external-brand inspiration only and are not BLACKED inventory, official collaboration, or direct product feeds. No external brand website is scraped, embedded, or linked.
- P0 selected-image behavior: the Try-On canvas defaults to the exact selected item's `previewImage` when supplied, otherwise its own `image`. It does not fall back to a generic demo mannequin. The product summary retains the selected reference and shows a separate garment-detail view when available.
- Manual photo mode is optional and browser-local. A generic illustration appears only after a personal photo is selected and the user explicitly chooses “My photo + guide”. It does not cut out the selected garment, detect body shape, simulate cloth, or predict actual fit.
- Product-detail dialog supports all known local gallery images for a product; product-specific garment-detail concept views are used where supplied.
- P1 gallery, category filters and image thumbnails are retained.
- P2 Fit Detective educational checks and Fit Passport with opt-in local saving and clear controls are retained. Size recommendations remain disabled until genuine BLACKED product-specific size charts are supplied.
- P3 Style Finder quiz, comparison up to three references, device-local wishlist and downloadable style moodboard remain available.
- P4 privacy/reset affordances, accessibility details, mobile layout, honest fit-review/policy placeholders and manual testing notes remain available.
- New After Dark / Playful Nights Edit: a curated, women-focused, pin-up-inspired aesthetic section using existing BLACKED concept assets (bows, black lace, satin, berry colours and garter-inspired styling). This is an independent BLACKED concept—not official Playboy merchandise, not an affiliation or endorsement. No official Playboy logo, rabbit-head mark, or official Playboy artwork is included.
- No confirmed BLACKED prices, sizes, stock counts, customer ratings, fabric composition, shipping promises or policies are invented. Review/policy areas remain explicitly unconfigured until owner facts are provided.

## Important commercial-use notes

1. The user-uploaded references include campaign artwork, design concepts and screenshots of an external brand. Do not present references as verified sellable BLACKED stock until the product, construction, sizes, inventory, image rights and brand usage are confirmed.
2. Public commercial reuse of external-brand model/product photography may require permission. The cropped assets only originate from screenshots the owner supplied; no direct external store is used. For a production launch, replace references with BLACKED-owned photography or properly licensed imagery.
3. The After Dark concept is deliberately independent. Playboy's official SEC filing describes licensing of the Playboy name and rabbit-head design to partners. Do not add official Playboy logos, name-as-product branding, imagery or claim an affiliation unless an appropriate licence/authorization has been obtained. Licensing contact appears on the Playboy, Inc. investor site.
4. To offer meaningful manual try-on on a customer photo without AI, each product needs a clean transparent garment PNG and manual placement presets. The current generic manual illustration is only a positioning guide, not an actual fitting simulation.
5. Provide verified bra/cup/band, brief and bodysuit measurement charts before enabling actual size recommendations.
6. Provide actual product prices, colour variants, sizes, stock, shipping, cancellation, hygiene returns/exchange and support details before checkout goes live. This remains a static frontend prototype with no real cart/order/payment backend, account system, review database or stock sync.
7. Fit Passport and wishlist store only on the current device/browser; they do not sync across devices. Clearing browser storage may erase them.

## v0.8.0 additions — Plus-One Club (prototype only)

- Added six images from the owner's latest uploads to the external-brand reference-only group: `external-ref-syrn-skirting-garter-editorial.png`, `external-ref-syrn-own-the-night.png`, `external-ref-syrn-curves-confidence.png`, `external-ref-syrn-signature-lace.png`, `external-ref-syrn-midnight-allure.png`, and `external-ref-syrn-garter-back-full.png`.
- These images are selectable as reference assets and appear in the local catalogue/try-on reference selector. They are not represented as BLACKED stock, there is no SYRN website link/embed, and rights for public commercial use must be confirmed.
- Added a separate **Plus-One Club (18+)** concept for platonic, non-sexual public outings (coffee/conversation, event plus-one, museum/daytime city outing and public-venue dinner). It has no real provider profiles or profile photos.
- The planner is deliberately a local UI demo. It collects no name, phone, ID, payment or exact address, sends no requests, stores no booking data, shows no price/availability, and does not claim that companions are verified or bookable. The submit button produces a text-only local preview.
- Before any live service, implement real adult age/identity verification, provider vetting, safeguarding/moderation and block/report operations, communication and payment controls, cancellation/refund rules, privacy notices, and legal review. The prototype's checkbox is not age verification. Public meetups only are specified for the concept; no sexual services are offered.
- Safety design was informed by current public guidance from Bumble on photo/ID verification, block/report, and meeting in a public place / sharing plans, and by MeitY's published DPDP Rules 2025. This prototype does not claim legal compliance. The National Cyber Crime Reporting Portal and India emergency/help numbers are listed for safety guidance only.

## v0.8.0 static test notes

- `node --check app.js`: passed.
- HTML parsed; no duplicate IDs.
- All static HTML image/script/CSS references and all JavaScript product `image`, `previewImage`, and `gallery` asset paths resolve in the package.
- New companion form requires self-attestation of 18+, confirmation of non-sexual/public-meetup boundaries, and acknowledgement that the demo does not book or send a request. This is only a UX guardrail, not verified age control.
- No actual booking API, payment, companion records, user account, external AI service or analytics was added.
- Browser click-through testing is still needed on an actual phone/hosted preview before calling this production-ready.

## Safety and research references for Plus-One Club

- Bumble Support, “Our safety features” (updated March 3, 2026): https://support.bumble.com/hc/articles/28537051467293-Our-safety-features
- Bumble Support, “Meeting a match in person” (updated September 18, 2025): https://support.bumble.com/hc/articles/28523315919005-Meeting-a-match-in-person
- MeitY, Digital Personal Data Protection Rules 2025 (published November 14, 2025): https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa
- National Cyber Crime Reporting Portal: https://www.cybercrime.gov.in/

## Run locally / publish to GitHub

Extract this ZIP and open `index.html` in a modern browser. Keep every file from the ZIP in the same folder. No installation is required. For GitHub, upload all extracted files (not only the ZIP) to the repository root and replace older same-named files. A private repository does not automatically make a hosted website private; configure access restrictions separately if required.

## Research sources referenced for this update

- Baymard Institute, Apparel & Accessories Quantitative UX Insights (12 June 2026): https://baymard.com/research-articles/apparel-and-accessories-quantitative-ux-insights-2026
- Baymard Institute, Apparel UX research: https://baymard.com/industries/apparel-ux
- Baymard Institute, Product Page UX Best Practices 2026 (updated 18 March 2026): https://baymard.com/research-articles/current-state-ecommerce-product-page-ux
- Playboy, Inc., 2025 Form 10-K / business and trademark licensing disclosures: https://www.sec.gov/Archives/edgar/data/1803914/000162828026018238/ply-20251231.htm
- Playboy, Inc., investor / business and licensing contact: https://plbygroup.gcs-web.com/investors/

See `RESEARCH-ROADMAP-P0-P4.md` for the priority breakdown and implementation rationale; see `ASSET-MANIFEST.md` for how the image assets are categorized. The latest local build is v0.7.0; no upload/deployment was made to the user’s GitHub repository.
