import { ADMIN_PROFILE_OPTIONS } from '../adminProfiles';
import { getAdminProfiles } from '../adminSession';

function labelFor(id) {
  return ADMIN_PROFILE_OPTIONS.find((o) => o.id === id)?.label ?? id;
}

/**
 * @param {{ className?: string }} props
 */
export function AdminProfileBadges({ className = '' }) {
  const ids = getAdminProfiles();
  if (!ids.length) return null;

  const text = ids.map(labelFor).join(', ');

  return (
    <div
      className={`admin-session-profiles${className ? ` ${className}` : ''}`}
      role="group"
      aria-label={`Profili attivi: ${text}`}
    >
      {ids.map((id) => (
        <span key={id} className="admin-session-profiles__chip">
          {labelFor(id)}
        </span>
      ))}
    </div>
  );
}
