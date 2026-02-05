import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";
import { History, AlertTriangle, CheckCircle2 } from "lucide-react";

const historyData = [
    { day: "M", uptime: 98, faults: 0 },
    { day: "T", uptime: 96, faults: 1 },
    { day: "W", uptime: 99, faults: 0 },
    { day: "T", uptime: 88, faults: 3 },
    { day: "F", uptime: 92, faults: 1 },
    { day: "S", uptime: 100, faults: 0 },
    { day: "S", uptime: 99, faults: 0 },
];

export function MachineHistoryCard() {
    return (
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 flex flex-col h-full min-h-[200px] font-tinos font-serif">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-white/90 font-semibold flex items-center gap-2 font-inter">
                    <History className="w-4 h-4 text-slate-400" /> Machine History (7 Days)
                </h3>
                <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-inter">96.5% Uptime</span>
                </div>
            </div>

            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={historyData}>
                        <Tooltip
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155" }}
                            itemStyle={{ color: "#f8fafc" }}
                        />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                        <Bar dataKey="uptime" fill="#334155" radius={[4, 4, 0, 0]} barSize={30} />
                        <Bar dataKey="faults" fill="#FF5C5C" radius={[4, 4, 0, 0]} barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 flex gap-4 text-xs text-slate-400 font-inter">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-slate-700" /> Normal Operation</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-[#FF5C5C]" /> Critical Faults</div>
            </div>
        </div>
    );
}
