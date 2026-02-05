import { GlobalStatusBar } from "@/components/dashboard/new/GlobalStatusBar";
import { FleetCommandPanel } from "@/components/dashboard/new/FleetCommandPanel";
import { AssetIntelligencePanel } from "@/components/dashboard/new/AssetIntelligencePanel";
import { InsightsPanel } from "@/components/dashboard/new/InsightsPanel";
import { MachineHistoryCard } from "@/components/dashboard/new/MachineHistoryCard";
import { FloatingDashboardActions } from "@/components/dashboard/new/FloatingDashboardActions";
// import { SpiralAnimation } from "@/components/ui/spiral-animation";
import { DashboardNavbar } from "@/components/dashboard/new/DashboardNavbar";
import { BubbleNav } from "@/components/navigation/BubbleNav";
import { useEffect } from "react";
import { renderCanvas, cleanupCanvas } from "@/components/ui/hero-designali";

export default function Dashboard() {
  useEffect(() => {
    renderCanvas();
    return () => cleanupCanvas();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-[#2e1065] text-white selection:bg-purple-500/30 selection:text-purple-200 overflow-x-hidden relative font-tinos">
      {/* Background Ambience - Canvas */}
      {/* Background Ambience - Canvas */}
      <canvas
        className="fixed inset-0 z-0 pointer-events-none w-full h-full opacity-60 mix-blend-screen"
        id="canvas"
      ></canvas>

      {/* Main Website Navigation */}
      <BubbleNav />

      <div className="relative z-10 flex flex-col min-h-screen pt-20">
        {/* Dashboard Sub-Navbar */}
        <DashboardNavbar />

        {/* Main Content */}
        <div className="flex-1 px-6 py-6 space-y-6">
          {/* Top KPI Bar */}
          <div className="w-full">
            <GlobalStatusBar />
          </div>

          {/* Main Workspace (3-Column Grid) */}
          <div className="grid grid-cols-12 gap-6">
            {/* LEFT: Fleet Command */}
            <div className="col-span-12 lg:col-span-3 xl:col-span-2 min-h-[500px] flex flex-col">
              <FleetCommandPanel />
            </div>

            {/* CENTER: Asset Intelligence */}
            <div className="col-span-12 lg:col-span-6 xl:col-span-7 min-h-[500px] flex flex-col">
              <AssetIntelligencePanel />
            </div>

            {/* RIGHT: Insights */}
            <div className="col-span-12 lg:col-span-3 xl:col-span-3 min-h-[500px] flex flex-col">
              <InsightsPanel />
            </div>

            {/* BOTTOM: Machine History (Full Width) */}
            <div className="col-span-12 h-[300px]">
              <MachineHistoryCard />
            </div>
          </div>
        </div>
      </div>

      <FloatingDashboardActions />
    </div>
  );
}

