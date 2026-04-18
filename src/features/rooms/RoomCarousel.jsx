/**
 * Galleria delle camere: griglia verticale centrata, senza scroll orizzontale.
 */
export function RoomCarousel({ images, title }) {
  if (!images?.length) return null;

  return (
    <div className="room-carousel" role="region" aria-label={`Galleria ${title}`}>
      <ul className="room-carousel-grid">
        {images.map((src, idx) => (
          <li key={`${src}-${idx}`} className="room-carousel-slide">
            <img src={src} alt={`${title} ${idx + 1}`} loading="lazy" decoding="async" />
          </li>
        ))}
      </ul>
    </div>
  );
}
