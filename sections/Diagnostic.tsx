import Image from "next/image";
import { DIAGNOSTIC } from "@/lib/data";
import ServiceCard from "@/components/ServiceCard";
import Badge from "@/components/Badge";
import Reveal from "@/components/Reveal";

export default function Diagnostic() {
  return (
    <section id="diagnosticos" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Reveal>
              <Badge>{DIAGNOSTIC.eyebrow}</Badge>
              <h2 className="mt-6 font-display text-4xl md:text-5xl font-extrabold text-white uppercase">
                {DIAGNOSTIC.titleTop}{" "}
                <span className="block text-primary mt-2">
                  {DIAGNOSTIC.titleHighlight}
                </span>
              </h2>

              <p className="mt-6 text-lg text-silver max-w-2xl">
                {DIAGNOSTIC.description}
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DIAGNOSTIC.cards.map((c) => (
                  <ServiceCard
                    key={c.id}
                    title={c.title}
                    description={c.description}
                    Icon={c.icon}
                    efecto="group-hover:scale-110"
                  />
                ))}
              </div>
            </Reveal>
          </div>

          <div className="w-full  relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-primary-light via-primary to-primary-dark rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-slate-900 rounded-4xl overflow-hidden border border-white/10">
              <Image
                alt="Diagnostic screen"
                className="w-full aspect-video object-cover opacity-80 grayscale"
                data-alt="Digital tablet displaying complex engine diagnostics and telemetry data with orange accents"
                src={DIAGNOSTIC.image}
                width={640}
                height={360}
              />
              <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
