import { RECOMMENDATIONS } from "@/lib/data";
import RecommendationCard from "@/components/RecommendationCard";
import Carousel from "@/components/Carousel";

export default function Recommendations() {
  return (
    <section
      id="recommendations"
      className="py-20 bg-[#0D0D0D] border-y border-slate-700/30"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white">
            LO QUE DICEN <span className="text-primary">NUESTROS CLIENTES</span>
          </h2>
          <p className="mt-4 text-silver max-w-2xl mx-auto">
            Testimonios y casos reales de clientes que confían en nuestro
            trabajo.
          </p>
        </div>

        <Carousel interval={700} visibleCount={3}>
          {RECOMMENDATIONS.map((r) => (
            <div key={r.id} className="flex justify-center px-4 py-2">
              <RecommendationCard
                name={r.name}
                company={r.company}
                quote={r.quote}
                avatar={r.avatar}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
