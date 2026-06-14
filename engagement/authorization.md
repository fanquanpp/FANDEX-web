# Engagement Authorization

## Target

- **URL:** https://fanquanpp.github.io/FANDEX/
- **Type:** Static site (Astro 5 SSG) hosted on GitHub Pages
- **IP:** Resolved via GitHub Pages CDN

## Authorization

- **Basis:** Site owner (fanquanpp) explicitly authorized testing
- **Operator:** fanquanpp
- **Authorization keyword:** "authorized" (provided 2026-06-14)
- **Engagement window:** 2026-06-14, up to 4 hours

## Scope

- fanquanpp.github.io (FANDEX subpath only)
- All subpages under /FANDEX/
- Service Worker (sw.js)
- Client-side JavaScript

## Out of Scope

- GitHub infrastructure (api.github.com, etc.)
- Third-party CDN resources (fonts, KaTeX CSS)
- Other sites on fanquanpp.github.io
- Production data modification (N/A - static site)

## Notes

- This is a pure static site with no server-side logic, database, or authentication
- Testing focuses on: security headers, information disclosure, client-side vulnerabilities, SW security, CSP, sensitive file exposure
