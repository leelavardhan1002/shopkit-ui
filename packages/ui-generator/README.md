# UI Generator

A Plop.js-based generator for creating UI components and Storybook stories in the Shopkit Turborepo.

## Usage

### From Root Directory

```bash
# Generate UI components or Storybook stories
yarn generate:ui
```

### From ui-core Package

```bash
# Generate components directly from ui-core
yarn generate:component
```

### From ui-generator Package

```bash
cd packages/ui-generator
yarn generate
```

## What it generates

### UI Component
- Component file (`ComponentName.tsx`)
- Styled component file (`ComponentName.style.ts`)
- Types file (`types.ts`)
- Index file (`index.ts`)
- Updates main `src/index.ts` with export

### Storybook
- Story file in `apps/docs/stories/ComponentName.stories.tsx`

## File Structure

Generated components follow this structure:
```
packages/ui-core/src/
└── ComponentName/
    ├── ComponentName.tsx
    ├── ComponentName.style.ts
    ├── types.ts
    └── index.ts
```

Storybook files are generated in:
```
apps/docs/stories/
└── ComponentName.stories.tsx
```