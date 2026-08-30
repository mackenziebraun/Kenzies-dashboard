// Small date-handling helpers shared across the app.
// We deliberately avoid a date library dependency for now — these cover
// everything the dashboard needs (date keys, comparisons, formatting).

/** Returns a stable YYYY-MM-DD key for a Date, in local time. */
export function dateKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function todayKey() {
  return dateKey(new Date())
}

export function isSameDay(a, b) {
  return dateKey(a) === dateKey(b)
}

export function isToday(date) {
  return dateKey(date) === todayKey()
}

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const MONTH_LABELS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export function weekdayLabels() {
  return WEEKDAY_LABELS
}

export function monthLabel(date) {
  return MONTH_LABELS[date.getMonth()]
}

/** Builds a 6x7 grid (Array of weeks, each an array of 7) of Dates for the
 * month containing `date`, including leading/trailing days from adjacent
 * months so every week is fully populated. */
export function monthGrid(date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstOfMonth = new Date(year, month, 1)
  const startOffset = firstOfMonth.getDay() // 0 = Sunday

  const gridStart = new Date(year, month, 1 - startOffset)

  const weeks = []
  let cursor = new Date(gridStart)
  for (let w = 0; w < 6; w++) {
    const week = []
    for (let d = 0; d < 7; d++) {
      week.push(new Date(cursor))
      cursor.setDate(cursor.getDate() + 1)
    }
    weeks.push(week)
  }
  return weeks
}

export function isSameMonth(date, referenceDate) {
  return (
    date.getMonth() === referenceDate.getMonth() &&
    date.getFullYear() === referenceDate.getFullYear()
  )
}

export function addMonths(date, delta) {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1)
}

/** Formats a Date as e.g. "August 28" */
export function formatLongDate(date) {
  return `${monthLabel(date)} ${date.getDate()}`
}

/** Formats a Date as e.g. "Fri, August 28" */
export function formatFullDate(date) {
  const WEEKDAY_FULL = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return `${WEEKDAY_FULL[date.getDay()]}, ${monthLabel(date)} ${date.getDate()}`
}

/** Formats a Date's time as e.g. "9:15 AM" */
export function formatTime(date) {
  return date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
}

/** Parses a "HH:MM" 24h string + a date key into a Date object, for sorting. */
export function combineDateAndTime(dateKeyStr, timeStr) {
  const [y, m, d] = dateKeyStr.split('-').map(Number)
  const [hh, mm] = (timeStr || '00:00').split(':').map(Number)
  return new Date(y, m - 1, d, hh || 0, mm || 0)
}
