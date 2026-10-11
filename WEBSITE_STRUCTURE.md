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
11. Cinematic Redesign (October 2026)

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

The site is light and warm, with a single accent color. Every value is a CSS variable in src/styles/tokens.css, named by role rather than by shade.

### 3.1 Core Colors

| Token | Hex Value | Name | Used For |
| :--- | :--- | :--- | :--- |
| --bg | #f7f4ed | Paper | Default page background, navigation, full-screen menu, phone dock |
| --bg-soft | #f0ebe1 | Soft Paper | Booking section, About chapters, image placeholders |
| --bg-deep | #e8e2d6 | Sand | Park moments section, footer |
| --bg-tint | #e4ece8 | Pale Mint | Visit guide section, coming-soon pages |
| --ink | #0d1211 | Ink | All text and headlines, dark buttons |
| --accent | #ffc42e | Warm Yellow | The only bright color: highlighter bands, primary buttons, the Welcome section, the page curtain |

### 3.2 How the accent works

Yellow text cannot be read on a light page, so the accent is used as a highlighter:

- Display headlines: a yellow band the height of the capitals sits behind the key line (class .accent inside .display).
- Small labels, numbers and text links: plain ink, with no yellow mark under the text (static or on hover).
- Index lists (Experiences, Stays, Services): a band sweeps in behind the name of the row in focus.
- Buttons: solid yellow with dark text.

Over photographs (hero images, photo captions) the rule flips: text is light, and accent words are simply yellow. This switch is one block in tokens.css ("Over a photograph") that redefines the same role tokens, so no component needs its own dark styles.

### 3.3 Photography Grade

All photographs share one natural, bright grade (--grade). Hero photographs are held slightly deeper (--grade-deep) with a soft scrim so the type over them stays clear. Images are sharp-edged rectangles: no rounded corners, frames, or shadows.

---

## 4. Typography System

| Role | Font | Style | Usage |
| :--- | :--- | :--- | :--- |
| Display / Headings | Anton | Heavy condensed grotesque, all caps | Page titles, section headlines, list names, the hero and footer word |
| Body | Inter | 400 to 500, generous line height | Paragraphs, form fields, menu item names |
| Labels | Inter | 600, tiny, uppercase, wide letter-spacing | Navigation, buttons, captions, numbered labels (01, 02, 03) |

### 4.1 Scale

Display sizes are fluid and deliberately oversized (classes .display-xxl down to .display-sm in src/styles/base.css). Headlines stay the dominant element on phones instead of shrinking to ordinary sizes. Labels stay very small, which creates the contrast in scale the design relies on.

### 4.2 Notes

The capitals in Anton are 0.86em tall, so display line heights sit around 0.9 to 0.96. Anton has no peso sign, so prices and fees in display type are written as PHP.

Anton is loaded with display=block so headlines never flash in a fallback face.

---

## 5. Navigation Architecture

### 5.1 Desktop Navigation (src/components/Navbar.jsx)

A minimal bar: the Qetsiyah wordmark, small uppercase links, and a Booking button.

| State | Trigger | Appearance |
| :--- | :--- | :--- |
| Transparent | At the top of a page | No background, light text over the hero photo |
| Solid | After scrolling | Paper bar with dark text and a hairline |
| Hidden | Scrolling down | Slides away; returns on the first scroll up |
| Offers panel | Click WHAT WE OFFER | Full-width panel with four numbered columns of deep links and a gallery feature |

Navigation order:
  HOME > ABOUT > WHAT WE OFFER (+) > ANNOUNCEMENTS > MUST VISIT, plus the BOOKING button

The offers panel keeps every deep link (activities, menu categories, stays, services). MUST VISIT is now a direct link, because its dropdown only ever held one item.

### 5.2 Phone and Tablet Navigation

Below 1180px the links collapse into a MENU button that opens a full-screen menu: nine numbered pages in large display type (the current page carries a yellow band), a Book your event button, and Call / Directions / Email links.

On phones a flat dock is fixed to the bottom edge (src/components/MobileBottomNav.jsx):
  Home | Explore | Dining | Gallery | Book

The active tab is marked in yellow and Book is a solid yellow block, so the main action is always one tap away.

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

