"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import Container from "./Container";
import useApi from "@/lib/api";

interface Car {
  id: string;
  model: string;
  seats: number;
  doors: number;
  transmission: string;
  fuel_type: string;
  price_per_day: number;
  images: string[];
  is_available: boolean;
  brand?: { name: string };
}

const IconDoor = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="2" width="15" height="20" rx="2" />
    <circle cx="15" cy="12" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const IconSeat = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 20v-8a6 6 0 0 1 12 0v8" />
    <path d="M6 12H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2" />
    <path d="M18 12h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
  </svg>
);

const IconGear = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
  </svg>
);

const IconBag = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
);

const CarCard = ({ car, isActive }: { car: Car; isActive: boolean }) => {
  const image = car.images?.[0] ?? "/placeholder.jpg";
  const name = car.brand?.name ? `${car.brand.name} ${car.model}` : car.model;
  const [isHovered, setIsHovered] = useState(false);
  const specs = [
    { icon: <IconDoor />, label: car.doors },
    { icon: <IconSeat />, label: car.seats },
    { icon: <IconGear />, label: car.transmission },
    { icon: <IconBag />, label: "2 Bags" },
  ];

  return (
    <article
      style={{
        width: "100%",
        borderRadius: "14px",
        overflow: "hidden",
        background: "#2c2a2b",
        border: "1px solid rgba(237,180,88,0.24)",
        boxShadow: isActive
          ? "0 28px 70px rgba(0,0,0,0.42)"
          : "0 18px 44px rgba(0,0,0,0.16)",
        transition: "transform 0.45s ease, box-shadow 0.45s ease",
      }}
    >
      <div
        style={{
          position: "relative",
          height: isActive ? "260px" : "230px",
          overflow: "hidden",
          background: "#171717",
        }}
      >
        <Image
          src={image}
          alt={name}
          fill
          unoptimized
          sizes="(max-width: 768px) 92vw, (max-width: 1100px) 40vw, 32vw"
          style={{
            objectFit: "cover",
            transition: "transform 0.5s ease, filter 0.5s ease",
            filter: isActive ? "none" : "brightness(0.7)",
            transform: isActive && isHovered ? "scale(1.04)" : "scale(1)",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </div>

      <div
        style={{
          padding: isActive ? "14px 14px 12px" : "12px 14px 10px",
          background: "#2e2b2d",
        }}
      >
        <h3
          style={{
            margin: "0 0 8px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: isActive ? "17px" : "15px",
            fontWeight: 700,
            lineHeight: 1.2,
            color: "rgba(255,255,255,0.96)",
          }}
        >
          {name}
        </h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "12px",
            color: "rgba(237,180,88,0.82)",
          }}
        >
          {specs.map((spec, index) => (
            <span
              key={`${car.id}-spec-${index}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                color: "rgba(237,180,88,0.78)",
              }}
            >
              <span style={{ display: "inline-flex" }}>{spec.icon}</span>
              <span>{spec.label}</span>
            </span>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <button
            type="button"
            style={{
              border: "none",
              borderRadius: "999px",
              padding: "7px 16px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10.5px",
              fontWeight: 700,
              lineHeight: 1,
              color: "#44310a",
              background: "linear-gradient(180deg, #edb458 0%, #edb458 100%)",
              textTransform: "capitalize",
              boxShadow: "0 6px 14px rgba(237,180,88,0.22)",
              cursor: "pointer",
            }}
          >
            Details
          </button>

          <div style={{ textAlign: "right", lineHeight: 1 }}>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                verticalAlign: "top",
                color: "#edb458",
                marginRight: "1px",
              }}
            >
              $
            </span>
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: isActive ? "31px" : "26px",
                fontWeight: 800,
                color: "#edb458",
                letterSpacing: "-0.04em",
              }}
            >
              {car.price_per_day}
            </span>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                color: "rgba(237,180,88,0.65)",
              }}
            >
              /day
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

const SelectCarWithName = () => {
  const { data: cars } = useApi({ url: "cars" }) as { data: Car[] };
  const [activeIndex, setActiveIndex] = useState(0);
  const initialSlide = cars?.length && cars.length > 1 ? 1 : 0;

  return (
    <section
      style={{
        background:
          "radial-gradient(circle at top, rgba(62,58,51,0.22) 0%, rgba(30,29,29,0) 24%), #1d1c1d",
        padding: "82px 0 96px",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;700&display=swap');

        .fleet-swiper {
          width: 100%;
          overflow: visible !important;
          padding: 22px 0 42px !important;
        }

        .fleet-swiper .swiper-wrapper {
          align-items: flex-end;
        }

        .fleet-swiper .swiper-slide {
          width: min(32vw, 455px) !important;
          transition: transform 0.45s ease, opacity 0.45s ease, filter 0.45s ease;
          opacity: 0.28;
          filter: brightness(0.45) saturate(0.5);
          transform: translateY(34px) scale(0.94);
        }

        .fleet-swiper .swiper-slide-active {
          opacity: 1;
          filter: none;
          transform: translateY(0) scale(1);
          z-index: 3;
        }

        .fleet-swiper .swiper-slide-prev,
        .fleet-swiper .swiper-slide-next {
          opacity: 0.42;
          filter: brightness(0.55) saturate(0.62);
        }

        .fleet-swiper .swiper-button-prev,
        .fleet-swiper .swiper-button-next {
          display: none;
        }

        @media (max-width: 1100px) {
          .fleet-swiper .swiper-slide {
            width: min(40vw, 440px) !important;
          }
        }

        @media (max-width: 768px) {
          .fleet-swiper {
            padding-bottom: 26px !important;
          }

          .fleet-swiper .swiper-slide {
            width: min(92vw, 420px) !important;
            opacity: 0.12;
          }

          .fleet-swiper .swiper-slide-prev,
          .fleet-swiper .swiper-slide-next {
            opacity: 0.16;
          }
        }
      `}</style>

      <Container className="w-full">
        <div style={{ textAlign: "center", marginBottom: "34px" }}>
          <p
            style={{
              margin: "0 0 10px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.34em",
              textTransform: "uppercase",
              color: "#edb458",
            }}
          >
            Select Your Car
          </p>

          <h2
            style={{
              margin: 0,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(34px, 4vw, 54px)",
              fontWeight: 700,
              lineHeight: 1.05,
              color: "#fff7e8",
            }}
          >
            Luxury <span style={{ color: "#edb458" }}>Car Fleet</span>
          </h2>
        </div>
      </Container>

      {cars?.length > 0 ? (
        <div style={{ width: "100%", overflow: "hidden" }}>
          <Swiper
            className="fleet-swiper"
            modules={[EffectCoverflow, Autoplay]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            initialSlide={initialSlide}
            coverflowEffect={{
              rotate: 0,
              stretch: 170,
              depth: 250,
              modifier: 1,
              scale: 0.92,
              slideShadows: false,
            }}
            autoplay={{ delay: 3500, disableOnInteraction: true }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            onSwiper={(swiper) => setActiveIndex(swiper.activeIndex)}
          >
            {cars.map((car, index) => (
              <SwiperSlide key={car.id}>
                <CarCard car={car} isActive={index === activeIndex} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <p
          style={{
            textAlign: "center",
            color: "rgba(255,255,255,0.45)",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Loading fleet...
        </p>
      )}
    </section>
  );
};

export default SelectCarWithName;
