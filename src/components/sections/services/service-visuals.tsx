import { Check, Download, ShoppingCart } from "lucide-react";

import { BrowserFrame, PhoneFrame } from "@/components/ui/device-frames";
import { cn } from "@/lib/utils";
import type { ServiceVisual } from "@/types";

/**
 * One scene per service. Engineering services are drawn in code (they are
 * about code); product services use real screenshots of shipped work.
 * Decorative drawings are aria-hidden; real screenshots carry alt text.
 */

function Stage({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      dir="ltr"
      data-loop
      className={cn(
        "relative aspect-[16/11] w-full overflow-hidden rounded-panel border border-white/80 bg-[linear-gradient(150deg,var(--color-mist-2),var(--color-canvas)_55%,var(--color-tide))] shadow-[var(--shadow-lift)] sm:aspect-[16/10]",
        className,
      )}
    >
      <div aria-hidden="true" className="grid-bg absolute inset-0 opacity-80" />
      {children}
    </div>
  );
}

function Frontend() {
  return (
    <Stage>
      <div aria-hidden="true" className="absolute -top-20 -left-10 size-72 glow [--glow:color-mix(in_oklab,var(--color-aqua-200)_100%,transparent)]" />
      <div aria-hidden="true" className="absolute inset-[7%] grid grid-cols-5 gap-4">
        <div className="col-span-3 rounded-2xl border border-white/80 bg-white/70 shadow-[var(--shadow-soft)] p-4 font-mono text-[0.62rem] leading-[1.7] sm:text-[0.72rem]">
          <div className="mb-3 flex gap-2 text-[0.6rem] text-fg-subtle">
            <span className="rounded bg-brand-100 px-2 py-0.5 text-brand-700">Hero.tsx</span>
            <span className="px-2 py-0.5">page.tsx</span>
          </div>
          <p><span className="text-aqua-700">import</span> {"{ motion }"} <span className="text-aqua-700">from</span> <span className="text-brand-600">&quot;framer-motion&quot;</span></p>
          <p className="mt-2"><span className="text-aqua-700">export function</span> <span className="text-brand-500">Hero</span>({"{ t }"}) {"{"}</p>
          <p className="ps-4"><span className="text-aqua-700">return</span> (</p>
          <p className="ps-8">{"<"}<span className="text-brand-500">section</span> <span className="text-fg-subtle">dir</span>={"{t.dir}"}{">"}</p>
          <p className="ps-12">{"<"}<span className="text-brand-500">h1</span>{">"}{"{t.title}"}{"</"}<span className="text-brand-500">h1</span>{">"}</p>
          <p className="ps-12">{"<"}<span className="text-brand-500">Button</span> <span className="text-fg-subtle">variant</span>=<span className="text-brand-600">&quot;primary&quot;</span> {"/>"}</p>
          <p className="ps-8">{"</"}<span className="text-brand-500">section</span>{">"}</p>
          <p className="ps-4">);</p>
          <p>{"}"}<span className="ms-0.5 inline-block h-3 w-[2px] translate-y-0.5 animate-caret bg-brand-600" /></p>
        </div>
        <div className="col-span-2 flex flex-col gap-3">
          <div className="flex-1 rounded-2xl border border-white/80 bg-gradient-to-br from-brand-100 to-white/80 p-4">
            <div className="h-2 w-10 rounded-full bg-brand-600" />
            <div className="mt-4 h-3 w-4/5 rounded-full bg-navy/70" />
            <div className="mt-2 h-3 w-3/5 rounded-full bg-navy/35" />
            <div className="mt-4 h-2 w-full rounded-full bg-mist-2" />
            <div className="mt-1.5 h-2 w-4/5 rounded-full bg-mist-2" />
            <div className="mt-5 flex gap-2">
              <div className="h-6 w-16 rounded-full bg-brand-600" />
              <div className="h-6 w-12 rounded-full border border-line-strong" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["375", "768", "1440"].map((w, i) => (
              <div key={w} className="rounded-xl border border-white/80 bg-white/70 shadow-[var(--shadow-soft)] p-2 text-center font-mono text-[0.55rem] text-fg-subtle">
                <div className={cn("mx-auto mb-1 rounded-sm border border-line-strong", i === 0 ? "h-4 w-2.5" : i === 1 ? "h-4 w-3.5" : "h-3 w-5")} />
                {w}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Stage>
  );
}

function Backend() {
  return (
    <Stage>
      <div aria-hidden="true" className="absolute -right-10 -bottom-20 size-80 glow [--glow:color-mix(in_oklab,var(--color-brand-300)_80%,transparent)]" />
      <div aria-hidden="true" className="absolute inset-[7%] flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2 font-mono text-[0.6rem] sm:text-xs">
          {["Client", "REST API", "Auth", "Database"].map((node, i) => (
            <div key={node} className="flex flex-1 items-center gap-2">
              <div className={cn("flex-1 rounded-xl border px-2 py-2.5 text-center", i === 1 ? "border-brand-300 bg-brand-50 text-brand-600" : "border-line bg-surface text-fg-muted")}>
                {node}
              </div>
              {i < 3 ? (
                <div className="relative h-px w-4 overflow-hidden bg-brand-200 sm:w-8">
                  <span className="absolute inset-y-0 w-2 animate-flow bg-brand-600" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <div className="grid flex-1 grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/80 bg-white/70 shadow-[var(--shadow-soft)] p-4 font-mono text-[0.6rem] leading-[1.75] sm:text-[0.7rem]">
            <p className="text-fg-subtle"># request</p>
            <p><span className="text-brand-600">POST</span> <span className="text-fg">/api/orders</span></p>
            <p className="text-fg-subtle">Authorization: Bearer ••••</p>
            <p className="mt-3 text-fg-subtle"># response</p>
            <p><span className="rounded bg-success/15 px-1.5 text-success">201 Created</span></p>
            <p className="text-fg-muted">{"{"}</p>
            <p className="ps-3"><span className="text-aqua-700">&quot;id&quot;</span>: <span className="text-brand-600">&quot;ord_7f3a&quot;</span>,</p>
            <p className="ps-3"><span className="text-aqua-700">&quot;status&quot;</span>: <span className="text-brand-600">&quot;paid&quot;</span></p>
            <p className="text-fg-muted">{"}"}</p>
          </div>
          <div className="flex flex-col gap-2 rounded-2xl border border-white/80 bg-white/70 shadow-[var(--shadow-soft)] p-4 font-mono text-[0.6rem] sm:text-[0.7rem]">
            <p className="text-fg-subtle">table · orders</p>
            {["id", "customer_id", "total", "status", "created_at"].map((col, i) => (
              <div key={col} className="flex items-center justify-between border-b border-line pb-1.5">
                <span className="text-fg-muted">{col}</span>
                <span className={i === 0 ? "text-brand-600" : "text-aqua-700"}>{i === 0 ? "PK" : i === 1 ? "FK" : "·"}</span>
              </div>
            ))}
            <div className="mt-auto flex items-center gap-2 text-fg-subtle">
              <span className="pulse-ring size-1.5 rounded-full bg-brand-600" /> role: admin
            </div>
          </div>
        </div>
      </div>
    </Stage>
  );
}

function UiUx() {
  const screens = [
    { tone: "wire", label: "Wireframe" },
    { tone: "mid", label: "UI" },
    { tone: "final", label: "Prototype" },
  ] as const;
  return (
    <Stage>
      <div aria-hidden="true" className="absolute top-0 left-1/3 size-80 glow [--glow:color-mix(in_oklab,var(--color-brand-200)_96%,transparent)]" />
      <div aria-hidden="true" className="absolute inset-[8%] flex items-center justify-center gap-3 sm:gap-6">
        {screens.map((s, i) => (
          <div key={s.label} className="flex flex-1 flex-col items-center gap-3" style={{ transform: `translateY(${(i - 1) * -14}px)` }}>
            <div
              className={cn(
                "aspect-[9/16] w-full max-w-[9.5rem] rounded-[1.4rem] border p-3 shadow-[var(--shadow-lift)]",
                s.tone === "wire" && "border-dashed border-line-strong bg-transparent",
                s.tone === "mid" && "border-line bg-mist",
                s.tone === "final" && "border-brand-300 bg-gradient-to-b from-brand-100 to-surface",
              )}
            >
              <div className={cn("h-16 rounded-lg sm:h-20", s.tone === "wire" ? "border border-dashed border-line-strong" : s.tone === "mid" ? "bg-mist-2" : "bg-brand-500")} />
              <div className={cn("mt-3 h-2 w-3/4 rounded-full", s.tone === "wire" ? "bg-brand-200" : "bg-navy/45")} />
              <div className={cn("mt-2 h-2 w-1/2 rounded-full", s.tone === "wire" ? "bg-mist-2" : "bg-navy/20")} />
              <div className="mt-4 grid grid-cols-2 gap-2">
                {[0, 1, 2, 3].map((k) => (
                  <div key={k} className={cn("aspect-square rounded-md", s.tone === "wire" ? "border border-dashed border-line-strong" : s.tone === "mid" ? "bg-mist" : k === 0 ? "bg-brand-400" : "bg-mist-2")} />
                ))}
              </div>
              <div className={cn("mt-4 h-6 rounded-full", s.tone === "wire" ? "border border-dashed border-line-strong" : s.tone === "mid" ? "bg-navy/15" : "bg-brand-600")} />
            </div>
            <span className="font-mono text-[0.6rem] text-fg-subtle sm:text-xs">{s.label}</span>
          </div>
        ))}
      </div>
      <svg aria-hidden="true" className="absolute inset-x-[20%] top-[46%] h-6 w-[60%]" viewBox="0 0 300 24" fill="none">
        <path d="M2 12h296" stroke="url(#uxg)" strokeWidth="1.5" strokeDasharray="4 6" />
        <defs>
          <linearGradient id="uxg" x1="0" x2="300" y1="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#34d3c0" stopOpacity="0" />
            <stop offset=".5" stopColor="#34d3c0" />
            <stop offset="1" stopColor="#4c7cff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </Stage>
  );
}

function Seo() {
  return (
    <Stage>
      <div aria-hidden="true" className="absolute -top-16 right-0 size-80 glow [--glow:color-mix(in_oklab,var(--color-brand-300)_80%,transparent)]" />
      <div aria-hidden="true" className="absolute inset-[7%] grid grid-cols-5 gap-4">
        <div className="col-span-3 flex flex-col gap-3">
          <div className="rounded-2xl border border-line bg-white p-4 text-[#202124] shadow-[var(--shadow-lift)]">
            <div className="flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-full bg-brand-600 text-[0.55rem] font-black text-white">W</span>
              <span className="text-[0.6rem] leading-tight text-[#4d5156] sm:text-[0.68rem]">WebCraft<br />https://webcraft › services</span>
            </div>
            <p className="mt-2 text-[0.8rem] leading-snug font-medium text-[#1a0dab] sm:text-sm">WebCraft — Web, App &amp; Android Development</p>
            <p className="mt-1 text-[0.6rem] leading-snug text-[#4d5156] sm:text-[0.7rem]">Real digital products: UI/UX, frontend, backend, SEO…</p>
            <div className="mt-2 flex gap-3 text-[0.6rem] text-[#1a0dab]">
              <span>Services</span><span>Work</span><span>Contact</span>
            </div>
          </div>
          <div className="flex-1 rounded-2xl border border-white/80 bg-white/70 shadow-[var(--shadow-soft)] p-3 font-mono text-[0.58rem] leading-[1.7] sm:text-[0.66rem]">
            <p className="text-fg-subtle">{"<script type=\"application/ld+json\">"}</p>
            <p className="ps-3"><span className="text-aqua-700">&quot;@type&quot;</span>: <span className="text-brand-600">&quot;ProfessionalService&quot;</span>,</p>
            <p className="ps-3"><span className="text-aqua-700">&quot;inLanguage&quot;</span>: <span className="text-brand-600">&quot;ar-EG&quot;</span></p>
            <p className="text-fg-subtle">{"</script>"}</p>
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-3">
          {["LCP", "INP", "CLS"].map((m, i) => (
            <div key={m} className="flex flex-1 items-center gap-3 rounded-2xl border border-white/80 bg-white/70 shadow-[var(--shadow-soft)] px-3">
              <svg viewBox="0 0 36 36" className="size-9 shrink-0 -rotate-90 sm:size-11">
                <circle cx="18" cy="18" r="15" fill="none" stroke="rgb(63 87 230 / .12)" strokeWidth="3.5" />
                <circle cx="18" cy="18" r="15" fill="none" stroke={i === 1 ? "#34d3c0" : "#4c7cff"} strokeWidth="3.5" strokeLinecap="round" strokeDasharray={`${78 - i * 6} 100`} />
              </svg>
              <span className="font-mono text-[0.65rem] text-fg sm:text-xs">{m}</span>
              <Check className="ms-auto size-4 text-success" />
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
}

function Ecommerce({ alt }: { alt: string }) {
  return (
    <Stage>
      <div aria-hidden="true" className="absolute -bottom-10 left-10 size-72 glow [--glow:color-mix(in_oklab,var(--color-aqua-200)_100%,transparent)]" />
      <div className="absolute top-[8%] left-[6%] w-[80%]">
        <BrowserFrame shot="bay3/product" alt={alt} url="bay3.vercel.app/products" sizes="(min-width: 1024px) 40rem, 80vw" />
      </div>
      <div aria-hidden="true" className="absolute right-[5%] bottom-[8%] w-[42%] rounded-2xl border border-white/80 bg-white/85 p-3 shadow-[var(--shadow-lift)] sm:p-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-fg">
          <ShoppingCart className="size-4 text-brand-600" /> Cart
          <span className="ms-auto grid size-5 place-items-center rounded-full bg-brand-600 text-[0.6rem] font-bold text-white">2</span>
        </div>
        {[0, 1].map((k) => (
          <div key={k} className="mt-2.5 flex items-center gap-2">
            <div className="size-7 rounded-md bg-mist-2" />
            <div className="flex-1">
              <div className="h-1.5 w-4/5 rounded-full bg-navy/30" />
              <div className="mt-1 h-1.5 w-2/5 rounded-full bg-brand-200" />
            </div>
          </div>
        ))}
        <div className="mt-3 h-7 rounded-full bg-brand-600" />
      </div>
    </Stage>
  );
}

function WebApps({ alt, alt2 }: { alt: string; alt2: string }) {
  return (
    <Stage>
      <div aria-hidden="true" className="absolute -top-10 right-10 size-72 glow [--glow:color-mix(in_oklab,var(--color-brand-300)_80%,transparent)]" />
      <div className="absolute top-[7%] right-[5%] w-[78%]">
        <BrowserFrame shot="bay3/admin-dashboard" alt={alt} url="bay3.vercel.app/admin" sizes="(min-width: 1024px) 38rem, 78vw" />
      </div>
      <div className="absolute bottom-[6%] left-[5%] w-[46%]">
        <BrowserFrame shot="shopik-lopik/categories" alt={alt2} url="shopiklopik.com" sizes="(min-width: 1024px) 22rem, 46vw" />
      </div>
    </Stage>
  );
}

function Pwa({ alt }: { alt: string }) {
  return (
    <Stage>
      <div aria-hidden="true" className="absolute top-1/4 left-1/4 size-72 glow [--glow:color-mix(in_oklab,var(--color-aqua-200)_100%,transparent)]" />
      <div className="absolute top-[7%] left-[12%] w-[27%]">
        <PhoneFrame shot="dahab-el-araby/mobile-dark" alt={alt} sizes="12rem" />
      </div>
      <div aria-hidden="true" className="absolute top-[18%] right-[7%] flex w-[46%] flex-col gap-3">
        <div className="rounded-2xl border border-white/80 bg-white/70 shadow-[var(--shadow-soft)] p-4 shadow-[var(--shadow-lift)]">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-[#d6b062] to-[#8a6a2a] text-xs font-black text-white">دهب</span>
            <div className="text-xs">
              <p className="font-semibold text-fg">Install app</p>
              <p className="text-fg-subtle">dahbelarby.com</p>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2 text-xs">
            <span className="rounded-full px-3 py-1.5 text-fg-subtle">Cancel</span>
            <span className="flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1.5 font-semibold text-white">
              <Download className="size-3.5" /> Install
            </span>
          </div>
        </div>
        <div className="rounded-2xl border border-white/80 bg-white/70 shadow-[var(--shadow-soft)] p-3 font-mono text-[0.6rem] leading-[1.7] sm:text-[0.68rem]">
          <p className="text-fg-subtle">manifest.webmanifest</p>
          <p><span className="text-aqua-700">&quot;display&quot;</span>: <span className="text-brand-600">&quot;standalone&quot;</span>,</p>
          <p><span className="text-aqua-700">&quot;dir&quot;</span>: <span className="text-brand-600">&quot;rtl&quot;</span>,</p>
          <p><span className="text-aqua-700">&quot;lang&quot;</span>: <span className="text-brand-600">&quot;ar&quot;</span></p>
        </div>
      </div>
    </Stage>
  );
}

function Android({ alt, alt2 }: { alt: string; alt2: string }) {
  return (
    <Stage className="bg-gradient-to-br from-brand-300 via-brand-100 to-tide">
      <div aria-hidden="true" className="absolute right-1/4 bottom-0 size-80 glow [--glow:color-mix(in_oklab,var(--color-aqua-200)_100%,transparent)]" />
      <div className="absolute top-[10%] left-[18%] w-[26%] -rotate-6">
        <PhoneFrame shot="bay3/mobile-home" alt={alt2} sizes="12rem" />
      </div>
      <div className="absolute top-[4%] left-[40%] w-[28%] rotate-3">
        <PhoneFrame shot="shopik-lopik/mobile-home" alt={alt} sizes="13rem" />
      </div>
      <div aria-hidden="true" className="absolute right-[6%] bottom-[10%] flex flex-col gap-2 font-mono text-[0.62rem] sm:text-xs">
        {["Web", "PWA", "Android"].map((s, i) => (
          <span key={s} className={cn("rounded-full border px-3 py-1.5", i === 2 ? "border-brand-500 bg-brand-600 text-white" : "border-line-strong bg-surface text-fg-muted")}>
            {s}
          </span>
        ))}
      </div>
    </Stage>
  );
}

export function ServiceScene({ visual, locale }: { visual: ServiceVisual; locale: "ar" | "en" }) {
  const ar = locale === "ar";
  switch (visual) {
    case "frontend":
      return <Frontend />;
    case "backend":
      return <Backend />;
    case "uiux":
      return <UiUx />;
    case "seo":
      return <Seo />;
    case "ecommerce":
      return <Ecommerce alt={ar ? "صفحة منتج في متجر Bay3" : "Bay3 product page"} />;
    case "webapps":
      return (
        <WebApps
          alt={ar ? "لوحة تحكم Bay3" : "Bay3 admin dashboard"}
          alt2={ar ? "أقسام منصة شوبيك لوبيك" : "Shopik Lopik categories"}
        />
      );
    case "pwa":
      return <Pwa alt={ar ? "تطبيق دهب العربي القابل للتثبيت" : "Dahab El Araby installable app"} />;
    case "android":
      return (
        <Android
          alt={ar ? "شوبيك لوبيك على الموبايل" : "Shopik Lopik on mobile"}
          alt2={ar ? "Bay3 على الموبايل" : "Bay3 on mobile"}
        />
      );
  }
}
