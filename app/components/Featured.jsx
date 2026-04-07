"use client";

import React from "react";
import Image from "next/image";
import data from "../data.json";
import { urbanist, inter } from "@/app/fonts.js"

const Featured = () => {
    return (
      <section className={`w-full bg-slate-50 py-12 sm:py-16 ${inter.className}`}>
  <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Heading: Flex-col on mobile, flex-row on desktop */}
    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
      <div>
        <h2 className="text-2xl sm:text-4xl font-bold text-slate-900">
          Featured Properties For Sale
        </h2>
        <p className="text-slate-500 mt-2 text-sm sm:text-base">
          Discover our handpicked premium listings
        </p>
      </div>

      <a
        href="#"
        className="text-blue-600 font-medium hover:underline text-sm sm:text-base"
      >
        View All →
      </a>
    </div>

    {/* Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {data.map((item) => (
        <div
          key={item.id}
          className="group bg-white rounded-2xl overflow-hidden  transition-all duration-300"
        >
          {/* Image Container */}
          <div className="relative w-full h-64 sm:h-72 overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

            {/* Status Badges: Added 'flex-wrap' and 'absolute' logic */}
            <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2 z-10">
              {[item.status, item.country, item.state, item.city, `Beds: ${item.beds}`].map((label, idx) => (
                <span 
                  key={idx}
                  className="backdrop-blur-md bg-white/20 border border-white/30 text-white text-[10px] sm:text-xs px-2.5 py-1 rounded-full font-medium"
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Price & Action Row */}
            <div className="absolute bottom-4 left-4 right-4 text-white z-10">
              <div className="flex items-center justify-between w-full">
                <div className="text-lg sm:text-xl font-bold">
                  {item.formattedPrice}
                </div>
                <button className="bg-white/20 backdrop-blur-xl hover:bg-white/30 border border-white/40 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer">
                  See More
                </button>
              </div>
            </div>
          </div>

          {/* Optional: Content area below image if needed */}
          <div className={`p-4 ${urbanist.className}`}>
             <h3 className="text-center text-slate-800 font-semibold truncate text-xl">{item.title}</h3>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
    );
};

export default Featured;