import { NextResponse } from "next/server";
import { normalisePhone, validateReservation, type ReservationInput, type ReservationResponse } from "@/lib/reservation";
import { nowInIndia } from "@/lib/hours";

/**
 * Reservation endpoint.
 *
 * INTEGRATION POINT: set BOOKING_WEBHOOK_URL to forward validated requests (JSON POST) to your
 * booking system — e.g. a Google Apps Script, Zapier/Make hook, a CRM, or your own service.
 * Until it's set, the endpoint validates and responds `not_connected`, and the site tells the
 * guest honestly that online booking isn't live, offering WhatsApp instead.
 */
export async function POST(req: Request) {
  let body: Partial<ReservationInput>;
  try {
    body = await req.json();
  } catch {
    return json({ status: "error", message: "Invalid request." }, 400);
  }

  const input: Partial<ReservationInput> = {
    name: String(body.name ?? "").slice(0, 120),
    phone: String(body.phone ?? "").slice(0, 20),
    email: body.email ? String(body.email).slice(0, 160) : undefined,
    date: String(body.date ?? ""),
    time: String(body.time ?? ""),
    guests: Number(body.guests),
    requests: body.requests ? String(body.requests).slice(0, 600) : undefined,
  };

  const errors = validateReservation(input, nowInIndia());
  if (Object.keys(errors).length) return json({ status: "invalid", errors }, 422);

  const webhook = process.env.BOOKING_WEBHOOK_URL;
  if (!webhook) {
    return json(
      {
        status: "not_connected",
        message: "Online booking isn't connected yet.",
      },
      503,
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...input,
        phone: `+91${normalisePhone(input.phone!)}`,
        source: "website",
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Upstream ${res.status}`);
    const data = (await res.json().catch(() => ({}))) as { reference?: string };
    return json({ status: "received", reference: data.reference }, 200);
  } catch (err) {
    console.error("[reservations] forward failed", err);
    return json({ status: "error", message: "We couldn't reach our booking book just now." }, 502);
  }
}

function json(body: ReservationResponse, status: number) {
  return NextResponse.json(body, { status });
}
