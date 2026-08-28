# 🔤 Qetsiyah Eco Park - Typography & Font Guide

This document provides a comprehensive guide to all typography, font families, weights, and styling rules used across the **Qetsiyah Eco Park** web application.

---

## 🌟 Primary Font Pairing (Current Active System)

The design follows a clean **two-font system** balancing high-contrast elegance with modern readability:

| Role | Font Family | Category | Weights Used | Primary Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Display Heading** | **[Playfair Display](https://fonts.google.com/specimen/Playfair+Display)** | Serif | `600`, `700`, `800` | Main Hero Headline (`QETSIYAH ECO PARK`), Brand Logo Wordmark (`QETSIYAH`), Section Titles |
| **UI, Body & Navigation** | **[Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)** | Sans-Serif | `400`, `500`, `600`, `700`, `800` | Navigation Menu, Dropdown Links, Taglines, Buttons, Badges, Footer Text, General Body Content |

---

## 🎨 Complete Font Directory & Specifications

### 1. Primary Display Serif: `Playfair Display`
* **Google Fonts Link**: [Playfair Display on Google Fonts](https://fonts.google.com/specimen/Playfair+Display)
* **CSS Variable**: `--font-serif-heading: 'Playfair Display', Georgia, serif;`
* **Characteristics**: Classic high-contrast transitional serif with sharp bracketed serifs and timeless editorial presence.
* **Key Use Cases**:
  - Hero Grand Title: `QETSIYAH ECO PARK` (`font-size: clamp(3.8rem, 8.5vw, 6.8rem)`, `font-weight: 700`, `letter-spacing: 0.03em`)
  - Typeset Logo Lettering: Initial `Q` (`font-size: 2.85rem`) and `ETSIYAH` (`font-size: 1.85rem`)

```css
/* Example CSS Rule */
.hero-serif-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}
```

---

### 2. Primary UI & Content Sans-Serif: `Plus Jakarta Sans`
* **Google Fonts Link**: [Plus Jakarta Sans on Google Fonts](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
* **CSS Variable**: `--font-sans-ui: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;`
* **Characteristics**: Modern geometric sans-serif engineered for ultra-high legibility on digital screens across all device resolutions.
* **Key Use Cases**:
  - Hero Tagline: *"A relaxing wide place that is perfect for all events and occasions"* (`font-weight: 500`, `font-size: 1.15rem`)
  - Navigation Links: `Home`, `About`, `Things To Do`, `Announcements`, `Contact`, `Must Visit` (`font-weight: 700`, `letter-spacing: 0.2em`)
  - Subtitle in Logo: `E C O - P A R K` (`font-weight: 800`, `letter-spacing: 0.38em`)
  - Call-to-Action Buttons: `BOOK YOUR EVENT`, `PLAN YOUR VISIT` (`font-weight: 800`, `letter-spacing: 0.18em`)

```css
/* Example CSS Rule */
.hero-clean-tagline {
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  font-weight: 500;
  letter-spacing: 0.02em;
}
```

---

### 3. Fallback Sans-Serif: `Inter`
* **Google Fonts Link**: [Inter on Google Fonts](https://fonts.google.com/specimen/Inter)
* **Role**: High-precision UI fallback font designed specifically for user interfaces.

---

### 4. Available Display & Editorial Accents (Embedded in Project)

The project also includes the following Google Fonts in [`index.html`](file:///c:/Users/Kayeen%20Campana/Qetsiyah/index.html) for specialized editorial layouts or optional script accents:

| Font Family | Style | Google Fonts Specimen | Description |
| :--- | :--- | :--- | :--- |
| **Italiana** | Serif Display | [Italiana on Google Fonts](https://fonts.google.com/specimen/Italiana) | Tall, condensed, Italian fashion & luxury architecture serif. |
| **Bodoni Moda** | Serif Didone | [Bodoni Moda on Google Fonts](https://fonts.google.com/specimen/Bodoni+Moda) | Ultra high-contrast modern Didone typeface. |
| **Cormorant Garamond** | Classic Serif | [Cormorant Garamond on Google Fonts](https://fonts.google.com/specimen/Cormorant+Garamond) | Traditional Garamond-inspired display serif with delicate curves. |
| **Pinyon Script** | Romantic Script | [Pinyon Script on Google Fonts](https://fonts.google.com/specimen/Pinyon+Script) | Formal, slanted French-style cursive script with swashes. |
| **Caveat** | Hand-drawn Script | [Caveat on Google Fonts](https://fonts.google.com/specimen/Caveat) | Natural, playful, organic brush-pen cursive script. |
| **Great Vibes** | Elegant Calligraphy | [Great Vibes on Google Fonts](https://fonts.google.com/specimen/Great+Vibes) | Flowing, looping script calligraphy. |

---

## 📦 Google Fonts Embed Code (in `index.html`)

```html
<!-- Google Fonts Embed in index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..600&family=Caveat:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400..700;1,400..600&family=Great+Vibes&family=Italiana&family=Pinyon+Script&family=Playfair+Display:ital,wght@0,400..900;1,400..700&family=Plus+Jakarta+Sans:wght@400..800&family=Inter:wght@400..700&display=swap"
  rel="stylesheet"
/>
```

---

## 🎨 Global CSS Variables (in `src/index.css`)

```css
:root {
  /* Active Font Variables */
  --font-serif-heading: 'Playfair Display', Georgia, serif;
  --font-sans-ui: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;

  /* Optional Accent Variables */
  --font-serif-display: 'Italiana', 'Bodoni Moda', 'Cormorant Garamond', Georgia, serif;
  --font-script-the: 'Pinyon Script', 'Caveat', cursive;
  --font-script-sub: 'Caveat', 'Great Vibes', cursive;
}
```

