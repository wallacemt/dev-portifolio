# Copilot Instructions - Portfolio Website

## Architecture Overview

This is a **Next.js 15+ multilingual portfolio** with App Router, TypeScript, and Tailwind CSS. The project follows a dynamic routing pattern with internationalization at `/watch/[language]/*` and uses external API integration for content management.

### Key Structural Patterns

- **Dynamic Language Routing**: All main routes live under `/watch/[language]/` with middleware auto-redirecting root to `/watch/pt/`
- **Context-Driven State**: `LanguageContext` and `OwnerContext` provide global state using cookies and API data
- **API-First Content**: All content (owner info, projects, skills) fetched from external API via services in `src/services/`
- **Component Hierarchy**: `blocks/` for reusable UI components, `components/Visitor/` for page-specific sections

## Development Workflows

### Commands

- `npm run dev` - Development with Turbopack (preferred)
- `npm run build` - Production build
- Environment variables: `API_URL` and `OWNER_ID` required

### File Organization

```
src/
├── app/[routes]           # Next.js App Router pages
├── blocks/                # Reusable UI components (SpotlightCard, TiltedCard, etc.)
├── components/Visitor/    # Page-specific sections (Header, Projects, Skills)
├── contexts/              # React contexts for language and owner data
├── services/              # API integration layer
├── types/                 # TypeScript interfaces
└── lib/                   # Utilities (axios config, utils)
```

## Critical Patterns

### Language System

- Language switching updates cookies and redirects to new URL: `/watch/{lang}/path`
- `LanguageContext` manages current language state and loading
- All API calls include `language` parameter for localized content
- Middleware handles root redirects based on cookie preference

### API Integration

- Axios instance in `src/lib/axios.ts` with 30s timeout and retry logic
- Services follow pattern: `get{Resource}(language?: string)` returning typed responses
- Error handling at service level, not component level
- Environment-based configuration for API URL and owner ID

### UI Component Conventions

- Use `"use client"` for interactive components
- Custom variants with `class-variance-authority` for consistent styling
- Framer Motion for animations, GSAP for complex sequences
- Radix UI primitives for accessible components
- CSS custom properties for theming (defined in `globals.css`)

### Styling Approach

- Tailwind CSS with custom design tokens in CSS variables
- Dark theme by default with custom color palette (`--Destaque`, `--neutral10`, etc.)
- `clsx` and `tailwind-merge` for conditional styling
- Custom fonts: Aclonica (titles), Lato (body), Share Tech Mono (code), Roboto (buttons)

## Integration Points

### External Dependencies

- **Content API**: Fetches owner profile, projects, skills via REST endpoints
- **Cloudinary**: Image hosting for avatars and project screenshots
- **Cookies**: Language preferences persistence
- **Three.js/React Three Fiber**: 3D components in blocks

### Component Communication

- Parent-to-child via props (typed interfaces)
- Global state via React contexts
- URL state for language and routing
- Cookie state for user preferences

## Key Files for Context

- `src/app/watch/[language]/layout.tsx` - Main language wrapper
- `src/middleware.ts` - Root redirect logic
- `src/contexts/LanguageContext.tsx` - Language state management
- `src/services/*.ts` - API integration patterns
- `src/types/*.ts` - Complete type definitions
- `src/app/globals.css` - Custom CSS variables and theming

When making changes, always consider the multilingual nature, maintain type safety, and follow the established service → context → component pattern for data flow.
