# Loading System Documentation

This application now has a comprehensive loading system that shows the 3D cube loader in different scenarios.

## Components Overview

### 1. **Basic Loader** (`~/components/Loader/index.tsx`)
- Theme-appropriate 3D spinning cube
- Teal color (`#57B9C2`) with glow effect
- Used as the core loading component

### 2. **Advanced Loader** (`~/components/Loader/LoaderAdvanced.tsx`)
- Customizable version with props
- Supports custom messages, colors, and sizes

### 3. **InitialLoader** (`~/components/InitialLoader/index.tsx`)
- Handles page refresh and initial load scenarios
- Uses sessionStorage to track if page has been loaded
- Shows for 1.2 seconds on refresh/initial load

### 4. **Route Loading** (`loading.tsx` files)
- Handles navigation between routes
- Located in each route directory
- Automatically triggered by Next.js app router

## Loading Scenarios Covered

### ✅ **Page Refresh/Initial Load**
- **Component**: `InitialLoader`
- **Location**: Root layout
- **Duration**: 1.2 seconds
- **Trigger**: Page refresh (F5) or initial visit

### ✅ **Route Navigation**
- **Component**: Route-specific `loading.tsx` files
- **Location**: Each route directory
- **Duration**: Varies based on page load time
- **Trigger**: Navigation between pages

### ✅ **Custom Loading States**
- **Component**: `LoadingProvider` + `useLoadingControl` hook
- **Location**: Available for manual use
- **Duration**: Customizable
- **Trigger**: Manual API calls, form submissions, etc.

## File Structure

```
src/
├── components/
│   ├── Loader/
│   │   ├── index.tsx              # Basic loader
│   │   ├── LoaderAdvanced.tsx     # Advanced loader with props
│   │   └── README.md              # Component documentation
│   ├── InitialLoader/
│   │   └── index.tsx              # Page refresh loader
│   ├── GlobalLoader/              # (Alternative implementation)
│   │   └── index.tsx
│   └── PageLoader/                # (Alternative implementation)
│       └── index.tsx
├── providers/
│   └── LoadingProvider.tsx        # Context provider for manual control
├── hooks/
│   └── useLoadingControl.ts       # Hook for manual loading control
└── app/
    ├── layout.tsx                 # Root layout with InitialLoader
    ├── loading.tsx                # Root route loading
    ├── community/
    │   └── loading.tsx            # Community page loading
    ├── team/
    │   └── loading.tsx            # Team page loading
    ├── fyt/
    │   └── loading.tsx            # FYT page loading
    └── debug/
        └── loading.tsx            # Debug page loading
```

## Usage Examples

### Manual Loading Control (Optional)
```tsx
import { useLoadingControl } from '~/hooks/useLoadingControl';

function MyComponent() {
  const { showLoading, startLoading, stopLoading } = useLoadingControl();

  const handleSubmit = async () => {
    startLoading();
    try {
      await submitForm();
    } finally {
      stopLoading();
    }
  };

  return <button onClick={handleSubmit}>Submit</button>;
}
```

### Custom Route Loading
```tsx
// In any route's loading.tsx file
import Loader from '~/components/Loader/LoaderAdvanced';

export default function Loading() {
  return <Loader message="Loading Custom Page..." />;
}
```

## Technical Implementation

### Session Storage Tracking
- Uses `sessionStorage.getItem('hasLoaded')` to track initial loads
- Prevents loader from showing on every navigation
- Resets when browser tab/window is closed

### Performance Navigation API
- Uses `performance.getEntriesByType('navigation')` to detect page refreshes
- Differentiates between refresh and navigation

### Next.js App Router Integration
- `loading.tsx` files are automatically used by Next.js
- Works seamlessly with server-side rendering
- Client-side navigation is handled separately

## Browser Support
- Modern browsers supporting ES6+
- Performance Navigation API (supported in all modern browsers)
- SessionStorage (widely supported)

## Customization
All loaders can be customized with:
- Custom colors matching your theme
- Different animation durations
- Custom messages
- Different sizes
- Background overlays
