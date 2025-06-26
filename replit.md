# EspressoTrack

## Overview

EspressoTrack is a full-stack web application for coffee enthusiasts to track and rate their espresso shots. The application allows users to create profiles for different coffee brands, products, and roasts, record detailed brewing parameters, and provide comprehensive feedback on their espresso shots. The system includes both basic ratings and advanced feedback options covering appearance, aroma, taste, body, aftertaste, and extraction timing.

## System Architecture

This is a modern full-stack application built with:

- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js with local strategy and session-based auth
- **UI Components**: shadcn/ui component library built on Radix UI
- **Styling**: Tailwind CSS with custom theme configuration
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing

## Key Components

### Frontend Architecture
- **Component Library**: Uses shadcn/ui components for consistent design
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: TanStack Query for API state, React Context for auth
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom CSS variables for theming

### Backend Architecture
- **API Layer**: Express.js with RESTful endpoints
- **Authentication**: Session-based auth with Passport.js local strategy
- **Database Access**: Drizzle ORM with PostgreSQL
- **Middleware**: Custom logging, authentication guards, and error handling

### Database Schema
- **Users**: Basic user authentication with username/password
- **Profiles**: Comprehensive espresso shot records with brewing parameters
- **Settings**: User preferences for grinder and dosage ranges
- **Sessions**: PostgreSQL session store for authentication

Key profile fields include:
- Basic info: brand, product, roast type
- Brewing parameters: grinder setting, grind amount (dial and grams)
- Feedback: rating system and advanced feedback options
- Advanced feedback: appearance, aroma, taste, body, aftertaste, extraction time

## Data Flow

1. **Authentication Flow**: Users register/login through Passport.js local strategy
2. **Profile Management**: CRUD operations for espresso profiles with user ownership
3. **Settings Management**: User preferences for equipment parameters
4. **Real-time Updates**: TanStack Query handles cache invalidation and updates

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL serverless database
- **ORM**: Drizzle ORM for type-safe database operations
- **UI Components**: Radix UI primitives with shadcn/ui wrapper
- **Authentication**: Passport.js with connect-pg-simple for session storage

### Development Tools
- **Build Tool**: Vite with React plugin
- **Type Checking**: TypeScript with strict configuration
- **Database Migrations**: Drizzle Kit for schema management
- **Theme System**: Custom Replit theme plugin for shadcn/ui

## Deployment Strategy

The application is configured for deployment on Google Cloud Run:

- **Build Process**: Vite builds the frontend, esbuild bundles the backend
- **Environment**: Node.js 20 with PostgreSQL 16
- **Port Configuration**: Backend serves on port 5000, mapped to external port 80
- **Static Files**: Frontend assets served from dist/public directory
- **Database**: Neon PostgreSQL with connection pooling

Development setup uses:
- **Development Server**: tsx for TypeScript execution
- **Hot Reload**: Vite dev server with Express middleware
- **Database**: Local PostgreSQL or Neon connection

## Changelog

```
Changelog:
- June 26, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```