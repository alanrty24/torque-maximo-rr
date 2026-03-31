import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { contactRequestSchema } from '@/lib/validations/contact';
import { waitUntil } from '@vercel/functions';

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function normalizePhoneForWhatsapp(phone: string) {
  return phone.replace(/\D/g, '');
}

function formatPhoneForDisplay(phoneDigits: string) {
  return phoneDigits.length > 0 ? `+${phoneDigits}` : 'No indicado';
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Solicitud inválida.' }, { status: 400 });
  }

  const parsedPayload = contactRequestSchema.safeParse(body);

  if (!parsedPayload.success) {
    const issueMessage = parsedPayload.error.issues[0]?.message || 'Solicitud inválida.';

    return NextResponse.json({ message: issueMessage }, { status: 400 });
  }

  const payload = parsedPayload.data;

  const emailUser = process.env['ENV-EMAIL'];
  const emailPassword = process.env['ENV-PASSWORD'];

  if (!emailUser || !emailPassword) {
    return NextResponse.json(
      { message: 'No se configuró el servicio de correo.' },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });

  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safePhone = escapeHtml(formatPhoneForDisplay(payload.phone));
  const safeCompany = escapeHtml(payload.company);
  const safeService = escapeHtml(payload.service);
  const safeMessage = escapeHtml(payload.message);
  const whatsappDisplay = process.env.WHATSAPP_DISPLAY_PHONE || '+58 424 161 21 28';
  const whatsappDigits = normalizePhoneForWhatsapp(
    process.env.WHATSAPP_PHONE || whatsappDisplay,
  );
  const whatsappText = encodeURIComponent(
    `Hola, soy ${payload.name} de ${payload.company}. Mi telefono es ${formatPhoneForDisplay(payload.phone)}. Quiero seguimiento de mi solicitud de ${payload.service}.`,
  );
  const whatsappUrl = `https://wa.me/${whatsappDigits}?text=${whatsappText}`;
  const safeWhatsappDisplay = escapeHtml(whatsappDisplay);
  const safeWhatsappUrl = escapeHtml(whatsappUrl);

  try {
    const internalEmailPromise = transporter.sendMail({
        from: emailUser,
        to: emailUser,
        replyTo: payload.email,
        subject: `Nueva consulta de ${payload.company} - ${payload.service}`,
        text: [
          'Nueva consulta desde el sitio web:',
          `Nombre: ${payload.name}`,
          `Correo: ${payload.email}`,
          `Telefono: ${formatPhoneForDisplay(payload.phone)}`,
          `Empresa: ${payload.company}`,
          `Servicio: ${payload.service}`,
          'Mensaje:',
          payload.message,
          '',
          `Correo cliente: ${payload.email}`,
          `Responder por WhatsApp de la empresa: ${whatsappUrl}`,
        ].join('\n'),
        html: `
          <div style="margin:0;padding:24px;background:#f3f4f6;font-family:Arial,sans-serif;color:#111827;">
            <div style="max-width:680px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
              <div style="padding:20px 24px;background:#111827;">
                <p style="margin:0;color:#f59e0b;font-size:12px;letter-spacing:0.12em;font-weight:700;">TORQUE MAXIMO RR</p>
                <h2 style="margin:10px 0 0;color:#ffffff;font-size:22px;line-height:1.3;">Nueva consulta recibida</h2>
              </div>

              <div style="padding:24px;">
                <p style="margin:0 0 16px;font-size:15px;color:#374151;">Llegó una nueva solicitud desde el formulario web.</p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
                  <tbody>
                    <tr>
                      <td style="padding:12px 14px;font-size:14px;color:#6b7280;width:34%;">Nombre</td>
                      <td style="padding:12px 14px;font-size:14px;color:#111827;font-weight:700;">${safeName}</td>
                    </tr>
                    <tr>
                      <td style="padding:12px 14px;font-size:14px;color:#6b7280;border-top:1px solid #e5e7eb;">Correo</td>
                      <td style="padding:12px 14px;font-size:14px;color:#111827;font-weight:700;border-top:1px solid #e5e7eb;">${safeEmail}</td>
                    </tr>
                    <tr>
                      <td style="padding:12px 14px;font-size:14px;color:#6b7280;border-top:1px solid #e5e7eb;">Telefono</td>
                      <td style="padding:12px 14px;font-size:14px;color:#111827;font-weight:700;border-top:1px solid #e5e7eb;">${safePhone}</td>
                    </tr>
                    <tr>
                      <td style="padding:12px 14px;font-size:14px;color:#6b7280;border-top:1px solid #e5e7eb;">Empresa</td>
                      <td style="padding:12px 14px;font-size:14px;color:#111827;font-weight:700;border-top:1px solid #e5e7eb;">${safeCompany}</td>
                    </tr>
                    <tr>
                      <td style="padding:12px 14px;font-size:14px;color:#6b7280;border-top:1px solid #e5e7eb;">Servicio</td>
                      <td style="padding:12px 14px;font-size:14px;color:#111827;font-weight:700;border-top:1px solid #e5e7eb;">${safeService}</td>
                    </tr>
                  </tbody>
                </table>

                <div style="margin-top:18px;padding:14px;border:1px solid #e5e7eb;border-radius:12px;background:#ffffff;">
                  <p style="margin:0 0 8px;font-size:14px;color:#6b7280;">Mensaje del cliente</p>
                  <p style="margin:0;font-size:14px;line-height:1.7;color:#111827;white-space:pre-line;">${safeMessage}</p>
                </div>

                <div style="margin-top:20px;">
                  <a href="mailto:${safeEmail}" style="display:inline-block;padding:12px 18px;border-radius:999px;background:#111827;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:0.06em;margin-right:8px;">
                    RESPONDER POR CORREO
                  </a>
                  <a href="${safeWhatsappUrl}" style="display:inline-block;padding:12px 18px;border-radius:999px;background:#f59e0b;color:#111827;text-decoration:none;font-size:13px;font-weight:800;letter-spacing:0.06em;">
                    WHATSAPP ${safeWhatsappDisplay}
                  </a>
                </div>
              </div>
            </div>
          </div>
        `,
      });

    const clientEmailPromise = transporter.sendMail({
        from: emailUser,
        to: payload.email,
        subject: 'Recibimos tu solicitud de arreglo - Torque Maximo RR',
        text: [
          `Hola ${payload.name},`,
          '',
          'Recibimos tu solicitud de arreglo y nuestro equipo ya fue notificado.',
          'Te responderemos en un maximo de 1 hora.',
          `Si lo prefieres, puedes escribirnos por WhatsApp: ${whatsappDisplay}`,
          whatsappUrl,
          '',
          'Resumen de tu solicitud:',
          `Telefono: ${formatPhoneForDisplay(payload.phone)}`,
          `Empresa: ${payload.company}`,
          `Servicio: ${payload.service}`,
          `Mensaje: ${payload.message}`,
          '',
          'Equipo Torque Maximo RR',
        ].join('\n'),
        html: `
          <div style="margin:0;padding:24px;background:#f3f4f6;font-family:Arial,sans-serif;color:#111827;">
            <div style="max-width:680px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
              <div style="padding:22px 24px;background:#111827;">
                <p style="margin:0;color:#f59e0b;font-size:12px;letter-spacing:0.12em;font-weight:700;">TORQUE MAXIMO RR</p>
                <h2 style="margin:10px 0 0;color:#ffffff;font-size:22px;line-height:1.3;">Recibimos tu solicitud</h2>
              </div>

              <div style="padding:24px;">
                <p style="margin:0 0 10px;font-size:15px;color:#111827;">Hola ${safeName},</p>
                <p style="margin:0 0 14px;font-size:15px;line-height:1.7;color:#374151;">
                  Gracias por contactarnos. Ya recibimos tu solicitud y nuestro equipo técnico fue notificado.
                  Te responderemos en un máximo de <strong>1 hora</strong>.
                </p>

                <div style="margin:0 0 16px;padding:14px;border:1px solid #fde68a;background:#fffbeb;border-radius:12px;">
                  <p style="margin:0;font-size:14px;line-height:1.6;color:#92400e;">
                    ¿Necesitas atención inmediata? Escríbenos por WhatsApp y acelera el seguimiento de tu caso.
                  </p>
                  <a href="${safeWhatsappUrl}" style="display:inline-block;margin-top:12px;padding:12px 18px;border-radius:999px;background:#25D366;color:#052e16;text-decoration:none;font-size:13px;font-weight:800;letter-spacing:0.04em;">
                    ESCRIBIR POR WHATSAPP · ${safeWhatsappDisplay}
                  </a>
                </div>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
                  <tbody>
                    <tr>
                      <td style="padding:12px 14px;font-size:14px;color:#6b7280;width:34%;">Telefono</td>
                      <td style="padding:12px 14px;font-size:14px;color:#111827;font-weight:700;">${safePhone}</td>
                    </tr>
                    <tr>
                      <td style="padding:12px 14px;font-size:14px;color:#6b7280;width:34%;">Empresa</td>
                      <td style="padding:12px 14px;font-size:14px;color:#111827;font-weight:700;border-top:1px solid #e5e7eb;">${safeCompany}</td>
                    </tr>
                    <tr>
                      <td style="padding:12px 14px;font-size:14px;color:#6b7280;border-top:1px solid #e5e7eb;">Servicio</td>
                      <td style="padding:12px 14px;font-size:14px;color:#111827;font-weight:700;border-top:1px solid #e5e7eb;">${safeService}</td>
                    </tr>
                    <tr>
                      <td style="padding:12px 14px;font-size:14px;color:#6b7280;border-top:1px solid #e5e7eb;vertical-align:top;">Mensaje</td>
                      <td style="padding:12px 14px;font-size:14px;line-height:1.7;color:#111827;border-top:1px solid #e5e7eb;white-space:pre-line;">${safeMessage}</td>
                    </tr>
                  </tbody>
                </table>

                <p style="margin:18px 0 0;font-size:13px;color:#6b7280;">Equipo Torque Maximo RR</p>
              </div>
            </div>
          </div>
        `,
      });

    waitUntil(Promise.all([internalEmailPromise, clientEmailPromise]));

    return NextResponse.json({
      message: 'Recibimos tu consulta. Te responderemos a la brevedad.',
    });
  } catch (error) {
    console.error('Error sending contact email', error);

    return NextResponse.json(
      { message: 'No pudimos enviar la consulta. Intenta nuevamente en unos minutos.' },
      { status: 500 },
    );
  }
}