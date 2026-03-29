# Renting Cars

A polished luxury car rental web application built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS 4**, and **Supabase REST data**.

This project is designed as a premium rental platform experience, not just a simple listing website. It combines strong visual presentation, dynamic car detail pages, team and expert showcases, FAQ-driven content, service storytelling, and booking-oriented UI patterns into a single modern frontend codebase.

## Live Preview

- **Local URL:** `http://localhost:3000`
- **Production Demo:** Add your deployed link here
- **Repository:** Add your GitHub repository link here

## Overview

`Renting Cars` is a multi-page premium car rental website focused on:

- showcasing luxury, sport, SUV, and executive vehicles
- presenting a brand-first user experience with strong visual sections
- giving each car its own dedicated detail page
- supporting category-based browsing and pagination
- highlighting services, team members, and experts
- providing contact, FAQ, and blog content for a complete business website

The project follows a modern **App Router** architecture and uses a mix of **Server Components** and isolated **Client Components** to keep interactive logic focused where it is actually needed.

## What This Project Includes

### Project Highlights

- Luxury-first visual design system
- Dynamic single pages for cars, experts, and team members
- Server-first architecture with isolated client logic
- Uzbek-localized metadata across the app
- Real data integration through Supabase REST endpoints
- Premium responsive layout across major screens
- Booking-oriented user journey from hero to detail pages

### Core pages

- **Home page**
  A branded landing page with hero slider, booking UI, featured vehicle sections, service highlights, FAQ, blog preview, and call-to-action sections.

- **Cars page**
  A catalog page with category filters, server-side pagination, pricing display, and links to individual car detail pages.

- **Car detail page**
  A dynamic single page for each vehicle, including hero media, rental conditions, specs, gallery, pricing, and booking CTA.

- **About page**
  A brand-focused page with hero content, company storytelling sections, featured experts, and supporting service content.

- **Experts pages**
  A shared expert system with listing and dynamic detail pages.

- **Teams page**
  A featured-team experience with member spotlight content, interactive card slider, and dynamic member pages.

- **Services page**
  A dedicated services presentation page for rental offerings and premium support messaging.

- **Blog page**
  A content page featuring highlighted articles, recent posts, categories, and tags.

- **Contact page**
  A contact hero, information cards, embedded map, form UI, and success feedback flow.

## Key Features

- Premium UI for a luxury mobility brand
- Dynamic routes for cars, experts, and team members
- Server-rendered page structure with isolated client interactivity
- Supabase-powered content fetching via REST
- Hero slider with mobile swipe support
- Mouse-drag enabled expert and team carousels
- FAQ accordion section
- Contact form success modal with auto-close behavior
- Responsive layouts across major sections
- SEO metadata across static and dynamic routes
- Pagination on the cars catalog page

## Tech Stack

- **Framework:** Next.js 16
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Data Source:** Supabase REST API
- **Interactive Slider Library:** Swiper
- **Linting:** ESLint

## Architecture Notes

This codebase has been actively cleaned up to avoid oversized client boundaries.

Important architectural choices include:

- keeping pages and large presentation components as **Server Components** by default
- moving interactive state into smaller dedicated **Client Components**
- using reusable wrappers for sections such as booking, experts, teams, and contact interactions
- generating metadata at both static and dynamic route levels

This makes the app easier to maintain, better for performance, and cleaner to reason about as the UI grows.

## Data Layer

The application fetches content from **Supabase** using REST endpoints.

Current project data patterns include:

- cars
- categories
- FAQ entries

The helper in [`lib/supabase.ts`](./lib/supabase.ts) performs direct table reads using `fetch()` with `cache: 'no-store'`, which means pages using these calls are rendered with fresh data on request.

### Current content sources

- `cars`
- `categories`
- `faq`
- local expert/team data for branded profile sections

### Important note

At the moment, the project reads Supabase data through a lightweight fetch helper instead of a full SDK-based client setup. This keeps the frontend simple and works well for a content-focused showcase build.

## Important UI Modules

Some of the main reusable UI and feature areas in the project:

- `components/HeroSlider.tsx`
- `components/booking/*`
- `components/select-car-with-name/*`
- `components/about/*`
- `components/teams/*`
- `components/contact/*`
- `components/AnswerQuestionClient.tsx`
- `components/OtherServices.tsx`

These components together define the visual identity and interactive behavior of the platform.

## SEO Work

The project includes metadata coverage across the main pages and dynamic detail routes.

Implemented SEO work includes:

- route-level `metadata` for static pages
- `generateMetadata` for dynamic detail pages
- `openGraph` metadata
- `twitter` metadata
- canonical URLs

Metadata text has also been localized into Uzbek for the current content direction of the project.

## Responsiveness

This project has been structured with responsive layouts in mind across:

- home sections
- car catalog cards
- detail pages
- team and expert sliders
- contact form and map layout
- hero and overlap card sections

Interactive sections such as sliders and scrollable card rows have also been tuned for pointer-based and mobile-friendly behavior where needed.

## Project Structure

```text
app/
  about/
  blog/
  cars/
  contact/
  experts/
  services/
  teams/
  page.tsx

components/
  about/
  booking/
  contact/
  hero/
  select-car-with-name/
  teams/
  ...

lib/
  supabase.ts
```

## Screenshots

You can improve this README even further by adding screenshots from:

- Home page hero slider
- Cars catalog page
- Car detail page
- About / Experts section
- Teams page
- Contact page

Suggested folder:

```text
docs/
  screenshots/
```

Then reference them here with Markdown images.

Example:

```md
![Home Page](docs/screenshots/home.png)
```

## Getting Started

### Requirements

- Node.js 18+ recommended
- npm recommended as the primary package manager for this project

### Installation

Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

### Production

Build the project:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

Lint the codebase:

```bash
npm run lint
```

## Environment and Configuration

This project currently works without a dedicated `.env` setup because the Supabase endpoint and publishable key are read directly inside the project helper.

If you want to prepare this codebase for production-grade deployment, the next improvement would be moving those values into environment variables such as:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

That would make the setup cleaner, safer, and easier to manage across environments.

## Local Development Notes

- The project uses the **App Router**
- Data currently comes from Supabase REST endpoints
- Several pages depend on live fetched data
- Remote images are configured to work in the current project setup
- Interactive UI is intentionally split into smaller client-side islands where needed

## Recommended README Additions For Presentation

If this project will be shown to a teacher, recruiter, or client, the strongest final additions would be:

- a deployed demo link
- 4 to 6 polished screenshots
- your name or team name
- a short “my role in this project” section
- a “challenges solved” section

Those additions would turn this from a strong README into a standout portfolio-level README.

## Why This Project Stands Out

This is not a generic starter template anymore.

It is a feature-rich, visually branded, content-driven luxury rental platform frontend with:

- strong landing page composition
- real dynamic detail experiences
- SEO-aware route structure
- clear component separation
- premium section design
- scalable content architecture

It is the kind of project that can be presented not only as a coding exercise, but as a serious modern frontend product build.

## Future Improvement Ideas

- add real booking submission flows
- connect contact form submissions to backend storage
- add search and advanced filter combinations for cars
- add CMS-style admin control for cars, blogs, and experts
- add multilingual UI switching
- add analytics and conversion tracking
- optimize media delivery and caching strategy

## Author Note

This project has evolved far beyond the default Next.js scaffold and now represents a custom premium car rental experience with dynamic content, modern architecture, and production-style UI structure.
