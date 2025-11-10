# 🔄 Real-Time Data Sync - Visual Guide

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    PORTFOLIO SYSTEM ARCHITECTURE                 │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                      ADMIN PANEL                             │
│                   (Port 3001)                                │
│                                                              │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐     │
│  │ About Mgr   │  │ Project Mgr  │  │ Skill Manager  │     │
│  └──────┬──────┘  └──────┬───────┘  └────────┬───────┘     │
│         │                 │                    │              │
│         └─────────────────┼────────────────────┘              │
│                           │                                   │
│                    User Clicks "Save"                         │
│                           │                                   │
│                    ┌──────▼──────┐                           │
│                    │ POST/PUT API │                          │
│                    └──────┬───────┘                          │
│                           │                                   │
│                    ┌──────▼────────────────┐                 │
│                    │ notifyPortfolioUpdate │                 │
│                    │  (Broadcast Change)   │                 │
│                    └──────┬────────────────┘                 │
│                           │                                   │
└───────────────────────────┼──────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                │   Broadcasting       │
                │   - localStorage     │
                │   - Custom Events    │
                └───────────┬───────────┘
                            │
┌───────────────────────────┼──────────────────────────────────┐
│                           │                                   │
│                    ┌──────▼──────────────┐                   │
│                    │ DataUpdateContext   │                   │
│                    │ (Listens to events) │                   │
│                    └──────┬───────────────┘                  │
│                           │                                   │
│    PORTFOLIO WEBSITE      │                                   │
│    (Port 3000)            │                                   │
│                    ┌──────▼──────────────┐                   │
│                    │  useAPI Hook        │                   │
│                    │  (Checks if should  │                   │
│                    │   refresh)          │                   │
│                    └──────┬───────────────┘                  │
│                           │                                   │
│                           ├─► About Component ✓ Updates      │
│                           ├─► Skills Component ✓ Updates     │
│                           ├─► Projects Component ✓ Updates   │
│                           └─► Experience Component ✓ Updates │
│                                                              │
│                    ✅ UI Re-renders with                     │
│                       New Data                               │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## Data Flow Sequence

```
┌─────────────────────────────────────────────────────────────┐
│          Step-by-Step Data Flow (What Happens)              │
└─────────────────────────────────────────────────────────────┘

1. ADMIN MAKES CHANGE
   ┌──────────────────────────┐
   │ User edits project title │
   │ and clicks "Save"        │
   └────────┬─────────────────┘
            │
            ▼

2. API CALL
   ┌──────────────────────────┐
   │ POST /api/projects/{id}  │
   │ with updated data        │
   └────────┬─────────────────┘
            │
            ▼

3. BACKEND SAVES
   ┌──────────────────────────┐
   │ Database updated with    │
   │ new project data         │
   └────────┬─────────────────┘
            │
            ▼

4. ADMIN BROADCASTS
   ┌──────────────────────────┐
   │ notifyPortfolioUpdate    │
   │ ('projects')             │
   └────────┬─────────────────┘
            │
            ▼

5. BROADCAST STORAGE EVENT
   ┌──────────────────────────┐
   │ localStorage.setItem(    │
   │  'portfolio_data_change' │
   │  { changeType: 'projects'│
   │    timestamp: now }      │
   │ )                        │
   └────────┬─────────────────┘
            │
            ▼

6. FRONTEND CONTEXT LISTENS
   ┌──────────────────────────┐
   │ DataUpdateContext        │
   │ "storage" event listener │
   │ triggers callback        │
   └────────┬─────────────────┘
            │
            ▼

7. COMPONENT REFRESH TRIGGERED
   ┌──────────────────────────┐
   │ useAPI hook detects      │
   │ change event for         │
   │ 'projects'               │
   └────────┬─────────────────┘
            │
            ▼

8. API REFETCH
   ┌──────────────────────────┐
   │ GET /api/projects        │
   │ Fetch fresh data         │
   └────────┬─────────────────┘
            │
            ▼

9. DATA UPDATE
   ┌──────────────────────────┐
   │ Projects array updated   │
   │ with fresh data          │
   └────────┬─────────────────┘
            │
            ▼

10. UI RE-RENDER
    ┌──────────────────────────┐
    │ React re-renders         │
    │ Projects component       │
    │ with new data            │
    └────────┬─────────────────┘
             │
             ▼

✅ SUCCESS - User sees updated project on portfolio!
   (All within 1-2 seconds)
```

## Component Communication

```
Admin Panel                    localStorage               Portfolio
    │                                 │                        │
    ├─ AboutManager         ════════╪════════════════════┤   About.tsx
    │   broadcasts 'about'                               │
    │                                 │                  │
    ├─ ProjectManager       ════════╪════════════════════┤   Projects.tsx
    │   broadcasts 'projects'          │                 │
    │                                 │                  │
    ├─ SkillManager         ════════╪════════════════════┤   Skills.tsx
    │   broadcasts 'skills'            │                 │
    │                                 │                  │
    ├─ ExperienceManager    ════════╪════════════════════┤   Experience.tsx
    │   broadcasts 'experiences'       │                 │
    │                                 │                  │
    │  All Managers ────────────────────┤                 │
    │  import:                         │                 │
    │  notifyPortfolioUpdate           │  DataUpdateContext listens
    │  from broadcast utils            │  useAPI hook refreshes
    │                                 │  Components re-render
    │                                 │
    └─────────────────────────────────────────────────────┘
```

## Which Components Auto-Update?

