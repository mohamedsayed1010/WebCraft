"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, ChevronDown, LoaderCircle } from "lucide-react";
import { useId, useState } from "react";
import { useForm, type FieldError } from "react-hook-form";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";
import { EMAIL_PATTERN, PHONE_PATTERN, PROJECT_TYPES, type ContactInput } from "@/lib/validations/contact-fields";

/**
 * CONTACT FORM
 *
 * Posts to the existing `/api/contact` Route Handler, which re-validates with
 * the same zod schema and delivers through Resend. Errors are announced inline
 * (aria-invalid + aria-describedby), validation runs on blur then on change,
 * and a failed send offers the email address rather than pretending it worked.
 * Success and failure are announced in place (role=status / role=alert), so no toast
 * library is shipped.
 */
export function ContactForm({
  locale,
  copy,
  email,
}: {
  locale: Locale;
  copy: Dictionary["contact"];
  email: string;
}) {
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    mode: "onTouched",
    defaultValues: { name: "", email: "", phone: "", message: "", website: "", locale },
  });

  const onSubmit = handleSubmit(async (values) => {
    setFailed(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSent(true);
    } catch {
      setFailed(true);
    }
  });

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        role="status"
        className="ring-gradient flex min-h-[28rem] flex-col items-start justify-center rounded-panel bg-surface p-8 sm:p-10"
      >
        <span className="grid size-14 place-items-center rounded-full bg-brand-600 text-white">
          <Check className="size-7" aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-display text-headline font-extrabold text-fg">{copy.successTitle}</h3>
        <p className="mt-3 max-w-md text-fg-muted">{copy.successBody}</p>
        <button
          type="button"
          onClick={() => {
            reset();
            setSent(false);
          }}
          className="mt-8 text-sm font-semibold text-brand-600 underline underline-offset-4"
        >
          {copy.sendAnother}
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="ring-gradient relative rounded-panel bg-white/55 p-6 shadow-[var(--shadow-lift)] sm:p-9">
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -start-[9999px] size-px overflow-hidden">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={copy.fields.name.label} error={errors.name} required>
          {(props) => (
            <input
              {...props}
              {...register("name", {
                required: copy.errors.name,
                minLength: { value: 2, message: copy.errors.name },
                maxLength: { value: 80, message: copy.errors.name },
              })}
              autoComplete="name"
              placeholder={copy.fields.name.placeholder}
              className={inputClass(!!errors.name)}
            />
          )}
        </Field>

        <Field label={copy.fields.email.label} error={errors.email} required>
          {(props) => (
            <input
              {...props}
              {...register("email", {
                required: copy.errors.email,
                pattern: { value: EMAIL_PATTERN, message: copy.errors.email },
              })}
              type="email"
              inputMode="email"
              autoComplete="email"
              dir="ltr"
              placeholder={copy.fields.email.placeholder}
              className={cn(inputClass(!!errors.email), "text-start rtl:text-right")}
            />
          )}
        </Field>

        <Field label={copy.fields.phone.label} hint={copy.fields.phone.hint} error={errors.phone}>
          {(props) => (
            <input
              {...props}
              {...register("phone", {
                validate: (v) => !v || PHONE_PATTERN.test(v.trim()) || copy.errors.phone,
              })}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              dir="ltr"
              placeholder={copy.fields.phone.placeholder}
              className={cn(inputClass(!!errors.phone), "text-start rtl:text-right")}
            />
          )}
        </Field>

        <Field label={copy.fields.projectType.label} error={errors.projectType} required>
          {(props) => (
            <div className="relative">
              <select
                {...props}
                {...register("projectType", { required: copy.errors.projectType })}
                defaultValue=""
                className={cn(inputClass(!!errors.projectType), "appearance-none pe-10")}
              >
                <option value="" disabled>
                  {copy.fields.projectType.placeholder}
                </option>
                {PROJECT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {copy.projectTypes[type]}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden="true" className="pointer-events-none absolute end-4 top-1/2 size-4 -translate-y-1/2 text-fg-subtle" />
            </div>
          )}
        </Field>

        <div className="sm:col-span-2">
          <Field label={copy.fields.message.label} error={errors.message} required>
            {(props) => (
              <textarea
                {...props}
                {...register("message", {
                  required: copy.errors.message,
                  minLength: { value: 10, message: copy.errors.message },
                  maxLength: { value: 4000, message: copy.errors.message },
                })}
                rows={5}
                placeholder={copy.fields.message.placeholder}
                className={cn(inputClass(!!errors.message), "h-auto resize-y py-3.5 leading-relaxed")}
              />
            )}
          </Field>
        </div>
      </div>

      <AnimatePresence>
        {failed ? (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            role="alert"
            className="mt-5 flex flex-wrap items-center gap-2 rounded-xl border border-danger/30 bg-danger/10 p-3 text-sm text-danger"
          >
            <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
            {copy.errorBody}
            <a href={`mailto:${email}`} className="font-semibold underline underline-offset-4">
              <bdi>{email}</bdi>
            </a>
          </motion.p>
        ) : null}
      </AnimatePresence>

      <div className="mt-7 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-fg-subtle">{copy.privacy}</p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full bg-brand-600 px-8 font-semibold text-white shadow-[var(--shadow-brand)] transition-shadow hover:shadow-[var(--shadow-brand)] disabled:opacity-70"
        >
          <span aria-hidden="true" className="absolute inset-0 translate-y-full rounded-full bg-white/35 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:translate-y-0" />
          {isSubmitting ? <LoaderCircle className="relative size-5 animate-spin" aria-hidden="true" /> : null}
          <span className="relative">{isSubmitting ? copy.sending : copy.submit}</span>
        </button>
      </div>
    </form>
  );
}

function inputClass(invalid: boolean) {
  return cn(
    "h-13 w-full rounded-xl border bg-white/85 px-4 text-fg placeholder:text-fg-subtle/80 transition-[border-color,box-shadow,background-color] duration-300 outline-none",
    "focus:border-brand-500 focus:bg-white focus:shadow-[0_0_0_4px_rgb(76_124_255/0.18)] focus-visible:outline-none",
    invalid ? "border-danger/70" : "border-line-strong hover:border-line-strong",
  );
}

function Field({
  label,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  hint?: string;
  error?: FieldError;
  required?: boolean;
  children: (props: {
    id: string;
    "aria-invalid": boolean;
    "aria-describedby"?: string;
    "aria-required"?: boolean;
  }) => React.ReactNode;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-center justify-between text-sm font-medium text-fg">
        <span>
          {label}
          {required ? <span aria-hidden="true" className="ms-1 text-brand-600">*</span> : null}
        </span>
        {hint ? <span className="text-xs font-normal text-fg-subtle">{hint}</span> : null}
      </label>
      {children({
        id,
        "aria-invalid": !!error,
        "aria-describedby": error ? errorId : undefined,
        "aria-required": required || undefined,
      })}
      <AnimatePresence>
        {error?.message ? (
          <motion.p
            id={errorId}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 flex items-center gap-1.5 text-xs text-danger"
          >
            <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
            {error.message}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
