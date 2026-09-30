/**
 * Soft oval over the residence cluster on the opening aerial.
 * Set to false to remove the highlight without touching the photo.
 * Mobile-only via CSS (`.residence-scroll__aerial-mark`).
 */
export const SHOW_AERIAL_RESIDENCE_HIGHLIGHT = true;

/**
 * Ellipse is in the source photo’s pixel space (1024×576).
 * The SVG uses the same cover crop as the image, so the ring stays on the buildings.
 */
export function AerialResidenceHighlight() {
  if (!SHOW_AERIAL_RESIDENCE_HIGHLIGHT) return null;

  return (
    <svg
      className="residence-scroll__aerial-mark"
      viewBox="0 0 1024 576"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <ellipse
        className="residence-scroll__aerial-mark-ring"
        cx="508"
        cy="204"
        rx="158"
        ry="74"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
