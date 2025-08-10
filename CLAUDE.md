# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DevToolbox is a collection of free online developer tools that run entirely in the browser. The site provides utilities for JSON formatting, Base64 encoding/decoding, hash generation, and more.

## Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **Language**: TypeScript
- **Deployment**: Cloudflare Pages

### Key Features
- All tools run client-side (no server processing)
- Privacy-focused (no data collection)
- Mobile responsive design
- Dark mode support
- SEO optimized

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                 # Next.js 14 app directory
│   ├── tools/          # Tool pages
│   │   ├── json-formatter/
│   │   ├── base64/
│   │   └── hash-generator/
│   ├── about/          # About page
│   ├── privacy/        # Privacy policy
│   ├── terms/          # Terms of service
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   ├── header.tsx     # Site navigation
│   └── theme-*.tsx    # Theme components
└── lib/               # Utilities
    └── utils.ts       # Helper functions
```

## Available Tools

1. **JSON Formatter**: Format, validate, and minify JSON
2. **Base64 Encoder/Decoder**: Encode and decode Base64 strings
3. **Hash Generator**: Generate MD5, SHA-1, SHA-256, SHA-512 hashes

## Adding New Tools

To add a new tool:
1. Create a new folder in `/src/app/tools/[tool-name]/`
2. Create a `page.tsx` with the tool implementation
3. Add the tool to the home page grid in `/src/app/page.tsx`
4. Update navigation in `/src/components/header.tsx`

## Design Principles

1. **Privacy First**: All processing happens in the browser
2. **No Backend**: Pure client-side implementation
3. **Fast & Free**: No registration, no limits
4. **User Experience**: Clean, intuitive interface
5. **Mobile Friendly**: Responsive design for all devices

## SEO Strategy

- Each tool has its own page with unique meta tags
- Descriptive URLs (e.g., `/tools/json-formatter`)
- Detailed tool descriptions and use cases
- Structured content for better indexing

## Important Notes

- No server-side processing or API calls
- No user data collection (except Google Analytics)
- All tools should work offline once loaded
- Focus on developer productivity tools