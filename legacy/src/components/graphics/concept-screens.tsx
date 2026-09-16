import {
  Bar,
  Bars,
  Block,
  Board,
  Chat,
  Curve,
  Dot,
  Metric,
  Panel,
  PayCard,
  Phone,
  Pill,
  Ring,
  Rows,
  SideNav,
  Tiles,
} from "@/components/graphics/ui-fragments";
import { cn } from "@/lib/utils";

/**
 * WEBCRAFT — CONCEPT SCREENS
 *
 * The twenty-two invented interfaces the Concept Lab renders, assembled from
 * the atoms in `ui-fragments.tsx`.
 *
 * ─── WHY A STRING REGISTRY ───────────────────────────────────────────────
 * `content/concepts.ts` names a screen as `"ops-analytics"`, never as a
 * component. That is the same contract the icon registry keeps, and for the
 * same reason: the content layer must stay importable by something that is
 * not React — a CMS adapter, a script, a test — so it may not hold component
 * references. A typo therefore fails at the `ScreenKey` type boundary instead
 * of rendering an invisible hole.
 *
 * ─── THESE ARE DRAWINGS, NOT PRODUCTS ────────────────────────────────────
 * Every screen here is deliberately wordless. That is a credibility decision
 * before it is an aesthetic one: a concept screen carrying plausible figures
 * is one screenshot away from being mistaken for delivered client work, and
 * the Concept Lab's whole premise is that the visitor can tell the difference
 * instantly. Bars where the text would be, and the section's «تصوّري» badge
 * doing the rest.
 * ─────────────────────────────────────────────────────────────────────────
 */

/* ==========================================================================
   CHROME
   ========================================================================== */

/**
 * The desktop application shell: rail on the left, toolbar across the top,
 * body in the remaining space. Every non-mobile screen below is this frame
 * plus a body, which is what makes four unrelated concepts read as one
 * coherent set of drawings rather than four different illustrators.
 */
function Desk({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Panel dots className={cn("h-full", className)}>
      <div className="grid h-full grid-cols-[4.5rem_minmax(0,1fr)] gap-3">
        <div className="border-border flex flex-col gap-3 border-e pe-3">
          <span className="flex items-center gap-1.5">
            <span className="bg-lime-500/80 block size-3 rounded-[4px]" />
            <Bar w="w-6" tone="faint" />
          </span>
          <SideNav />
        </div>

        <div className="flex min-w-0 flex-col gap-2.5">{children}</div>
      </div>
    </Panel>
  );
}

/** The toolbar that opens most bodies: a page title and two controls. */
function Toolbar({ action = true }: { action?: boolean }) {
  return (
    <span className="flex items-center justify-between">
      <span className="flex flex-col gap-1.5">
        <Bar w="w-20" tone="strong" />
        <Bar w="w-12" tone="faint" />
      </span>
      {action ? (
        <span className="flex items-center gap-1.5">
          <Pill w="w-8" />
          <Pill w="w-12" tone="lime" />
        </span>
      ) : null}
    </span>
  );
}

/** The mobile shell: status bar, body, tab bar. */
function App({
  children,
  tab = 0,
  className,
}: {
  children: React.ReactNode;
  /** Which of the four tabs is lit. */
  tab?: number;
  className?: string;
}) {
  return (
    <Phone className={cn("h-full", className)}>
      <div className="flex h-full flex-col gap-3">
        <div className="flex-1">{children}</div>

        <span className="border-border flex items-center justify-around border-t pt-2.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex flex-col items-center gap-1">
              <span
                className={cn(
                  "block size-3.5 rounded-[5px]",
                  i === tab ? "bg-lime-500/80" : "bg-white/12",
                )}
              />
              <span
                className={cn(
                  "block h-1 w-4 rounded-full",
                  i === tab ? "bg-white/30" : "bg-white/10",
                )}
              />
            </span>
          ))}
        </span>
      </div>
    </Phone>
  );
}

/* ==========================================================================
   01 — BUSINESS OPERATIONS
   ========================================================================== */

