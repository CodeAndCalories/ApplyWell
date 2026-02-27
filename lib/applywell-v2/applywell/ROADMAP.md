# ApplyWell — Roadmap

## MVP (Done ✓)
- [x] Landing page with disclaimers
- [x] Student profile (local storage)
- [x] Entries CRUD (all 10 types)
- [x] Resume preview (2 templates: classic, modern)
- [x] Common App activities editor (150/50 char limits)
- [x] Personal statement brainstorm + outline
- [x] Honesty & Verification step (checkboxes per entry)
- [x] Export page (PDF/DOCX/clipboard stubs)
- [x] AI client abstraction (stub → real swap)
- [x] Demo/seed data mode
- [x] Delete my data button
- [x] Mobile-first responsive design
- [x] Auto-save indicator

---

## Phase 2 — Real AI + PDF Export (1–2 weeks)

### AI Integration
- [ ] Add `/app/api/ai/route.ts` — server-side proxy to OpenAI/Anthropic
- [ ] Swap `aiClient.ts` to call real API via the proxy (keeps keys server-side)
- [ ] Prompt engineering: tuned system prompts for each function
  - Resume bullets: action verbs, metrics, ATS keywords
  - Activity descriptions: 150-char punchy impact statements
  - Essay brainstorm: Socratic, non-fabricating prompts
- [ ] Rate limiting on AI route (KV-based per-IP counter)
- [ ] AI output length validation + retry logic

### PDF Export
- [ ] Install `jspdf` + `html2canvas`
- [ ] Wire up Export page buttons
- [ ] Test ATS parsing (upload to Jobscan or similar to verify)
- [ ] Add DOCX export with `docx.js`
- [ ] Add "Copy to clipboard" for plain text version

### Resume Builder
- [ ] Drag-and-drop section reordering (`@dnd-kit/sortable`)
- [ ] Per-bullet toggle checkboxes in resume preview
- [ ] Inline text editing in preview
- [ ] Font/margin controls

---

## Phase 3 — Auth + Cloud Sync (2–3 weeks)

### Authentication
- [ ] Add Clerk or Auth.js for lightweight auth
- [ ] Magic link email (no password friction for students)
- [ ] Optional — "Continue without account" always available

### Cloud Sync
- [ ] Cloudflare D1 database (schema in `workers/schema.sql`)
- [ ] Cloudflare Worker API for CRUD
- [ ] Sync queue: local-first, push to cloud on connect
- [ ] Conflict resolution (last-write-wins for MVP)
- [ ] Data export on account deletion (GDPR compliance)

### Parent/Counselor Access
- [ ] Shareable read-only link (UUID-based, no auth required for viewer)
- [ ] Parent comment system (stored in D1, visible to student)
- [ ] "Request edit" flow: parent flags entries for student review
- [ ] Parent cannot directly modify entries

---

## Phase 4 — Premium Features (Monetization)

### Pricing Model (suggested)
- **Free tier:** Up to 5 entries, 1 resume template, AI stubs only
- **Student Pro ($12/mo or $49/year):**
  - Unlimited entries
  - Real AI suggestions (GPT-4 / Claude)
  - Both PDF templates + DOCX
  - Unlimited exports
  - Parent sharing
- **School/Counselor ($199/year per counselor):**
  - Manage multiple students
  - Bulk export
  - Progress tracking dashboard

### Implementation
- [ ] Stripe integration for subscriptions
- [ ] Usage tracking in D1 (AI call count per user)
- [ ] Feature flags in middleware

---

## Phase 5 — Polish + Growth

- [ ] Onboarding tour (react-joyride or custom)
- [ ] Email reminders for common app deadlines
- [ ] College-specific activity list guidance
- [ ] Activity bank: searchable examples from past applicants (anonymized)
- [ ] Resume score (readability, ATS compatibility, completeness)
- [ ] A/B test landing page copy
- [ ] SEO: Next.js static pages for "college resume template for high school" etc.
- [ ] Accessibility audit (WCAG 2.1 AA)

---

## Technical Debt to Address

- [ ] Replace inline styles with Tailwind classes throughout
- [ ] Add proper error boundaries
- [ ] Add Playwright e2e tests for verify → export flow
- [ ] Add Vitest unit tests for aiClient, storage helpers, char counters
- [ ] Add Sentry for error monitoring
- [ ] Implement proper logging in Workers

---

## Key Decisions Log

| Decision | Rationale |
|----------|-----------|
| localStorage for MVP | Zero backend, instant deploy, easy demo |
| Static export to Cloudflare Pages | Free tier, global CDN, no cold starts |
| AI proxy via Worker, not client-side | API key security |
| No mandatory auth in MVP | Reduce friction for students |
| Verification step non-skippable | Core honesty promise |
| DM Serif + DM Sans | Warm, editorial feel; not generic |
