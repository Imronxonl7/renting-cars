"use client";

import useApi from "@/lib/api";
import { getSupabaseRows } from "@/lib/supabase";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  rating: number;
  avatar: string;
  accent: string;
}

const TestimonialsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
 const {data:faqs} = useApi({url:'faq'})  
 console.log(faqs)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSupabaseRows<Testimonial>('testimonials');
        setTestimonials(data || []);
      } catch (error) {
        console.error('TestimonialsSection fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Если данных нет или идет загрузка, ничего не рендерим (или можно добавить скелетон)
  if (loading || testimonials.length === 0) {
    return null;
  }

  return (
    <section
      className="relative w-full py-20 px-6 overflow-hidden"
      style={{ background: "#0d0d0d" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full pointer-events-none opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, #C8922A 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          filter: "blur(40px)",
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
          · Testimonials ·
        </p>
        <h2 className="text-4xl md:text-5xl font-black text-white" style={{ letterSpacing: "-0.02em" }}>
          What Clients <span style={{ color: "#C8922A" }}>Say</span>
        </h2>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
        {testimonials.map((t, i) => {
          const hovered = hoveredIndex === i;
          return (
            <div
              key={i}
              className="relative flex flex-col justify-between p-8 rounded-2xl overflow-hidden"
              style={{
                background: hovered
                  ? "linear-gradient(145deg, #1d190d 0%, #161616 100%)"
                  : "linear-gradient(145deg, #151515 0%, #111111 100%)",
                border: `1px solid ${hovered ? "#C8922A33" : "#ffffff0c"}`,
                boxShadow: hovered
                  ? `0 0 60px ${t.accent}15, 0 25px 50px rgba(0,0,0,0.5)`
                  : "0 4px 20px rgba(0,0,0,0.3)",
                transform: hovered ? "translateY(-5px)" : "translateY(0)",
                minHeight: "280px",
                transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-10 right-10 h-px transition-all duration-500"
                style={{
                  background: hovered
                    ? `linear-gradient(90deg, transparent, ${t.accent}, transparent)`
                    : "transparent",
                }}
              />

              {/* Quote icon + stars */}
              <div className="flex items-start justify-between mb-6">
                <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
                  <path
                    d="M0 22V13.4C0 9.667.933 6.6 2.8 4.2 4.667 1.8 7.4.333 11 0L12.4 2.2C10.2 2.733 8.5 3.733 7.3 5.2 6.1 6.667 5.467 8.4 5.4 10.4H10V22H0ZM16 22V13.4C16 9.667 16.933 6.6 18.8 4.2 20.667 1.8 23.4.333 27 0L28.4 2.2C26.2 2.733 24.5 3.733 23.3 5.2 22.1 6.667 21.467 8.4 21.4 10.4H26V22H16Z"
                    fill={t.accent}
                    opacity="0.6"
                  />
                </svg>
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <svg key={s} width="13" height="13" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M7 1l1.545 3.09L12 4.635l-2.5 2.41.59 3.41L7 8.81l-3.09 1.645.59-3.41L2 4.635l3.455-.545L7 1z"
                        fill="#C8922A"
                      />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <p
                className="text-sm leading-relaxed flex-1 mb-7"
                style={{
                  color: hovered ? "#c8c8c8" : "#909090",
                  fontStyle: "italic",
                  transition: "color 0.3s ease",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Divider line */}
              <div
                className="w-full h-px mb-6"
                style={{
                  background: hovered ? "#C8922A20" : "#ffffff08",
                  transition: "all 0.3s ease",
                }}
              />

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <Image
                    width={44}
                    height={44}
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover"
                    style={{
                      border: `2px solid ${hovered ? t.accent : "#333"}`,
                      transition: "border-color 0.3s ease",
                    }}
                  />
                  {hovered && (
                    <div
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{ boxShadow: `0 0 12px ${t.accent}60` }}
                    />
                  )}
                </div>
                <div>
                  <p
                    className="text-sm font-bold"
                    style={{
                      color: hovered ? t.accent : "#e0e0e0",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {t.name}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#555" }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="text-center mt-14">
        <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#555" }}>
          Join 2,400+ satisfied clients
        </p>
        <button
          className="text-sm font-bold uppercase tracking-widest px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #C8922A, #D4A017)",
            color: "#0d0d0d",
            boxShadow: "0 4px 20px #C8922A40",
          }}
        >
          Read All Reviews
        </button>
      </div>
    </section>
  );
};

export default TestimonialsSection;