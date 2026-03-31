'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FaBuilding,
  FaChevronDown,
  FaCommentDots,
  FaEnvelope,
  FaLocationDot,
  FaPaperPlane,
  FaPhone,
  FaRegCircleCheck,
  FaTriangleExclamation,
  FaUser,
} from 'react-icons/fa6';

import Badge from '@/components/Badge';
import Reveal from '@/components/Reveal';
import { CONTACT, CONTACT_SERVICE_OPTIONS } from '@/lib/data';
import {
  type ContactRequestInput,
  contactRequestSchema,
} from '@/lib/validations/contact';

type SubmissionStatus = 'idle' | 'success' | 'error';

const fieldClassName =
  'w-full rounded-[28px] border border-white/10 bg-white/[0.03] px-14 py-4 text-base text-white outline-none transition placeholder:text-white/35 focus:border-primary/70 focus:bg-white/[0.05]';

const selectClassName =
  'w-full appearance-none rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-4 pr-14 text-base text-white outline-none transition focus:border-primary/70 focus:bg-white/[0.05]';

const textareaClassName =
  'w-full rounded-[28px] border border-white/10 bg-white/[0.03] px-14 py-4 text-base text-white outline-none transition placeholder:text-white/35 focus:border-primary/70 focus:bg-white/[0.05]';