Anchors inside a page (for example #zip-lining or #beef-meals) open the correct page when shared or reloaded.

Page changes run through a curtain: a yellow title card wipes up, names the destination, then lifts to reveal the new page. Visitors who prefer reduced motion get an instant switch.

---

## 6. Page-by-Page Breakdown

### 6.1 Landing Page - Home

Route: #home

Built around four core sections (Hero, Welcome, Food Preview, Booking). The October 2026 enhancement layer adds an experiences rail, a park-moments teaser, and a visit guide between them; see section 11 for the full order.

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

Layout (desktop): one section title, then a 12-column grid with the form on the left (7 columns) and the notes on the right (4 columns). Both columns open with the same ruled title row, so "01 Your details" and "Before you send" sit level. Every group uses the same two field columns, the activities are ruled checkbox rows on those columns, and all controls share one height. The notes column lists what happens next and the park contact as ruled label / value rows. A focused field is marked by a thicker ink underline.

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

Below the hero, an editorial index (OfferingsIndex) lists Verde Villa Retreat, Cottage Stay, Qetsiyah Cafe, Dine-in Restaurant, and Lakeside Gazebos. Each row leads to the booking form. Room details, rates, and dedicated photos are still a planned addition.

---

### 6.6 Services (Exclusive Event Hall)

Route: #services
File: src/components/frames/ServicesFrame.jsx

Currently shows the CategoryOpeningHero animation:
- Headline: DISCOVER / ALL OUR SERVICES
- Flank Labels: CATERING AND CELEBRATIONS / SULTAN KUDARAT

Below the hero, an editorial index (OfferingsIndex) lists Food Catering, Weddings, Family Events, Birthday Event, Office Event, and Event Hall, each paired with a real event photo from the park. Capacity and pricing are still a planned addition.

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

Displays a centered COMING SOON placeholder on a warm parchment background, now with a short explanation and two buttons (Explore the park, Book a visit) so the page is not a dead end.

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

Motion is slow and quiet: long ease-out curves, no bounce. Everything is disabled for visitors who prefer reduced motion.

| Effect | Where | How |
| :--- | :--- | :--- |
| Opening title card | Every first load | The curtain holds the page name until fonts are ready, then lifts |
| Page curtain | Every page change | src/components/ui/PageCurtain.jsx, timed in App.jsx |
| Layered hero | Home | The word QETSIYAH sits between the photo and a cutout of the tower, trees and lawn. It rises into place on load and sinks behind the treeline on scroll |
| Line reveals | Headlines | Each line slides up out of its own mask (data-reveal="lines", component ui/Lines.jsx) |
| Photo wipes | Images | A wipe reveals the photo while it settles from a slight zoom (data-reveal="clip", component ui/Media.jsx) |
| Hairlines | Dividers | Draw from the left (data-reveal="rule") |
| Parallax | Large images | Images drift slightly inside their frames (hooks/useParallax.js) |
| Hover | Links, buttons, lists | A yellow band sweeps in behind index list names; text links only move their arrow; a dark panel rises through buttons; list rows slide and swap the photo beside them |
| Film strip | Home, Park moments | A slow, looping strip of photographs that pauses on hover |
| Story scroll | About | The sentence stays pinned while each word lights up with the scroll |

Scroll reveals are driven by hooks/useScrollReveal.js, which marks any element carrying data-reveal as it enters the screen.

---

## 9. Mobile Experience

| Feature | Desktop | Phone |
| :--- | :--- | :--- |
| Navigation | Top bar with links and offers panel | Top bar with MENU, full-screen menu (it stops above the dock), bottom dock |
| Booking entry points | Booking button in the header, Book button in the hero and footer | The dock's Book tab only. The hero shows a single Explore the park button, and the menu, footer and coming-soon pages do not repeat Book |
| Headlines | Oversized, corner-anchored | Still the dominant element, scaled fluidly |
| Home hero | Name behind the landscape, corner labels | Same layered effect, actions stacked above the dock |
| Activities index (Home) | Hairline list with a photo that follows the row | Swipeable rail of photo cards |
| Film heroes | Play silently on arrival | Wait for a tap (Play film), so large videos are not downloaded uninvited |
| Sticky tab bars | Under the header | Under the header, horizontally scrollable |
| Menu search | Field beside the category tabs | Icon that opens across the bar |
| Visit facts | Four columns | Four stacked rows |
| Booking form | All fields on one page, in three groups | One group at a time (Your details, Your visit, Activities) with a progress bar, large filled fields, a guest stepper, toggle tiles, a review list, and Back / Next / Send pinned above the dock |
| Gallery | Four-column mosaic | Two-column mosaic, swipe in the viewer |

Full-screen sections on phones are sized to end at the top of the dock (--screen-h), so nothing important hides behind it.

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

## 11. Cinematic Redesign (October 2026)

The whole site was restyled to a bold, cinematic editorial look: very large all-caps headlines, one yellow accent, sharp-edged photography, and slow motion. It began dark and was then switched to a light palette at the owner's request (see section 3). Content, pages, routes, the menu, and the gallery sets are unchanged.

### 11.1 Stylesheets

| File | Contents |
| :--- | :--- |
| src/styles/tokens.css | Theme tokens: colors, fonts, spacing, easing, photo grade |
| src/styles/base.css | Reset, type scale, layout primitives, buttons, reveal system |
| src/styles/chrome.css | Navigation, offers panel, full-screen menu, dock, footer, curtain, scrollbar |
| src/styles/home.css | Home page sections |
| src/styles/pages.css | Page hero, tab bars, activities, menu, offerings index, gallery, about, coming soon |
| src/styles/index.css | Entry file that imports the five above |

The earlier stylesheets (src/index.css and src/mobile.css) are no longer imported. They are kept on disk for reference and can be deleted.

### 11.2 Home page order

  Hero > Welcome (yellow) > Experiences index > Park moments > Visit guide > Booking

The dining preview was removed from Home at the owner's request; the full menu is on the Food Offers page. Its component (components/FoodPreviewSection.jsx) is kept but no longer rendered.

| Section | File | What it does |
| :--- | :--- | :--- |
| Hero | components/HeroSection.jsx | Layered name behind the landscape, tagline, Book and Explore actions |
| Welcome | components/WelcomeSection.jsx | ALL ARE WELCOME HERE. at full scale on the accent color |
| Experiences | components/home/ExperiencesRail.jsx | Six activities as an oversized hairline list with a matching photo |
| Park moments | components/home/MomentsTeaser.jsx | Drifting strip of park photographs leading to the gallery |
| Visit guide | components/home/VisitGuideSection.jsx | Hours, fee, directions, contact, FAQ |
| Booking | components/ContactSection.jsx | The inquiry form first (stepped on phones), then what happens next and tap-to-call / email contact rows |

### 11.3 Inner pages

| Page | Presentation |
| :--- | :--- |
| All offer pages and About | CategoryOpeningHero is now a full-bleed title card (film or photo) with the page name in the corner, an icon-only sound button on films, and a Scroll link |
| Activities | A centered sticky bar with activity search and jump tabs (shared/QuickNav.jsx), then numbered entries with large photos, a full-bleed courts image, and a yellow call to action. No intro header |
| Food Offers | The same sticky search and category tabs; each category has a large title beside a hairline price list; tapping a dish opens its photo in place |
| Stays and Venues, Services | Numbered index with a photo that follows the row. No intro header |
| Gallery | Three photographs at different depths above the title; text tabs; sharp mosaic; full-screen viewer with counter and swipe |
| About | Pinned sentence that lights up word by word (360vh), then five chapters with rotating photographs |
| Announcements, Must Visit | COMING SOON title card with next-step links (Must Visit shows only the hotel name and the links) |

### 11.4 Shared pieces

| File | Purpose |
| :--- | :--- |
| src/data/parkInfo.js | Address, phone, email, hours, entrance fee, activities, stays, services, FAQ. Edit facts here once |
| src/components/ui/Lines.jsx | Headline split into masked lines |
| src/components/ui/Media.jsx | Photo frame with wipe reveal and parallax |
| src/components/ui/PageCurtain.jsx | Title card shown between pages |
| src/hooks/useScrollReveal.js, useParallax.js, useMediaQuery.js | Reveals, image drift, phone/desktop switch for the booking form |
| src/utils/scrollToAnchor.js | Anchor scrolling that clears the header and sticky bars |
| public/optimized/hero-layers | The hero photo as two aligned layers: full picture and foreground cutout |
| public/optimized/activities, public/optimized/moments | Lightweight WebP copies of park photos |

### 11.5 Reading the older notes

Sections 6 and 7 still explain what each page contains and why. Where they mention the earlier look (parchment backgrounds, serif headlines, the click-to-expand video hero, the polaroid collage, the 600vh story scroll, the map photo in the footer), this section is the current reference.

---

This document was generated based on the current codebase of the Qetsiyah Eco Park website as of September 2026 and updated in October 2026.
It should be updated whenever a new page, component, or design change is introduced.
