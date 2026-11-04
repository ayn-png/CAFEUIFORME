"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, LoaderCircle, Minus, Phone, Plus, RotateCcw } from "lucide-react";
import { links, site, formatTime } from "@/data/site";
import {
  MAX_GUESTS,
  slotsFor,
  todayISO,
  validateReservation,
  hoursFor,
  type FieldErrors,
  type ReservationInput,
  type ReservationResponse,
} from "@/lib/reservation";
import { nowInIndia } from "@/lib/hours";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealLines, Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Form = Omit<ReservationInput, "guests"> & { guests: number };
type Phase =
  | { k: "idle" }
  | { k: "sending" }
  | { k: "received"; reference?: string }
  | { k: "not_connected" }
  | { k: "error"; message: string };

const empty: Form = { name: "", phone: "", email: "", date: "", time: "", guests: 2, requests: "" };

function prettyDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
}

function whatsappText(f: Form) {
  return [
    `Hello ${site.name}! I'd like to reserve a table.`,
    `Name: ${f.name}`,
    `Date: ${prettyDate(f.date)}`,
    `Time: ${f.time ? formatTime(f.time) : "-"}`,
    `Guests: ${f.guests}`,
    f.requests ? `Notes: ${f.requests}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function Reservation({ standalone = false }: { standalone?: boolean }) {
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Form, boolean>>>({});
  const [phase, setPhase] = useState<Phase>({ k: "idle" });
  const [today, setToday] = useState("");
  const reduce = useReducedMotion();
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => setToday(todayISO(nowInIndia())), []);

  // Pre-fill from an event CTA
  useEffect(() => {
    const onReserve = (e: Event) => {
      const d = (e as CustomEvent<{ event: string; date: string }>).detail;
      setPhase({ k: "idle" });
      setForm((f) => ({
        ...f,
        date: d.date >= todayISO(nowInIndia()) ? d.date : f.date,
        time: "",
        requests: `I'd like to join “${d.event}”.`,
      }));
    };
    window.addEventListener("shiori:reserve", onReserve);
    return () => window.removeEventListener("shiori:reserve", onReserve);
  }, []);

  const slots = useMemo(() => (form.date ? slotsFor(form.date, nowInIndia()) : []), [form.date]);
  const dayHours = form.date ? hoursFor(form.date) : null;

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => {
      const next = { ...f, [k]: v };
      if (k === "date") next.time = "";
      if (touched[k] || Object.keys(errors).length) setErrors(validateReservation(next, nowInIndia()));
      return next;
    });
  };
  const blur = (k: keyof Form) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validateReservation(form, nowInIndia()));
  };

  const submittedOnce = useRef(false);
  const shown = (k: keyof Form) => (touched[k] || submittedOnce.current ? errors[k] : undefined);
  const a11y = (k: keyof Form) => ({ "aria-invalid": !!shown(k), "aria-describedby": `${k}-msg` });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    submittedOnce.current = true;
    const errs = validateReservation(form, nowInIndia());
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setPhase({ k: "sending" });
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as ReservationResponse;
      if (data.status === "received") setPhase({ k: "received", reference: data.reference });
      else if (data.status === "not_connected") setPhase({ k: "not_connected" });
      else if (data.status === "invalid") {
        setErrors(data.errors);
        setPhase({ k: "idle" });
      } else setPhase({ k: "error", message: data.message });
    } catch {
      setPhase({ k: "error", message: "Your connection seems to have dropped." });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const reset = () => {
    setForm(empty);
    setErrors({});
    setTouched({});
    submittedOnce.current = false;
    setPhase({ k: "idle" });
  };

  const done = phase.k === "received" || phase.k === "not_connected" || phase.k === "error";

  return (
    <section
      id="reserve"
      aria-labelledby="reserve-title"
      className={cn("relative bg-ivory", standalone ? "pt-28 md:pt-32" : "")}
    >
      <div className="grid lg:grid-cols-12">
        {/* Left — atmosphere */}
        <div className="relative isolate flex min-h-[28rem] flex-col justify-between overflow-hidden bg-espresso p-[var(--gutter)] py-14 text-ivory lg:col-span-5 lg:min-h-full lg:py-20">
          <div className="absolute inset-0 -z-10 opacity-60">
            <Photo id="reserve" sizes="(min-width: 1024px) 42vw, 100vw" />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/50 via-ink/30 to-ink/85" />
          <Reveal>
            <SectionLabel index="六" label="Reservations" jp="予約" className="text-ivory" />
          </Reveal>
          <div className="mt-24 lg:mt-0">
            <h2 id="reserve-title" className="display text-[clamp(2.8rem,6vw,6rem)]">
              <RevealLines lines={["Save", <span key="b" className="display-italic text-beige">your seat.</span>]} />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-ivory/75">
                Walk-ins are always welcome. For evenings, weekends and the alcoves, a reservation keeps a corner
                warm for you.
              </p>
              <dl className="mt-10 grid max-w-sm grid-cols-2 gap-6 border-t border-ivory/20 pt-6 text-sm">
                <div>
                  <dt className="eyebrow text-ivory/50">Hold time</dt>
                  <dd className="mt-1">15 minutes</dd>
                </div>
                <div>
                  <dt className="eyebrow text-ivory/50">Groups of 10+</dt>
                  <dd className="mt-1">
                    <a href={links.whatsapp("Hello Shiori! I'd like to book for a large group.")} target="_blank" rel="noreferrer" className="link-underline">
                      Message us
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>

        {/* Right — form */}
        <div className="relative px-[var(--gutter)] py-16 md:py-24 lg:col-span-7 lg:px-[max(var(--gutter),5vw)]">
          <AnimatePresence mode="wait" initial={false}>
            {!done ? (
              <motion.form
                key="form"
                ref={formRef}
                noValidate
                onSubmit={onSubmit}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease }}
                className="mx-auto max-w-2xl"
                aria-describedby="form-note"
              >
                <fieldset disabled={phase.k === "sending"} className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
                  <legend className="sr-only">Reservation details</legend>

                  <Field label="Your name" name="name" error={shown("name")} className="sm:col-span-2">
                    <input
                      id="name"
                      name="name"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      onBlur={() => blur("name")}
                      {...a11y("name")}
                      className={inputCls}
                      placeholder="Hinata Sharma"
                    />
                  </Field>

                  <Field label="Phone" name="phone" error={shown("phone")} hint="We'll confirm on this number">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg text-muted">+91</span>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel-national"
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        onBlur={() => blur("phone")}
                      {...a11y("phone")}
                        className={inputCls}
                        placeholder="98765 43210"
                      />
                    </div>
                  </Field>

                  <Field label="Email" name="email" optional error={shown("email")}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      onBlur={() => blur("email")}
                      {...a11y("email")}
                      className={inputCls}
                      placeholder="you@example.com"
                    />
                  </Field>

                  <Field
                    label="Date"
                    name="date"
                    error={shown("date")}
                    hint={
                      dayHours?.open && dayHours.close
                        ? `${dayHours.day}: ${formatTime(dayHours.open)} – ${formatTime(dayHours.close)}`
                        : "Closed on Mondays"
                    }
                  >
                    <input
                      id="date"
                      name="date"
                      type="date"
                      min={today || undefined}
                      value={form.date}
                      onChange={(e) => set("date", e.target.value)}
                      onBlur={() => blur("date")}
                      {...a11y("date")}
                      className={cn(inputCls, "[color-scheme:light]")}
                    />
                  </Field>

                  <Field label="Guests" name="guests" error={shown("guests")}>
                    <div className="flex items-center justify-between border-b border-espresso/25 pb-2">
                      <button
                        type="button"
                        onClick={() => set("guests", Math.max(1, form.guests - 1))}
                        className="grid h-9 w-9 place-items-center rounded-full border border-espresso/20 transition-colors hover:border-espresso disabled:opacity-30"
                        disabled={form.guests <= 1}
                        aria-label="Fewer guests"
                      >
                        <Minus className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                      <output id="guests" name="guests" aria-live="polite" className="display text-3xl tabular-nums">
                        {form.guests}
                        <span className="ml-2 font-sans text-sm text-muted">{form.guests === 1 ? "guest" : "guests"}</span>
                      </output>
                      <button
                        type="button"
                        onClick={() => set("guests", Math.min(MAX_GUESTS, form.guests + 1))}
                        className="grid h-9 w-9 place-items-center rounded-full border border-espresso/20 transition-colors hover:border-espresso disabled:opacity-30"
                        disabled={form.guests >= MAX_GUESTS}
                        aria-label="More guests"
                      >
                        <Plus className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                    </div>
                  </Field>

                  <div className="sm:col-span-2">
                    <div className="flex items-baseline justify-between">
                      <span id="time-label" className="eyebrow text-espresso/70">
                        Preferred time
                      </span>
                      {shown("time") && (
                        <span role="alert" className="text-xs text-terracotta">
                          {shown("time")}
                        </span>
                      )}
                    </div>
                    <div
                      role="radiogroup"
                      aria-labelledby="time-label"
                      className="mt-4 grid max-h-56 grid-cols-3 gap-2 overflow-y-auto pr-1 xs:grid-cols-4 sm:grid-cols-6"
                      data-lenis-prevent
                    >
                      {!form.date && <p className="col-span-full text-sm text-muted">Choose a date to see available times.</p>}
                      {form.date && slots.length === 0 && (
                        <p className="col-span-full text-sm text-muted">No times left on this day — try another date.</p>
                      )}
                      {slots.map((t) => {
                        const sel = form.time === t;
                        return (
                          <button
                            key={t}
                            type="button"
                            role="radio"
                            name="time"
                            aria-checked={sel}
                            onClick={() => {
                              set("time", t);
                              setTouched((x) => ({ ...x, time: true }));
                            }}
                            className={cn(
                              "border py-2.5 text-sm tabular-nums transition-colors duration-300",
                              sel
                                ? "border-espresso bg-espresso text-ivory"
                                : "border-espresso/15 hover:border-espresso/60",
                            )}
                          >
                            {formatTime(t)}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <Field label="Special requests" name="requests" optional error={shown("requests")} className="sm:col-span-2">
                    <textarea
                      id="requests"
                      name="requests"
                      rows={3}
                      value={form.requests}
                      onChange={(e) => set("requests", e.target.value)}
                      onBlur={() => blur("requests")}
                      {...a11y("requests")}
                      className={cn(inputCls, "resize-none leading-relaxed")}
                      placeholder="A window seat, an alcove, a birthday, allergies…"
                    />
                  </Field>
                </fieldset>

                <div className="mt-12 flex flex-col-reverse items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <p id="form-note" className="max-w-xs text-xs leading-relaxed text-muted">
                    This sends a request, not a confirmed booking. We&apos;ll call or WhatsApp you to confirm.
                  </p>
                  <button
                    type="submit"
                    disabled={phase.k === "sending"}
                    className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden bg-espresso px-10 py-5 text-sm font-medium tracking-[0.06em] text-ivory transition-colors hover:bg-ink disabled:cursor-wait sm:w-auto"
                  >
                    <span className="absolute inset-0 origin-left scale-x-0 bg-terracotta transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-x-100 group-disabled:scale-x-0" />
                    <span className="relative flex items-center gap-3">
                      {phase.k === "sending" ? (
                        <>
                          <LoaderCircle className="h-4 w-4 animate-spin" /> Sending request…
                        </>
                      ) : (
                        <>Request reservation</>
                      )}
                    </span>
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="status"
                ref={statusRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease }}
                className="mx-auto flex min-h-[32rem] max-w-xl flex-col justify-center outline-none"
              >
                {phase.k === "received" && (
                  <>
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-matcha text-ivory">
                      <Check className="h-6 w-6" strokeWidth={1.5} />
                    </span>
                    <h3 className="display mt-8 text-5xl">Request received.</h3>
                    <p className="mt-5 text-[1.0625rem] leading-relaxed text-charcoal/80">
                      Thank you, {form.name.split(" ")[0]}. We&apos;ve noted {form.guests}{" "}
                      {form.guests === 1 ? "guest" : "guests"} for {prettyDate(form.date)} at {formatTime(form.time)}.
                      This isn&apos;t confirmed yet — we&apos;ll call or WhatsApp you shortly to confirm your table.
                    </p>
                    {phase.reference && <p className="mt-4 font-mono text-sm text-muted">Reference: {phase.reference}</p>}
                  </>
                )}

                {phase.k === "not_connected" && (
                  <>
                    <span className="font-jp text-4xl text-terracotta">栞</span>
                    <h3 className="display mt-6 text-[2.6rem] leading-[1.05] md:text-5xl">
                      Almost there — one more step.
                    </h3>
                    <p className="mt-5 text-[1.0625rem] leading-relaxed text-charcoal/80">
                      Our online booking isn&apos;t connected yet, so <strong className="font-medium">your table is not booked</strong>.
                      Send these details to us on WhatsApp — it&apos;s already written for you — and we&apos;ll confirm
                      personally.
                    </p>
                    <div className="mt-6 border-l-2 border-beige bg-paper/60 px-5 py-4 text-sm leading-relaxed text-charcoal/80">
                      {form.guests} {form.guests === 1 ? "guest" : "guests"} · {prettyDate(form.date)} · {formatTime(form.time)}
                    </div>
                  </>
                )}

                {phase.k === "error" && (
                  <>
                    <h3 className="display text-5xl">Something went quiet.</h3>
                    <p className="mt-5 text-[1.0625rem] leading-relaxed text-charcoal/80">
                      {phase.message} Your request was <strong className="font-medium">not sent</strong>. Please try
                      again, or reach us directly.
                    </p>
                  </>
                )}

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  {phase.k !== "received" && (
                    <a
                      href={links.whatsapp(whatsappText(form))}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-3 bg-espresso px-7 py-4 text-sm font-medium text-ivory transition-colors hover:bg-ink"
                    >
                      <WhatsAppIcon /> Send on WhatsApp
                    </a>
                  )}
                  <a
                    href={site.phoneHref}
                    className="inline-flex items-center justify-center gap-3 border border-espresso/25 px-7 py-4 text-sm font-medium transition-colors hover:border-espresso"
                  >
                    <Phone className="h-4 w-4" strokeWidth={1.5} /> Call {site.phone}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={phase.k === "error" ? () => setPhase({ k: "idle" }) : reset}
                  className="mt-8 inline-flex items-center gap-2 self-start text-sm text-muted transition-colors hover:text-espresso"
                >
                  <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {phase.k === "error" ? "Back to the form" : "Start a new request"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full border-0 border-b border-espresso/25 bg-transparent px-0 pb-2 pt-1 text-lg text-espresso placeholder:text-espresso/25 transition-colors focus:border-espresso focus:outline-none focus:ring-0 aria-[invalid=true]:border-terracotta";

function Field({
  label,
  name,
  error,
  hint,
  optional,
  className,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("group/field", className)} data-invalid={!!error || undefined}>
      <label htmlFor={name} className="eyebrow mb-3 flex items-baseline justify-between text-espresso/70">
        <span>
          {label}
          {optional && <span className="ml-2 normal-case tracking-normal text-muted">(optional)</span>}
        </span>
      </label>
      <div className="[&_input]:aria-[invalid=true]:border-terracotta group-data-[invalid]/field:[&_input]:border-terracotta group-data-[invalid]/field:[&_textarea]:border-terracotta">
        {children}
      </div>
      <div className="mt-2 min-h-4 text-xs" id={`${name}-msg`}>
        <AnimatePresence mode="wait" initial={false}>
          {error ? (
            <motion.p
              key="e"
              role="alert"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-terracotta"
            >
              {error}
            </motion.p>
          ) : hint ? (
            <motion.p key="h" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-muted">
              {hint}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
