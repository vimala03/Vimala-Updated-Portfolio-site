import { ReactNode } from 'react'

interface CaseStudyMediaProps {
  src: string
  alt: string
  width?: number
  height?: number
  caption?: ReactNode
  /** Defaults to 'lazy' — pass 'eager' for anything above the fold. */
  loading?: 'lazy' | 'eager'
  /** Shorthand for above-the-fold hero media: loading="eager" + fetchPriority="high". */
  priority?: boolean
  sizes?: string
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  /** e.g. 'left center'. Omit for the browser default (50% 50%) — only
   *  needed when a source image is wider than its display aspectRatio
   *  and center-cropping would cut into meaningful content on an edge. */
  objectPosition?: string
  /** e.g. '1229 / 550', '16 / 9'. Omit to let the image size itself. */
  aspectRatio?: string
  className?: string
  /** Applied to the outer <figure>, not the image itself. */
  style?: React.CSSProperties
  /** Corner treatment on the aspect-ratio box. Defaults to true
   *  (var(--radius-md)) — set false for a flat/sharp editorial crop. */
  rounded?: boolean
}

/**
 * Reusable image wrapper for case-study content — the audit's fix for
 * "no lazy loading, no explicit dimensions, no responsive sizes anywhere
 * in the codebase." Not wired into any existing page yet: adopting it on
 * a given page belongs to the phase that touches that page's visuals
 * (Cornerstone in Phase 3, YouClean in Phase 4, etc.), so today's
 * rendering doesn't change. This is the primitive those phases render
 * their images through.
 *
 * Does not generate, crop, or re-encode images — it only wraps whatever
 * `src` is given with the loading/sizing attributes browsers need.
 */
export default function CaseStudyMedia({
  src,
  alt,
  width,
  height,
  caption,
  loading,
  priority = false,
  sizes,
  objectFit = 'cover',
  objectPosition,
  aspectRatio,
  className = '',
  style,
  rounded = true,
}: CaseStudyMediaProps) {
  const resolvedLoading = priority ? 'eager' : loading ?? 'lazy'

  return (
    <figure className={className} style={{ margin: 0, ...style }}>
      <div
        style={
          aspectRatio
            ? { aspectRatio, overflow: 'hidden', borderRadius: rounded ? 'var(--radius-md)' : 0 }
            : undefined
        }
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={resolvedLoading}
          decoding="async"
          {...(priority ? { fetchPriority: 'high' as const } : {})}
          sizes={sizes}
          style={{
            width: '100%',
            height: aspectRatio ? '100%' : 'auto',
            objectFit,
            objectPosition,
            display: 'block',
          }}
        />
      </div>
      {caption && (
        <figcaption
          className="type-meta"
          style={{ marginTop: '0.75rem', color: 'var(--color-text-muted)' }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
