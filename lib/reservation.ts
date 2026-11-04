import { site } from "@/data/site";

export type ReservationInput = {
  name: string;
  phone: string;
  email?: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  guests: number;
  requests?: string;
};

export type FieldErrors = Partial<Record<keyof ReservationInput, string>>;

export const MAX_GUESTS = 10;

/** Normalise an Indian mobile number to 10 digits, or return null. */
export function normalisePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  const ten = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits.length === 11 && digits.startsWith("0") ? digits.slice(1) : digits;
  return /^[6-9]\d{9}$/.test(ten) ? ten : null;
}

export function todayISO(now = new Date()) {
  const d = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return d.toISOString().slice(0, 10);
}

export function hoursFor(dateISO: string) {
  const [y, m, d] = dateISO.split("-").map(Number);
  const day = new Date(y, m - 1, d).getDay();
  return site.hours[day];
}

/** 30-minute slots from opening until 60 minutes before close. */
export function slotsFor(dateISO: string, now = new Date()): string[] {
  if (!dateISO) return [];
  const h = hoursFor(dateISO);
  if (!h?.open || !h.close) return [];
  const toMin = (t: string) => {
    const [hh, mm] = t.split(":").map(Number);
    return hh * 60 + mm;
  };
  const start = toMin(h.open);
  const end = toMin(h.close) - 60;
  const isToday = dateISO === todayISO(now);
  const nowMin = now.getHours() * 60 + now.getMinutes() + 30;
  const out: string[] = [];
  for (let t = start; t <= end; t += 30) {
    if (isToday && t < nowMin) continue;
    out.push(`${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`);
  }
  return out;
}

export function validateReservation(input: Partial<ReservationInput>, now = new Date()): FieldErrors {
  const e: FieldErrors = {};
  const name = (input.name ?? "").trim();
  if (name.length < 2) e.name = "Please tell us your name.";
  else if (name.length > 80) e.name = "That name is a little long for our book.";

  if (!input.phone?.trim()) e.phone = "We'll need a number to reach you.";
  else if (!normalisePhone(input.phone)) e.phone = "Enter a 10-digit Indian mobile number.";

  if (input.email && input.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.email.trim()))
    e.email = "That email doesn't look quite right.";

  if (!input.date) e.date = "Choose a date.";
  else if (input.date < todayISO(now)) e.date = "That date has already passed.";
  else {
    const h = hoursFor(input.date);
    if (!h?.open) e.date = `We're closed on ${h.day}s — try another day.`;
  }

  if (!e.date) {
    if (!input.time) e.time = "Choose a time.";
    else if (!slotsFor(input.date!, now).includes(input.time)) e.time = "Please pick one of the available times.";
  }

  const g = Number(input.guests);
  if (!Number.isInteger(g) || g < 1) e.guests = "At least one guest, please.";
  else if (g > MAX_GUESTS) e.guests = `For more than ${MAX_GUESTS} guests, message us on WhatsApp.`;

  if (input.requests && input.requests.length > 500) e.requests = "Please keep this under 500 characters.";
  return e;
}

export type ReservationResponse =
  | { status: "received"; reference?: string }
  | { status: "not_connected"; message: string }
  | { status: "invalid"; errors: FieldErrors }
  | { status: "error"; message: string };
