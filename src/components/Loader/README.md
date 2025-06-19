# Loader Component

A customizable 3D spinning cube loader component for the application.

## Components

### Loader (Basic)
- `~/components/Loader/index.tsx` - Basic loader with fixed styling
- Used for simple loading states

### LoaderAdvanced (Customizable)
- `~/components/Loader/LoaderAdvanced.tsx` - Advanced loader with customization options
- Used for page-specific loading states with custom messages

## Props (LoaderAdvanced)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `string` | `'Loading...'` | Text message displayed below spinner |
| `backgroundColor` | `string` | `'#000'` | Background color of the overlay |
| `spinnerColor` | `string` | `'#57B9C2'` | Color of the spinner border (theme teal) |
| `size` | `number` | `44` | Size of the spinner in pixels |

## Usage

### Basic Loader
```tsx
import Loader from '~/components/Loader';

export default function Loading() {
  return <Loader />;
}
```

### Advanced Loader with Custom Message
```tsx
import Loader from '~/components/Loader/LoaderAdvanced';

export default function Loading() {
  return <Loader message="Loading Community..." />;
}
```

### Advanced Loader with Custom Styling
```tsx
import Loader from '~/components/Loader/LoaderAdvanced';

export default function Loading() {
  return (
    <Loader 
      message="Loading Dashboard..." 
      backgroundColor="#000"
      spinnerColor="#ff4d00"
      size={60}
    />
  );
}
```

## Implementation

The loader is implemented in the following loading.tsx files:
- `/src/app/loading.tsx` - Root level loading
- `/src/app/community/loading.tsx` - Community page loading
- `/src/app/team/loading.tsx` - Team page loading
- `/src/app/fyt/loading.tsx` - FYT page loading
- `/src/app/debug/loading.tsx` - Debug page loading

These files are automatically triggered by Next.js when navigating between routes in the app directory structure.
