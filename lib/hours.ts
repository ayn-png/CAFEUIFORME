import { site, formatTime } from "@/data/site";

/** Current time in India regardless of the visitor's / server's timezone. */
export function nowInIndia(base = new Date()) {
  return new Date(base.getTime() + (330 + base.getTimezoneOffset()) * 60000);
}

export function openStatus(base = new Date()) {
  const now = nowInIndia(base);
  const today = site.hours[now.getDay()];
  const mins = now.getHours() * 60 + now.getMinutes();
  const toMin = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  if (today.open && today.close) {
    const o = toMin(today.open);
    const c = toMin(today.close);
    if (mins >= o && mins < c) return { open: true, label: `Open now · until ${formatTime(today.close)}` };
    if (mins < o) return { open: false, label: `Opens today at ${formatTime(today.open)}` };
  }
  for (let i = 1; i <= 7; i++) {
    const d = site.hours[(now.getDay() + i) % 7];
    if (d.open) return { open: false, label: `Closed · opens ${i === 1 ? "tomorrow" : d.day} ${formatTime(d.open)}` };
  }
  return { open: false, label: "Closed" };
}
