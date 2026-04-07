"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { urbanist, inter } from "../fonts";

export default function Hero() {
  const sectionRef   = useRef(null);
  const headingRef   = useRef(null);
  const subRef       = useRef(null);
  const badgeRef     = useRef(null);
  const btnsRef      = useRef(null);
  const statsRef     = useRef(null);
  const panelRef     = useRef(null);
  const panelFields  = useRef([]);

  const addField = (el) => {
    if (el && !panelFields.current.includes(el)) panelFields.current.push(el);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.2,
      });

      /* ── Left side ── */
      tl.fromTo(badgeRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
      .fromTo(headingRef.current,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.32"
      )
      .fromTo(subRef.current,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.65 },
        "-=0.46"
      )
      .fromTo(btnsRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.13 },
        "-=0.38"
      )
      .fromTo(statsRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.55 },
        "-=0.22"
      );

      /* ── Right panel ── */
      tl.fromTo(panelRef.current,
        { opacity: 0, x: 52, y: 10 },
        { opacity: 1, x: 0, y: 0, duration: 0.78, ease: "power2.out" },
        "-=0.88"
      );

      /* ── Panel fields stagger ── */
      tl.fromTo(panelFields.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.42, stagger: 0.09, ease: "power2.out" },
        "-=0.52"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full min-h-155 h-svh max-h-235 flex items-center overflow-hidden ${urbanist.className}`}
    >
      {/* ── Background Video ── */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/video/h.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* ── Gradient Overlay ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, rgba(4,8,20,0.82) 0%, rgba(4,8,20,0.60) 46%, rgba(4,8,20,0.26) 100%)",
        }}
      />

      {/* ── Noise grain ── */}
      <div
        className="absolute inset-0 opacity-[0.032] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ── Main content wrapper ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-6 xl:gap-10">

        {/* ══════════════ LEFT ══════════════ */}
        <div className="w-full lg:max-w-[55%] xl:max-w-[52%] flex flex-col">

          {/* Badge */}
          <div
            ref={badgeRef}
            className="self-start inline-flex items-center gap-2 mb-7 bg-white/8 border border-black/18 backdrop-blur-sm text-white/80 text-[11.5px] font-semibold tracking-[0.15em] uppercase px-4 py-2.25 rounded-full"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Premium Real Estate · Atlas Holidays
          </div>

          {/* Heading */}
          <h1
            ref={headingRef}
            className="text-white font-bold leading-[1.06] mb-6 tracking-[-0.026em]"
            style={{ fontSize: "clamp(38px, 5.2vw, 74px)" }}
          >
            Find Your{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #60a5fa 0%, #818cf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Dream
            </span>
            <br />
            Property Today
          </h1>

          {/* Subheading */}
          <p
            ref={subRef}
            className="text-white/62 font-normal leading-[1.78] text-[16px] sm:text-[17.5px] mb-10 max-w-120"
          >
            Discover curated luxury listings, trusted agents, and expert
            guidance — tailored to help you find the perfect place to call home.
          </p>

          {/* CTA Buttons */}
          <div
            ref={btnsRef}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
          >
            <a
              href="#buy"
              className="group inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-[14.5px] font-semibold tracking-wide px-7 py-3.5 rounded-xl shadow-lg shadow-blue-700/30 hover:shadow-xl hover:shadow-blue-500/38 hover:scale-[1.025] hover:-translate-y-px active:scale-[0.98] transition-all duration-200"
            >
              Browse Properties
              <ArrowIcon />
            </a>

            <a
              href="#listings"
              className="group inline-flex items-center gap-2.5 bg-white/9 hover:bg-white/16 backdrop-blur-sm border border-black/22 hover:border-black/38 text-white text-[14.5px] font-semibold tracking-wide px-7 py-3.5 rounded-xl hover:scale-[1.025] hover:-translate-y-px active:scale-[0.98] transition-all duration-200"
            >
              Explore Listings
              <ArrowIcon muted />
            </a>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="flex items-center gap-8 sm:gap-12 mt-12 pt-8 border-t border-black/9"
          >
            {[
              { value: "2,400+", label: "Active Listings"      },
              { value: "98%",    label: "Client Satisfaction"  },
              { value: "15+",    label: "Years Experience"     },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="text-white font-bold leading-none tracking-tight" style={{ fontSize: "clamp(20px, 2.2vw, 26px)" }}>
                  {s.value}
                </span>
                <span className="text-white/44 text-[12px] font-medium tracking-wide">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════ RIGHT — Search Panel ══════════════ */}
        <div
          ref={panelRef}
          className="w-full lg:w-88 xl:w-120 shrink-0"
        >
          <div className="
            bg-white backdrop-blur-2xl
            border border-black/15
            rounded-2xl p-6 sm:p-7
            shadow-[0_28px_60px_rgba(0,0,0,0.42),0_0_0_1px_rgba(255,255,255,0.04)]
            transition-all duration-500
          ">

            {/* Panel header */}
            <div ref={addField} className="mb-5 bg-[#151b2b] py-2.5 rounded-xl">
              <p className="text-[10.5px] text-center font-bold tracking-[0.18em] uppercase text-blue-400 mb-1.5">
                Property Search
              </p>
              <h3 className="text-white text-center text-[18px] font-bold tracking-[-0.018em] leading-snug">
                Find Your Next Home
              </h3>
            </div>

            {/* Divider */}
            <div ref={addField} className="h-px bg-linear-to-r from-white/12 via-white/[0.07] to-transparent mb-5" />

            {/* Location */}
            <div ref={addField} className="mb-4">
              <label className="block text-black/55 text-[11px] font-semibold tracking-[0.12em] uppercase mb-2">
                Location
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/30 pointer-events-none">
                  <PinIcon />
                </span>
                <input
                  type="text"
                  placeholder="e.g. Dubai, London, Paris…"
                  className="
                    w-full bg-white/6 border border-black/13
                    hover:bg-white/9 hover:border-black/22
                    focus:bg-white/10 focus:border-blue-400/60
                    focus:shadow-[0_0_0_3px_rgba(96,165,250,0.15)]
                    text-black placeholder-white/28 text-[13.5px] font-medium
                    pl-10 pr-4 py-3 rounded-xl outline-none
                    transition-all duration-200
                  "
                />
              </div>
            </div>

            {/* Type + Beds */}
            <div ref={addField} className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-black/55 text-[11px] font-semibold tracking-[0.12em] uppercase mb-2">
                  Type
                </label>
                <div className="relative">
                  <select className="
                    w-full appearance-none bg-white/6 border border-black/13
                    hover:bg-white/9 hover:border-black/22
                    focus:border-blue-400/60 focus:shadow-[0_0_0_3px_rgba(96,165,250,0.15)]
                    text-black text-[13px] font-medium
                    px-3.5 py-3 pr-8 rounded-xl outline-none
                    transition-all duration-200 cursor-pointer
                  ">
                    <option className="bg-slate-200">Buy</option>
                    <option className="bg-slate-200">Rent</option>
                    <option className="bg-slate-200">Sell</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-black/55 text-[11px] font-semibold tracking-[0.12em] uppercase mb-2">
                  Beds
                </label>
                <div className="relative">
                  <select className="
                    w-full appearance-none bg-white/6 border border-black/13
                    hover:bg-white/9 hover:border-black/22
                    focus:border-blue-400/60 focus:shadow-[0_0_0_3px_rgba(96,165,250,0.15)]
                    text-black text-[13px] font-medium
                    px-3.5 py-3 pr-8 rounded-xl outline-none
                    transition-all duration-200 cursor-pointer
                  ">
                    <option className="bg-slate-200">Any</option>
                    <option className="bg-slate-200">1+</option>
                    <option className="bg-slate-200">2+</option>
                    <option className="bg-slate-200">3+</option>
                    <option className="bg-slate-200">4+</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-black/30 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Price range */}
            <div ref={addField} className="mb-6">
              <label className="block text-black/55 text-[11px] font-semibold tracking-[0.12em] uppercase mb-2">
                Price Range
              </label>
              <div className="relative">
                <select className="
                  w-full appearance-none bg-white/6 border border-black/13
                  hover:bg-white/9 hover:border-black/22
                  focus:border-blue-400/60 focus:shadow-[0_0_0_3px_rgba(96,165,250,0.15)]
                  text-black text-[13px] font-medium
                  px-3.5 py-3 pr-8 rounded-xl outline-none
                  transition-all duration-200 cursor-pointer
                ">
                  <option className="bg-slate-900">Any Budget</option>
                  <option className="bg-slate-900">Up to $100,000</option>
                  <option className="bg-slate-900">$100,000 – $300,000</option>
                  <option className="bg-slate-900">$300,000 – $600,000</option>
                  <option className="bg-slate-900">$600,000 – $1,000,000</option>
                  <option className="bg-slate-900">$1,000,000+</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-black/30 pointer-events-none" />
              </div>
            </div>

            {/* Search button */}
            <div ref={addField}>
              <button className="
                group w-full inline-flex items-center justify-center gap-2.5
                bg-blue-600 hover:bg-blue-500 active:bg-blue-700
                text-white text-[13.5px] font-semibold tracking-wide
                py-3.5 rounded-xl
                shadow-lg shadow-blue-700/28 hover:shadow-xl hover:shadow-blue-500/32
                hover:scale-[1.018] active:scale-[0.98]
                transition-all duration-200
              ">
                <SearchIcon />
                Search Properties
              </button>

              <p className="text-center text-black/28 text-[11px] font-medium mt-4 tracking-wide">
                2,400+ listings across 40+ countries
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

/* ── SVG micro-components ─────────────── */

function ArrowIcon({ muted = false }) {
  return (
    <svg
      className={`w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 ${muted ? "opacity-55" : ""}`}
      viewBox="0 0 16 16" fill="none"
    >
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8.686 2 6 4.686 6 8c0 4.418 6 12 6 12s6-7.582 6-12c0-3.314-2.686-6-6-6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="12" cy="8" r="2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ChevronDown({ className = "" }) {
  return (
    <svg className={`w-3.5 h-3.5 ${className}`} viewBox="0 0 24 24" fill="none">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}