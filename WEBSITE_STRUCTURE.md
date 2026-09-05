# Qetsiyah Eco Park - Website Structure and Design Guide

A comprehensive reference for every page, component, design decision, and the reasoning behind this website.

---

## Table of Contents

1. Why This Website Exists
2. Tech Stack Overview
3. Design Palette
4. Typography System
5. Navigation Architecture
6. Page-by-Page Breakdown
   - Landing Page (Home)
   - About Page
   - Activities and Rides
   - Food Offers and Menu
   - Stays and Venues (Verde Villa)
   - Services (Event Hall)
   - Gallery
   - Announcements
   - Must Visit (Wyattel Hotel)
7. Shared Components
8. Animation and Motion Design
9. Mobile Experience
10. File and Folder Structure

---

## 1. Why This Website Exists

Qetsiyah Eco Park is a nature-based recreational and event venue in Barangay Calean, Tacurong City, Sultan Kudarat, established on October 20, 2023. Before this website, potential visitors had no reliable digital place to discover the park, browse its activities, understand its food offerings, or make a booking.

The website solves four core problems:

| Problem | How the Website Solves It |
| :--- | :--- |
| People do not know the park exists | Cinematic hero and strong branding make a powerful first impression |
| Visitors cannot easily plan what to do | Dedicated pages for Activities, Food, and Stays help visitors plan |
| No easy way to inquire or book an event | Integrated booking/contact form collects all info management needs |
| No single source of truth for park info | One polished website covers location, hours, contact, and gallery |

The website is designed to feel premium and welcoming, reflecting the park identity as a wide, relaxing space where all are welcome, whether for a solo visit, a birthday, a wedding, or a company outing.

---

## 2. Tech Stack Overview

