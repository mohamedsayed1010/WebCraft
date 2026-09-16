import { NextResponse } from "next/server";
import { Resend } from "resend";

import { siteConfig } from "@/config/site";
import { contactSchema, type ContactResponse } from "@/lib/validations/contact";

/**
 * CONTACT — Route Handler.
 *
 * Re-validates with the same schema the form uses, because client validation
 * is a UX feature and never a security boundary.
 *
 * ─── DELIVERY ────────────────────────────────────────────────────────────
 * This used to `console.info` the enquiry and return 200. In development that
 * is a reasonable stub; in production it is a lead form that tells the visitor
 * «وصلتنا» and quietly drops the message — the single worst failure mode a
 * conversion page can have, because it is invisible from both ends.
 *
 * It now sends through Resend when the three environment variables are set,
 * and — this is the part that matters — returns 502 when the send is
 * rejected, so the form shows its error state and offers the public email
 * address instead of lying. With the variables unset it still logs and
 * acknowledges, so local development and preview deploys keep working.
 *
 * TO GO LIVE, set in `.env.local` (and in the host's environment):
 *   RESEND_API_KEY       from resend.com
 *   CONTACT_FROM_EMAIL   a verified sender on your own domain
 *   CONTACT_TO_EMAIL     where leads should land
 *
 * Until then the address in `siteConfig.contact.email` is the only path that
 * actually delivers, which is why the form's failure state hands it over.
 * ─────────────────────────────────────────────────────────────────────────
 */

const apiKey = process.env.RESEND_API_KEY;
const from = process.env.CONTACT_FROM_EMAIL;
const to = process.env.CONTACT_TO_EMAIL;

/** True only when every piece needed to actually deliver a mail is present. */
const canSendEmail = Boolean(apiKey && from && to);

export async function POST(
  request: Request,
): Promise<NextResponse<ContactResponse>> {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Malformed request body." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed.",
        fieldErrors: parsed.error.flatten().fieldErrors as Record<
          string,
          string[]
        >,
      },
      { status: 422 },
    );
  }

  // Honeypot hit. Accept with a 200 and discard — telling a bot it failed only
  // teaches it to try again.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const lead = parsed.data;

  if (!canSendEmail) {
    console.warn(
      "[contact] email is not configured — enquiry logged, not delivered.",
      { name: lead.name, email: lead.email },
    );
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: from as string,
      to: [to as string],
      // The visitor's own address, so hitting reply in the inbox answers them
      // directly instead of answering ourselves.
      replyTo: lead.email,
      subject: `طلب جديد من ${lead.name} — ${siteConfig.nameAr}`,
      text: [
        `الاسم: ${lead.name}`,
        `الإيميل: ${lead.email}`,
        lead.phone ? `الموبايل: ${lead.phone}` : null,
        `نوع المشروع: ${lead.projectType}`,
        `لغة الموقع: ${lead.locale ?? "ar"}`,
        "",
        "الرسالة:",
        lead.message,
      ]
        .filter((line) => line !== null)
        .join("\n"),
    });

    if (error) {
      console.error("[contact] resend rejected the send", error);
      return NextResponse.json(
        { ok: false, error: "Delivery failed." },
        { status: 502 },
      );
    }
  } catch (cause) {
    console.error("[contact] send threw", cause);
    return NextResponse.json(
      { ok: false, error: "Delivery failed." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
