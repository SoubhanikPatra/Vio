# Lume - Design System & Interface Plan

## Brand Identity

**App Name:** Lume  
**Tagline:** AI-first travel super app  
**Design Philosophy:** Clean, minimal, Notion/Linear-inspired  
**Target Platforms:** iOS and Android (portrait orientation, 9:16)

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| **Deep Indigo** | #3730A3 | Primary accent, buttons, active states |
| **White** | #FFFFFF | Background (light mode) |
| **Light Gray** | #F5F5F5 | Surface, cards, secondary backgrounds |
| **Dark Gray** | #6B7280 | Secondary text, borders |
| **Text Primary** | #111827 | Main text, headings |
| **Text Secondary** | #6B7280 | Subtext, descriptions |
| **Success** | #10B981 | Success states, confirmations |
| **Warning** | #F59E0B | Warnings, alerts |
| **Error** | #EF4444 | Errors, destructive actions |

### Typography

- **Font Family:** Inter (system font fallback: -apple-system, BlinkMacSystemFont, Segoe UI)
- **Heading (H1):** 28px, Bold (700), Line Height 1.2
- **Heading (H2):** 24px, Bold (700), Line Height 1.2
- **Heading (H3):** 20px, Semibold (600), Line Height 1.3
- **Body:** 16px, Regular (400), Line Height 1.5
- **Small:** 14px, Regular (400), Line Height 1.4
- **Caption:** 12px, Regular (400), Line Height 1.3

---

## Screen Architecture

### Tab Navigation (Bottom Tab Bar)

Four main tabs accessible from any screen:

1. **Home** - Dashboard with upcoming trips and quick actions
2. **Search** - Discover destinations and trips
3. **Trips** - User's saved and active trips
4. **Profile** - User account, settings, preferences

---

## Screen Specifications

### 1. Onboarding Flow (Multi-Step)

**Purpose:** Collect traveler profile and interests during first launch.

#### Step 1: Welcome Screen
- Hero text: "Welcome to Lume"
- Subtitle: "Your AI-powered travel companion"
- CTA: "Get Started" button (Deep Indigo)
- Skip option (optional)

#### Step 2: Traveler Type Selection
- Question: "What type of traveler are you?"
- Options (cards, selectable):
  - Adventure Seeker
  - Cultural Explorer
  - Beach Relaxer
  - Budget Backpacker
  - Luxury Traveler
  - Family Planner
- Single selection, visual feedback on tap

#### Step 3: Travel Interests (Multi-Select)
- Question: "What interests you most?"
- Options (chips/tags, multi-select):
  - Food & Dining
  - History & Culture
  - Nature & Hiking
  - Beaches & Water
  - Nightlife & Entertainment
  - Shopping
  - Photography
  - Art & Museums
- Minimum 2 selections required
- "Next" button enabled after selection

#### Step 4: Frequency & Budget
- Question: "How often do you travel?"
- Options (radio buttons):
  - Multiple times a year
  - Few times a year
  - Once a year
  - Occasionally
- Question: "What's your typical budget per trip?"
- Options (radio buttons):
  - Budget (under $1000)
  - Mid-range ($1000-$3000)
  - Luxury ($3000+)

#### Step 5: Completion
- Success message: "Profile complete!"
- Subtitle: "Ready to explore the world"
- CTA: "Start Exploring" → navigates to Home

---

### 2. Auth Screens (Login/Signup)

#### Signup Screen
- Header: "Create Account"
- Form fields:
  - Full Name (text input)
  - Email (email input)
  - Password (password input with show/hide toggle)
  - Confirm Password (password input)
- CTA: "Sign Up" button (Deep Indigo)
- Footer: "Already have an account? Log In" (link)
- Error handling: Display validation errors below each field

#### Login Screen
- Header: "Welcome Back"
- Form fields:
  - Email (email input)
  - Password (password input with show/hide toggle)
- CTA: "Log In" button (Deep Indigo)
- Footer: "Don't have an account? Sign Up" (link)
- "Forgot Password?" link (optional for Phase 1)

---

### 3. Home Screen (Dashboard)

**Purpose:** Central hub showing upcoming trips and personalized content.

#### Layout Structure (Top to Bottom)

1. **Header Section**
   - Greeting: "Hello, [First Name]!" (H2)
   - Date/time indicator (optional)

2. **Quick Stats (Optional Cards)**
   - Upcoming trips count
   - Next trip date
   - Total trips planned

3. **Upcoming Trips Section**
   - Title: "Upcoming Trips" (H3)
   - Trip cards (horizontal scroll or vertical list):
     - Trip image/placeholder
     - Trip name
     - Dates (e.g., "Mar 15 - Mar 22")
     - Destination
     - Status badge (e.g., "In Planning", "Confirmed")
   - Empty state: "No upcoming trips. Start planning your next adventure!" + "Create Trip" button

4. **Quick Actions**
   - "Create New Trip" button (Primary, Deep Indigo)
   - "Explore Destinations" button (Secondary, outline)

5. **Suggested Destinations (Optional)**
   - Title: "Trending Now" (H3)
   - Destination cards (3-4 items):
     - Image placeholder
     - Destination name
     - Brief description
     - "Explore" link

---

### 4. Search Screen

**Purpose:** Discover destinations and browse trips.

#### Layout Structure

1. **Search Bar**
   - Placeholder: "Search destinations, trips..."
   - Icon: Magnifying glass
   - Expandable on focus

2. **Filter/Sort Options** (collapsible)
   - Filter by: Traveler type, interests, budget, dates
   - Sort by: Popularity, newest, trending

