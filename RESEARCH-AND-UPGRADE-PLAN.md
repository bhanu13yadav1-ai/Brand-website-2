# BLACKED Big Update V1.6 — Upgrade Plan

## Direction aligned to the requested brand
Keep BLACKED's current premium intimates look and branded violet/pink After Dark campaign. Keep adult products in their own 18+ destination rather than mixing them into lingerie. Make mobile product cards and category controls easier to use.

## Improvements in this build
1. **Interactive product angle viewer:** nine image frames, swipe/drag support, slider, previous/next buttons and arrow-key access.
2. **Realistic product reference asset:** separate product portrait for the massager concept; image file sizes optimized to WebP for mobile.
3. **Transparent limitations:** calls this an angle-study demo, not actual manufacturer 360 photography. Product attributes and stock are not invented.
4. **Cross-navigation:** direct link from the massager listing to the viewer.
5. **Existing feature preservation:** Intimates catalogue, After Dark search/filter/sort, Wishlist, Compare, demo bag, Women's Wellness questionnaire, Size Guide, and manual garment-cutout Fit Studio remain present.

## Recommended next major update after this one
- Replace concept images with supplier-approved product-only photos and actual 360-degree capture (24–36 consistent frames or a supplier 3D/GLB model).
- Add per-SKU dimensions, material declarations, charging/battery and water-resistance details only from supplier documentation.
- Add true product variants, actual price and stock API, shipping/tax rules, order system and a compliant payment provider before taking orders.
- If adding AI try-on, connect a compatible provider through a server-side endpoint, never put API secrets in browser JavaScript, obtain explicit consent and provide deletion/retention information.
- Run Android Chrome/iOS Safari real-device QA including keyboard and touch interactions, slow connections, image failures, and privacy behaviour.

## UX/research rationale
A dedicated interactive product view helps users inspect product shapes before choosing. A slider and previous/next buttons are included alongside drag so rotation is not dependent on one gesture. Product cards and the viewer remain mobile-first. Use image-only assets locally to reduce the risk of third-party screenshot banners/labels leaking into the catalogue.

## Current limitations
The nine frames are cropped from an AI-generated 3×3 angle study of a generic concept device, not sequential manufacturer photography of a real SKU. It demonstrates UI behaviour only. The product is a concept until actual supplier information and rights are confirmed. Full browser click-through QA has not been performed in this runtime.
