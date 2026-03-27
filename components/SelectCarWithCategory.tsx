"use client";

import Image from "next/image";
import { useState } from "react";

interface Car {
  id: number;
  category: string;
  tagline: string;
  accent: string;
  bg: string;
  image: string;
  featured?: boolean;
}

const cars: Car[] = [
  {
    id: 1,
    category: "Convertible",
    tagline: "Open-air elegance",
    accent: "#C8922A",
    bg: "linear-gradient(135deg, #1a1209 0%, #0d0d0d 100%)",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
  },
  {
    id: 2,
    category: "Sport Cars",
    tagline: "Track-bred ferocity",
    accent: "#D4A017",
    featured: true,
    bg: "linear-gradient(135deg, #1c1500 0%, #0d0d0d 100%)",
    image: "https://images.unsplash.com/photo-1555353540-64580b51c258?w=800&q=80",
  },
  {
    id: 3,
    category: "Luxury Cars",
    tagline: "Refined supremacy",
    accent: "#A89060",
    bg: "linear-gradient(135deg, #0f0f0f 0%, #0d0d0d 100%)",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
  },
];

export default function CarFleetSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      className="relative w-full py-20 px-6 overflow-hidden"
      style={{ background: "#0d0d0d" }}
    >
      {/* Divider */}
      <div className="flex justify-center mb-10">
        <div
          className="w-px h-14"
          style={{ background: "linear-gradient(to bottom, transparent, #C8922A, transparent)" }}
        />
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: "#C8922A" }}>
          · Select Your Car ·
        </p>
        <h2 className="text-4xl md:text-5xl font-black" style={{ letterSpacing: "-0.02em" }}>
          <span className="text-white">Luxury </span>
          <span style={{ color: "#C8922A" }}>Car Fleet</span>
        </h2>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto flex gap-4 items-center">
        {cars.map((car) => {
          const hovered = hoveredId === car.id;
          return (
            <div
              key={car.id}
              className="relative overflow-hidden rounded-2xl cursor-pointer"
              style={{
                flex: car.featured ? "1.35" : "1",
                minHeight: car.featured ? "320px" : "280px",
                background: car.bg,
                transform: `scale(${car.featured ? 1.05 : hovered ? 1.02 : 1})`,
                zIndex: car.featured ? 10 : 0,
                boxShadow:
                  hovered || car.featured
                    ? `0 0 60px ${car.accent}30, 0 20px 60px rgba(0,0,0,0.6)`
                    : "0 4px 30px rgba(0,0,0,0.4)",
                transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
              }}
              onMouseEnter={() => setHoveredId(car.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <Image width={400} height={400}
                src={car.image}
                alt={car.category}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  transform: hovered ? "scale(1.08)" : "scale(1)",
                  filter: "brightness(0.52) saturate(1.1)",
                  transition: "transform 0.7s ease",
                }}
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%)" }}
              />

              {/* Border glow */}
              {(hovered || car.featured) && (
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ border: `1px solid ${car.accent}55`, boxShadow: `inset 0 0 30px ${car.accent}10` }}
                />
              )}

              {/* Category label */}
              <div className="absolute top-5 left-5">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                  {car.category}
                </span>
              </div>

              {/* Bottom row */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <p
                  className="text-xs font-medium uppercase tracking-widest"
                  style={{ color: car.accent, opacity: hovered ? 1 : 0.6, transition: "opacity 0.3s" }}
                >
                  {car.tagline}
                </p>
                <button
                  className="flex items-center justify-center w-9 h-9 rounded-full"
                  style={{
                    background: car.featured || hovered ? car.accent : "rgba(255,255,255,0.1)",
                    border: `1px solid ${car.accent}80`,
                    transform: hovered ? "rotate(0deg)" : "rotate(-45deg)",
                    transition: "all 0.3s ease",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 16 16">
                    <path
                      d="M3 13L13 3M13 3H6M13 3V10"
                      stroke={car.featured || hovered ? "#0d0d0d" : car.accent}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Featured bottom strip */}
              {car.featured && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, transparent, ${car.accent}, transparent)` }}
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
