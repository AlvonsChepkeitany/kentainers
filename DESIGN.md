# Design Brief

## Direction

Kentainers Industrial E-commerce — premium B2B tank e-commerce platform with industrial strength and trust-driven aesthetic.

## Tone

Utilitarian industrial with premium execution. Navy + orange signals authority and safety; every element serves function without decoration.

## Differentiation

Sticky glassmorphic header with live cart counter + bottom mobile navigation creates distinctive mobile-first industrial UX.

## Color Palette

| Token      | OKLCH            | Role                       |
|------------|------------------|----------------------------|
| background | 0.99 0 0         | white, primary surface     |
| foreground | 0.18 0.15 279    | navy, text hierarchy       |
| primary    | 0.18 0.15 279    | navy, buttons, links       |
| secondary  | 0.62 0.24 63     | orange, accents, alerts    |
| accent     | 0.68 0.21 141    | whatsapp green, success    |
| muted      | 0.93 0 0         | light grey, dividers       |
| card       | 0.98 0 0         | slightly off-white surfaces|

## Typography

- Display: Montserrat — bold headings, product names, hero text
- Body: Roboto — product descriptions, copy, labels
- Scale: hero `text-4xl font-bold`, h2 `text-2xl font-bold`, body `text-base font-body`

## Elevation & Depth

Surface hierarchy through shadows: `shadow-subtle` for borders, `shadow-elevated` for cards/modals. Glass effect on sticky header.

## Structural Zones

| Zone       | Background            | Border                  | Notes                              |
|------------|------------------------|------------------------|------------------------------------|
| Header     | glass (white/30)       | white/20 border         | sticky, glassmorphic, mobile nav   |
| Hero       | background (white)     | —                       | product grid, top section          |
| Content    | background (white)     | —                       | product cards with alternating bg  |
| Footer     | muted/10 (subtle grey) | border (top)            | contact, company info              |

## Spacing & Rhythm

Mobile-first: 16px base grid. Cards `gap-4`, sections `py-6` stacked, desktop `grid-cols-3` layout. Ample white space for premium feel.

## Component Patterns

- Buttons: navy bg, white text, orange hover state, `hover:scale-105` on all interactive
- Cards: white bg, rounded `md`, `shadow-elevated`, image + title + price, badge for savings
- Product Grid: mobile `grid-cols-2`, tablet `grid-cols-2`, desktop `grid-cols-4`

## Motion

- Hover: `hover:scale-105 transition-smooth` on all cards and buttons
- Entrance: `animate-fade-in 0.3s` on page load
- Decorative: none (strict industrial restraint)

## Constraints

- No gradients except glassmorphic header
- Icons from lucide-react only
- Orange used sparingly: badges, hover states, call-to-action elements
- Navy text on white background, navy backgrounds with white text
- Mobile-first viewport priorities

## Signature Detail

Sticky glassmorphic header with live cart counter + WhatsApp green success badge on products — merges premium UX with functional e-commerce.
