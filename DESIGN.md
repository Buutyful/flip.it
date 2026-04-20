# Design System Specification: The Circular Curator

## 1. Overview & Creative North Star
**The Creative North Star: "The Digital Curator"**
This design system rejects the cluttered "marketplace" aesthetic in favor of a high-end editorial experience. It treats second-hand goods with the same reverence as luxury items. By blending **Organic Brutalism** (strong, structural grids) with **Soft Minimalism** (fluid depth and tonal layering), we position the brand as both an environmental steward and a sophisticated technology leader. 

The "template" look is avoided through **intentional asymmetry**: large-scale typography often breaks the grid, and high-contrast imagery overlaps container boundaries to create a sense of movement and "circularity." We do not just show data; we frame a movement.

---

## 2. Colors & Surface Architecture
The palette is rooted in the "Deep Forest" and "Slate" tones, moving away from "neon eco-green" toward a palette that feels permanent and institutional.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning. Boundaries must be defined solely through background color shifts. 
*   Use `surface-container-low` for large section backgrounds.
*   Use `surface-container-highest` for interactive card elements.
*   Separation is achieved via the "Tonal Step"—moving one tier up or down in the surface scale.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of semi-translucent materials. 
*   **Base Layer:** `surface` (#f8f9fa).
*   **Content Blocks:** `surface-container` (#edeeef).
*   **Floating Interactive Elements:** `surface-container-lowest` (#ffffff).
By nesting a `lowest` (brightest) card inside a `low` (mid-tone) section, you create a natural focal point without a single stroke of a pen.

### The "Glass & Gradient" Rule
To inject "soul" into the pitch deck, use **Glassmorphism** for floating data points or navigation overlays. 
*   **Formula:** `surface-variant` at 60% opacity + `backdrop-blur: 20px`.
*   **Signature Textures:** Use a linear gradient from `primary` (#012d1d) to `primary-container` (#1b4332) for hero backgrounds. This creates a "deep-well" effect that feels premium rather than flat.

---

## 3. Typography: The Editorial Voice
We use a high-contrast pairing to balance authority with utility.

*   **The Display Voice (Manrope):** Our "Display" and "Headline" scales use Manrope. It’s expansive and modern. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) for "Impact Statements" that bleed off the grid.
*   **The Utility Voice (Inter):** All "Title," "Body," and "Label" scales use Inter. It provides a neutral, high-readability counterweight to the expressive headlines.
*   **Brand Personality through Type:** Large-scale `headline-lg` in `primary` color communicates "Innovation," while `body-md` in `on_surface_variant` communicates the "Reliability" of a financial report.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are a fallback, not a feature. We build depth through light and density.

*   **The Layering Principle:** Stack `surface-container-lowest` cards on top of `surface-container-low` backgrounds. This creates "Soft Lift."
*   **Ambient Shadows:** Where floating elements are required (e.g., a "Sold" badge), use a shadow with a 32px blur, 0px offset, and 6% opacity of the `on_surface` color. It should feel like a cloud, not a box.
*   **The Ghost Border:** If a boundary is strictly required for accessibility, use the `outline-variant` token at **15% opacity**. Anything higher is considered "visual noise."

---

## 5. Components

### Buttons
*   **Primary:** `primary` background with `on_primary` text. **Radius:** `full` (9999px) to reinforce the "circular" brand identity.
*   **Secondary:** `secondary_container` background. No border.
*   **Tertiary:** Text-only in `primary` with a subtle `surface-variant` hover state.

### Cards & Lists
*   **The "No-Divider" Mandate:** Forbid horizontal rules. Use `80px` of vertical white space to separate list items, or alternate background shades (`surface` to `surface-container-low`).
*   **Imagery:** All images must have a `lg` (1rem) corner radius. Use "Overlapping Layouts" where the image breaks the top or side margin of its container.

### Gamified Progress Indicators (Circular)
*   For the "Circular Economy" metrics, use custom SVG rings using `primary` and `tertiary_fixed`. These should be thick-stroked (8pt+) with rounded caps, avoiding the thin, "medical" look of standard charts.

### Input Fields
*   **Minimalist State:** No bottom line. A subtle `surface-container-highest` background with `sm` (0.25rem) radius. On focus, the background shifts to `primary_fixed` at 20% opacity.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical margins. For example, a 15% left margin for text and a 5% right margin for images.
*   **Do** use `tertiary` (#3b1f00) for small "Eco-Fact" callouts. It provides an earthy, grounded contrast to the deep greens.
*   **Do** lean into white space. If a slide feels "full," remove a container and use a background color shift instead.

### Don't:
*   **Don't** use 100% black text. Always use `on_surface` (#191c1d) to maintain a soft, premium feel.
*   **Don't** use standard "Material Design" shadows. They are too heavy for this "High-End Editorial" aesthetic.
*   **Don't** use sharp corners. Everything must adhere to the `DEFAULT` (0.5rem) or `full` roundedness scale to mirror the "Loop" hub concept.
*   **Don't** use dividers. If you think you need a line, use 48px of empty space instead.