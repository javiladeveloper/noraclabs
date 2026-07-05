"use client";

import { useState } from "react";
import type { Dictionary } from "@/dictionaries";

export function ContactForm({
  dict,
  email,
  whatsapp,
  formKey,
}: {
  dict: Dictionary;
  email: string;
  whatsapp: string;
  formKey: string;
}) {
  const f = dict.contact.form;
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [source, setSource] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle",
  );

  const typeOptions = [
    { key: "app", label: f.typeOptions.app },
    { key: "web", label: f.typeOptions.web },
    { key: "ai", label: f.typeOptions.ai },
    { key: "system", label: f.typeOptions.system },
    { key: "other", label: f.typeOptions.other },
  ];
  const budgetOptions = [
    { key: "s1", label: f.budgetOptions.s1 },
    { key: "s2", label: f.budgetOptions.s2 },
    { key: "s3", label: f.budgetOptions.s3 },
    { key: "s4", label: f.budgetOptions.s4 },
    { key: "tbd", label: f.budgetOptions.tbd },
  ];
  const timelineOptions = [
    { key: "asap", label: f.timelineOptions.asap },
    { key: "months", label: f.timelineOptions.months },
    { key: "flexible", label: f.timelineOptions.flexible },
    { key: "quote", label: f.timelineOptions.quote },
  ];
  const sourceOptions = [
    { key: "google", label: f.sourceOptions.google },
    { key: "social", label: f.sourceOptions.social },
    { key: "referral", label: f.sourceOptions.referral },
    { key: "other", label: f.sourceOptions.other },
  ];

  const labelOf = (opts: { key: string; label: string }[], key: string) =>
    opts.find((o) => o.key === key)?.label ?? "—";

  /** Human-readable body shared by email + WhatsApp (skips empty fields). */
  function buildBody() {
    const rows: [string, string][] = [
      [f.name, name],
      [f.company, company],
      [f.phone, phone],
      [f.type, type ? labelOf(typeOptions, type) : ""],
      [f.budget, budget ? labelOf(budgetOptions, budget) : ""],
      [f.timeline, timeline ? labelOf(timelineOptions, timeline) : ""],
      [f.source, source ? labelOf(sourceOptions, source) : ""],
    ];
    const filled = rows
      .filter(([, v]) => v && v.trim())
      .map(([k, v]) => `${k}: ${v}`);
    return [...filled, "", message.trim()].join("\n");
  }

  const disabled = !name.trim() || !message.trim() || status === "sending";
  const configured = formKey && formKey !== "YOUR_WEB3FORMS_ACCESS_KEY";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (disabled) return;

    // If the key isn't set, show the error (offer WhatsApp) — never open a
    // mailto:, which triggers the browser's "pick an app" dialog.
    if (!configured) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: formKey,
          subject: f.subject,
          from_name: name || "Norac Labs — contacto web",
          // structured fields so the email is readable
          Nombre: name,
          Empresa: company,
          Teléfono: phone,
          Tipo: type ? labelOf(typeOptions, type) : "",
          Presupuesto: budget ? labelOf(budgetOptions, budget) : "",
          Plazo: timeline ? labelOf(timelineOptions, timeline) : "",
          Origen: source ? labelOf(sourceOptions, source) : "",
          Mensaje: message,
        }),
      });
      if (res.ok) {
        setStatus("ok");
        setName("");
        setCompany("");
        setPhone("");
        setType("");
        setBudget("");
        setTimeline("");
        setSource("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  function sendWhatsapp() {
    const text = encodeURIComponent(`*${f.subject}*\n\n${buildBody()}`);
    window.open(`https://wa.me/${whatsapp}?text=${text}`, "_blank");
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-card/50 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none";
  const selectClass = `${inputClass} appearance-none`;

  if (status === "ok") {
    return (
      <div className="mt-8 max-w-xl rounded-2xl border border-accent/40 bg-accent/10 p-6 text-center">
        <p className="text-lg font-medium text-foreground">{f.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-8 max-w-xl">
      <div className="grid gap-3 sm:grid-cols-2">
        <input type="text" placeholder={f.name} value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        <input type="text" placeholder={f.company} value={company} onChange={(e) => setCompany(e.target.value)} className={inputClass} />
        <input type="tel" placeholder={f.phone} value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
        <select value={type} onChange={(e) => setType(e.target.value)} className={selectClass}>
          <option value="" disabled>{f.type}</option>
          {typeOptions.map((o) => (<option key={o.key} value={o.key}>{o.label}</option>))}
        </select>
        <select value={budget} onChange={(e) => setBudget(e.target.value)} className={selectClass}>
          <option value="" disabled>{f.budget}</option>
          {budgetOptions.map((o) => (<option key={o.key} value={o.key}>{o.label}</option>))}
        </select>
        <select value={timeline} onChange={(e) => setTimeline(e.target.value)} className={selectClass}>
          <option value="" disabled>{f.timeline}</option>
          {timelineOptions.map((o) => (<option key={o.key} value={o.key}>{o.label}</option>))}
        </select>
      </div>

      <select value={source} onChange={(e) => setSource(e.target.value)} className={`${selectClass} mt-3`}>
        <option value="" disabled>{f.source}</option>
        {sourceOptions.map((o) => (<option key={o.key} value={o.key}>{o.label}</option>))}
      </select>

      <textarea placeholder={f.message} value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className={`${inputClass} mt-3 resize-none`} />

      {status === "error" && (
        <p className="mt-3 text-sm text-red-400">{f.error}</p>
      )}

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={disabled}
          className="inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status === "sending" ? f.sending : f.sendEmail}
        </button>
        <button
          type="button"
          onClick={sendWhatsapp}
          disabled={!name.trim() || !message.trim()}
          className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M17.5 14.4c-.3-.15-1.7-.84-2-.94-.26-.1-.46-.15-.65.15-.2.3-.75.94-.92 1.13-.17.2-.34.22-.63.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.34.44-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.65-1.57-.9-2.15-.24-.56-.48-.48-.65-.49h-.56c-.2 0-.5.07-.77.37-.26.3-1 .98-1 2.4 0 1.4 1.02 2.76 1.17 2.95.15.2 2.02 3.08 4.9 4.32.68.3 1.22.47 1.63.6.69.22 1.31.19 1.8.11.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.27-.19-.56-.34zM12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2z" />
          </svg>
          {f.sendWhatsapp}
        </button>
      </div>
    </form>
  );
}
