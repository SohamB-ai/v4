import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { SignInPage, Testimonial } from "@/components/ui/sign-in";
import { toast } from "sonner";

const testimonials: Testimonial[] = [
    {
        avatarSrc: "https://randomuser.me/api/portraits/women/57.jpg",
        name: "Sarah Chen",
        handle: "@sarahops",
        text: "Forsee AI predicted our turbine failure 3 weeks early. Saved us $2M in downtime costs."
    },
    {
        avatarSrc: "https://randomuser.me/api/portraits/men/64.jpg",
        name: "Marcus Johnson",
        handle: "@marcuseng",
        text: "The predictive accuracy is incredible. Our maintenance team now works proactively, not reactively."
    },
    {
        avatarSrc: "https://randomuser.me/api/portraits/men/32.jpg",
        name: "David Martinez",
        handle: "@davidmaint",
        text: "Best investment we made for our fleet operations. Equipment uptime increased by 40%."
    },
];

export default function LoginPage() {
    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            await login(email, password);
            navigate(from, { replace: true });
            toast.success("Welcome back!");
        } catch (error) {
            toast.error("Failed to sign in. Please try again.");
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await loginWithGoogle();
            navigate(from, { replace: true });
            toast.success("Welcome back!");
        } catch (error) {
            toast.error("Google sign in failed.");
        }
    };

    const handleResetPassword = () => {
        toast.info("Password reset functionality coming soon.");
    };

    const handleCreateAccount = () => {
        navigate("/signup");
    };

    return (
        <SignInPage
            title={<span className="font-light text-white tracking-tighter">Welcome back to <span className="text-purple-400 font-semibold">Forsee AI</span></span>}
            description="Sign in to access your predictive intelligence dashboard"
            heroImageSrc="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80"
            testimonials={testimonials}
            onSignIn={handleSignIn}
            onGoogleSignIn={handleGoogleSignIn}
            onResetPassword={handleResetPassword}
            onCreateAccount={handleCreateAccount}
        />
    );
}
