"use client";

import { useState } from "react";
import { ReactNode } from "react";

interface Service {
  num: string;
  title: string;
  description: string;
  icon: ReactNode;
}

const services: Service[] = [
  {
    num: "01",
    title: "Daily Car Rental",
    description:
      "Experience ultimate freedom on your terms. Pick up your premium vehicle, explore at your own pace, and return it when you're done — no strings attached.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path
          d="M8 6H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-3M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M8 6h8"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        />
        <circle cx="9" cy="14" r="1.5" fill="currentColor" />
        <circle cx="15" cy="14" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Monthly Car Rental",
    description:
      "Commit to comfort without committing to ownership. Monthly plans give you rolling fleet upgrades with full concierge support and flexible returns.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 14h2M14 14h2M8 18h2M14 18h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Annual Car Rental",
    description:
      "Your personal fleet for the year ahead. Priority booking, dedicated account manager, unlimited swaps — luxury membership reimagined.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path d="M12 2L3 7l9 5 9-5-9-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M3 12l9 5 9-5M3 17l9 5 9-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      className="relative w-full py-20 px-6 overflow-hidden"
      style={{ background: "#0d0d0d" }}
    >
      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #C8922A 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Divider */}
      <div className="flex justify-center mb-10">
        <div
          className="w-px h-14"
          style={{ background: "linear-gradient(to bottom, transparent, #C8922A, transparent)" }}
        />
      </div>

      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: "#C8922A" }}>
          · What We Do ·
        </p>
        <h2 className="text-4xl md:text-5xl font-black text-white" style={{ letterSpacing: "-0.02em" }}>
          Other <span style={{ color: "#C8922A" }}>Services</span>
        </h2>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
        {services.map((service, i) => {
          const hovered = hoveredIndex === i;
          return (
            <div
              key={i}
              className="relative flex flex-col justify-between p-8 rounded-2xl overflow-hidden cursor-default"
              style={{
                background: hovered
                  ? "linear-gradient(145deg, #1e1a0f 0%, #181818 100%)"
                  : "linear-gradient(145deg, #161616 0%, #111111 100%)",
                border: `1px solid ${hovered ? "#C8922A44" : "#ffffff0d"}`,
                boxShadow: hovered
                  ? "0 0 50px #C8922A18, 0 20px 40px rgba(0,0,0,0.5)"
                  : "0 4px 20px rgba(0,0,0,0.3)",
                minHeight: "280px",
                transform: hovered ? "translateY(-4px)" : "translateY(0)",
                transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-8 right-8 h-px transition-all duration-500"
                style={{
                  background: hovered
                    ? "linear-gradient(90deg, transparent, #C8922A, transparent)"
                    : "transparent",
                }}
              />

              <div>
                {/* Icon */}
                <div
                  className="mb-5 inline-flex items-center justify-center w-11 h-11 rounded-xl"
                  style={{
                    background: hovered ? "#C8922A20" : "#ffffff08",
                    color: hovered ? "#C8922A" : "#888",
                    border: `1px solid ${hovered ? "#C8922A40" : "#ffffff10"}`,
                    transition: "all 0.3s ease",
                  }}
                >
                  {service.icon}
                </div>

                <h3
                  className="text-xl font-bold mb-3"
                  style={{
                    color: hovered ? "#fff" : "#e5e5e5",
                    letterSpacing: "-0.01em",
                    transition: "color 0.3s ease",
                  }}
                >
                  {service.title}
                </h3>

                <p className="text-sm leading-relaxed" style={{ color: "#888" }}>
                  {service.description}
                </p>
              </div>

              {/* Bottom row */}
              <div className="mt-8 flex items-center justify-between">
                <div
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: hovered ? "#C8922A" : "#555", transition: "color 0.3s ease" }}
                >
                  <span>Learn More</span>
                  <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
                    <path d="M2 10L10 2M10 2H5M10 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-black"
                  style={{
                    background: hovered ? "linear-gradient(135deg, #C8922A, #D4A017)" : "#1e1e1e",
                    color: hovered ? "#0d0d0d" : "#C8922A",
                    border: `1px solid ${hovered ? "transparent" : "#C8922A40"}`,
                    transition: "all 0.3s ease",
                  }}
                >
                  {service.num}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
