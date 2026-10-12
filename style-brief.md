# Style brief — "dark dev-docs" aesthetic

Reference implementations in this workspace: `guide.html`, `index.html`.

---

## 1. What to call it

There is **no single canonical name** for this. It's a cluster of established conventions.
These are the closest real handles, roughly most-to-least accurate:

| Handle | Why it fits |
|---|---|
| **"Dark developer-documentation aesthetic"** | The most accurate umbrella term. This is what Stripe/Tailwind/Supabase/Vercel docs converge on. |
| **"Linear-style dark UI"** | Linear popularised this exact recipe: near-black blue-tinted background, depth from hairline borders instead of shadows, one saturated accent. |
| **"Vercel / Geist look"** | Same family — monochrome, high contrast, system fonts, restrained. |
| **"Supabase docs look"** | Exact match here, because the accent colour *is* Supabase green (`#3ecf8e`). |
| **"Technical minimalism"** | Typography-driven, decoration-free. |
| **Swiss / International Typographic Style** | The *typographic* lineage: strict hierarchy, single column, grid discipline, no ornament. |

**What it is NOT** (name these to rule them out — they're what you'll get if you just say "modern dark"):
glassmorphism · neumorphism · neo-brutalism · bento grid · skeuomorphism · cyberpunk/neon.

---

## 2. The one-paragraph request

Paste this to get the look:

> A dark, single-column documentation page. Near-black background with a slight blue tint;
> panels one step lighter. **Depth comes from 1px subtle borders, never drop shadows.**
> One bright accent colour used sparingly — links, numbers, inline code, nothing else.
> Native system font stack, generous line-height, body text capped at a readable measure (~780px).
> Small uppercase letter-spaced "eyebrow" labels above each section heading.
> Numbered circular badges for step-by-step sequences.
> Colour-coded note / warning / danger callout boxes.
> Monospace code blocks with a copy button pinned top-right.
> Fully rounded (12–16px) corners. No gradients except an optional faint hero glow.
> No animations beyond quick hover transitions.

---

## 3. Design tokens

```css
:root {
  /* surfaces — each step is ~1 elevation */
  --bg:      #0e1016;   /* page, blue-tinted near-black */
  --panel:   #161922;   /* cards */
  --panel-2: #1d212c;   /* nested / raised elements */
  --border:  #272c38;   /* 1px hairlines — this is the only "shadow" */

  /* text */
  --text:  #e7e9ef;      /* headings + body */
  --muted: #969db0;      /* secondary, captions, labels */

  /* one accent, used sparingly */
  --accent: #3ecf8e;     /* Supabase green */
  --blue:   #7cc4ff;     /* links */

  /* semantic — callouts only */
  --warn:   #ffc457;
  --danger: #ff7b7b;

  --radius: 12px;        /* 16px on large panels */
  --measure: 780px;      /* max content width ≈ 70ch */
}
```

**Font stack** (no webfont, loads instantly, looks native everywhere):
```css
font: 16px/1.65 ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; /* code */
```

---

## 4. The rules that actually make it look like this

1. **Borders, not shadows.** This is the single biggest tell. `border: 1px solid var(--border)`
   on every surface. Zero `box-shadow` anywhere.
2. **Three-step elevation, strictly.** `--bg` → `--panel` → `--panel-2`. Nest one inside the other.
   Never introduce a fourth.
3. **One accent colour.** The moment you add a second bright colour for decoration, the look dies.
   Colour is reserved for meaning: links, active state, step numbers, success.
4. **Sparing colour in text.** Body copy is grey-white; secondary text is genuinely muted
   (`#969db0`), not 90% white.
5. **Eyebrow labels.** Tiny (`12px`), uppercase, `letter-spacing: .12em`, muted — sitting above
   each `h2`. Cheap to add, disproportionately responsible for the "designed" feel.
6. **Round generously, consistently.** 12px cards, 16px panels, 999px pills, 8–10px buttons.
   Mixed radii look accidental.
7. **Line length is capped.** `max-width: 780px` centred. Full-width text on a wide monitor is
   the fastest way to make this look amateur.
8. **Letter-spacing on headings.** Negative (`-0.5px` to `-1.2px`) at large sizes; positive on
   small uppercase text. Both are non-optional for the polish.
9. **Colour-coded callouts, three levels max.** info (blue), warn (amber), danger (red).
   Each = tinted background + matching 1px border + tinted bold heading.
10. **Code blocks get a copy button.** The `position: relative` parent + `position: absolute`
    button trick. Signals "this is real documentation."

---

## 5. Component inventory

| Component | Notes |
|---|---|
| Hero | Kicker pill, oversized `h1` with one accent word, 1–2 sentence lede |
| TOC card | Numbered `<ol>`, anchor links |
| Callout | `.note` / `.warn` / `.danger` |
| Step block | `flex` row: 34px accent circle + body content |
| Model/feature grid | `repeat(auto-fit, minmax(...))`, collapses to 1 column on mobile |
| Code block | `<pre><code>` + injected copy button |
| Pill / badge | `999px`, tiny uppercase, `ok` / `bad` variants |
| Interactive panel | Bordered card with labelled inputs + live preview |

---

## 6. Reusable snippets

**Eyebrow label**
```html
<div class="sec-label">Part 1</div>
<h2>Setting up Supabase</h2>
```
```css
.sec-label {
  font-size: 12px; font-weight: 700; letter-spacing: .14em;
  text-transform: uppercase; color: var(--muted); margin-bottom: 10px;
}
```

**Callout**
```css
.note { background:#131c26; border:1px solid #24405a; }  /* info  */
.warn { background:#241d0f; border:1px solid #4a3a1a; }  /* amber */
.danger { background:#241416; border:1px solid #5a262a; }/* red   */
.note, .warn, .danger { border-radius:12px; padding:16px 18px; margin:20px 0; }
```

**Step badge**
```css
.step { display:flex; gap:16px; margin:30px 0; }
.step .num {
  flex:0 0 34px; height:34px; border-radius:50%;
  background:var(--accent); color:#06231a;
  display:flex; align-items:center; justify-content:center; font-weight:800;
}
```

---

## 7. Note on the accent colour

It's currently Supabase green `#3ecf8e` with near-black text on it (`#06231a`).
Swap `--accent` and keep everything else identical — the style survives a colour change
completely. Good alternatives: `#6ea8fe` (blue), `#c084fc` (purple), `#f97316` (orange).
