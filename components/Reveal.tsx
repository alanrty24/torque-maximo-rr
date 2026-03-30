"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

export default function Reveal({
  children,
  className = "",
  threshold = 0.15,
  rootMargin = "0px",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      rafId = requestAnimationFrame(() => setVisible(true));
      return () => {
        if (rafId) cancelAnimationFrame(rafId);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once && el) observer.unobserve(el);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [threshold, rootMargin, once]);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} transition-all duration-700 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
