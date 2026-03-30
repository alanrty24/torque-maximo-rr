import Image from 'next/image';
import { HERO } from '@/lib/data';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import Reveal from '@/components/Reveal';

export default function Hero() {
  return (
    <section id="inicio" className="relative isolate">
      {/* Background image full-bleed */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={HERO.image}
          alt="Hero background"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/50 to-black/80" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-28 md:py-36">
          <div className="max-w-3xl">
            <Reveal>
              <Badge>{HERO.eyebrow}</Badge>

              <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-extrabold leading-tight text-white uppercase">
                {HERO.titleTop}
                <span className="block text-primary mt-2">{HERO.titleHighlight}</span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-silver max-w-2xl">{HERO.description}</p>

              <div className="mt-10 flex flex-wrap gap-4">
                {HERO.ctas.map((cta) => (
                  <Button
                    key={cta.href}
                    href={cta.href}
                    className={
                      cta.variant === 'outline'
                        ? 'bg-transparent border-2 border-white/20 text-white px-6 py-3 rounded-full'
                        : 'px-8 py-3 rounded-full'
                    }
                  >
                    {cta.label}
                  </Button>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
