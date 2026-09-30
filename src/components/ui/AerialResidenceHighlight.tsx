/**
 * Soft oval over the residence cluster on the opening aerial.
 * Set to false to remove the highlight without touching the photo.
 * Same ring on desktop and mobile. Scroll behavior is unchanged.
 */
export const SHOW_AERIAL_RESIDENCE_HIGHLIGHT = true;

/**
 * Ellipse is in the source photo’s pixel space (2560×1440).
 * The SVG uses the same cover crop as the image, so the ring stays on the buildings.
 */
export function AerialResidenceHighlight() {
  if (!SHOW_AERIAL_RESIDENCE_HIGHLIGHT) return null;

  return (
    <svg
      className="residence-scroll__aerial-mark"
      viewBox="0 0 2560 1440"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <ellipse
        className="residence-scroll__aerial-mark-ring"
        cx="1200"
        cy="460"
        rx="370"
        ry="155"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
