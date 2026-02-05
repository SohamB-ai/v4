import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { FooterCTA } from "@/components/home/FooterCTA";
import { Boxes } from "@/components/ui/background-boxes";
import { TypingText } from "@/components/ui/TypingText";
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll";
import { cn } from "@/lib/utils";

const aboutContent = [
    {
        type: 'p',
        content: [
            { text: "Forsee AI", className: "text-white font-semibold" },
            " was built around a simple idea: most failures don't happen suddenly — ",
            { text: "they whisper first.", className: "italic text-white" }
        ]
    },
    {
        type: 'p',
        content: [
            "Across critical systems like ",
            { text: "energy infrastructure", className: "text-white" },
            ", ",
            { text: "manufacturing lines", className: "text-white" },
            ", and ",
            { text: "computing platforms", className: "text-white" },
            ", small signals appear long before breakdowns occur. These signals are often dismissed as noise, thresholds are crossed too late, and action comes only after damage is done."
        ]
    },
    {
        type: 'p',
        className: "text-[#9d4edd] font-semibold text-3xl py-4",
        content: ["Forsee AI exists to change that."]
    },
    {
        type: 'p',
        content: [
            "Instead of predicting failures after they become obvious, ",
            { text: "Forsee AI", className: "text-white" },
            " focuses on ",
            { text: "near-failures", className: "text-white font-medium" },
            " — subtle shifts, precursors, and ",
            { text: "risk trajectories", className: "text-white" },
            " that indicate something is about to go wrong. By analyzing how risk evolves over time, not just static values, ",
            { text: "Forsee AI", className: "text-white" },
            " gives engineers ",
            { text: "lead time", className: "text-white" },
            ", ",
            { text: "context", className: "text-white" },
            ", and ",
            { text: "clarity", className: "text-white" },
            "."
        ]
    },
    {
        type: 'p',
        content: [
            "The result is not just alerts, but ",
            { text: "understanding", className: "text-white font-medium" },
            " — what is changing, why it matters, and when to act."
        ]
    },
    {
        type: 'p',
        className: "italic text-base mt-8 border-t border-white/40 pt-8",
        content: [
            { text: "Forsee AI", className: "text-white" },
            " is designed as a ",
            { text: "decision companion", className: "text-white" },
            " for high-stakes systems, where ",
            { text: "foresight", className: "text-white" },
            " matters more than hindsight."
        ]
    }
];

export default function InfoPage() {
    return (
        <main className="min-h-screen pt-24 bg-black relative overflow-hidden font-outfit">
            <div className="fixed inset-0 w-full h-full bg-black z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

            <Boxes className="fixed inset-0" />

            <div className="relative z-30 pointer-events-none">
                {/* Hero Header for Info Page */}
                {/* Hero Header for Info Page */}
                <section className="py-16 px-6 text-center pointer-events-none">
                    <div className="text-4xl md:text-5xl font-bold mb-8 flex justify-center gap-2 inline-block">
                        <TypingText text="About" className="text-white" />
                        <TypingText text="Forsee AI" className="text-[#9d4edd]" delay={0.5} />
                    </div>

                    <div className="max-w-3xl mx-auto text-lg md:text-xl font-playfair leading-relaxed text-white/90 pointer-events-none">
                        {aboutContent.map((block, idx) => {
                            const text = block.content.map((segment) => {
                                if (typeof segment === 'string') return segment;
                                return segment.text;
                            }).join("");

                            return (
                                <TextGradientScroll
                                    key={idx}
                                    text={text}
                                    className={cn("mb-6 justify-center", block.className)}
                                />
                            );
                        })}
                    </div>
                </section>

                {/* What it does */}
                <FeaturesSection />

                {/* How it works */}
                <HowItWorksSection />

                {/* Ready to predict the future */}
                <FooterCTA />
            </div>
        </main>
    );
}
