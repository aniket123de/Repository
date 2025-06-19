# Loading System Documentation

This application now has a comprehensive loading system that shows the 3D cube loader on every page refresh and navigation.

## Components Overview

### 1. **Basic Loader** (`~/components/Loader/index.tsx`)
- Theme-appropriate 3D spinning cube
- Teal color (`#57B9C2`) with glow effect
- Used as the core loading component

### 2. **Advanced Loader** (`~/components/Loader/LoaderAdvanced.tsx`)
- Customizable version with props
- Supports custom messages, colors, and sizes

### 3. **PageRefreshLoader** (`~/components/PageRefreshLoader/index.tsx`) ⭐
- **NEW**: Handles all refresh scenarios reliably
- Shows on every component mount (refresh, initial load, navigation)
- Simple and bulletproof approach
- Used in individual page layouts

### 4. **Route Loading** (`loading.tsx` files)
- Handles navigation between routes
- Located in each route directory
- Automatically triggered by Next.js app router

## Loading Scenarios Covered

### ✅ **Page Refresh/Initial Load** (FIXED)
- **Component**: `PageRefreshLoader` in each layout
- **Location**: Individual page layouts
- **Duration**: 1.2 seconds
- **Trigger**: Every page refresh (F5), initial visit, browser navigation

### ✅ **Route Navigation**
- **Component**: Route-specific `loading.tsx` files
- **Location**: Each route directory
- **Duration**: Varies based on page load time
- **Trigger**: Navigation between pages

## Implementation Details

### Refresh Loading Implementation:
```tsx
// In each page layout (fyt, team, community, home)
import PageRefreshLoader from '~/components/PageRefreshLoader';

export default function PageLayout({ children }) {
  return (
    <>
      <PageRefreshLoader pageName="Page Name" />
      {children}
    </>
  );
}
```

### Pages with Refresh Loading:
- ✅ **Home Page** (`/`) - "Loading Repository..."
- ✅ **FYT Page** (`/fyt`) - "Loading FYT..." 
- ✅ **Team Page** (`/team`) - "Loading Team..."
- ✅ **Community Page** (`/community`) - "Loading Community..."

## File Structure

```
src/
├── components/
│   ├── Loader/
│   │   ├── index.tsx              # Basic loader
│   │   ├── LoaderAdvanced.tsx     # Advanced loader with props
│   │   └── README.md              # Component documentation
│   ├── PageRefreshLoader/         # ⭐ NEW - Main refresh loader
│   │   └── index.tsx
│   ├── RefreshLoader/             # Alternative implementation
│   │   └── index.tsx
│   └── InitialLoader/             # Legacy implementation
│       └── index.tsx
└── app/
    ├── page.tsx                   # Home page with PageRefreshLoader
    ├── loading.tsx                # Root route loading
    ├── community/
    │   ├── layout.tsx             # ⭐ NEW - With PageRefreshLoader
    │   └── loading.tsx            # Community page loading
    ├── team/
    │   ├── layout.tsx             # ⭐ Updated - With PageRefreshLoader
    │   └── loading.tsx            # Team page loading
    ├── fyt/
    │   ├── layout.tsx             # ⭐ Updated - With PageRefreshLoader
    │   └── loading.tsx            # FYT page loading
    └── debug/
        └── loading.tsx            # Debug page loading
```

## How It Works

### PageRefreshLoader Logic:
1. **Component mounts** when page loads/refreshes
2. **Sets loading state** to `true` immediately
3. **Shows loader** for specified duration (1.2s default)
4. **Hides loader** after timeout
5. **Covers all scenarios**: refresh, initial load, direct navigation

### Why This Approach Works:
- ✅ **Simple and reliable** - no complex detection logic
- ✅ **Always triggers** - every component mount shows loader
- ✅ **Consistent duration** - predictable user experience
- ✅ **No race conditions** - straightforward implementation
- ✅ **Works with SSR** - client-side only, no hydration issues

## Browser Support
- Modern browsers supporting ES6+
- React 18+ with Next.js 13+ app router
- No external dependencies beyond styled-components

## Customization
```tsx
<PageRefreshLoader 
  pageName="Custom Page" 
  duration={1500}  // 1.5 seconds
/>
```
