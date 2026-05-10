# FlexPrice Component Library Storybook

A hosted Storybook component library extracted from the [FlexPrice](https://admin.flexprice.io) frontend, built as part of the take-home assignment.

**Live Storybook →** [flexprice-front-storybook](https://flexprice-front-storybook-ten.vercel.app/)

---

## Approach

### Exploration First
Before writing a single story, I signed up at `admin.flexprice.io` and walked through every page, Dashboard, Plans, Customers, Subscriptions, Invoices, Credits, Revenue. I noted every distinct UI pattern: status chips, metric KPI cards, empty states, data tables, the sidebar nav structure, and pricing tier displays.

I then explored `src/components/` to map what already existed vs. what needed to be built from scratch.

### Strategy: Document vs. Rebuild
The assignment distinguishes between two cases:

- **Existing atoms** (Button, Chip, Input, Select, Tooltip, Progress, Checkbox, Dialog, Loader, DateRangePicker) → wrote Storybook stories that document the real component with all variants, controls, and interaction tests
- **Complex organisms with heavy dependencies** (SidebarNav, EmptyState, PricingTierTable) → built self-contained replicas that are visually faithful to the real app but free of router/API/auth dependencies, so they render correctly in isolation

This is the same pattern used by production design systems like PostHog and Radix.

### Component Coverage (15 components)

**Atoms**
| Component | Stories | Notes |
|---|---|---|
| `Button` | 12 | All 7 variants, 4 sizes, loading, disabled, icon variants |
| `Input` | 6 | Label, error, disabled, full width, with value |
| `Chip` | 10 | All 5 variants, with icons, real-world status sets |
| `Select` | 10 | Label, error, radio style, icons, controlled |
| `Tooltip` | 8 | All 4 sides, delay, rich content, on icons |
| `Loader` | 4 | Inline, full page, inside card, inside table |
| `Progress` | 8 | 0–100%, usage levels, colour variants, meter dashboard |
| `Checkbox` | 6 | Checked, unchecked, with description, controlled |
| `Dialog` | 4 | Default, confirmation, no close button, with form |
| `DateRangePicker` | 6 | Default, pre-selected, with title, disabled, min/max |

**Molecules**
| Component | Stories | Notes |
|---|---|---|
| `MetricCard` | 8 | Currency, percent, trends, large values, dashboard row |
| `DataTable` | 6 | Default, row click, skeleton, empty, sortable, 10k rows |

**Organisms**
| Component | Stories | Notes |
|---|---|---|
| `SidebarNav` | 5 | Active states, collapsed mode, interactive app layout demo |
| `EmptyState` | 7 | All page variants (Features, Customers, Subscriptions, Invoices) |
| `PricingTierTable` | 6 | Graduated, volume, flat fee, OpenAI-style pricing |

### Story Quality
Every story includes:
- **Default** — happy path
- **Variants** — all meaningful visual states
- **Controls** — `argTypes` so reviewers can tweak props live
- **JSDoc** — props and usage documented
- **Play functions** — interaction tests on interactive components (Button, Checkbox, Dialog, Select)

### Tests
- **5 utility function suites** — `formatNumber`, `formatCompactNumber`, `formatBillingPeriodForPrice`, `getPriceTypeLabel`, `toSentenceCase`
- **2 component render test suites** — `Button` and `Chip` with click interaction tests

### Advanced Challenge C — Query Config
Built a `createQueryConfig` utility with:
- Global defaults (`staleTime: 5min`, `gcTime: 10min`)
- Per-call overrides
- Named presets: `REALTIME`, `DEFAULT`, `STATIC`
- Vitest tests documenting caching behaviour

### Design Tokens
Stories use the app's existing Tailwind token system (`bg-primary`, `text-destructive`, `border`, `muted`) rather than hardcoded hex values. The handful of hardcoded values that remain (`#092E44`, `#E9E9E9`) match what the original components themselves use — staying consistent with the codebase rather than diverging.

---

## Running Locally

```bash
npm install
npm run storybook        # development at localhost:6006
npm run build-storybook  # production build → storybook-static/
npm run test             # vitest unit + component tests
```

---

## Stack
- React + TypeScript + Vite
- Storybook 8 with `@storybook/react-vite`
- shadcn/ui + Radix UI primitives
- Tailwind CSS with custom design tokens
- Vitest + Testing Library for tests
- TanStack Query v5 (query config utility)
