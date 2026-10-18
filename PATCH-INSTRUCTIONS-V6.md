# BLACKED V6 — Safe additive install

## 1. Add the files
Upload the four new pages, `storefront.css`, `site-commerce.js` and `assets/new-gallery/` from the V6 package to the root of `Brand-website-full-finally-`.

**Do not replace `index.html`.** The original homepage and existing Innerwear/Try-On Studio features stay where they are.

## 2. Add navigation links
Open `index.html` in GitHub, find its existing main navigation, and insert the four anchor links from `INDEX-NAV-PATCH.html`. Keep its current nav items.

## 3. Optional homepage cards
To show new Sanskari/Wellness/Boyfriend cards on the existing homepage, copy the `<section id="blackedV6HomeAddon"> ... </section>` section from `INDEX-HOMEPAGE-ADDON.html` and add it before the closing `</main>` in the existing index. Add its accompanying `<style>` block as well.

## 4. Verify deployment
After commit, wait for Pages and open `/storefront.html`, `/sanskari-edit.html`, `/wellness.html`, and `/boyfriend.html`. Test mobile navigation, card search/filter, add-to-demo-bag, saved list, Wellness age gate, comparison, date planner and message maker.

## 5. What is not connected
This is a static front-end prototype. The bag is not a real cart; no payment, order, account, booking, live stock or supplier service is connected.