```
DATA TYPE       ADMIN MANAGER           PORTFOLIO COMPONENT
═══════════════════════════════════════════════════════════
About Info  ──► AboutManagerNew    ──► About.tsx
            (saves & broadcasts)       (listens & updates)

Highlights  ──► AboutManagerNew    ──► About.tsx
            (saves & broadcasts)       (listens & updates)

Skills      ──► SkillManager       ──► Skills.tsx
            (saves & broadcasts)       (listens & updates)

Projects    ──► ProjectManager     ──► Projects.tsx
            (saves & broadcasts)       (listens & updates)

Experience  ──► ExperienceManager  ──► Experience.tsx
            (saves & broadcasts)       (listens & updates)
```

## Browser Events Flow

```
┌─────────────────────────────────────────────────────────┐
│         HOW EVENTS PROPAGATE (Technical View)           │
└─────────────────────────────────────────────────────────┘

ADMIN PANEL (Window/Tab 1)
├─ Saves Data
├─ Calls: notifyPortfolioUpdate('projects')
├─ Function does:
│  ├─ localStorage.setItem('portfolio_data_change', {...})
│  └─ window.dispatchEvent(new CustomEvent(...))
│
├─ Triggers TWO events:
│  ├─ storage event (for other windows/tabs)
│  └─ custom event (for same window listeners)
│
└─ Broadcast complete ✓


PORTFOLIO (Window/Tab 2)
├─ Has DataUpdateContext Provider at root
├─ Context registered storage event listener
├─ Detects: "Hey, storage changed!"
├─ Checks key: "portfolio_data_change"
├─ Parses: changeType = 'projects'
├─ Calls all registered listeners
├─ Each useAPI hook checks if it should refresh
├─ Matching hooks call API to refetch
├─ Components re-render with new data
│
└─ Update complete ✅


SAME WINDOW (Both in one tab)
├─ Custom event triggers immediately
├─ DataUpdateContext listener catches it
├─ Same process as above
│
└─ No storage event needed (already in same memory)
```

## Real-Time Sync Timeline

```
Timeline (in seconds):

0.0s ────┬─────────────────────────────────────────────────────
         │
         ├─► User clicks "Save" in Admin
         │
0.2s ────┤─► API request sent to backend
         │
0.4s ────┤─► Backend saves to database
         │
0.5s ────┤─► notifyPortfolioUpdate() called
         │
0.6s ────┤─► Event broadcast via localStorage
         │
0.7s ────┤─► DataUpdateContext listener triggered
         │
0.8s ────┤─► useAPI hook detects 'projects' change
         │
0.9s ────┤─► API request for fresh data (GET /projects)
         │
1.1s ────┤─► Backend responds with new data
         │
1.2s ────┤─► Component state updated with new data
         │
1.3s ────┤─► React re-renders Projects component
         │
1.4s ────┼─► ✅ USER SEES CHANGES ON PORTFOLIO!
         │
         └─► Total time: ~1.4 seconds (perception: instant!)
```

## Code Integration Points

```
ADMIN SIDE Integration:

import { notifyPortfolioUpdate } from './utils/dataUpdateBroadcast';

const handleSave = async () => {
  const result = await api.save(data);
  notifyPortfolioUpdate('projects');  // ← This line!
};


FRONTEND SIDE Integration:

import { useAPI } from './hooks/useAPI';

const MyComponent = () => {
  const { data } = useAPI(
    fetchFunction,
    fallbackData,
    { refreshOn: ['projects'] }  // ← This line!
  );
};


CONTEXT SETUP:

import { DataUpdateProvider } from './contexts/DataUpdateContext';

function App() {
  return (
    <DataUpdateProvider>  {/* ← Wrap entire app */}
      <Routes>...</Routes>
    </DataUpdateProvider>
  );
}
```

## Troubleshooting Flowchart

```
┌─ Is admin updating?
│
├─ YES ─► Is portfolio showing changes?
│         │
│         ├─ NO ──► Check browser console
│         │        │
│         │        ├─ See "[Admin Broadcast]" messages?
│         │        │  ├─ NO: Admin not broadcasting
│         │        │  │       Add notifyPortfolioUpdate()
│         │        │  │
│         │        │  └─ YES: Check portfolio listening
│         │        │        Portfolio console should show:
│         │        │        "[useAPI] Refreshing..."
│         │        │
│         │        ├─ Check API responding
│         │        │  GET /api/projects should return data
│         │        │
│         │        └─ Hard refresh portfolio (Ctrl+Shift+R)
│         │
│         └─ YES ──► ✅ System working correctly!
│
└─ NO ──► Check admin not crashing
         Check API errors
         Verify backend running
```

## Summary Infographic

```
┌──────────────────────────────────────────────────────────┐
│          REAL-TIME DATA SYNC IN ONE PICTURE              │
└──────────────────────────────────────────────────────────┘

        ADMIN EDITS               BROADCAST CHANGE
        DATA                      EVENT
            │                            │
            ▼                            ▼
        ┌────────┐              ┌──────────────┐
        │ Admin  │─────────────>│ localStorage │
        │ Panel  │  Save to DB  │ & custom     │
        └────────┘              │ events       │
                                └──────┬───────┘
                                       │
                                       ▼
                                  ┌──────────┐
                                  │ Portfolio│
                                  │ Listens  │
                                  └────┬─────┘
                                       │
                                  ┌────▼─────┐
                                  │Refresh   │
                                  │ Data     │
                                  └────┬─────┘
                                       │
                                       ▼
                                  ┌──────────┐
                                  │ ✅ UI    │
                                  │ Updates! │
                                  └──────────┘

NO MANUAL REFRESH NEEDED! 🎉
```

---

This visual guide helps understand how the real-time sync system works from multiple perspectives!
