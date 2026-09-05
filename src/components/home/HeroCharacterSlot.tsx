/**
 * The hero illustration — sourced from the Canva-edited artwork, not
 * recreated or reprocessed by this codebase's own pipeline.
 *
 * `/images/vimala-hero.png` (1254×1254) is that source PNG, untouched —
 * kept exactly as provided, purely as the canonical original.
 *
 * `/images/vimala-hero-display.png` is what actually renders: the same
 * pixels, with only the background region hard-replaced to the hero's
 * exact cream (#F7F1EA) so the illustration reads as sitting on the
 * page rather than in a lighter box. That's a real, one-time pixel edit
 * (a tolerant flood fill from the four corners plus a couple of
 * confirmed-background points, verified to stop at the woman, desk,
 * mug, plant/vase and rug and not bleed into them) — not a CSS
 * gradient/mask over the original. No crop, no re-draw, no AI
 * regeneration; every foreground pixel is byte-identical to the source.
 *
 * aspect-ratio is `1254 / 1254` to match both files' own square
 * dimensions exactly, so `object-fit: cover` is a no-op and nothing is
 * cropped.
 *
 * Sized and positioned by the parent grid cell in Hero.tsx, not here —
 * this component only owns the image itself so it drops in cleanly no
 * matter what wraps it.
 */
export default function HeroCharacterSlot() {
  return (
    <div style={{ aspectRatio: '1254 / 1254', overflow: 'hidden' }}>
      <img
        src="/images/vimala-hero-display.png"
        alt="Editorial illustration of Vimala working at her desk."
        loading="eager"
        fetchPriority="high"
        decoding="async"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </div>
  )
}