function OpsAnalytics() {
  return (
    <Desk>
      <Toolbar />
      <span className="grid grid-cols-3 gap-2">
        <Metric accent />
        <Metric />
        <Metric />
      </span>
      <span className="border-border bg-white/[0.02] flex-1 rounded-md border p-2.5">
        <span className="block h-full min-h-16">
          <Curve />
        </span>
      </span>
    </Desk>
  );
}

function OpsOrders() {
  return (
    <Desk>
      <Toolbar />
      <span className="flex items-center gap-1.5">
        <Pill w="w-12" tone="lime" />
        <Pill w="w-10" />
        <Pill w="w-14" />
        <Pill w="w-9" />
      </span>
      <span className="border-border flex-1 rounded-md border px-2.5">
        <Rows count={4} />
      </span>
    </Desk>
  );
}

function OpsCustomers() {
  return (
    <Desk>
      <Toolbar />
      <span className="grid flex-1 grid-cols-[minmax(0,1fr)_7rem] gap-2.5">
        <span className="border-border rounded-md border px-2.5">
          <Rows count={4} status={false} />
        </span>
        <span className="border-border bg-white/[0.02] flex flex-col items-center gap-2 rounded-md border p-2.5">
          <Dot size="size-9" tone="violet" />
          <Bar w="w-14" />
          <Bar w="w-10" tone="faint" />
          <span className="mt-1 w-full">
            <Pill w="w-full" tone="lime" />
          </span>
        </span>
      </span>
    </Desk>
  );
}

function OpsReports() {
  return (
    <Desk>
      <Toolbar />
      <span className="grid flex-1 grid-cols-2 gap-2.5">
        <span className="border-border bg-white/[0.02] flex flex-col gap-2 rounded-md border p-2.5">
          <Bar w="w-12" tone="faint" />
          <span className="block h-full min-h-14">
            <Bars />
          </span>
        </span>
        <span className="border-border bg-white/[0.02] flex flex-col items-center justify-center gap-2 rounded-md border p-2.5">
          <span className="block size-14">
            <Ring value={72} />
          </span>
          <Bar w="w-10" tone="faint" />
        </span>
      </span>
    </Desk>
  );
}

function OpsNotifications() {
  return (
    <Desk>
      <Toolbar action={false} />
      <span className="border-border flex-1 rounded-md border px-2.5">
        <Rows count={5} status={false} />
      </span>
    </Desk>
  );
}

function OpsTeam() {
  return (
    <Desk>
      <Toolbar />
      <span className="grid flex-1 grid-cols-3 gap-2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className="border-border bg-white/[0.02] flex flex-col items-center gap-1.5 rounded-md border p-2"
          >
            <Dot size="size-7" tone={i === 0 ? "lime" : "ink"} />
            <Bar w="w-10" tone="faint" />
            <Pill w="w-8" tone={i === 0 ? "lime" : "ink"} />
          </span>
        ))}
      </span>
    </Desk>
  );
}

/* ==========================================================================
   02 — FINTECH
   ========================================================================== */

function FinDashboard() {
  return (
    <Desk>
      <Toolbar />
      <span className="grid flex-1 grid-cols-[8rem_minmax(0,1fr)] gap-2.5">
        <PayCard className="self-start" />
        <span className="flex flex-col gap-2">
          <span className="grid grid-cols-2 gap-2">
            <Metric accent />
            <Metric />
          </span>
          <span className="border-border bg-white/[0.02] flex-1 rounded-md border p-2">
            <span className="block h-full min-h-10">
              <Bars values={[42, 61, 38, 74, 55, 88]} />
            </span>
          </span>
        </span>
      </span>
    </Desk>
  );
}

function FinTransactions() {
  return (
    <Desk>
      <Toolbar />
      <span className="flex items-center gap-1.5">
        <Pill w="w-14" tone="violet" />
        <Pill w="w-10" />
        <Pill w="w-12" />
      </span>
      <span className="border-border flex-1 rounded-md border px-2.5">
        <Rows count={4} />
      </span>
    </Desk>
  );
}

