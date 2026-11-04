# Axiomet — Production Astro Website Rebuild

A high-fidelity, high-performance, accessible, and production-ready rebuild of **AXIOMET** using **Astro 5** and **TypeScript**.

## Architecture & Technology Stack

- **Framework**: [Astro](https://astro.build/) (Static Site Generation / Islands architecture)
- **Language**: TypeScript (Strict type checking enabled)
- **Styling**: Modular CSS (`variables.css`, `reset.css`, `global.css`, `utilities.css`)
- **Typography**: 
  - Headings: `BDO Grotesk` (Local variable font)
  - Body: `Geist`
  - Editorial: `Instrument Serif`
- **Interactivity**: Pure TypeScript modules without framework bloat
  - `navigation.ts`: Responsive menu drawer, keyboard accessibility (ESC key), focus trapping
  - `interactions.ts`: FAQ accordion system, form client-side validation, smooth scroll anchor links
  - `animations.ts`: IntersectionObserver-based stat counters and scroll reveals

---

## Project Structure

```text
axiomet-astro/
├── public/
│   ├── favicon.svg
│   ├── favicon.ico
│   ├── robots.txt
│   ├── fonts/
│   │   └── BDOGrotesk-VF.ttf
│   ├── images/
│   └── js/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.astro
│   │   │   ├── Container.astro
│   │   │   └── SectionHeading.astro
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   └── Navigation.astro
│   │   └── sections/
│   │       ├── Hero.astro
│   │       ├── About.astro
│   │       ├── Features.astro
│   │       ├── Industries.astro
│   │       ├── CaseStudies.astro
│   │       ├── Process.astro
│   │       ├── Testimonials.astro
│   │       ├── Insights.astro
│   │       ├── FAQ.astro
│   │       └── Contact.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about-us.astro
│   │   ├── service/
│   │   │   ├── index.astro
│   │   │   ├── technology-strategy.astro
│   │   │   ├── systems-product-engineering.astro
│   │   │   ├── ai-intelligent-systems.astro
│   │   │   └── product-innovation.astro
│   │   ├── case-study-v1.astro
│   │   ├── case-study-v2.astro
│   │   ├── case-study-v3.astro
│   │   ├── project/
│   │   │   ├── a-smarter-foundation-for-healthcare-data.astro
│   │   │   ├── building-intelligence-behind-autonomous.astro
│   │   │   └── turning-factory-data-into-intelligence.astro
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   ├── what-comes-after-digital-transformation.astro
│   │   │   └── complexity-is-often-a-systems-problem-indeed.astro
│   │   ├── contact-v1.astro
│   │   ├── contact-v2.astro
│   │   ├── contact-v3.astro
│   │   ├── style-guide.astro
│   │   ├── licenses.astro
│   │   ├── changelog.astro
│   │   ├── instructions.astro
│   │   └── 404.astro
│   ├── scripts/
│   │   ├── navigation.ts
│   │   ├── animations.ts
│   │   └── interactions.ts
│   └── styles/
│       ├── variables.css
│       ├── reset.css
│       ├── global.css
│       └── utilities.css
├── astro.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+ (tested on v26.12.0)
- npm 9+

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Visit `http://localhost:4321` in your browser.

### Type Check & Build

```bash
npm run check
npm run build
```

The output is written to `dist/` ready to deploy to Vercel, Netlify, Cloudflare Pages, or any static host.

### Preview Production Build

```bash
npm run preview
```

---

## Key Features

1. **High Visual Fidelity**: 100% matched to the original Webflow design, typography, spacing, and colors.
2. **Zero Framework Overhead**: No React/Next.js/Vue client runtime overhead. Static HTML + lightweight TypeScript.
3. **Responsive**: Fully responsive across desktop (1440px), laptop (1280px), tablet (768px), and mobile (375px/390px).
4. **Accessible**: Semantic HTML elements, ARIA attributes on navigation toggles, keyboard navigation, and visible focus rings.
5. **SEO Optimized**: OpenGraph, Twitter card metadata, canonical URLs, robots.txt, and fast static generation.
