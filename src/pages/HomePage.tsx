import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export default function HomePage() {
  return (
    <main className="min-h-screen w-full bg-black relative overflow-x-hidden">
      <Card className="w-full min-h-screen bg-black/[0.96] relative overflow-hidden border-0 rounded-none">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="#9d4edd"
        />
        <SpotlightCard size={400} color="#9d4edd" />

        <div className="flex flex-col md:flex-row h-screen">
          {/* Left content */}
          <div className="flex-1 p-8 md:p-16 relative z-10 flex flex-col justify-center h-full items-start pt-32">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-wide mb-6 flex flex-col items-start gap-2">
              <span className="text-white">Predict.</span>
              <span className="text-white">Prevent.</span>
              <span className="text-[#9d4edd] drop-shadow-[0_0_15px_rgba(157,78,221,0.5)]">Protect.</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 max-w-lg leading-relaxed">
              The enterprise predictive intelligence operating system for critical systems.
            </p>
            <p className="mt-4 text-[#9d4edd] font-medium text-lg">
              See failures before they exist.
            </p>

            <div className="mt-10 flex gap-4">
              <a
                href="/systems"
                className="px-8 py-3 rounded-full bg-[#9d4edd] text-white font-semibold hover:bg-[#8b3dc7] transition-colors shadow-[0_0_20px_rgba(157,78,221,0.4)]"
              >
                Get Started
              </a>
              <a
                href="/info"
                className="px-8 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right content - Spline 3D */}
          <div className="flex-1 relative min-h-[400px] md:min-h-0">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </Card>
    </main>
  );
}
