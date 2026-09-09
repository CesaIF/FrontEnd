const SEEN_ALERTS_KEY = "cesa_seen_alert_ids";
const ALERTS_INITIALIZED_KEY = "cesa_alert_notifications_initialized";
export const ALERT_NOTIFICATION_EVENT = "cesa-alert-notifications-changed";

function normalizeIds(ids = []) {
  return [...new Set(ids.map((id) => String(id)))];
}

export function getSeenAlertIds() {
  if (typeof window === "undefined") return [];

  try {
    const saved = JSON.parse(localStorage.getItem(SEEN_ALERTS_KEY) || "[]");
    return Array.isArray(saved) ? normalizeIds(saved) : [];
  } catch {
    return [];
  }
}

export function initializeAlertNotifications(alerts = []) {
  if (typeof window === "undefined") return;

  const initialized = localStorage.getItem(ALERTS_INITIALIZED_KEY) === "true";
  if (initialized) return;

  const currentIds = normalizeIds(alerts.map((alerta) => alerta.id));
  localStorage.setItem(SEEN_ALERTS_KEY, JSON.stringify(currentIds));
  localStorage.setItem(ALERTS_INITIALIZED_KEY, "true");
}

export function isAlertSeen(id) {
  return getSeenAlertIds().includes(String(id));
}

export function markAlertAsSeen(id) {
  if (typeof window === "undefined" || id === undefined || id === null) return;

  const ids = getSeenAlertIds();
  const normalizedId = String(id);

  if (!ids.includes(normalizedId)) {
    localStorage.setItem(
      SEEN_ALERTS_KEY,
      JSON.stringify([...ids, normalizedId]),
    );
  }

  window.dispatchEvent(new CustomEvent(ALERT_NOTIFICATION_EVENT));
}

export function countUnseenAlerts(alerts = []) {
  const seen = new Set(getSeenAlertIds());
  return alerts.filter((alerta) => !seen.has(String(alerta.id))).length;
}
