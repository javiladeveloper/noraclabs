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
  const [clientEmail, setClientEmail] = useState("");
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
    { key: "ecommerce", label: f.typeOptions.ecommerce },
    { key: "system", label: f.typeOptions.system },
    { key: "ai", label: f.typeOptions.ai },
    { key: "chatbot", label: f.typeOptions.chatbot },
    { key: "integration", label: f.typeOptions.integration },
    { key: "api", label: f.typeOptions.api },
    { key: "consulting", label: f.typeOptions.consulting },
    { key: "maintenance", label: f.typeOptions.maintenance },
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
      [f.email, clientEmail],
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
          // Clearer subject: name + project type at a glance.
          subject: `${f.subject}${name ? ` — ${name}` : ""}${
            type ? ` (${labelOf(typeOptions, type)})` : ""
          }`,
          from_name: name || "Norac Labs — contacto web",
          // So "Reply" in your inbox goes straight to the client.
          replyto: clientEmail || undefined,
          // structured fields so the email is readable
          Nombre: name,
          Correo: clientEmail,
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
        setClientEmail("");
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
  // Custom caret via inline SVG background; appearance-none removes the native one.
  const caret =
    "bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22none%22 stroke=%22%23a1a1aa%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10";
  const selectClass = `${inputClass} ${caret} appearance-none cursor-pointer`;
  // Options need explicit colors so they're readable in the OS dropdown (dark theme).
  const optStyle = { backgroundColor: "#14141b", color: "#ededed" };

  // Reusable dark-friendly select. Grey text until a value is chosen.
  function Select({
    value,
    onChange,
    placeholder,
    options,
  }: {
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    options: { key: string; label: string }[];
  }) {
    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={selectClass}
        style={{ color: value ? "#ededed" : "#a1a1aa" }}
      >
        <option value="" disabled style={optStyle}>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.key} value={o.key} style={optStyle}>
            {o.label}
          </option>
        ))}
      </select>
    );
  }

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
        <input type="email" placeholder={f.email} value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} className={inputClass} />
        <input type="text" placeholder={f.company} value={company} onChange={(e) => setCompany(e.target.value)} className={inputClass} />
        <input type="tel" placeholder={f.phone} value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
        <Select value={type} onChange={setType} placeholder={f.type} options={typeOptions} />
        <Select value={budget} onChange={setBudget} placeholder={f.budget} options={budgetOptions} />
        <Select value={timeline} onChange={setTimeline} placeholder={f.timeline} options={timelineOptions} />
      </div>

      <div className="mt-3">
        <Select value={source} onChange={setSource} placeholder={f.source} options={sourceOptions} />
      </div>

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