function FinCards() {
  return (
    <Desk>
      <Toolbar />
      <span className="grid flex-1 grid-cols-2 gap-2.5">
        <PayCard className="self-start" />
        <PayCard tone="ink" className="self-start" />
      </span>
      <span className="border-border rounded-md border px-2.5">
        <Rows count={2} status={false} />
      </span>
    </Desk>
  );
}

function FinTransfers() {
  return (
    <Desk>
      <Toolbar action={false} />
      <span className="border-border bg-white/[0.02] flex flex-1 flex-col gap-2.5 rounded-md border p-3">
        <span className="flex items-center gap-2">
          <Dot size="size-7" tone="ink" />
          <span className="flex flex-1 flex-col gap-1.5">
            <Bar w="w-20" />
            <Bar w="w-12" tone="faint" />
          </span>
        </span>

        <span className="flex items-center gap-2 ps-3">
          <span className="bg-border block h-6 w-px" />
          <Bar w="w-8" tone="violet" />
        </span>

        <span className="flex items-center gap-2">
          <Dot size="size-7" tone="lime" />
          <span className="flex flex-1 flex-col gap-1.5">
            <Bar w="w-24" />
            <Bar w="w-10" tone="faint" />
          </span>
        </span>

        <span className="mt-auto">
          <Pill w="w-full" tone="lime" />
        </span>
      </span>
    </Desk>
  );
}

function FinAnalytics() {
  return (
    <Desk>
      <Toolbar />
      <span className="grid grid-cols-3 gap-2">
        <Metric />
        <Metric accent />
        <Metric />
      </span>
      <span className="border-border bg-white/[0.02] flex-1 rounded-md border p-2.5">
        <span className="block h-full min-h-16">
          <Curve />
        </span>
      </span>
    </Desk>
  );
}

/* ==========================================================================
   03 — AI ASSISTANT
   ========================================================================== */

function AiDashboard() {
  return (
    <Desk>
      <Toolbar />
      <span className="grid grid-cols-3 gap-2">
        <Metric accent />
        <Metric />
        <Metric />
      </span>
      <span className="grid flex-1 grid-cols-[minmax(0,1fr)_8rem] gap-2.5">
        <span className="border-border bg-white/[0.02] rounded-md border p-2.5">
          <span className="block h-full min-h-14">
            <Bars values={[30, 48, 62, 44, 71, 58, 84]} />
          </span>
        </span>
        <span className="border-border rounded-md border p-2">
          <Rows count={3} status={false} />
        </span>
      </span>
    </Desk>
  );
}

function AiWorkspace() {
  return (
    <Desk>
      <Toolbar action={false} />
      <span className="border-border bg-white/[0.02] flex-1 rounded-md border p-2.5">
        <Chat />
      </span>
    </Desk>
  );
}

function AiTasks() {
  return (
    <Desk>
      <Toolbar />
      <span className="flex-1">
        <Board />
      </span>
    </Desk>
  );
}

function AiInsights() {
  return (
    <Desk>
      <Toolbar action={false} />
      <span className="flex flex-1 flex-col gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn(
              "flex items-start gap-2.5 rounded-md p-2.5",
              i === 0
                ? "bg-violet-500/12 ring-violet-400/25 ring-1"
                : "border-border border",
            )}
          >
            <span
              className={cn(
                "mt-0.5 block size-4 rounded-[5px]",
                i === 0 ? "bg-lime-500/80" : "bg-white/12",
              )}
            />
            <span className="flex flex-1 flex-col gap-1.5">
              <Bar w="w-full" tone={i === 0 ? "base" : "faint"} />
              <Bar w="w-2/3" tone="faint" />
            </span>
          </span>
        ))}
      </span>
    </Desk>
  );
}

function AiAutomation() {
  return (
    <Desk>
      <Toolbar />
      <span className="border-border bg-white/[0.02] flex flex-1 items-center gap-2 rounded-md border p-3">
        {[0, 1, 2].map((i) => (
          <span key={i} className="flex flex-1 items-center gap-2">
            {i > 0 ? (
              <span className="from-violet-400/60 h-px flex-1 bg-gradient-to-r to-transparent" />
            ) : null}
            <span
              className={cn(
                "flex flex-1 flex-col gap-1.5 rounded-md p-2 ring-1",
                i === 1
                  ? "bg-violet-500/14 ring-violet-400/30"
                  : "bg-white/[0.04] ring-white/[0.07]",
              )}
            >
              <span
                className={cn(
                  "block size-3.5 rounded-[4px]",
                  i === 1 ? "bg-lime-500/80" : "bg-white/15",
                )}
              />
              <Bar w="w-full" tone="faint" />
            </span>
          </span>
        ))}
      </span>
    </Desk>
  );
}

