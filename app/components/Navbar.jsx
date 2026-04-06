"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { urbanist , inter } from "../fonts";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Buy",     href: "#" },
  { label: "Sell",    href: "#" },
  { label: "Rent",    href: "#" },
  { label: "Agents",  href: "#" },
  { label: "Offices", href: "#" },
];

export default function Navbar() {
  const navbarRef  = useRef(null);
  const logoRef    = useRef(null);
  const linksRef   = useRef([]);
  const rightRef   = useRef(null);
  const mobileRef  = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ── Entrance animation ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.fromTo(
        navbarRef.current,
        { y: -56, opacity: 0 },
        { y: 0,   opacity: 1, duration: 0.7 }
      );
      tl.fromTo(
        logoRef.current,
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.45 },
        "-=0.35"
      );
      tl.fromTo(
        linksRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0,  duration: 0.35, stagger: 0.07 },
        "-=0.3"
      );
      tl.fromTo(
        rightRef.current,
        { opacity: 0, x: 12 },
        { opacity: 1, x: 0, duration: 0.45 },
        "-=0.4"
      );
    }, navbarRef);

    return () => ctx.revert();
  }, []);

  /* ── Mobile menu animation ── */
  useEffect(() => {
    if (!mobileRef.current) return;
    if (menuOpen) {
      gsap.fromTo(
        mobileRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    } else {
      gsap.to(mobileRef.current, {
        height: 0, opacity: 0, duration: 0.22, ease: "power2.in",
      });
    }
  }, [menuOpen]);

  return (
    <header
      ref={navbarRef}
      className={`sticky top-0 z-50 bg-white  border-slate-200 ${inter.className}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3.5 flex items-center justify-between">

        {/* ── Left: Logo + Badge ── */}
        <div ref={logoRef} className="flex items-center gap-2.5 shrink-0">
          <a href="/" className="flex items-center gap-2.5 group">
      <Image  src={"/logo.png"} height={100} width={150} />
          </a>
        </div>

        {/* ── Center: Nav links (desktop) ── */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              ref={(el) => (linksRef.current[i] = el)}
              href={link.href}
              className="
                relative px-3.5 py-1.5
                text-[16.5px] font-medium text-slate-600
                hover:text-blue-600
                transition-colors duration-200
                group
              "
            >
              {link.label}
              <span
                className="
                  absolute bottom-0 left-3.5 right-3.5 h-[1.5px]
                  bg-blue-500 rounded-full
                  scale-x-0 group-hover:scale-x-100
                  transition-transform duration-200 origin-center
                "
              />
            </a>
          ))}
        </nav>

        {/* ── Right: Login + CTA ── */}
        <div
          ref={rightRef}
          className="hidden md:flex items-center gap-3 shrink-0"
        >
       
          <a
            href="#contact"
            className="
              inline-flex items-center gap-1.5
              bg-blue-600 hover:bg-blue-700
              text-white text-[16.5px] font-medium
              px-5 py-2.75 rounded-lg
              transition-colors duration-200
              shadow-sm
            "
          >
            Contact Us
          </a>
        </div>

        {/* ── Hamburger (mobile) ── */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          className="md:hidden flex flex-col justify-center gap-1.25 w-8 h-8 p-1"
        >
          <span
            className={`block h-[1.5px] bg-slate-700 rounded transition-all duration-300 origin-center ${
              menuOpen ? "rotate-45 translate-y-[6.5px] w-full" : "w-full"
            }`}
          />
          <span
            className={`block h-[1.5px] bg-slate-700 rounded transition-all duration-300 ${
              menuOpen ? "opacity-0 w-0" : "w-4/5"
            }`}
          />
          <span
            className={`block h-[1.5px] bg-slate-700 rounded transition-all duration-300 origin-center ${
              menuOpen ? "-rotate-45 -translate-y-[6.5px] w-full" : "w-full"
            }`}
          />
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <div
        ref={mobileRef}
        className="md:hidden overflow-hidden h-0 opacity-0 border-t border-slate-100 bg-white"
      >
        <nav className="flex flex-col px-6 py-3 gap-0.5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="
                text-[14px] font-medium text-slate-700 hover:text-blue-600
                py-3 border-b border-slate-100 last:border-0
                transition-colors duration-150
              "
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-3 pt-4 pb-2">
            <a
              href="#login"
              className="text-[13.5px] font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200"
            >
              Login
            </a>
            <a
              href="#contact"
              className="
                inline-flex items-center justify-center
                bg-blue-600 hover:bg-blue-700
                text-white text-[13px] font-semibold
                px-4 py-2 rounded-lg w-full
                transition-colors duration-200
              "
            >
              Contact Us
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}