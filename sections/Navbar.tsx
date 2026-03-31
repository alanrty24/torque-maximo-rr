"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/data";
import Button from "@/components/Button";
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("#inicio");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const ids = NAV_LINKS.filter((l) => l.href.startsWith('#')).map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive('#' + entry.target.id);
          }
        });
      },
      { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', href);
        setMenuOpen(false);
      }
    }
  };

  return (
    <header className={`fixed top-0 w-full bg-background-dark text-silver z-50 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <nav className={`w-full max-w-6xl mx-auto flex items-center justify-between px-4 ${scrolled ? 'py-2' : 'py-3'} transition-all`}>
        {/* Logo y nombre */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image src="/images/logo.png" alt="Logo Torque Máximo RR" width={40} height={40} priority />
          <span className="font-display font-bold text-lg tracking-tight">
            <span className="italic text-white">TORQUE</span>
            <span className="text-primary font-semibold ml-1">MÁXIMO RR</span>
          </span>
        </Link>
        {/* Links desktop */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`transition-colors focus:outline-none focus:text-primary ${active === link.href ? 'text-primary' : 'hover:text-primary'}`}
                aria-current={active === link.href ? 'true' : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        {/* Botón contacto desktop */}
        <div className="hidden md:block ml-4">
          <Button href="#contact" className="min-w-35 text-black">
            CONTACTO
          </Button>
        </div>

        {/* mobile */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Open menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          MENU
        </button>
        {/* Menú mobile */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-background-dark shadow-lg flex flex-col items-center py-4 gap-4 md:hidden animate-fade-in z-50">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  handleNavClick(e, link.href);
                  setMenuOpen(false);
                }}
                className="w-full text-center py-2 text-lg font-semibold hover:text-primary transition-colors focus:outline-none focus:text-primary"
              >
                {link.label}
              </a>
            ))}
            <Button  href="#contact" className="w-full mt-2 text-black" onClick={() => setMenuOpen(false)}>
              CONTACTO
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
