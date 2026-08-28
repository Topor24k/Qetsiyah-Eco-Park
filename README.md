# 🌲 Qetsiyah Eco Park - Official Web Application

A modern, responsive React web application for **Qetsiyah Eco Park** — a premier **DOT-Accredited Tourism Recreation Facility** in Barangay Calean, Tacurong City, Sultan Kudarat.

---

## 📁 Clean & Organized Project Structure

```
Qetsiyah/
├── public/                          # Public static assets & media
│   ├── Food Menu/                   # 9 high-resolution scanned menu boards
│   └── Reference/                   # Design references & video showcase
│
├── src/                             # React application source code
│   ├── components/                  # Modular React UI components
│   │   ├── layout/                  # Navigation & layout components
│   │   │   ├── TopBar.jsx           # Top contact & DOT accreditation bar
│   │   │   ├── Navbar.jsx           # Sticky glassmorphic navbar with mobile drawer
│   │   │   └── Footer.jsx           # Footer with links, accreditation & contacts
│   │   │
│   │   ├── sections/                # Page sections
│   │   │   ├── HeroSlider.jsx       # Interactive 3D card deck carousel & autoplay
│   │   │   ├── Philosophy.jsx       # Our Philosophy & eco-tourism heritage
│   │   │   ├── ActivitiesGrid.jsx   # Top pick rides (Zipline, Sky Bike, Boats, Horses)
│   │   │   ├── AmenitiesGrid.jsx    # Function Hall, Catering, Verde Villa, Cottages
│   │   │   ├── FoodMenuSection.jsx  # Interactive menu browser, live search & dish tray
│   │   │   ├── Announcements.jsx    # Park bulletins & advisories grid
│   │   │   ├── RatesAndFAQ.jsx      # Rates highlight (Php 100) & interactive FAQ
│   │   │   └── ContactAndInquiry.jsx# Online booking & contact inquiry form
│   │   │
│   │   └── ui/                      # Reusable UI & Modal components
│   │       ├── TornDivider.jsx      # Organic wavy SVG section dividers
│   │       ├── MenuSheetsModal.jsx  # Original scanned menu board zoom lightbox
│   │       └── AnnouncementModal.jsx# Full announcement reader modal
│   │
│   ├── data/                        # Centralized data sources
│   │   ├── ridesData.js             # Hero slider rides & activities data
│   │   ├── menuData.js              # Complete 9-category food menu database
│   │   ├── announcementsData.js     # Park advisories & promos data
│   │   ├── faqData.js               # FAQ accordion questions & answers
│   │   └── index.js                 # Unified data exports
│   │
│   ├── App.jsx                      # Root application component
│   ├── main.jsx                     # Application entry point
│   └── index.css                    # Design tokens, fonts & animations
│
├── index.html                       # HTML template
├── package.json                     # Project dependencies & scripts
├── vite.config.js                   # Vite React compiler configuration
└── .gitignore                       # Git ignore rules
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Starts the local development server at `http://localhost:3000` with instant Hot Module Replacement (HMR).

### 3. Build for Production
```bash
npm run build
```
Compiles and bundles optimized production assets into the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🌟 Key Features
- **Interactive Rides Carousel**: 3D card deck slider matching the reference video with progress indicator (`01 / 06`) and auto-crossfade.
- **Full Digital Food Menu**: 9 categories with exact PHP pricing extracted directly from the scanned menu boards, instant search, and catering inquiry calculation.
- **Scanned Menu Boards Lightbox**: Allows visitors to view and zoom all 9 original menu images.
- **Announcements Board**: Official DOT advisories, promos, and event booking notices.
- **Booking & Inquiry Form**: Interactive form with state management and real-time feedback.

