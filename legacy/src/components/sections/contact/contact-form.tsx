"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { contactCopy } from "@/content/copy";
import { BUDGET_RANGES, type ContactInput } from "@/lib/validations/contact";
import { cn } from "@/lib/utils";

/**
 * CONTACT FORM
 *
 * Three required fields — name, email, message. Every additional required
 * field on a lead form costs conversions, so budget and phone stay optional
 * qualifiers that help us reply well without blocking anyone.
 *
 * Validation messages are written in Arabic here rather than reusing the
 * English strings on `contactSchema`: those exist for the server, where the
 * audience is a log line.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>();

  const onSubmit = handleSubmit(async (values) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("request failed");

      setSent(true);
      toast.success(contactCopy.successTitle, {
        description: contactCopy.successBody,
      });
    } catch {
      toast.error(contactCopy.errorTitle, {
        description: contactCopy.errorBody,
      });
    }
  });

  // The one moment the whole page is built toward — and the only card on the
  // site allowed a lime border. It has earned it.
  if (sent) {
    return (
      <div className="card border-accent/30 items-start">
        <span className="text-accent-fg bg-accent grid size-11 place-items-center rounded-full">
          <Icon name="Check" className="size-5" />
        </span>
        <h3 className="font-display mt-5 text-2xl font-bold">
          {contactCopy.successTitle}
        </h3>
        <p className="text-fg-muted leading-body mt-2">
          {contactCopy.successBody}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="border-border bg-surface/50 rounded-lg border p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={contactCopy.fields.name.label}
          error={errors.name?.message}
        >
          <input
            {...register("name", {
              required: "اكتب اسمك عشان نعرف نرد على مين.",
              minLength: { value: 2, message: "الاسم قصير أوي." },
            })}
            placeholder={contactCopy.fields.name.placeholder}
            className={inputClass}
          />
        </Field>

        <Field
          label={contactCopy.fields.email.label}
          error={errors.email?.message}
        >
          <input
            {...register("email", {
              required: "محتاجين إيميل صح عشان نرد عليك.",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "الإيميل مش مظبوط." },
            })}
            type="email"
            dir="ltr"
            placeholder={contactCopy.fields.email.placeholder}
            className={cn(inputClass, "text-start")}
          />
        </Field>

        <Field
          label={contactCopy.fields.phone.label}
          hint={contactCopy.fields.phone.hint}
        >
          <input
            {...register("phone")}
            type="tel"
            dir="ltr"
            placeholder={contactCopy.fields.phone.placeholder}
            className={cn(inputClass, "text-start")}
          />
        </Field>

        <Field
          label={contactCopy.fields.budget.label}
          hint={contactCopy.fields.budget.hint}
        >
          <select {...register("budget")} className={inputClass} defaultValue="">
            <option value="" disabled>
              {contactCopy.budgetOptions[0]}
            </option>
            {/* The Arabic labels and the schema's enum values are two different
                lists — the visitor reads money, the server stores a bucket. */}
            {BUDGET_RANGES.map((range, index) => (
              <option key={range} value={range}>
                {contactCopy.budgetOptions[index] ?? range}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field
          label={contactCopy.fields.message.label}
          error={errors.message?.message}
        >
          <textarea
            {...register("message", {
              required: "احكيلنا سطرين عن مشروعك.",
              minLength: { value: 10, message: "زوّد شوية تفاصيل عشان نرد صح." },
            })}
            rows={5}
            placeholder={contactCopy.fields.message.placeholder}
            className={cn(inputClass, "resize-y")}
          />
        </Field>
      </div>

      {/* Honeypot. Off-screen and hidden from assistive tech; bots fill it. */}
      <input
        {...register("website")}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] size-0 opacity-0"
      />

      <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm">
        <input
          {...register("consent", { required: "وافق عشان نقدر نرد عليك." })}
          type="checkbox"
          className="accent-lime-500 mt-0.5 size-4 shrink-0"
        />
        <span className="text-fg-muted leading-relaxed">
          موافق إننا نتواصل معاك بخصوص استفسارك.
        </span>
      </label>
      {errors.consent ? (
        <FieldError message={errors.consent.message} className="mt-1.5" />
      ) : null}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        block
        disabled={isSubmitting}
        className="mt-7"
      >
        {isSubmitting ? (
          <>
            <Icon name="Loader2" className="size-4 animate-spin" />
            {contactCopy.submitting}
          </>
        ) : (
          contactCopy.submit
        )}
      </Button>
    </form>
  );
}

/* ==========================================================================
   FIELD
   ========================================================================== */

const inputClass = cn(
  "w-full rounded-md border border-border bg-elevated px-4 py-3",
  "font-sans text-base text-fg placeholder:text-fg-subtle/70",
  "transition-[border-color,box-shadow] duration-fast ease-brand",
  // Lime on focus: the field you are typing into is the active step of the
  // one conversion flow on the page, so it earns the signal colour.
  "focus:border-accent/60 focus:outline-none",
  // Invalid fields are marked by the browser's own :user-invalid, so the
  // treatment survives native validation as well as react-hook-form's.
  "user-invalid:border-graphic-muted/70",
);

/**
 * The error line.
 *
 * No red — red is not in the WebCraft palette, and a lone hue is not an
 * accessible error signal in any case. What actually carries the message is
 * the glyph plus the sentence; the violet only has to make the line read as
 * distinct from the muted help text above it, which at 8.9:1 it does.
 */
function FieldError({
  message,
  className,
}: {
  message?: string;
  className?: string;
}) {
  if (!message) return null;

  return (
    <span
      role="alert"
      className={cn(
        "text-danger flex items-start gap-1.5 text-xs",
        className,
      )}
    >
      <Icon name="TriangleAlert" className="mt-px size-3.5 shrink-0" />
      {message}
    </span>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-baseline gap-2">
        <span className="text-fg text-sm font-semibold">{label}</span>
        {hint ? <span className="text-fg-subtle text-xs">{hint}</span> : null}
      </span>

      {children}

      <FieldError message={error} />
    </label>
  );
}
