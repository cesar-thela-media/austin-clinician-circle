"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function AosInit() {
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver;
    let raf: number;

    // rAF lets the new route's DOM fully paint before we query
    raf = requestAnimationFrame(() => {
      const elements = document.querySelectorAll<Element>("[data-aos]:not(.aos-visible)");

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("aos-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        // threshold: 0 = trigger as soon as 1px is visible; positive rootMargin
        // pre-loads elements just before they scroll into view
        { threshold: 0, rootMargin: "0px 0px 64px 0px" },
      );

      elements.forEach((el) => observer.observe(el));
    });

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
