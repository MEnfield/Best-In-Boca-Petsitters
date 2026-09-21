import { useId, useRef, useState, type SyntheticEvent } from "react";

/**
 * The meet & greet request form — the only interactive component on the site,
 * and the only place React is loaded.
 *
 * It earns the JavaScript because a plain <form action> would navigate away to
 * a third-party confirmation page, losing the visitor at the exact moment they
 * converted. Here they stay put, get an immediate answer, and are handed the
 * phone number as a second chance if their dates are close.
 *
 * The fields are deliberately the four things Holly currently asks people to
 * leave on her voicemail — name, phone, area, dates — which callers routinely
 * get wrong. A form captures them correctly every time.
 */

const ENDPOINT = "https://api.web3forms.com/submit";

interface Props {
  accessKey: string;
  phoneDisplay: string;
  phoneHref: string;
  /** Passed in from site.ts rather than hardcoded — one source of truth. */
  email: string;
}

type Status = "idle" | "submitting" | "success" | "error";

interface Errors {
  name?: string;
  contact?: string;
  area?: string;
}

export default function ContactForm({
  accessKey,
  phoneDisplay,
  phoneHref,
  email: contactEmail,
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const uid = useId();
  const fieldId = (name: string) => `${uid}-${name}`;
  const errorId = (name: string) => `${uid}-${name}-error`;

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const area = String(data.get("area") ?? "").trim();

    // Validation is deliberately thin. Every extra required field costs
    // conversions, and Holly can chase a missing detail in thirty seconds by
    // phone. All we truly need is a name, a way to reply, and roughly where
    // they are — because outside ten miles she can’t help them at all.
    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "Please tell me your name.";
    if (!phone && !email) {
      nextErrors.contact =
        "Please leave a phone number or an email address so I can reply.";
    }
    if (!area) {
      nextErrors.area =
        "Please tell me your community or neighbourhood so I know whether I cover you.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      // Move focus to the summary so a screen reader announces the problem
      // instead of leaving the user wondering why nothing happened.
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });

      if (!response.ok) throw new Error(`Request failed: ${response.status}`);

      const result: { success?: boolean } = await response.json();
      if (!result.success) throw new Error("Submission rejected");

      setStatus("success");
      form.reset();
      requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      // Never strand them. The failure message hands over the phone number,
      // which was always the better path anyway.
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="form-result"
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
      >
        <h2 className="form-result__title">Thanks &mdash; that&rsquo;s come through.</h2>
        <p>
          I&rsquo;ll be in touch soon to arrange a time to come and meet your
          cat.
        </p>
        <p>
          If your dates are coming up quickly, give me a call at{" "}
          <a href={phoneHref} data-track="tel">
            {phoneDisplay}
          </a>{" "}
          &mdash; that&rsquo;s the fastest way to reach me.
        </p>
      </div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <input type="hidden" name="access_key" value={accessKey} />
      <input
        type="hidden"
        name="subject"
        value="New meet & greet request from bocapetsitting.com"
      />
      <input type="hidden" name="from_name" value="Best In Boca Pet Sitters website" />

      {/*
        Honeypot. Bots fill everything; people never see it.

        It stays in the CSSOM rather than `display: none` so naive scrapers
        still find and fill it, but it is removed from the accessibility tree —
        otherwise it reaches a screen reader as an unlabelled checkbox, and
        there is no honest label to give a field whose only job is to be a
        trap. tabIndex={-1} keeps it out of the tab order, so hiding it
        strands nobody.
      */}
      <input
        type="checkbox"
        name="botcheck"
        className="visually-hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {hasErrors && (
        <div
          className="form-errors"
          ref={errorSummaryRef}
          tabIndex={-1}
          role="alert"
        >
          <p className="form-errors__title">Just a couple of things first:</p>
          <ul>
            {Object.entries(errors).map(([key, message]) => (
              <li key={key}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="field">
        <label className="field__label" htmlFor={fieldId("name")}>
          Your name <span className="field__req">(required)</span>
        </label>
        <input
          id={fieldId("name")}
          name="name"
          type="text"
          autoComplete="name"
          className="field__input"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? errorId("name") : undefined}
        />
        {errors.name && (
          <p className="field__error" id={errorId("name")}>
            {errors.name}
          </p>
        )}
      </div>

      <div className="field-row">
        <div className="field">
          <label className="field__label" htmlFor={fieldId("phone")}>
            Phone number
          </label>
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            className="field__input"
            aria-invalid={errors.contact ? true : undefined}
            aria-describedby={errors.contact ? errorId("contact") : undefined}
          />
        </div>

        <div className="field">
          <label className="field__label" htmlFor={fieldId("email")}>
            Email address
          </label>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            className="field__input"
            aria-invalid={errors.contact ? true : undefined}
            aria-describedby={errors.contact ? errorId("contact") : undefined}
          />
        </div>
      </div>

      {errors.contact && (
        <p className="field__error" id={errorId("contact")}>
          {errors.contact}
        </p>
      )}

      <div className="field">
        <label className="field__label" htmlFor={fieldId("area")}>
          Your community or neighbourhood{" "}
          <span className="field__req">(required)</span>
        </label>
        <input
          id={fieldId("area")}
          name="area"
          type="text"
          className="field__input"
          placeholder="Woodfield, Boca West, Deerfield…"
          aria-invalid={errors.area ? true : undefined}
          aria-describedby={`${fieldId("area")}-hint${
            errors.area ? ` ${errorId("area")}` : ""
          }`}
        />
        <p className="field__hint" id={`${fieldId("area")}-hint`}>
          I cover West Boca, Delray Beach and Deerfield Beach, up to ten miles
          out.
        </p>
        {errors.area && (
          <p className="field__error" id={errorId("area")}>
            {errors.area}
          </p>
        )}
      </div>

      <div className="field-row">
        <div className="field">
          <label className="field__label" htmlFor={fieldId("dates")}>
            Dates you need
          </label>
          <input
            id={fieldId("dates")}
            name="dates"
            type="text"
            className="field__input"
            placeholder="e.g. 14–22 November"
          />
        </div>

        <div className="field">
          <label className="field__label" htmlFor={fieldId("cats")}>
            How many cats?
          </label>
          <select id={fieldId("cats")} name="cats" className="field__input" defaultValue="1">
            <option value="1">1 cat</option>
            <option value="2">2 cats</option>
            <option value="3">3 cats</option>
            <option value="4+">4 or more</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label className="field__label" htmlFor={fieldId("notes")}>
          Anything I should know?
        </label>
        <textarea
          id={fieldId("notes")}
          name="notes"
          rows={4}
          className="field__input"
          placeholder="Shy with strangers, hides under the bed, eats twice a day…"
        />
      </div>

      {status === "error" && (
        <div className="form-errors" role="alert">
          <p className="form-errors__title">That didn&rsquo;t go through.</p>
          <p>
            Something went wrong sending your message &mdash; please call me
            instead at{" "}
            <a href={phoneHref} data-track="tel">
              {phoneDisplay}
            </a>
            , or email <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>
        </div>
      )}

      <button
        type="submit"
        className="btn btn--primary btn--lg btn--block"
        disabled={status === "submitting"}
        data-track="form-submit"
      >
        {status === "submitting" ? "Sending…" : "Request a free meet & greet"}
      </button>

      <p className="form-foot muted">
        No obligation, and nothing is booked until we&rsquo;ve met. Prefer to
        talk?{" "}
        <a href={phoneHref} data-track="tel">
          Call me at {phoneDisplay}
        </a>
        .
      </p>
    </form>
  );
}
