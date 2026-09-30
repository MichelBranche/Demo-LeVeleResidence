/**
 * Soft oval over the Residence building on the opening aerial.
 * Tightened so the nearby pool stays outside the ring.
 * Same ring on desktop and mobile.
 */
export const SHOW_AERIAL_RESIDENCE_HIGHLIGHT = true;

/**
 * Ellipse is in the source photo’s pixel space (2560×1440).
 * The SVG uses the same cover crop as the image, so the ring stays on the building.
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
        cx="1160"
        cy="296"
        rx="250"
        ry="84"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
