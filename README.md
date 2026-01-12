# School Single Page Landing Site

Modern, responsive "Coming Soon" page for a new school.  
Built as a fast, lightweight SPA — mobile-first, beautiful on tablets & desktops.

## Tech Stack

- React + Vite + TypeScript
- Tailwind CSS v3.4

## AI assistant (local dev)

This project includes a simple in-app chat assistant UI at the bottom-right. The frontend calls `/api/chat` (POST { message }) to obtain replies. For local development you can run the chat proxy server which forwards requests to OpenAI.

Setup:

- Copy `.env.example` to `.env` and set `OPENAI_API_KEY` with your key.
- Run `npm run api` to start the local proxy: it listens on port 7860 and exposes `/api/chat`.
- Keep `npm run dev` running for the frontend and the proxy in another terminal.

Security: do NOT commit real API keys to the repository. For production deploy the proxy as a serverless function (Vercel/Netlify) or a small backend service.

Model: the proxy uses OpenAI Chat Completions (`gpt-4o-mini`) by default; you can change to another model in `server/chat-proxy.js`.

- Framer Motion (subtle entrance animations)
- No backend — 100% static

## Features

- Fully responsive (mobile → large screens)
- Floating WhatsApp chat button
- Central data file (`schoolInfo.ts`) — easy text/logo updates
- SEO-friendly meta tags ready
- Free forever hosting

## Quick Start (Local Development)

```bash
# 1. Clone or unzip the project
# 2. Install dependencies
npm install

# 3. Start dev server<a href="http://localhost:5173" target="_blank" rel="noopener noreferrer nofollow"></a>
npm run dev
```