| Layer | Technology | Why |
| :--- | :--- | :--- |
| UI Framework | React 18 | Component-based, fast, maintainable |
| Build Tool | Vite 6 | Instant dev server, fast production builds |
| Styling | Plain CSS (index.css) with CSS Variables | Full design control, no framework lock-in |
| Icons | Lucide React | Consistent, lightweight SVG icon set |
| Routing | Hash-based (#page) via App.jsx state | No server required, instant transitions |
| Animations | CSS keyframes + JS requestAnimationFrame | Buttery 60fps, no library overhead |

The project is a Single Page Application (SPA). There is no page reload when navigating. Every frame swap is driven by activeFrame state in App.jsx.

---

## 3. Design Palette

The entire website is built around a warm organic nature palette: earthy, calm, and inviting. Every color was chosen to evoke a sense of open land, tropical warmth, and genuine hospitality.

### 3.1 Core Colors

| Token | Hex Value | Name | Used For |
| :--- | :--- | :--- | :--- |
| --accent-gold | #df9039 | Amber Gold | Primary CTA buttons, active nav links, highlights |
| --accent-gold-hover | #b45309 | Deep Amber | Hover state for gold elements |
| --welcome-bg | #383e24 | Olive Forest Dark | Welcome Section background |
| --about-canvas | #ede8df | Warm Parchment | About page, announcements, must-visit background |
| --frame-bg-light | #fcfaf7 | Off-White Cream | Gallery, food catalog background |
| --editorial-bg | #ffffff | White | Food menu catalog sheet |
| --lux-paper | #f7f2e8 | Aged Paper | Luxury section backgrounds |
| --lux-linen | #eee4d3 | Warm Linen | Card backgrounds in showcase sections |
| --lux-copper | #b9784d | Warm Copper | Accent borders and decorative dividers |
| --color-dark-bg | #090d0b | Near Black | Mega menu overlay background |

### 3.2 Color Philosophy

Warm side (golds, ambers, linens, parchments) is used for light backgrounds, hover states, and accent text. It feels welcoming, organic, and timeless.

Dark side (olive forest, near-black) is used for section backgrounds and navigation overlays. It feels grounded, professional, and nature-inspired.

White and cream are used for readable content areas like the food menu and gallery mosaic.

### 3.3 Gradient System

The website uses radial gradients to make backgrounds feel organic rather than flat.

About, Announcements, and Must Visit background:
  background-image: radial-gradient(ellipse at 50% 50%, #f3ede2 0%, #eae3d4 100%);

Hero expanded opening (dark cinematic):
  background: radial-gradient(circle at 90% 4%, rgba(222, 163, 96, 0.16), transparent 27%),
              linear-gradient(135deg, #112822 0%, #0d1d1b 100%);

---

## 4. Typography System

The entire website uses a two-font editorial system:

| Role | Font | Style | Usage |
| :--- | :--- | :--- | :--- |
| Display / Headings | Playfair Display | Serif, 700-800 | Hero title, About title, Section headers |
| UI / Navigation / Body | Plus Jakarta Sans | Sans-serif, 400-800 | Nav links, buttons, taglines, body text |

### 4.1 Why Playfair Display?

It carries the weight of a classic editorial magazine: timeless, elegant, and commanding. The QETSIYAH ECO PARK hero headline in Playfair reads like a brand, not just a name.

### 4.2 Why Plus Jakarta Sans?

It is a modern geometric sans-serif engineered for legibility on all screen sizes and pixel densities. At font-weight 800 and letter-spacing 0.2em, it renders navigation labels with crisp, confident precision.

### 4.3 Typographic Scale

All sizes use clamp() to scale smoothly between mobile and desktop without breakpoint jumps:

- Hero Grand Title: clamp(3.8rem, 8.5vw, 6.8rem)
- Section Headings: clamp(2.8rem, 6.8vw, 6.4rem)
- Navigation Labels: 0.76rem, letter-spacing: 0.18em
- Body / Descriptive Text: clamp(1rem, 1.2vw, 1.15rem)

### 4.4 Available Accent Fonts (Not Active by Default)

Loaded in index.html for future editorial use:
- Italiana: Tall condensed luxury serif
- Bodoni Moda: Ultra-high contrast Didone serif
- Cormorant Garamond: Delicate classical display serif
- Pinyon Script / Caveat / Great Vibes: Elegant script and handwriting styles

---

## 5. Navigation Architecture

### 5.1 Desktop Navbar (src/components/Navbar.jsx)

The navbar is a fixed top header with three behavioral states:

| State | Trigger | Appearance |
| :--- | :--- | :--- |
| Transparent | At the very top of the page | Invisible background, white text, no shadow |
| Solid Light | After scrolling down ~240px | Warm #eae3d4 parchment background, dark text |
| Mega Menu Open | Mouse hover on WHAT WE OFFER or MUST VISIT | Dark #151b18 full-width editorial overlay |

Smart hide/show: The navbar hides when scrolling down (to give content room to breathe) and reappears instantly when scrolling up.

Navigation order:
  HOME > ABOUT > WHAT WE OFFER (+) > ANNOUNCEMENTS > BOOKING > MUST VISIT (+)

The WHAT WE OFFER item triggers a full-frame editorial mega menu with sub-categories:
- Activities and Rides
- Cafe and Dining
- Verde Villa (Stays and Venues)
- Exclusive Event Hall (Services)
- Park Gallery

The MUST VISIT item links to the Wyattel Hotel Coming Soon page.

### 5.2 Mobile Bottom Navigation (src/components/MobileBottomNav.jsx)

On mobile devices, a bottom app bar appears with 5 quick shortcuts:
  Home | Explore | Dining | Gallery | Book

This follows the native mobile app pattern. Thumbs reach the bottom of the screen naturally.

### 5.3 Routing Logic (src/App.jsx)

The app uses hash-based SPA routing:

| Hash | Page |
| :--- | :--- |
| #home | Landing Page |
| #about | About |
| #activities | Activities and Rides |
| #food-offers | Food Offers and Menu |
| #stays-venues | Verde Villa / Stays |
| #services | Event Hall / Services |
| #gallery | Photo Gallery |
| #announcements | Announcements |
| #must-visit | Wyattel Hotel |

Special case - About to Home transition: When navigating from About back to Home, a 900ms cinematic exit animation plays before the Home page mounts. If a scroll target like #booking was requested, it scrolls there after the transition completes.

---

## 6. Page-by-Page Breakdown

### 6.1 Landing Page - Home

Route: #home

Assembled from four sequential sections:

SECTION 1: HERO (src/components/HeroSection.jsx)

Full-viewport (100vh) with a dramatic sunset photo of the park.

| Element | Detail |
| :--- | :--- |
| Background | /optimized/hero-park-1600.webp (responsive with srcSet at 720w and 1600w) |
| Overlay | Warm tropical-dusk gradient overlay for text legibility |
| Headline | QETSIYAH / ECO PARK in Playfair Display 700 |
| Tagline | A RELAXING WIDE PLACE. PERFECT FOR ALL EVENTS AND OCCASIONS. |
| CTA Button | BOOK YOUR EVENT which scrolls to the Contact/Booking section |

Why this matters: The first impression must communicate one thing clearly: this is a beautiful, welcoming destination. The cinematic hero photo and bold editorial typography do exactly that.

---

SECTION 2: WELCOME BANNER (src/components/WelcomeSection.jsx)

A bold dark-green panel (#383e24) that immediately states the park core promise.

| Element | Detail |
| :--- | :--- |
| Background | Deep olive forest green with organic SVG blob shapes |
| Eyebrow Tag | EVERY MOMENT MATTERS |
| Supporting Lines | PRIVATE EVENTS. / FAMILY GATHERINGS AND PARTIES. / MILESTONES, OR EVEN JUST FOR FUN. |
| Headline | ALL ARE WELCOME HERE. |

Why this matters: After the hero draws visitors in emotionally, this section converts that feeling into a clear value statement. The dark background provides visual rhythm and contrast.

---

SECTION 3: FOOD PREVIEW (src/components/FoodPreviewSection.jsx)

A teaser of the restaurant showing three featured menu categories.

| Element | Detail |
| :--- | :--- |
| Eyebrow | QETSIYAH CAFE AND DINING |
| Headline | WHERE EVERY BITE IS A DELIGHT |
| Photos | 3 equal tiles: Combo Meals, Soup Meals, Snacks Meals |
| CTA | EXPLORE FULL FOOD OFFERS AND MENU navigates to food-offers frame |

Why this matters: Food is one of the highest-interest parts of any eco park visit. Teasing it on the landing page drives deeper exploration.

---

SECTION 4: BOOKING / CONTACT FORM (src/components/ContactSection.jsx)

The booking inquiry form - the primary conversion goal of the entire website.

Fields:
- Full Name: Identifies the guest
- Mobile Number: Primary contact
- Email Address: Secondary contact, for confirmations
- Number of Guests: Helps management prepare capacity
- Visit Date: Allows schedule planning
- Service Type: Day Tour, Event Reservation, etc.
- Venue Type: None, Verde Villa, Event Hall
- Number of Units: For villa bookings
- Activities Checklist: Zip lining, sky biking, paddle boats, horse riding, playground, kiddy pool

Why this matters: Every page leads here. The form captures qualified intent. A visitor who fills this out is a serious prospect, and management gets everything they need in one submission.

---

### 6.2 About Page

Route: #about
Files: src/components/frames/AboutFrame.jsx assembles three sub-components.

SUB-SECTION 1: HERO (About variant)

Uses the same hero image and layout as Home but overlays ABOUT QETSIYAH with a cinematic drop animation.

Transition behavior:
- Coming from Home: The title drops in with a 1.2s delayed animation (cinematic).
- Coming from any other page: Drops in immediately (snappy, functional).

---

SUB-SECTION 2: STORY TELEPROMPTER (src/components/about/AboutStorySection.jsx)

A scroll-driven word-reveal effect that lights up one word at a time as the visitor scrolls down.

The sentence revealed:
  "Where families come together, celebrations feel special, adventures begin, and every moment is yours to enjoy."

The section is 600vh tall intentionally slow so the visitor reads at a comfortable, meditative pace. Words start dim (opacity: 0.22) and illuminate (opacity: 1.0) progressively.

Why this matters: It forces a moment of pause. Instead of skimming, the visitor reads and absorbs the park identity. This is deliberate editorial storytelling used by luxury hospitality and travel brands.

---

SUB-SECTION 3: ABOUT CHANGING SHOWCASE (src/components/about/AboutChangingShowcase.jsx)

A full-width infinite carousel with five themed chapters. Each chapter has multiple photos that rotate every 5 seconds.

| Chapter | Narrative |
| :--- | :--- |
| The Place | The origin story from bare land to the eco-park it is today |
| The Community | The owners, employees, and loyal visitors who built the park family culture |
| The Experiences | Professionalism of the chef, certified operators, and owner dedication |
| The Hospitality | The host-guest relationship: warmth, reception, entertainment, and goodwill |
| The Future | Continuous improvement, adapting to challenges, future milestones |

Navigation: Prev/Next arrow buttons and clickable dot indicators. The carousel wraps infinitely.

Why this matters: Photos rotate automatically so visitors who pause on a chapter see more of the story without clicking. Each chapter tells a different facet of Qetsiyah identity, moving beyond marketing copy into genuine storytelling.

---

### 6.3 Activities and Rides

Route: #activities
File: src/components/frames/ActivitiesFrame.jsx

| Element | Detail |
| :--- | :--- |
| Hero Video | /Video/Qetsiyah Activities Hero Section.mp4 |
| Fallback Image | /Background Pictures/Background Hero Section II.jpg |
| Headline | DISCOVER / ALL OUR ACTIVITIES |
| Flank Labels | ECO-PARK EXPERIENCES left and SULTAN KUDARAT right |

How the hero works: Starts collapsed (small thumbnail between the title words). On scroll or click, the video expands cinematically to full viewport. Audio unlocks on first user interaction.

Activities offered at the park:
- Zip Lining
- Sky Biking
- Paddle Boats
- Scenic Horse Riding
- Park Playground
- Kiddy Splash Pool

Why a video hero? Activities need to be felt, not just listed. A cinematic video of the real park in action communicates energy, beauty, and safety far better than text bullet points.

---

### 6.4 Food Offers and Menu

Route: #food-offers
File: src/components/frames/FoodOffersFrame.jsx

Hero:
- Video: /Video/Food Offer Hero Section Video.mp4
- Headline: DISCOVER / OUR FOOD OFFERS

Food Menu Catalog (below the hero):

| Category | Examples |
| :--- | :--- |
| Beef Meals | Various beef dishes |
| Chicken Meals | Grilled, fried, sauced chicken |
| Combo Meals | Mixed plate combinations |
| Pasta and Noodle Meals | Pasta varieties |
| Sizzling and Grill Meals | Hot plate specials |
| Soup Meals | Soups and broths |
| Snacks | Light bites and finger foods |
| Drinks | Beverages and refreshments |

Why this design? Food menus online are usually boring lists. The editorial print-inspired layout makes it feel premium, appropriate for a park that takes its dining seriously.

---

### 6.5 Stays and Venues (Verde Villa)

Route: #stays-venues
File: src/components/frames/StaysVenuesFrame.jsx

Currently shows the CategoryOpeningHero animation:
- Headline: DISCOVER / STAYS AND VENUES
- Flank Labels: VERDE VILLA AND HALLS / SULTAN KUDARAT

IN DEVELOPMENT: Verde Villa accommodation details and room listings are a planned addition.

---

### 6.6 Services (Exclusive Event Hall)

Route: #services
File: src/components/frames/ServicesFrame.jsx

Currently shows the CategoryOpeningHero animation:
- Headline: DISCOVER / ALL OUR SERVICES
- Flank Labels: CATERING AND CELEBRATIONS / SULTAN KUDARAT

IN DEVELOPMENT: Event Hall capacity, pricing, and booking guide are a planned addition.

---

### 6.7 Gallery

Route: #gallery
File: src/components/frames/GalleryFrame.jsx

Sub-component 1: Gallery Hero (src/components/ParkGalleryHero.jsx)
A full-width editorial opening banner inviting visitors to explore.

Sub-component 2: Gallery Mosaic (src/components/ParkGallerySection.jsx)
An editorially curated photo mosaic gallery organized into 6 categories sourced from the park Facebook photos:

| Category | Content |
| :--- | :--- |
| Scenery and Atmosphere | Landscape, sunset, and nature shots |
| Events | Special events, celebrations, gatherings |
| Attractions and Activities | Guests enjoying zip lining, rides, water activities |
| Amenities and Visitor Life | Rest areas, facilities, visitor daily life |
| Community | Owners, staff, regulars, and visitors |
| Culture and Events | Cultural shows, festivals, local celebrations |

Photos are stored as optimized .webp files in /public/gallery/facebook/<category>/ and loaded lazily with decoding=async for fast browsing. A lightbox allows full-screen viewing with left/right keyboard and button navigation.

Why 6 categories? Categorized browsing helps visitors find exactly what excites them. Families browse Events, adventurers browse Activities, event planners browse Amenities. It makes the gallery strategic, not just decorative.

---

### 6.8 Announcements

Route: #announcements
File: src/components/frames/AnnouncementsFrame.jsx

Displays a centered COMING SOON placeholder on a warm parchment background.

Why keep it visible if it is empty? Having the page in navigation establishes that Qetsiyah will communicate regularly with visitors: promotions, closures, events, and news. It signals a living, maintained presence.

---

### 6.9 Must Visit - Wyattel Hotel

Route: #must-visit
File: src/components/frames/MustVisitFrame.jsx

Displays:
- Eyebrow label: WYATTEL HOTEL (TACURONG CITY) in copper-amber
- Large headline: COMING SOON in Playfair Display
- Background: Same warm parchment as the Announcements page for visual consistency.

Why have a Must Visit section? Qetsiyah is not just the eco park. It is a gateway to Tacurong City. Partnering with local hotels and attractions creates a travel guide ecosystem. Wyattel Hotel is the first featured partner, building toward a regional tourism network.

---

## 7. Shared Components

### CategoryOpeningHero (src/components/CategoryOpeningHero.jsx)

Used by: Activities, Food Offers, Stays and Venues, Services.

The reusable animated hero opener. Behavior steps:

1. Collapsed state: Title words sit left and right. A small video or image thumbnail is centered in the gap between them.
2. On click or scroll: Media expands outward to 100vw x 100vh with a cinematic elastic ease.
3. Full expansion: Video plays with sound, title words animate out, an overlay scrim appears.
4. Shrink on scroll down: Auto-collapses so the visitor can scroll into the content below.

Props available: titleTop, titleBottom, flankLeft, flankRight, image, video, id, hasContentBelow, onExploreBelow.

---

### Footer (src/components/Footer.jsx)

Appears on all pages (managed by App.jsx). Contains:

| Column | Content |
| :--- | :--- |
| Brand | Typeset logo, park description, static map card linking to Google Maps |
| Experiences | Quick links: Activities, Cafe, Verde Villa, Event Hall, Gallery |
| Explore | Quick links: Home, About, Announcements, Booking, Must Visit |
| Contact | Phone number, email, address, business hours |

Map design: Instead of an embedded Google Maps iframe (which loads slowly and has privacy concerns), a static photo preview is shown. Clicking opens Google Maps in a new tab only when requested.

---

### CustomScrollbar (src/components/CustomScrollbar.jsx)

A custom-styled scrollbar that matches the park warm brown/gold palette instead of the default OS scrollbar. It tracks scrollY relative to total page height and renders a smooth scroll progress indicator.

---

## 8. Animation and Motion Design

### 8.1 Page Transitions

Home to About: The home hero content slides up and off. The ABOUT QETSIYAH title drops in from above after a 1.2s delay (graceful, cinematic). About to Home: A 900ms about-exit animation plays, then the home page mounts.

Other navigations: Instant, no animation. Fast is better than fancy for secondary frames.

### 8.2 Expanding Video Hero

Driven by a lerp (linear interpolation) animation loop at 60fps:

  progress 0 to 1 (controlled by scroll/click)
  eased = quadratic ease-in-out
  image width = 15% + eased x 85%    expands from 15vw to 100vw
  image height = 0% + eased x 100%   expands from 0vh to 100vh
  border-radius = 4px to 0px

### 8.3 Teleprompter Text Reveal

In AboutStorySection, each word has:
- Base opacity: 0.22
- Illuminated opacity: 1.0
- Transition: 0.08s linear

As the visitor scrolls, progress advances from 0 to 1, and each word wordStart / wordEnd boundaries determine when it lights up.

### 8.4 Infinite Carousel

The AboutChangingShowcase uses CSS custom properties (--offset, --slide-width, --total-slide-width) to position slides on an absolutely-positioned track. Navigation updates --offset to slide the whole track left or right, achieving a true infinite loop with no cloning glitches. Sub-images within each slide crossfade every 5 seconds using CSS opacity transitions layered with z-index.

---

## 9. Mobile Experience

| Feature | Desktop | Mobile |
| :--- | :--- | :--- |
| Navigation | Fixed top navbar with mega menus | Fixed top navbar + bottom app bar |
| Hero Title Size | clamp(3.8rem, 8.5vw, 6.8rem) | Scales down to ~3.8rem |
| Food Preview | 3-column photo grid | 1 to 2 column stack |
| About Showcase | Carousel with side peeks | Full-width single slide |
| Gallery Mosaic | Multi-column editorial grid | 1 to 2 column responsive |
| Contact Form | 2-column layout | Single-column stack |
| Video Heroes | Full autoplay with audio toggle | Muted autoplay (browser policy) |
| Bottom Navigation | Hidden | 5-icon bottom app bar |

Touch gestures are supported in the expanding hero. touchstart and touchmove events control expansion just like mouse scroll.

---

## 10. File and Folder Structure

public/
  About Changing Showcase/          Images for the About page carousel
    The Place.jpg
    The Place II.jpg
    The Community.jpg
    The Communities II.jpg
    The Communities III.jpg
    The Experiences.jpg
    The Experiences II.jpg
    The Hospitality.jpg
    The Hospitality II.jpg
    The Future.jpg
  Activities/                       Activity photo images
    Zip Lining.jpg
    Sky Biking.jpg
    Paddle Boats.jpg
    Horse Riding.jpg
    Playground.jpg
    Kiddy Pool.jpg
  Background Pictures/              Hero and general background images
  Food Menu/                        Food menu category photos
  Preview Food Picture/             Landing page food preview photos
    Combo Meals.jpg
    Soup Meals.jpg
    Snacks Meals.jpg
  Video/                            Hero background videos
    Qetsiyah Activities Hero Section.mp4
    Food Offer Hero Section Video.mp4
  gallery/
    facebook/                       Categorized park gallery photos (.webp)
      scenery-atmosphere/
      events/
      attractions-activities/
      amenities-visitor-life/
      community/
      culture-events/

src/
  App.jsx                           Root SPA router and frame manager
  index.css                         All styles (8500+ lines of CSS)
  components/
    Navbar.jsx                      Top fixed navigation with mega menus
    HeroSection.jsx                 Home and About hero sections
    WelcomeSection.jsx              Dark olive welcome banner (Home)
    FoodPreviewSection.jsx          Food teaser on landing page (Home)
    ContactSection.jsx              Full booking and inquiry form (Home)
    Footer.jsx                      Site-wide footer
    MobileBottomNav.jsx             Mobile bottom app bar
    CustomScrollbar.jsx             Custom scroll progress indicator
    CategoryOpeningHero.jsx         Reusable expanding hero (image or video)
    ParkGalleryHero.jsx             Gallery page opening editorial banner
    ParkGallerySection.jsx          Photo mosaic with category filter
    about/
      AboutStorySection.jsx         Teleprompter scroll-driven text reveal
      AboutChangingShowcase.jsx     Infinite carousel for About themes
    frames/                         Dedicated page frames (one per route)
      AboutFrame.jsx
      ActivitiesFrame.jsx
      FoodOffersFrame.jsx
      StaysVenuesFrame.jsx
      ServicesFrame.jsx
      GalleryFrame.jsx
      AnnouncementsFrame.jsx
      MustVisitFrame.jsx

Root documentation files:
  FONTS.md                          Full typography reference
  WEBSITE_STRUCTURE.md              This document
  README.md                         Project setup instructions
  PayMongo Integration Plan.md      Online payment integration plan

---

This document was generated based on the current codebase of the Qetsiyah Eco Park website as of September 2026.
It should be updated whenever a new page, component, or design change is introduced.