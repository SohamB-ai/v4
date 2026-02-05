import { useState } from "react";
import { ChevronDown, Monitor, Laptop, Smartphone, Cpu } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const devices = [
    { id: "dev-01", name: "Turbine A-11", icon: Monitor },
    { id: "dev-02", name: "Gen. Control", icon: Cpu },
    { id: "dev-03", name: "Field Tablet", icon: Smartphone },
    { id: "dev-04", name: "Engine Monitor", icon: Laptop },
];

export function DashboardNavbar() {
    const [selectedDevice, setSelectedDevice] = useState(devices[0]);

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-black/20 backdrop-blur-md border-b border-white/5 relative z-50">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#00E0C6]/20 flex items-center justify-center border border-[#00E0C6]/30">
                        <div className="w-4 h-4 rounded-full bg-[#00E0C6] animate-pulse shadow-[0_0_10px_#00E0C6]" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-white font-tinos">
                        FORSEE <span className="text-slate-500 font-normal">| Intelligence </span>
                    </h1>
                </div>

                <div className="h-6 w-px bg-white/10 mx-2" />

                {/* Device Switcher */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-9 px-3 text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 rounded-lg gap-2 font-inter font-normal">
                            <selectedDevice.icon className="w-4 h-4 text-[#00E0C6]" />
                            {selectedDevice.name}
                            <ChevronDown className="w-3 h-3 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[200px] bg-[#050b14] border-white/10 text-slate-300 backdrop-blur-xl">
                        {devices.map((device) => (
                            <DropdownMenuItem
                                key={device.id}
                                onClick={() => setSelectedDevice(device)}
                                className="focus:bg-white/10 focus:text-white cursor-pointer gap-2"
                            >
                                <device.icon className="w-4 h-4 text-slate-500" />
                                {device.name}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="flex items-center gap-4">
                <div className="text-xs text-slate-500 font-mono">
                    v2.4.0-stable
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10" />
            </div>
        </nav>
    );
}
