"use client";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wind, Zap, Cog, Building2, Server, Activity, Cpu, Gauge } from "lucide-react";
import { CardStack, CardStackItem } from "@/components/ui/card-stack";
import { SyntheticBackground } from "@/components/ui/synthetic-background";

export const systemDomains = [
  {
    slug: "wind-turbines",
    title: "Wind Turbines",
    icon: Wind,
    failures: "Gearbox bearing wear, blade pitch faults",
    color: "text-cyan",
    bgColor: "bg-cyan/10",
  },
  {
    slug: "power-transformers",
    title: "Power Transformers",
    icon: Zap,
    failures: "Insulation breakdown, oil degradation",
    color: "text-amber",
    bgColor: "bg-amber/10",
  },
  {
    slug: "industrial-motors",
    title: "Industrial Motors",
    icon: Cog,
    failures: "Rotor imbalance, bearing damage",
    color: "text-purple",
    bgColor: "bg-purple/10",
  },
  {
    slug: "bridges",
    title: "Bridges",
    icon: Building2,
    failures: "Structural fatigue, cable tension",
    color: "text-emerald",
    bgColor: "bg-emerald/10",
  },
  {
    slug: "servers",
    title: "Servers",
    icon: Server,
    failures: "Thermal throttling, disk failures",
    color: "text-critical",
    bgColor: "bg-critical/10",
  },
  {
    slug: "icu-monitoring",
    title: "ICU Monitoring",
    icon: Activity,
    failures: "Sensor drift, calibration errors",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    slug: "cnc-machines",
    title: "CNC Machines",
    icon: Cpu,
    failures: "Tool wear, spindle vibration",
    color: "text-cyan",
    bgColor: "bg-cyan/10",
  },
  {
    slug: "hvac-systems",
    title: "HVAC Systems",
    icon: Gauge,
    failures: "Compressor issues, refrigerant leaks",
    color: "text-amber",
    bgColor: "bg-amber/10",
  },
];

// CardStack items with Unsplash images for each system
const systemCards: CardStackItem[] = [
  {
    id: "wind-turbines",
    title: "Wind Turbines",
    description: "Predict gearbox bearing wear, blade pitch faults, and generator issues before they cause downtime.",
    imageSrc: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&auto=format&fit=crop",
    href: "/system/wind-turbines",
  },
  {
    id: "power-transformers",
    title: "Power Transformers",
    description: "Monitor insulation breakdown, oil degradation, and thermal anomalies in real-time.",
    imageSrc: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop",
    href: "/system/power-transformers",
  },
  {
    id: "industrial-motors",
    title: "Industrial Motors",
    description: "Detect rotor imbalance, bearing damage, and electrical faults with precision.",
    imageSrc: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&auto=format&fit=crop",
    href: "/system/industrial-motors",
  },
  {
    id: "bridges",
    title: "Bridges & Structures",
    description: "Track structural fatigue, cable tension, and displacement for infrastructure safety.",
    imageSrc: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&auto=format&fit=crop",
    href: "/system/bridges",
  },
  {
    id: "servers",
    title: "Server Infrastructure",
    description: "Prevent thermal throttling, disk failures, and performance degradation.",
    imageSrc: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop",
    href: "/system/servers",
  },
  {
    id: "icu-monitoring",
    title: "ICU & Medical Equipment",
    description: "Monitor sensor drift and calibration errors in critical healthcare systems.",
    imageSrc: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop",
    href: "/system/icu-monitoring",
  },
  {
    id: "cnc-machines",
    title: "CNC Machines",
    description: "Predict tool wear, spindle vibration, and machining accuracy issues.",
    imageSrc: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&auto=format&fit=crop",
    href: "/system/cnc-machines",
  },
  {
    id: "hvac-systems",
    title: "HVAC Systems",
    description: "Detect compressor issues, refrigerant leaks, and efficiency degradation.",
    imageSrc: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&auto=format&fit=crop",
    href: "/system/hvac-systems",
  },
];

export function SystemsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCardChange = (_index: number, item: CardStackItem) => {
    // Optional: could track which system is being viewed
    console.log("Viewing:", item.title);
  };

  return (
    <section
      id="section-systems"
      ref={sectionRef}
      className={`relative min-h-screen py-24 px-6 transition-all duration-700 overflow-hidden flex items-center justify-center ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
    >
      {/* Search/Background - Synthetic Background */}
      <SyntheticBackground />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* CardStack for systems */}
        <CardStack
          items={systemCards}
          initialIndex={0}
          autoAdvance
          intervalMs={2000}
          pauseOnHover
          showDots
          cardWidth={480}
          cardHeight={300}
          onChangeIndex={handleCardChange}
        />
      </div>
    </section>
  );
}