export default function Contact() {
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactRequestInput>({
    resolver: zodResolver(contactRequestSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: '',
      website: '',
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus('idle');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || CONTACT.errorMessage);
      }

      setStatus('success');
      setStatusMessage(result.message || CONTACT.successMessage);
      reset();
    } catch (error) {
      setStatus('error');

      setStatusMessage(
        error instanceof Error ? error.message : CONTACT.errorMessage,
      );
    }
  });

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#070707] py-20 text-white"
    >
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradientbg-[radial-gradient(circle_at_top_left,rgba(234,132,31,0.16),transparent_28%),l(circle_at_top_left,rgba(234,132,31,0.16),transparent_28%),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]" />
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)] lg:px-8">
        <Reveal>
          <div>
            <Badge>{CONTACT.eyebrow}</Badge>

            <h2 className="mt-6 font-display text-4xl font-extrabold uppercase leading-none sm:text-5xl lg:text-6xl">
              {CONTACT.titleTop}
              <span className="mt-2 block text-primary">{CONTACT.titleHighlight}</span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-silver">
              {CONTACT.description}
            </p>

            <div className="relative mt-10 mx-auto flex w-full max-w-170 items-center justify-center self-center">
              <div className="relative aspect-square w-full overflow-hidden rounded-full border border-primary/20 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_30px_80px_rgba(0,0,0,0.45)]">
                <Image
                  src="/images/mapa-venezuela.png"
                  alt="Mapa de Venezuela con ubicación en Caracas"
                  fill
                  className="object-contain p-6 opacity-80"
                  sizes="(min-width: 1024px) 40vw, 80vw"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(234,132,31,0.14),transparent_12%),radial-gradient(circle_at_center,transparent_42%,rgba(0,0,0,0.58)_100%)]" />
                <div className="absolute left-1/2 top-[38%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                  <div className="rounded-full bg-primary/10 p-4 text-primary shadow-[0_0_30px_rgba(234,132,31,0.25)] ring-1 ring-primary/35 backdrop-blur-sm">
                    <FaLocationDot className="size-8" />
                  </div>
                  <span className="mt-6 rounded-full border border-primary/35 bg-[#121212]/95 px-6 py-3 text-center text-base font-extrabold uppercase tracking-tight text-white shadow-[0_12px_32px_rgba(0,0,0,0.3)]">
                    {CONTACT.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <form className="space-y-5 lg:pt-14" onSubmit={onSubmit} noValidate>
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                {...register('website')}
              />

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="relative block">
                    <FaUser className="pointer-events-none absolute left-6 top-1/2 size-4 -translate-y-1/2 text-white/35" />
                    <input
                      type="text"
                      placeholder="Nombre Completo"
                      aria-invalid={errors.name ? 'true' : 'false'}
                      className={fieldClassName}
                      {...register('name')}
                    />
                  </label>
                  {errors.name ? (
                    <p className="mt-2 text-sm text-[#ffb27a]">{errors.name.message}</p>
                  ) : null}
                </div>

                <div>
                  <label className="relative block">
                    <FaEnvelope className="pointer-events-none absolute left-6 top-1/2 size-4 -translate-y-1/2 text-white/35" />
                    <input
                      type="email"
                      placeholder="Correo electrónico"
                      aria-invalid={errors.email ? 'true' : 'false'}
                      className={fieldClassName}
                      {...register('email')}
                    />
                  </label>
                  {errors.email ? (
                    <p className="mt-2 text-sm text-[#ffb27a]">{errors.email.message}</p>
                  ) : null}
                </div>
              </div>

              <div>
                <label className="relative block">
                  <FaPhone className="pointer-events-none absolute left-6 top-1/2 size-4 -translate-y-1/2 text-white/35" />
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    className={fieldClassName}
                    {...register('phone')}
                  />
                </label>
                {errors.phone ? (
                  <p className="mt-2 text-sm text-[#ffb27a]">{errors.phone.message}</p>
                ) : null}
              </div>

              <div>
                <label className="relative block">
                  <FaBuilding className="pointer-events-none absolute left-6 top-1/2 size-4 -translate-y-1/2 text-white/35" />
                  <input
                    type="text"
                    placeholder="Empresa"
                    className={fieldClassName}
                    aria-invalid={errors.company ? 'true' : 'false'}
                    {...register('company')}
                  />
                </label>
                {errors.company ? (
                  <p className="mt-2 text-sm text-[#ffb27a]">{errors.company.message}</p>
                ) : null}
              </div>

              <div>
                <label className="relative block">
                  <select
                    defaultValue=""
                    aria-invalid={errors.service ? 'true' : 'false'}
                    className={selectClassName}
                    {...register('service')}
                  >
                    <option value="" disabled className="bg-[#101010] text-white/50">
                      Selecciona un Servicio
                    </option>
                    {CONTACT_SERVICE_OPTIONS.map((service) => (
                      <option key={service} value={service} className="bg-[#101010] text-white">
                        {service}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="pointer-events-none absolute right-6 top-1/2 size-4 -translate-y-1/2 text-white/45" />
                </label>
                {errors.service ? (
                  <p className="mt-2 text-sm text-[#ffb27a]">{errors.service.message}</p>
                ) : null}
              </div>

              <div>
                <label className="relative block">
                  <FaCommentDots className="pointer-events-none absolute left-6 top-6 size-4 text-white/35" />
                  <textarea
                    rows={5}
                    placeholder="Mensaje"
                    aria-invalid={errors.message ? 'true' : 'false'}
                    className={textareaClassName}
                    {...register('message')}
                  />
                </label>
                {errors.message ? (
                  <p className="mt-2 text-sm text-[#ffb27a]">{errors.message.message}</p>
                ) : null}
              </div>

              <div className="space-y-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-extrabold tracking-[0.24em] text-black transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <FaPaperPlane className="size-4" />
                  {isSubmitting ? 'ENVIANDO...' : CONTACT.submitLabel}
                </button>

                {status !== 'idle' ? (
                  <p
                    className={`inline-flex items-center gap-2 text-sm ${
                      status === 'success' ? 'text-[#ffd3a6]' : 'text-[#ffb27a]'
                    }`}
                    role="status"
                  >
                    {status === 'success' ? (
                      <FaRegCircleCheck className="size-4" />
                    ) : (
                      <FaTriangleExclamation className="size-4" />
                    )}
                    {statusMessage}
                  </p>
                ) : null}
              </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}