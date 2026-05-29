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

export function formatMonthYear(value) {
  return new Intl.DateTimeFormat("es-ES", {
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function formatLongDay(value) {
  return new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(value));
}

export function toDateInputValue(value) {
  return new Date(value).toISOString().slice(0, 10);
}

export function getWeekDays(selectedDate) {
  const selected = new Date(selectedDate);
  const monday = new Date(selected);
  const day = selected.getDay() || 7;
  monday.setDate(selected.getDate() - day + 1);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return {
      label: ["L", "M", "X", "J", "V", "S", "D"][index],
      day: date.getDate(),
      value: toDateInputValue(date),
      selected: toDateInputValue(date) === toDateInputValue(selected),
    };
  });
}
