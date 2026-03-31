import { z } from 'zod';

const normalizedText = z.string().transform((value) => value.replace(/\s+/g, ' ').trim());

const optionalNormalizedText = z
  .union([z.string(), z.undefined(), z.null()])
  .transform((value) => {
    if (typeof value !== 'string') {
      return '';
    }

    return value.replace(/\s+/g, ' ').trim();
  });

export const contactRequestSchema = z
  .object({
    name: normalizedText.pipe(
      z.string().min(1, 'Indica tu nombre completo.').max(80, 'El nombre no debe superar 80 caracteres.'),
    ),
    email: normalizedText
      .pipe(
        z
          .string()
          .min(1, 'Indica tu correo electrónico.')
          .max(180, 'El correo no debe superar 180 caracteres.')
          .email('Ingresa un correo válido.'),
      )
      .transform((value) => value.toLowerCase()),
    phone: normalizedText
      .pipe(
        z
          .string()
          .min(7, 'Indica tu número de teléfono.')
          .max(25, 'El teléfono no debe superar 25 caracteres.')
          .regex(/^\+?[0-9()\-\s]+$/, 'Ingresa un número de teléfono válido.'),
      )
      .transform((value) => value.replace(/\D/g, ''))
      .pipe(
        z
          .string()
          .min(8, 'El teléfono debe tener al menos 8 dígitos.')
          .max(15, 'El teléfono no debe superar 15 dígitos.'),
      ),
    company: optionalNormalizedText.pipe(
      z.string().max(100, 'La empresa no debe superar 100 caracteres.'),
    ),
    service: normalizedText.pipe(
      z.string().min(1, 'Selecciona un servicio.').max(100, 'El servicio no debe superar 100 caracteres.'),
    ),
    message: normalizedText.pipe(
      z
        .string()
        .min(1, 'Escribe el detalle de tu consulta.')
        .max(1200, 'El mensaje no debe superar 1200 caracteres.'),
    ),
    website: optionalNormalizedText.pipe(z.string().max(0, 'Solicitud inválida.')),
  })
  .strict();

export type ContactRequestInput = z.input<typeof contactRequestSchema>;
export type ContactRequestData = z.output<typeof contactRequestSchema>;