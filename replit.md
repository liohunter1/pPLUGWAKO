# Premium Liquor Kenya - E-commerce Platform

## Overview

This is a static e-commerce website for a Kenyan liquor store built with React, Vite, TypeScript, and TailwindCSS. The application operates entirely on the client side with no backend database, using local JSON files for product data, localStorage for cart persistence, and WhatsApp integration for order checkout.

The platform features a dark luxury theme with a comprehensive product catalog, category filtering, shopping cart functionality, and store locations. It's designed as a premium browsing and ordering experience that redirects to WhatsApp for final order placement.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server
- **Wouter** for client-side routing (lightweight React Router alternative)
- **TailwindCSS v4** for styling with custom design tokens
- **Shadcn/ui** component library (New York style) for consistent UI patterns
- **React Query** (@tanstack/react-query) for client-side state management
- **Lucide React** for iconography

**Design System:**
- Dark luxury theme with custom color scheme (Rich Black #0A0E27, Gold #D4AF37)
- Typography: Playfair Display (serif) for headings, Inter for body text
- Component library configured via `components.json` with path aliases
- CSS variables for theming defined in `client/src/index.css`
- Responsive design with mobile-first approach

**State Management Strategy:**
- **Cart State:** Persisted in browser localStorage via custom `useCart` hook
- **Age Verification:** Browser localStorage flag for 18+ compliance
- **Product Data:** Static JSON imports (no API calls)
- **UI State:** React Query for any async operations, React hooks for component state

**Routing Structure:**
- `/` - Home page with hero, featured products, and category highlights
- `/products` - Product listing with filtering, sorting, and search
- `/product/:id` - Individual product details with variant selection
- `/cart` - Shopping cart with quantity management
- `/stores` - Physical store locations with contact info
- `*` - 404 Not Found page

### Data Architecture

**Product Data Model:**
All data stored in static JSON files in `client/src/data/`:

- `products.json` - Complete product catalog with:
  - Product metadata (id, name, category, price, volume, ABV%)
  - Inventory status and ratings
  - Image paths and store information
  
- `categories.json` - Hierarchical category structure:
  - Top-level categories (Whisky, Spirits, Wine, Beer & Cider)
  - Subcategories (Liqueur, Rum, Vodka & Gin, Cognac & Brandy)
  - Category descriptions

- `stores.json` - Physical store locations:
  - Store details (name, address, phone, hours)
  - Geographic coordinates for mapping

**Why Static JSON:**
- No backend infrastructure required
- Fast load times (bundled with app)
- Simple deployment (static hosting)
- Trade-off: Manual product updates require redeployment

### Client-Side Features

**Shopping Cart Implementation:**
- Persistent cart using localStorage (`CART_STORAGE_KEY`)
- Cart operations: add, remove, update quantity, clear
- Real-time total calculation
- Cart item count badge in navigation
- Drawer component for quick cart access

**Product Discovery:**
- Multi-level category navigation with expandable menus
- Search functionality across product names and descriptions
- Price range filtering with slider component
- Multiple sort options (featured, price, name, rating)
- Pagination for large product sets

**Age Verification:**
- Modal gate requiring 18+ confirmation on first visit
- Persistent verification flag in localStorage
- Access denial redirect for underage users
- Compliance with alcohol sales regulations

**WhatsApp Checkout Integration:**
- Generates formatted order message from cart contents
- Includes product details, quantities, and total price
- Opens WhatsApp with pre-filled message
- Default phone number: +254700123456
- User adds delivery location before sending

### Server Architecture (Minimal)

The project includes a basic Express server primarily for development and static file serving:

**Development Server (`server/vite.ts`):**
- Vite middleware integration for HMR (Hot Module Replacement)
- Client-side routing support (SPA fallback)
- Development-only Replit plugins (cartographer, dev banner)

**Production Server (`server/index.ts`):**
- Static file serving from `dist/public`
- Express server with minimal middleware
- Logging utility for request tracking
- No API routes implemented (static-only application)

**Storage Interface (`server/storage.ts`):**
- Defines IStorage interface for potential future database integration
- In-memory storage implementation (MemStorage) with user CRUD operations
- Currently unused but provides extensibility path

**Why Minimal Backend:**
- Application is designed to be fully static
- Server only needed for hosting built files
- Could be replaced with any static hosting (Netlify, Vercel, GitHub Pages)

### Build & Deployment

**Build Process (`script/build.ts`):**
1. Clean previous build artifacts
2. Build client with Vite (outputs to `dist/public`)
3. Bundle server with esbuild (outputs to `dist/index.cjs`)
4. Selective dependency bundling for optimized cold starts

**Bundling Strategy:**
- Client dependencies bundled by Vite
- Server dependencies selectively bundled (allowlist for common packages)
- Reduces filesystem syscalls for faster serverless cold starts

**Environment Configuration:**
- Development: `NODE_ENV=development` with Vite dev server
- Production: `NODE_ENV=production` serving static files
- Database URL configured but not actively used (PostgreSQL connection string)

**Custom Vite Plugins:**
- `vite-plugin-meta-images.ts` - Dynamically updates OpenGraph meta tags with Replit deployment URLs
- Runtime error overlay for development
- Replit-specific development tooling

### Image Management

**Product Images:**
- Images sourced from authorized Kenyan liquor retailers (for demonstration)
- Stored in `client/public/images/` directory
- Image path mapping in `client/src/utils/productImages.ts`
- Fallback handling for missing images
- Supports multiple image formats (PNG, JPG, JPEG)

**Categories:**
- Hero image for homepage
- Category-specific images for visual hierarchy
- OpenGraph image for social sharing

## External Dependencies

### Core Framework Dependencies

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **TailwindCSS v4** - Utility-first CSS framework
- **Wouter** - Lightweight routing
- **@tanstack/react-query v5** - Data fetching and state management

### UI Component Libraries

- **Radix UI** - Headless component primitives (30+ components including Dialog, Dropdown, Accordion, Tooltip, etc.)
- **Shadcn/ui** - Pre-built accessible components built on Radix
- **Lucide React** - Icon library
- **cmdk** - Command palette component
- **embla-carousel-react** - Carousel component
- **vaul** - Drawer component

### Utility Libraries

- **class-variance-authority** - Type-safe CSS class composition
- **clsx** - Conditional className utility
- **tailwind-merge** - Merge Tailwind classes without conflicts
- **date-fns** - Date manipulation (for potential future features)
- **nanoid** - Unique ID generation

### Form & Validation

- **react-hook-form** - Form state management
- **@hookform/resolvers** - Validation resolver integration
- **zod** - Schema validation
- **drizzle-zod** - Drizzle ORM to Zod schema conversion

### Database (Configured but Unused)

- **Drizzle ORM** - TypeScript ORM
- **@neondatabase/serverless** - Neon serverless PostgreSQL driver
- **drizzle-kit** - Database migrations toolkit

**Note:** Database infrastructure is configured (`shared/schema.ts`, `drizzle.config.ts`) but not actively used since the application is static. This provides an upgrade path if backend functionality is needed in the future.

### Backend Server Dependencies

- **Express** - Web server framework
- **connect-pg-simple** - PostgreSQL session store (unused)
- **express-session** - Session middleware (unused)
- **express-rate-limit** - Rate limiting (unused)
- **cors** - CORS middleware (unused)

### Development Tools

- **@replit/vite-plugin-runtime-error-modal** - Enhanced error reporting
- **@replit/vite-plugin-cartographer** - Development navigation
- **@replit/vite-plugin-dev-banner** - Development mode indicator
- **esbuild** - JavaScript bundler for server code
- **tsx** - TypeScript execution for scripts

### Styling & PostCSS

- **@tailwindcss/vite** - Vite integration for Tailwind v4
- **autoprefixer** - CSS vendor prefixing
- **tw-animate-css** - Animation utilities for Tailwind

### Type Definitions

- **@types/node** - Node.js type definitions
- **vite/client** - Vite client type definitions