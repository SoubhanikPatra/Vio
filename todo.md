# Vio - Phase 1 TODO

## Foundation & Setup

- [ ] Fix TypeScript error in server/_core/storageProxy.ts
- [ ] Update app.config.ts with Lume branding (appName, appSlug)
- [ ] Generate and set app logo/icon
- [ ] Configure theme.config.js with Lume colors (Deep Indigo #3730A3, Light Gray, etc.)
- [ ] Set up Prisma schema (User, Trip, ItineraryItem tables)
- [ ] Configure PostgreSQL connection (Neon.tech)
- [ ] Set up environment variables for database and JWT

## Design System Components

- [x] Create LumeButton component (variants: primary, secondary, outline, ghost, destructive)
- [x] Create LumeCard component (variants: default, elevated, outlined)
- [x] Create LumeInput component (text, email, password, multiline support)
- [x] Ensure all components use NativeWind (Tailwind) + Inter font
- [x] Add component exports to lib/components/index.ts

## Authentication (JWT)

- [ ] Create auth API routes (signup, login, logout)
- [ ] Implement JWT token generation and validation
- [x] Create auth context/hook for managing user state
- [x] Create signup screen UI
- [x] Create login screen UI
- [ ] Integrate auth screens with API
- [x] Add token persistence (AsyncStorage or SecureStore)
- [ ] Add auth guard to protect routes

## Onboarding Flow

- [x] Create onboarding context/state management
- [x] Build Step 1: Welcome screen
- [x] Build Step 2: Traveler type selection
- [x] Build Step 3: Travel interests (multi-select)
- [x] Build Step 4: Travel frequency & budget
- [x] Build Step 5: Completion screen
- [ ] Connect onboarding to user profile (save to backend)
- [x] Add skip/back navigation between steps

## Navigation

- [x] Configure bottom tab bar with 4 tabs (Home, Search, Trips, Profile)
- [ ] Add tab icons to icon-symbol.tsx
- [x] Create tab navigation layout
- [x] Ensure proper SafeArea handling for tab bar
- [ ] Test tab transitions and state persistence

## Home Screen

- [x] Create Home screen layout with ScreenContainer
- [x] Add greeting section ("Hello, [Name]")
- [x] Build "Upcoming Trips" section with placeholder cards
- [x] Add empty state ("No upcoming trips")
- [x] Add "Create New Trip" CTA button
- [x] Add "Explore Destinations" secondary button
- [x] Wire up navigation to other tabs

## Backend Integration

- [ ] Set up Express server with JWT middleware
- [ ] Create user signup endpoint (POST /auth/signup)
- [ ] Create user login endpoint (POST /auth/login)
- [ ] Create user profile endpoint (GET /auth/profile)
- [ ] Create onboarding save endpoint (POST /users/onboarding)
- [ ] Add error handling and validation
- [ ] Test all endpoints with Postman or similar

## Database (PostgreSQL + Drizzle)

- [ ] Switch Drizzle schema from mysql-core to pg-core
- [ ] Create User table schema (id, email, name, travelerType, interests, createdAt, updatedAt)
- [ ] Create Trip table schema (id, userId, destination, startDate, endDate, status, createdAt, updatedAt)
- [ ] Create ItineraryItem table schema (id, tripId, title, date, description, createdAt, updatedAt)
- [ ] Test PostgreSQL connection with Neon.tech
- [ ] Run Drizzle migrations
- [ ] Seed database with sample data (optional)

## Testing & Quality

- [ ] Ensure no TypeScript 'any' types in codebase
- [ ] Run TypeScript type check (tsc --noEmit)
- [ ] Test signup/login flow end-to-end
- [ ] Test onboarding flow on iOS and Android
- [ ] Test tab navigation and screen transitions
- [ ] Test responsive layout on different screen sizes
- [ ] Verify dark mode support (if applicable)

## Deployment & Delivery

- [ ] Create initial checkpoint
- [ ] Document setup instructions in README
- [ ] Prepare project for user delivery
