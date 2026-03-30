import Link from 'next/link';
import { NAV_LINKS, FOOTER } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-silver">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white">
              TORQUE <span className="text-primary">MÁXIMO RR</span>
            </h3>
            <p className="mt-4 text-silver max-w-sm">
              Líderes en servicios de ingeniería para motores de alta resistencia. Innovando el futuro del transporte y la industria pesada.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold tracking-wider mb-4">ENLACES RÁPIDOS</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-silver hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold tracking-wider mb-4">CONTACTO DIRECTO</h4>
            <ul className="space-y-3">
              {FOOTER.contactItems.map((ci) => {
                const Icon = ci.icon;
                return (
                  <li key={ci.id} className="flex items-center gap-3 text-silver">
                    <Icon className="text-primary" />
                    <a href={ci.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">{ci.label}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-surface-700 pt-8 text-center text-xs text-silver">
          © {new Date().getFullYear()} Torque Máximo RR Pro. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
