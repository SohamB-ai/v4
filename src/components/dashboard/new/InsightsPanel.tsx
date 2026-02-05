import { BarChart3, BrainCircuit, CheckCircle2, ChevronRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const contributors = [
    { name: "Vib-X Axis", val: 32, fill: "#FF5C5C" },
    { name: "Motor Temp", val: 24, fill: "#FFB020" },
    { name: "Oil Press", val: 18, fill: "#00E0C6" },
];

export function InsightsPanel() {
    return (
        <div className="h-full flex flex-col gap-6 font-tinos">
            {/* Top Sensors */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 font-serif font-tinos">
                <h3 className="text-white/90 font-semibold mb-4 flex items-center gap-2 font-inter">
                    <BarChart3 className="w-4 h-4 text-cyan-400" /> Key Drivers
                </h3>
                <div className="space-y-4">
                    {contributors.map((c, i) => (
                        <div key={i}>
                            <div className="flex justify-between text-xs mb-1 font-inter">
                                <span className="text-slate-300">{c.name}</span>
                                <span className="text-white font-mono">{c.val}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full rounded-full" style={{ width: `${c.val}%`, backgroundColor: c.fill }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Explainability */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 font-serif font-tinos">
                <h3 className="text-white/90 font-semibold mb-3 flex items-center gap-2 font-inter">
                    <BrainCircuit className="w-4 h-4 text-purple-400" /> AI Diagnostic
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-inter">
                    <strong className="text-white font-semibold">Rising vibration trend</strong> in the X-axis combined with <strong className="text-white font-semibold">stable motor temperature</strong> suggests early-stage <strong className="text-[#FFB020]">bearing inner race wear</strong> rather than lubrication failure.
                </p>
                <button className="text-xs text-purple-400 mt-3 font-medium hover:text-purple-300 flex items-center font-inter">
                    View Model Logic <ChevronRight className="w-3 h-3 ml-1" />
                </button>
            </div>

            {/* Recommended Action */}
            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 flex-1 flex flex-col justify-between font-serif font-tinos">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="w-5 h-5 text-[#00E0C6]" />
                        <h3 className="text-white font-bold font-inter">Next Action</h3>
                    </div>
                    <p className="text-lg font-medium text-white mb-2 leading-tight font-tinos">Replace DE bearing within 3 days.</p>
                    <p className="text-sm text-slate-400 font-inter">Est. Downtime: 4h</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xs text-slate-400 font-inter">Cost Impact</span>
                        <span className="text-sm font-mono text-emerald-400 font-bold">-$4,200</span>
                    </div>
                    <Button className="w-full bg-[#00E0C6] hover:bg-[#00c4ad] text-black font-bold font-inter">
                        View Justification
                    </Button>
                </div>
            </div>
        </div>
    );
}
