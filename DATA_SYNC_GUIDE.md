# Data Sync Implementation Guide

## Overview

The portfolio system now has real-time data synchronization between the admin panel and the frontend portfolio. When you make changes in the admin panel, those changes automatically appear on the portfolio website without requiring a manual refresh.

## How It Works

### Architecture

```
Admin Panel (Edits Data)
    ↓
notifyPortfolioUpdate() broadcasts change
    ↓
localStorage event + custom event
    ↓
Frontend Portfolio (DataUpdateContext listens)
    ↓
useAPI hook detects change event
    ↓
Automatically refreshes data from API
    ↓
UI updates with new data
```

### Key Components

#### 1. **DataUpdateContext** (`src/contexts/DataUpdateContext.tsx`)
- Manages data change listeners in the frontend
- Listens to localStorage events from other tabs/windows
- Provides `useDataUpdate()` hook for components

#### 2. **Data Broadcast Utility** 
- **Frontend**: `src/utils/dataUpdateBroadcast.ts`
- **Admin**: `admin/src/utils/dataUpdateBroadcast.ts`
- Handles localStorage broadcasts across windows/tabs

#### 3. **Enhanced useAPI Hook** (`src/hooks/useAPI.ts`)
- Now accepts `refreshOn` option to specify which data changes trigger refetch
- Automatically refreshes when relevant data changes
- Example: Skills component refreshes when 'skills' data changes

#### 4. **Admin Broadcast Integration**
- **AboutManager**: Broadcasts 'about' and 'highlights' changes
- **ProjectManager**: Broadcasts 'projects' changes
- **SkillManager**: Broadcasts 'skills' changes
- **ExperienceManager**: Broadcasts 'experiences' changes

## Usage in Components

### Frontend - Listening for Changes

```typescript
import { useAPI } from '../hooks/useAPI';

// Component automatically refreshes when projects change
const { data: projects } = useAPI(
  () => projectsAPI.getAll(true),
  fallbackProjects,
  { refreshOn: ['projects'] }  // Listen for 'projects' changes
);
```

### Admin - Broadcasting Changes

```typescript
import { notifyPortfolioUpdate } from '../utils/dataUpdateBroadcast';

const handleSubmit = async (e) => {
  // ... save logic ...
  await projectService.update(id, formData);
  
  // Broadcast change to portfolio
  notifyPortfolioUpdate('projects');
};
```

## Data Change Types

The system supports these data change types:

- `'about'` - About/profile information
- `'highlights'` - Highlights section
- `'experiences'` - Work experience
- `'projects'` - Portfolio projects
- `'skills'` - Skills & expertise
- `'contact'` - Contact information
- `'all'` - Refresh everything

## How to Test

### Scenario 1: Edit About Section
1. Open admin panel (one browser tab)
2. Open portfolio (another browser tab)
3. In admin, edit your title or description
4. Click "Save Changes"
5. ✅ Portfolio title/description updates automatically

### Scenario 2: Add New Project
1. In admin panel, add a new project
2. Click "Save Project"
3. ✅ Portfolio projects section updates immediately

### Scenario 3: Multiple Browser Windows
1. Open admin panel in window 1
2. Open portfolio in window 2
3. Make changes in admin
4. ✅ Portfolio in window 2 updates in real-time

## Technical Details

### How Cross-Window Communication Works

The system uses **localStorage events** to communicate between different browser windows/tabs:

```typescript
// In admin (broadcast)
localStorage.setItem('portfolio_data_change', JSON.stringify({
  changeType: 'projects',
  timestamp: Date.now()
}));

// In frontend (listen)
window.addEventListener('storage', (e) => {
  if (e.key === 'portfolio_data_change') {
    // Trigger refresh
  }
});
```

### Same-Window Communication

For components in the same window, we use custom events:

```typescript
// Dispatch
window.dispatchEvent(new CustomEvent('portfolio-data-change', {
  detail: { changeType: 'projects' }
}));

// Listen
window.addEventListener('portfolio-data-change', handler);
```

## Components Updated

### Frontend
- ✅ `src/App.tsx` - Wrapped with DataUpdateProvider
- ✅ `src/components/About.tsx` - Listens to 'about' and 'highlights'
- ✅ `src/components/Skills.tsx` - Listens to 'skills'
- ✅ `src/components/Projects.tsx` - Listens to 'projects'
- ✅ `src/components/Experience.tsx` - Listens to 'experiences'
- ✅ `src/contexts/DataUpdateContext.tsx` - New context provider
- ✅ `src/hooks/useAPI.ts` - Enhanced with refresh support
- ✅ `src/utils/dataUpdateBroadcast.ts` - New broadcast utility

### Admin
- ✅ `admin/src/components/AboutManagerNew.tsx` - Broadcasts on save
- ✅ `admin/src/components/ProjectManager.tsx` - Broadcasts on save/delete
- ✅ `admin/src/components/SkillManager.tsx` - Broadcasts on save/delete
- ✅ `admin/src/components/ExperienceManager.tsx` - Broadcasts on save/delete
- ✅ `admin/src/utils/dataUpdateBroadcast.ts` - New broadcast utility
- ✅ `admin/src/hooks/useDataBroadcast.ts` - New broadcast hook

## Troubleshooting

### Changes not appearing on portfolio?

1. **Check Console Logs**
   - Admin should show: `[Admin Broadcast] Notifying data change: projects`
   - Frontend should show: `[useAPI] Refreshing data due to projects change`

2. **Verify Both Apps are Running**
   - Admin: http://localhost:3001
   - Frontend: http://localhost:3000

3. **Check Browser Console for Errors**
   - Look for CORS issues or API errors

4. **Hard Refresh Frontend**
   - Press `Ctrl+Shift+R` to clear cache

### Cross-domain Issues?

If admin and portfolio are on different domains:
- localStorage events won't work across domains
- Solution: Add event polling or WebSocket for real-time sync
- For now, localStorage works within same domain

## Future Enhancements

Possible improvements:
- [ ] WebSocket for real-time cross-domain sync
- [ ] API polling with cache invalidation
- [ ] Message queue for offline updates
- [ ] Optimistic updates
- [ ] Redux/Zustand state management
- [ ] Server-sent events (SSE) for real-time updates

## File Structure

```
src/
├── contexts/
│   └── DataUpdateContext.tsx (NEW)
├── utils/
│   └── dataUpdateBroadcast.ts (NEW)
├── hooks/
│   └── useAPI.ts (MODIFIED)
└── components/
    ├── About.tsx (MODIFIED)
    ├── Skills.tsx (MODIFIED)
    ├── Projects.tsx (MODIFIED)
    └── Experience.tsx (MODIFIED)

admin/src/
├── utils/
│   └── dataUpdateBroadcast.ts (NEW)
├── hooks/
│   └── useDataBroadcast.ts (NEW)
└── components/
    ├── AboutManagerNew.tsx (MODIFIED)
    ├── ProjectManager.tsx (MODIFIED)
    ├── SkillManager.tsx (MODIFIED)
    └── ExperienceManager.tsx (MODIFIED)
```

## Summary

The data sync system is now fully integrated! When you edit content in the admin panel, it automatically updates on the portfolio website. This creates a seamless editing experience with instant feedback.

Key benefits:
- ✅ Real-time sync between admin and portfolio
- ✅ Works across browser tabs and windows
- ✅ Automatic data refresh without page reload
- ✅ Clean, event-driven architecture
- ✅ Minimal code changes required