/* ==========================================================================
   04 — MOBILE PRODUCT
   ========================================================================== */

function AppOnboarding() {
  return (
    <App tab={0}>
      <span className="flex h-full flex-col items-center gap-3 pt-2">
        <Block className="aspect-square w-20" tone="violet" />
        <Bar w="w-24" tone="strong" />
        <Bar w="w-32" tone="faint" />
        <Bar w="w-20" tone="faint" />

        <span className="mt-auto flex w-full flex-col gap-2">
          <span className="flex justify-center gap-1.5">
            <span className="bg-lime-500/80 block h-1 w-5 rounded-full" />
            <span className="bg-white/15 block h-1 w-1 rounded-full" />
            <span className="bg-white/15 block h-1 w-1 rounded-full" />
          </span>
          <Pill w="w-full" tone="lime" />
        </span>
      </span>
    </App>
  );
}

function AppHome() {
  return (
    <App tab={0}>
      <span className="flex flex-col gap-2.5">
        <span className="flex items-center gap-2">
          <Dot size="size-6" tone="ink" />
          <span className="flex flex-1 flex-col gap-1.5">
            <Bar w="w-16" />
            <Bar w="w-10" tone="faint" />
          </span>
        </span>

        <Block className="aspect-[16/7] w-full" tone="violet" />

        <span className="flex gap-1.5">
          <Pill w="w-10" tone="lime" />
          <Pill w="w-8" />
          <Pill w="w-12" />
        </span>

        <Tiles count={6} />
      </span>
    </App>
  );
}

function AppSearch() {
  return (
    <App tab={1}>
      <span className="flex flex-col gap-2.5">
        <span className="border-border flex items-center gap-2 rounded-full border px-2.5 py-1.5">
          <span className="bg-white/20 block size-3 rounded-full" />
          <Bar w="w-16" tone="faint" />
        </span>

        <span className="flex flex-wrap gap-1.5">
          <Pill w="w-12" tone="violet" />
          <Pill w="w-9" />
          <Pill w="w-14" />
          <Pill w="w-8" />
        </span>

        <span className="border-border rounded-md border px-2.5">
          <Rows count={4} status={false} />
        </span>
      </span>
    </App>
  );
}

function AppProfile() {
  return (
    <App tab={3}>
      <span className="flex flex-col items-center gap-2.5">
        <Dot size="size-14" tone="violet" />
        <Bar w="w-20" tone="strong" />
        <Bar w="w-14" tone="faint" />

        <span className="mt-1 grid w-full grid-cols-3 gap-1.5">
          <Metric accent />
          <Metric />
          <Metric />
        </span>

        <span className="border-border w-full rounded-md border px-2.5">
          <Rows count={3} status={false} />
        </span>
      </span>
    </App>
  );
}

function AppNotifications() {
  return (
    <App tab={2}>
      <span className="flex flex-col gap-2.5">
        <Bar w="w-20" tone="strong" />
        <span className="border-border rounded-md border px-2.5">
          <Rows count={5} status={false} />
        </span>
      </span>
    </App>
  );
}

function AppDetail() {
  return (
    <App tab={0}>
      <span className="flex flex-col gap-2.5">
        <Block className="aspect-[4/3] w-full" tone="lime" />

        <span className="flex items-start justify-between gap-2">
          <span className="flex flex-1 flex-col gap-1.5">
            <Bar w="w-24" tone="strong" />
            <Bar w="w-14" tone="faint" />
          </span>
          <Pill w="w-10" tone="lime" />
        </span>

        <span className="flex flex-col gap-1.5">
          <Bar w="w-full" tone="faint" />
          <Bar w="w-5/6" tone="faint" />
          <Bar w="w-3/5" tone="faint" />
        </span>

        <Pill w="w-full" tone="lime" />
      </span>
    </App>
  );
}

