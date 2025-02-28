# CLAUDE.md - Frontend Development Guidelines

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code linting

## Project Structure
- Next.js App Router with TypeScript
- MongoDB with Prisma ORM
- Authentication via NextAuth.js
- UI components from shadcn/ui
- Form validation with Zod and react-hook-form
- Data fetching with TanStack React Query

## Code Style Guidelines
- Use TypeScript with strict type checking
- Follow path aliasing (`@/*` maps to `./src/*`)
- React components: Use named exports for reusable components, default exports for page components
- Use client-side rendering with "use client" directive when necessary
- Error handling: Return null with try/catch in data fetching functions
- Prefer React Query for data fetching and mutations
- Keep components small and focused on a single responsibility
- Use Zod schemas for form validation and type definitions
- Implement proper loading and error states
- Follow path-based routing as per Next.js App Router convention

## Component Patterns
- Use shadcn/ui components for consistent UI
- Folder structure: Group related files by feature/domain
- Implement responsive design with Tailwind CSS
- Separate business logic from UI components where possible