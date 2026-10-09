# Ankit Event Decor - Premium Event Decoration & Booking Platform

A modern, luxury, fully responsive Event Decoration E-commerce and Service Booking Website owned and operated by **Ankit Kumar**.

## Features

### Customer-Facing Platform
- **Luxury Theme & Aesthetics**: Deep Burgundy (`#701F3D`), Soft Blush Pink (`#F8E7EC`), Champagne Gold (`#D6B36A`), Warm White (`#FFFCFA`), and Charcoal Black (`#29252A`).
- **Comprehensive Catalog**:
  - Birthday Decoration (Basic, Ring Arch, Luxury Royal Milestone)
  - Anniversary Decoration (Candlelight, Rose Petal, Cabana Suite)
  - Balloon Architecture & Pillars
  - Romantic Room & Surprise Setup (Car Boot, Bedroom)
  - Baby Shower Celebrations
  - Grand Wedding Stage & Mandap
  - Bespoke Customized Themes
- **Search, Filters & Sorting**:
  - Real-time search across title, categories, inclusions, and color keywords.
  - Category, venue type (Indoor/Outdoor), tier (Budget to Grand), and rating filters.
  - Sorting by popularity, price (Low to High, High to Low), rating, and recency.
- **Service Details & Interactive Booking Engine**:
  - High-res photo gallery with thumbnail switcher.
  - Dynamic add-on calculator with real-time price updates in Indian Rupees (₹).
  - Booking form capturing name, phone, email, date, time, location, budget, guest count, color preferences, and venue notes.
  - Instant unique booking reference code (e.g. `AED-2025-XXXX`) with "Pending" status awaiting admin review.
- **E-Commerce Shopping Cart & Checkout**:
  - Add to cart with add-on options, quantity modifiers, and promo coupon engine (`CELEBRATE15`, `ANKIT500`, `FIRSTEVENT`).
  - Checkout with UPI / QR, Card, and Pay Post-Setup options.
- **Visual Portfolio & Lightbox Viewer**: Fullscreen photo gallery with theme filters and "Book Similar Theme" shortcuts.
- **Client Account**: Customer sign-up, sign-in, profile management, wishlist, and booking timeline tracking.
- **Direct Business Channels**: Direct WhatsApp link (`https://wa.me/919650246245`), direct calling (`+91 96502 46245`), and email (`contact211@gmail.com`).

### Secure Executive Admin Panel
- Access via dedicated route: `/admin/login` and `/admin/dashboard`
- **Owner Credentials**:
  - Username: `ankit`
  - Password: `ankit@123`
- **Overview Dashboard**:
  - Key metrics: Total Bookings, Pending Inquiries, Confirmed Events, Completed Events, Total Clients, Recorded Revenue.
  - Quick action status toggles (Pending → Confirmed → Completed).
  - Upcoming events calendar and recent leads feed.
- **Services Manager** (`/admin/services`):
  - Add new decoration packages, edit pricing/discounts, update descriptions and high-res imagery, manage inclusions, toggle featured/trending/published status.
- **Bookings Manager** (`/admin/bookings`):
  - Filter by date, category, status.
  - Search by reference ID or customer name.
  - Open detailed view, confirm/reject bookings, add internal staff notes, and update status history.
- **Inquiries Manager** (`/admin/inquiries`):
  - Monitor leads, update lead status (New, Contacted, Converted, Closed), schedule follow-up dates, and log conversation notes.
- **Customer Roster** (`/admin/customers`): Client database with contact info, total events booked, and lifetime recorded value.
- **Gallery Manager** (`/admin/gallery`): Add and remove showcase photographs.
- **Business Settings** (`/admin/settings`): Live configuration of owner name, phone number, email, WhatsApp number, office address, announcement banner, and discount coupons.

---

## Local Development in Visual Studio Code

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Steps to Run Locally

1. **Clone or Open Project Folder**:
   Open Visual Studio Code:
   ```bash
   code .
   ```

2. **Install Dependencies**:
   Open terminal in VS Code (`Ctrl + \`` or `Cmd + \``) and run:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

5. **Access the Admin Panel**:
   - Go to `http://localhost:3000/admin/login`
   - Enter Username: `ankit`
   - Enter Password: `ankit@123`
