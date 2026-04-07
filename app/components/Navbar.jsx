"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { inter } from "../fonts";

const NAV_LINKS = [
  { label: "Buy",     href: "#" },
  { label: "Sell",    href: "#" },
  { label: "Rent",    href: "#" },
  { label: "Agents",  href: "#" },
  { label: "Offices", href: "#" },
];

export default function Navbar() {
  const navbarRef    = useRef(null);
  const logoRef      = useRef(null);
  const linksRef     = useRef([]);
  const rightRef     = useRef(null);
  const sidebarRef   = useRef(null);
  const overlayRef   = useRef(null);
  const sidebarTl    = useRef(null);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  /* ── Scroll shadow ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Entrance animation ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(navbarRef.current,
        { y: -72, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
      .fromTo(logoRef.current,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.5 },
        "-=0.45"
      )
      .fromTo(linksRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.07 },
        "-=0.35"
      )
      .fromTo(rightRef.current,
        { opacity: 0, x: 16 },
        { opacity: 1, x: 0, duration: 0.5 },
        "-=0.45"
      );
    }, navbarRef);

    return () => ctx.revert();
  }, []);

  /* ── Sidebar animation setup ── */
  useEffect(() => {
    if (!sidebarRef.current || !overlayRef.current) return;

    gsap.set(sidebarRef.current, { xPercent: 100 });
    gsap.set(overlayRef.current, { opacity: 0, pointerEvents: "none" });

    sidebarTl.current = gsap.timeline({ paused: true })
      .to(overlayRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.3,
        ease: "power2.out",
      })
      .to(sidebarRef.current, {
        xPercent: 0,
        duration: 0.45,
        ease: "power3.out",
      }, "-=0.25");

    return () => {
      sidebarTl.current?.kill();
    };
  }, []);

  /* ── Toggle sidebar ── */
  const openMenu = useCallback(() => {
    setMenuOpen(true);
    sidebarTl.current?.play();
    document.body.style.overflow = "hidden";
  }, []);

  const closeMenu = useCallback(() => {
    sidebarTl.current?.reverse().then(() => {
      setMenuOpen(false);
      document.body.style.overflow = "";
    });
  }, []);

  /* ── Close on outside click ── */
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen, closeMenu]);

  /* ── Escape key ── */
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape" && menuOpen) closeMenu(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [menuOpen, closeMenu]);

  return (
    <>
      <header
        ref={navbarRef}
        className={`
          fixed w-full z-50
          bg-white backdrop-blur-xl
          transition-all duration-300
          ${scrolled
            ? "shadow-[0_1px_32px_0_rgba(15,23,42,0.10)] border-b border-slate-200/70"
            : "border-b border-white/20"}
        ${inter.className}` }
    
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-4 flex items-center justify-between">

          {/* ── Logo ── */}
          <div ref={logoRef} className="shrink-0">
            <a href="/" className="flex items-center gap-2.5 group">
              <Image
                src="/rbg.png"
                height={100}
                width={136}
                alt="Atlas Holidays"
                className="h-9 w-auto object-contain"
                priority
              />
            </a>
          </div>

          {/* ── Center Nav ── */}
          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                ref={(el) => (linksRef.current[i] = el)}
                href={link.href}
                onClick={() => setActiveLink(link.label)}
                className={`
                  relative px-4 py-2 rounded-lg
                  text-[15px] font-medium tracking-wide
                  transition-colors duration-200
                  group
                  ${activeLink === link.label
                    ? "text-blue-600"
                    : "text-[#111A32] hover:text-slate-900"}
                `}
              >
                {link.label}
                <span
                  className={`
                    absolute bottom-1.5 left-4 right-4 h-[1.5px] rounded-full
                    bg-blue-500
                    transition-transform duration-250 origin-left
                    ${activeLink === link.label
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"}
                  `}
                />
              </a>
            ))}
          </nav>

          {/* ── Right CTA ── */}
          <div ref={rightRef} className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="
                inline-flex items-center gap-2
                bg-blue-600 hover:bg-blue-700
                text-white text-[14.5px] font-semibold tracking-wide
                px-5 py-2.5 rounded-xl
                shadow-md shadow-blue-500/25
                hover:shadow-lg hover:shadow-blue-500/30
                hover:-translate-y-px
                transition-all duration-200
              "
            >
              Contact Us
            </a>
          </div>

          {/* ── Hamburger ── */}
          <button
            onClick={openMenu}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="md:hidden flex flex-col justify-center gap-1.25 w-9 h-9 rounded-lg hover:bg-slate-100 transition-colors duration-150 px-2"
          >
            <span className="block h-[1.5px] w-full bg-slate-700 rounded-full" />
            <span className="block h-[1.5px] w-3/4 bg-slate-700 rounded-full" />
            <span className="block h-[1.5px] w-full bg-slate-700 rounded-full" />
          </button>
        </div>
      </header>

      {/* ── Overlay ── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-60 bg-slate-900/50 backdrop-blur-sm md:hidden"
        aria-hidden="true"
      />

      {/* ── Sidebar ── */}
      <aside
        ref={sidebarRef}
        className="
          fixed top-0 right-0 z-70 h-full w-[78vw] max-w-xs
          bg-white
          shadow-2xl shadow-slate-900/20
          md:hidden
          flex flex-col
        "
        style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
        aria-label="Mobile navigation"
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <Image
            src="/rbg.png"
            height={80}
            width={110}
            alt="Atlas Holidays"
            className="h-8 w-auto object-contain"
          />
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors duration-150"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2L14 14M14 2L2 14" stroke="#475569" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col px-4 py-4 flex-1 overflow-y-auto">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              className="
                flex items-center gap-3
                px-4 py-3.5 rounded-xl
                text-[15px] font-medium text-slate-700
                hover:text-blue-600 hover:bg-blue-50
                transition-all duration-150
                border-b border-slate-100 last:border-0
              "
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-6 pb-8 pt-4 border-t border-slate-100">
          <a
            href="#contact"
            onClick={closeMenu}
            className="
              flex items-center justify-center
              bg-blue-600 hover:bg-blue-700
              text-white text-[14px] font-semibold tracking-wide
              px-5 py-3 rounded-xl w-full
              shadow-md shadow-blue-500/25
              transition-all duration-200
            "
          >
            Contact Us
          </a>
          <p className="text-center text-[11.5px] text-slate-400 mt-4 tracking-wide">
            Atlas Holidays Real Estate
          </p>
        </div>
      </aside>
    </>
  );
}