3. **Results Section**
   - Grid or list view toggle
   - Destination/trip cards:
     - Image
     - Name
     - Description
     - Rating (stars, optional)
     - "View Details" action

4. **Empty State**
   - "No results found. Try adjusting your filters."

---

### 5. Trips Screen

**Purpose:** View and manage user's trips.

#### Layout Structure

1. **Tabs**
   - Active Trips
   - Planned Trips
   - Completed Trips

2. **Trip List**
   - Trip cards:
     - Trip name
     - Dates
     - Destination
     - Progress indicator (for active trips)
     - Status badge
     - Quick actions (edit, delete, share)

3. **Empty State**
   - "No trips yet. Create your first trip!" + "Create Trip" button

---

### 6. Profile Screen

**Purpose:** User account, settings, and preferences.

#### Layout Structure

1. **User Profile Section**
   - Avatar (placeholder or user image)
   - Name
   - Email
   - "Edit Profile" button

2. **Traveler Profile**
   - Traveler type
   - Interests (displayed as tags)
   - "Edit Preferences" button

3. **Settings Sections**
   - Notifications (toggle)
   - Dark Mode (toggle)
   - Language (dropdown)
   - Currency (dropdown)

4. **Account Actions**
   - "Change Password" button
   - "Logout" button (secondary)
   - "Delete Account" button (destructive, red)

---

## Design System Components

### LumeButton

**Props:**
- `variant`: "primary" | "secondary" | "outline" | "ghost" | "destructive"
- `size`: "sm" | "md" | "lg"
- `disabled`: boolean
- `loading`: boolean
- `onPress`: () => void
- `children`: ReactNode

**Variants:**
- **Primary:** Deep Indigo background, white text, rounded corners (8px)
- **Secondary:** Light Gray background, text primary, rounded corners
- **Outline:** Transparent background, Deep Indigo border, Deep Indigo text
- **Ghost:** Transparent background, text primary, no border
- **Destructive:** Error red background, white text

**Sizes:**
- **sm:** 12px padding, 14px font
- **md:** 16px padding, 16px font (default)
- **lg:** 20px padding, 18px font

---

### LumeCard

**Props:**
- `variant`: "default" | "elevated" | "outlined"
- `onPress`: () => void (optional)
- `children`: ReactNode

**Variants:**
- **Default:** Light Gray background, no border, subtle shadow
- **Elevated:** White background, subtle shadow (2-4px offset)
- **Outlined:** White background, Light Gray border (1px)

**Styling:**
- Border radius: 12px
- Padding: 16px (default)
- Shadow: 0 2px 8px rgba(0, 0, 0, 0.1)

---

### LumeInput

**Props:**
- `placeholder`: string
- `value`: string
- `onChangeText`: (text: string) => void
- `type`: "text" | "email" | "password" | "number"
- `error`: string (optional)
- `label`: string (optional)
- `disabled`: boolean
- `multiline`: boolean

**Styling:**
- Border radius: 8px
- Border: 1px Light Gray
- Padding: 12px 16px
- Font: 16px, Inter
- Focus state: Deep Indigo border (2px)
- Error state: Error red border, error message below
- Disabled state: Light Gray background, opacity 0.5

---

## User Flows

### Flow 1: First-Time User
1. App launches → Onboarding (5 steps)
2. Completes onboarding → Redirected to Signup
3. Signs up → Redirected to Home
4. Home screen shows empty state with "Create Trip" CTA

### Flow 2: Returning User (Logged In)
1. App launches → Auth check (token validation)
2. Valid token → Home screen with upcoming trips
3. Invalid/expired token → Login screen

### Flow 3: Create a Trip (Future Phase)
1. User taps "Create Trip" on Home
2. Trip creation form (destination, dates, interests)
3. Trip saved → Trips screen updated
4. Trip appears on Home screen

### Flow 4: Explore Destinations
1. User taps "Search" tab
2. Browses or searches destinations
3. Taps destination → Detail screen (future)
4. Can save to trips or share

---

## Interaction & Feedback

### Press Feedback
- **Buttons:** Scale to 0.97 + haptic light feedback
- **Cards:** Opacity to 0.7 on press
- **Icons:** Opacity to 0.6 on press

### Loading States
- Buttons show spinner + disabled state
- Screens show skeleton loaders or spinners

### Error Handling
- Toast notifications for errors (bottom of screen)
- Form validation errors below input fields
- Empty states with helpful CTAs

### Success Feedback
- Toast notification (green, checkmark icon)
- Haptic success feedback (if available)

---

## Accessibility

- Minimum touch target: 44x44 points
- Color contrast: WCAG AA (4.5:1 for text)
- Font sizes: Minimum 14px for body text
- Labels for all form inputs
- Semantic HTML/React Native components
- Screen reader support (VoiceOver on iOS, TalkBack on Android)

---

## Responsive Considerations

- **Portrait orientation (9:16):** Primary design target
- **Safe area handling:** Account for notch, home indicator
- **Tab bar:** Fixed at bottom, 56px height + safe area inset
- **Content:** Scrollable when exceeds screen height
- **Padding:** 16px horizontal margins, 12-16px vertical spacing

---

## Next Steps

1. Implement LumeButton, LumeCard, LumeInput components
2. Build Onboarding flow (5 screens)
3. Build Auth screens (Signup/Login)
4. Build Home screen with placeholder trips
5. Build bottom tab navigation
6. Integrate JWT auth with backend
7. Connect to PostgreSQL via Prisma
