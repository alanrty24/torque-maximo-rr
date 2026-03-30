import { SERVICES } from '@/lib/data';
import ServiceCard from '@/components/ServiceCard';

export default function Services() {
  return (
    <section id="servicios" className="py-20 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white">NUESTROS <span className="text-primary">SERVICIOS</span></h2>
          <p className="mt-4 text-silver max-w-2xl mx-auto">Ofrecemos soluciones técnicas especializadas con los más altos estándares de calidad en la industria pesada.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <ServiceCard key={s.id} title={s.title} description={s.description} Icon={s.icon} efecto='group-hover:-translate-x-2'/>
          ))}
        </div>
      </div>
    </section>
  );
}
