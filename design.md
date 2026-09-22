# Design - QuickLaunch Consulting

A locked design system for the QuickLaunch marketing site. Every page uses the
same restrained visual language while varying structure by page purpose.

## Genre

Modern-minimal with editorial pacing. The site should feel decisive, senior,
and operational rather than futuristic, decorative, or template-driven.

## Macrostructure Family

- Core marketing: Asymmetric Marquee plus Editorial Index and selective real imagery.
- Services and audiences: Offset Hero plus Proof Ledger and a concise conversion close.
- Content guides: Long Document with direct-answer opening and typographic sections.
- Conversion and diagnostic: Workbench/Form with progressive disclosure.

## Theme

- `--color-paper`: deep navy foundation.
- `--color-paper-2`: slightly raised navy section.
- `--color-paper-3`: quiet elevated surface.
- `--color-ink`: soft white primary text.
- `--color-ink-2`: cool light secondary text.
- `--color-rule`: restrained blue-grey rule.
- `--color-accent`: QuickLaunch orange, under 5 percent of a viewport.
- `--color-signal`: blue for information and focus, never decorative fill.
- `--color-light`: off-white editorial band with dark navy text.

## Typography

- Display: Montserrat, weight 800-900, normal style.
- Body: Inter, weight 400-700.
- No display italics or gradient text.
- Minimum rendered text: 14px; body and form text: 16px or larger.
- Letter spacing: zero for headings and body; modest positive tracking only for short labels.

## Spacing

Four-point named scale. Section rhythm alternates compact, standard, and generous
rather than repeating one padding value throughout the page.

## Motion

- One restrained hero entrance only.
- No universal scroll-triggered reveals.
- UI state changes use named color and border transitions.
- Reduced motion removes transforms and animation.

## Microinteractions Stance

- Hover changes one visual signal only.
- Focus rings appear immediately.
- No glow, bounce, universal scale, or multi-effect card lift.
- Buttons and links remain single-line from 320px through desktop.

## CTA Voice

- Primary: solid orange, dark text, 8px radius, command-led copy.
- Secondary: transparent surface, visible rule, light text.
- Links: underlined on hover and focus; no decorative arrows unless directional.

## Per-page Allowances

- Marketing pages may use existing QuickLaunch photography and process imagery.
- Service pages may use the existing architecture image as a restrained hero anchor.
- Content pages use typography and rules rather than decorative imagery.
- Forms prioritize legibility, state clarity, and stable dimensions.

## What Pages Must Share

- Wordmark, type pairing, color roles, CTA treatment, focus treatment, and 8px card radius.
- Off-white answer bands and dark proof-led sections.
- QuickLaunch/Saberra product-line relationship treatment.

## What Pages May Differ On

- Hero composition and image placement.
- Proof presentation: ledger, sequence, split narrative, or editorial list.
- Section density based on reading versus conversion intent.

## Exports

### tokens.css

The production export is [`tokens.css`](tokens.css).

### Tailwind v4

```css
@theme {
  --color-background: oklch(17% 0.025 255);
  --color-foreground: oklch(97% 0.008 250);
  --color-primary: oklch(70% 0.18 45);
  --color-signal: oklch(67% 0.17 250);
  --font-display: "Montserrat", sans-serif;
  --font-body: "Inter", sans-serif;
  --spacing-md: 1.5rem;
  --radius-card: 8px;
}
```

### DTCG

```json
{
  "color": {
    "paper": {"$value": "oklch(17% 0.025 255)", "$type": "color"},
    "ink": {"$value": "oklch(97% 0.008 250)", "$type": "color"},
    "accent": {"$value": "oklch(70% 0.18 45)", "$type": "color"},
    "signal": {"$value": "oklch(67% 0.17 250)", "$type": "color"}
  },
  "radius": {"card": {"$value": "8px", "$type": "dimension"}}
}
```

### shadcn/ui

```css
:root {
  --background: 17% 0.025 255;
  --foreground: 97% 0.008 250;
  --primary: 70% 0.18 45;
  --primary-foreground: 17% 0.025 255;
  --muted: 24% 0.03 255;
  --muted-foreground: 76% 0.028 250;
  --border: 44% 0.035 250;
  --ring: 67% 0.17 250;
  --radius: 8px;
}
```
