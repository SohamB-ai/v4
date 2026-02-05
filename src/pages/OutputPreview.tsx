import { OutputPreviewSection } from "@/components/home/OutputPreviewSection";
import { LampContainer } from "@/components/ui/lamp";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export default function OutputPreview() {
    return (
        <LampContainer className="bg-gradient-to-br from-black via-black to-purple-900">
            <SpotlightCard size={400} color="#9d4edd" />
            <div className="container mx-auto px-4 relative z-10">
                <OutputPreviewSection />
            </div>
        </LampContainer>
    );
}
