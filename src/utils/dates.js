export function formatShortDate(value) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function formatDateTime(value) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function getWeekDays() {
  return [
    { label: "L", day: 19 },
    { label: "M", day: 20 },
    { label: "X", day: 21 },
    { label: "J", day: 22 },
    { label: "V", day: 23, selected: true },
    { label: "S", day: 24 },
    { label: "D", day: 25 },
  ];
}
