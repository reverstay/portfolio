import { NextResponse } from "next/server";

type Payload = { name?: string; email?: string; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Envia a mensagem do formulário por e-mail via Resend (https://resend.com).
// Variáveis: RESEND_API_KEY, CONTACT_TO_EMAIL e, opcionalmente, CONTACT_FROM_EMAIL.
// Sem RESEND_API_KEY a mensagem é apenas registrada no log do servidor.
export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !message || !EMAIL_RE.test(email) || name.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    console.log("[contato] nova mensagem", { name, email, message });
    return NextResponse.json({ ok: true });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfólio <onboarding@resend.dev>",
      to,
      reply_to: email,
      subject: `Novo contato pelo portfólio: ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    console.error("[contato] falha no envio", res.status, await res.text());
    return NextResponse.json({ error: "Falha ao enviar" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