/* ==========================================================================
   CAPABILITY SCREENS
   --------------------------------------------------------------------------
   Two drawings that exist for the Capabilities canvas rather than for a
   concept. A marketing site and a storefront are the two things this studio
   most obviously builds, and neither had a desk-shaped drawing — the section
   was reaching for `app-home`, a phone screen, and rendering it letterboxed
   inside a 4:3 canvas where it read as a squashed rectangle rather than as a
   website.
   ========================================================================== */

/** A marketing site: nav, hero with one action, a three-up section. */
function SiteLanding() {
  return (
    <Panel dots className="h-full">
      <div className="flex h-full flex-col gap-2.5">
        <span className="border-border flex items-center justify-between border-b pb-2">
          <span className="flex items-center gap-2">
            <span className="bg-lime-500/80 block size-3 rounded-full" />
            <Bar w="w-10" tone="faint" />
          </span>
          <span className="flex items-center gap-2">
            <Bar w="w-6" tone="faint" />
            <Bar w="w-8" tone="faint" />
            <Pill w="w-10" tone="lime" />
          </span>
        </span>

        <span className="flex flex-col items-center gap-2 py-2">
          <Bar w="w-40" tone="strong" />
          <Bar w="w-28" tone="strong" />
          <Bar w="w-32" tone="faint" />
          <span className="mt-1 flex gap-1.5">
            <Pill w="w-14" tone="lime" />
            <Pill w="w-12" />
          </span>
        </span>

        <span className="grid flex-1 grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="border-border bg-white/[0.02] flex flex-col gap-1.5 rounded-md border p-2"
            >
              <Dot size="size-5" tone={i === 1 ? "lime" : "violet"} />
              <Bar w="w-full" tone="faint" />
              <Bar w="w-2/3" tone="faint" />
            </span>
          ))}
        </span>
      </div>
    </Panel>
  );
}

/** A storefront: filter rail, product grid, one item flagged. */
function ShopStorefront() {
  return (
    <Panel dots className="h-full">
      <div className="grid h-full grid-cols-[4rem_minmax(0,1fr)] gap-3">
        <span className="border-border flex flex-col gap-2 border-e pe-3">
          <Bar w="w-8" tone="faint" />
          <SideNav items={4} />
        </span>

        <span className="flex min-w-0 flex-col gap-2.5">
          <Toolbar />
          <span className="flex-1">
            <Tiles count={6} />
          </span>
        </span>
      </div>
    </Panel>
  );
}

/* ==========================================================================
   REGISTRY
   ========================================================================== */

export const conceptScreens = {
  "ops-analytics": OpsAnalytics,
  "ops-orders": OpsOrders,
  "ops-customers": OpsCustomers,
  "ops-reports": OpsReports,
  "ops-notifications": OpsNotifications,
  "ops-team": OpsTeam,

  "fin-dashboard": FinDashboard,
  "fin-transactions": FinTransactions,
  "fin-cards": FinCards,
  "fin-transfers": FinTransfers,
  "fin-analytics": FinAnalytics,

  "ai-dashboard": AiDashboard,
  "ai-workspace": AiWorkspace,
  "ai-tasks": AiTasks,
  "ai-insights": AiInsights,
  "ai-automation": AiAutomation,

  "app-onboarding": AppOnboarding,
  "app-home": AppHome,
  "app-search": AppSearch,
  "app-profile": AppProfile,
  "app-notifications": AppNotifications,
  "app-detail": AppDetail,

  "site-landing": SiteLanding,
  "shop-storefront": ShopStorefront,
} as const;

export type ScreenKey = keyof typeof conceptScreens;

/**
 * Render a screen by its content-file key.
 *
 * Returns `null` for an unknown key rather than throwing, for the same reason
 * the icon registry does: a missing drawing should never take down a page
 * that is otherwise fine.
 */
export function ConceptScreen({ name }: { name: string }) {
  const Screen = conceptScreens[name as ScreenKey];
  return Screen ? <Screen /> : null;
}
