"use client";
import React, { useState } from "react";
import data from "@/app/data.json";
import { useParams } from "next/navigation";
import { urbanist, inter } from "@/app/fonts";
import { PiPhoneCall } from "react-icons/pi";
import { CiCalendarDate } from "react-icons/ci";



const PropertyPage = () => {
  const { id } = useParams();
  const propertyId = Number(id);
  const property = data.find((item) => item.id === propertyId);

  const [mainImage, setMainImage] = useState(
    property?.gallery ? property.gallery[0] : property?.image
  );

  if (!property) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-slate-200">404</h1>
          <p className="text-xl text-slate-500 font-medium">Property Not Found</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-[#FAF9F6] min-h-screen mt-14 pb-20 ${inter.className}`}>
      {/* --- HERO SECTION --- */}
      <div className="max-w-330 mx-auto px-4 pt-8">
        <div className="relative group overflow-visible">
          {/* Main Image */}
          <div className="relative h-150 w-full rounded-xl overflow-hidden shadow-xl">
            <img
              src={mainImage}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Dark Overlay for better text contrast */}
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/20" />
          </div>

          {/* Top Center Badge */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm border border-white/30 px-6 py-2 rounded-full shadow-xl z-10">
            <span className="text-[10px] tracking-widest font-bold text-white/90 uppercase">
              Properties / Featured Estate
            </span>
          </div>

          {/* Floating Contact Card (Glassmorphism) */}
          <div className={`absolute bottom-8 right-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-xl p-4 w-70 text-white z-10 hidden md:block ${urbanist.className}`}>
            <h3 className="text-2xl text-center font-semibold mb-4 leading-tight">Contact card</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer py-2.5 rounded-xl text-sm transition-all shadow-lg active:scale-95">
                Call Agent
              </button>
              <button className="w-full bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold cursor-pointer text-sm  py-2.5 rounded-xl transition-all active:scale-95">
                Schedule Visit
              </button>
            </div>
          </div>

          {/* --- QUICK STATS BAR (OVERLAPPING) --- */}
          <div className={`absolute -bottom-10 left-0 right-0 px-4 md:px-12 z-30 ${urbanist.className}`}>
            <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 px-6 py-2 flex flex-wrap items-center justify-between gap-8">

              <div className="flex items-center gap-6">
                <div className="text-xl  font-bold text-slate-700 border-r border-slate-200 pr-8">
                  Quick Stats
                </div>

                {/* Bed Stat */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    {/* <span className="text-xl">🛏️</span> */}
                    <span className="text-sm font-bold text-slate-500">{property.beds} Bedrooms</span>
                  </div>
                </div>

                {/* Bath Stat */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    {/* <span className="text-xl">🛁</span> */}
                    <span className="text-sm font-bold text-slate-500">{property.baths} Bathrooms</span>
                  </div>
                </div>

                {/* Area Stat */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    {/* <span className="text-xl">📐</span> */}
                    <span className="text-sm font-bold text-slate-500">{property.area || "7,107 SQ FT"}</span>
                  </div>
                </div>
              </div>

              {/* Location Stat */}
              <div className="flex items-center gap-4 ml-auto bg-slate-50 px-6 py-3 rounded-xl border border-slate-100">
                <p className="text-sm font-black text-slate-900">{property.city}, {property.state}</p>
                <button className="text-blue-600 cursor-pointer text-xs underline font-bold hover:text-blue-800">View on Map</button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* --- PAGE CONTENT --- */}
      <div className="max-w-330 mx-auto px-8 mt-24 grid grid-cols-1 lg:grid-cols-12 gap-16">

        {/* LEFT COLUMN */}
        <div className={`lg:col-span-8 ${urbanist.className}`}>
          {/* Header & Price */}
          <div className="flex justify-between mb-6 border-b border-slate-200 pb-2">
            <div>
              <h1 className="text-5xl font font-bold text-slate-700 mb-2 leading-[1.1]">
                {property.title}
              </h1>
              <p className="text-xl text-slate-500 font-light mb-2 tracking-wide ">{property.address}</p>
            </div>
            <div className="px-2 py-1.5 rounded-xl  border-emerald-100">
              <span className="text-xl font-bold text-emerald-600">
                {property.formattedPrice}
              </span>
            </div>
          </div>

          <div className="mb-10 bg-white">
            <h2 className="text-xl  font-bold text-slate-700 mb-1 tracking-tight">Description</h2>
            <p className="text-slate-600 leading-relaxed text-md font-light">
              {property.description}
            </p>
          </div>
          {/* Luxury Gallery Grid */}
          <div className="mb-16">
            <h2 className="text-xl font font-bold text-slate-900 mb-6 uppercase tracking-widest">Property Gallery</h2>
            <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
              {property.gallery?.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`relative min-w-45 h-32 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-4 ${mainImage === img ? "border-blue-600 scale-105 shadow-xl" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                >
                  <img src={img} alt="Gallery" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>


          {/* Amenities */}
          <div>
            <h2 className="text-3xl font font-bold text-slate-900 mb-8 tracking-tight">Amenities & Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {property.features?.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-white hover:bg-blue-50 transition-all border border-slate-100 rounded-3xl px-8 py-6 group cursor-default"
                >
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-xl group-hover:bg-white shadow-sm transition-colors">
                    {feature.includes('Pool') ? '🏊' : feature.includes('Cinema') ? '🎬' : '✨'}
                  </div>
                  <span className="font-bold text-slate-800 text-lg tracking-tight">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (AGENT) */}
        <div className={`lg:col-span-4 ${urbanist.className}`}>
          <div className="sticky top-12 bg-white border border-slate-100 rounded-xl p-4 shadow-xl shadow-slate-200/50">
            <div className="text-center mb-1">
              <div className="relative w-32 h-32 mx-auto mb-1">
                <img
                  src={property.agent.image}
                  alt={property.agent.name}
                  className="w-full h-full rounded-xl object-cover group-hover:rotate-0 transition-transform"
                />
               
              </div>
              <h3 className="font font-bold text-3xl text-slate-900">{property.agent.name}</h3>
              <p className="text-blue-600 font-bold tracking-widest text-[10px] uppercase mt-2">Principal Consultant</p>
              <p className="text-slate-900 font-black text-xl mt-1 tracking-tighter">{property.agent.phone}</p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <button className="cursor-pointer w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all  active:scale-95">
                <span><PiPhoneCall /></span> Instant Call
              </button>
              <button className="cursor-pointer w-full flex items-center justify-center gap-2 border-2 border-slate-200 hover:bg-slate-50 text-slate-900 font-bold py-4 rounded-xl transition-all active:scale-95">
                <span><CiCalendarDate /></span> Book Viewing
              </button>
              <button className="cursor-pointer w-full text-slate-400 hover:text-blue-600 font-bold text-sm transition-all pt-4">
                Ask a Question
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PropertyPage;