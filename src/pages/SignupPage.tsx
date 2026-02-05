import React, { useState } from 'react';
import { Eye, EyeOff, User } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

// --- HELPER COMPONENTS (ICONS) ---

const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-2.641-.21-5.236-.611-7.743z" />
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.022 35.026 44 30.038 44 24c0-2.641-.21-5.236-.611-7.743z" />
    </svg>
);

// --- SUB-COMPONENTS ---

const GlassInputWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-2xl border border-purple-500/30 bg-white/5 backdrop-blur-sm transition-colors focus-within:border-purple-400 focus-within:bg-purple-500/10">
        {children}
    </div>
);

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const { signup, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            await signup(name, email, password);
            navigate("/");
            toast.success("Account created successfully!");
        } catch (error) {
            toast.error("Failed to create account. Please try again.");
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            await loginWithGoogle();
            navigate("/");
            toast.success("Account created successfully!");
        } catch (error) {
            toast.error("Google sign up failed.");
        }
    };

    const handleSignIn = () => {
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-black w-full">
            {/* Left column: hero image */}
            <section className="hidden md:block flex-1 relative p-4">
                <div
                    className="absolute inset-4 rounded-3xl bg-cover bg-center overflow-hidden"
                    style={{ backgroundImage: `url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80)` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-12 left-12 max-w-md">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            See failures before they exist
                        </h2>
                        <p className="text-gray-300">
                            Join thousands of enterprises using Forsee AI to predict equipment failures
                            and prevent costly downtime.
                        </p>
                    </div>
                </div>
            </section>

            {/* Right column: sign-up form */}
            <section className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="flex flex-col gap-6">
                        <h1 className="animate-element text-4xl md:text-5xl font-semibold leading-tight">
                            <span className="font-light text-white tracking-tighter">Join <span className="text-purple-400 font-semibold">Forsee AI</span></span>
                        </h1>
                        <p className="animate-element text-gray-400">Create your account and start predicting the future</p>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="animate-element">
                                <label className="text-sm font-medium text-gray-400">Full Name</label>
                                <GlassInputWrapper>
                                    <div className="relative">
                                        <input
                                            name="name"
                                            type="text"
                                            placeholder="Enter your full name"
                                            className="w-full bg-transparent text-sm p-4 pl-12 rounded-2xl focus:outline-none text-white placeholder:text-gray-500"
                                            required
                                        />
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    </div>
                                </GlassInputWrapper>
                            </div>

                            <div className="animate-element">
                                <label className="text-sm font-medium text-gray-400">Email Address</label>
                                <GlassInputWrapper>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none text-white placeholder:text-gray-500"
                                        required
                                    />
                                </GlassInputWrapper>
                            </div>

                            <div className="animate-element">
                                <label className="text-sm font-medium text-gray-400">Password</label>
                                <GlassInputWrapper>
                                    <div className="relative">
                                        <input
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Create a strong password"
                                            className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none text-white placeholder:text-gray-500"
                                            required
                                            minLength={6}
                                        />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center">
                                            {showPassword ? <EyeOff className="w-5 h-5 text-gray-500 hover:text-white transition-colors" /> : <Eye className="w-5 h-5 text-gray-500 hover:text-white transition-colors" />}
                                        </button>
                                    </div>
                                </GlassInputWrapper>
                            </div>

                            <div className="animate-element flex items-center gap-3">
                                <input type="checkbox" name="terms" className="accent-purple-500 w-4 h-4" required />
                                <span className="text-gray-400 text-sm">
                                    I agree to the <a href="#" className="text-purple-400 hover:underline">Terms of Service</a> and <a href="#" className="text-purple-400 hover:underline">Privacy Policy</a>
                                </span>
                            </div>

                            <button type="submit" className="animate-element w-full rounded-2xl bg-purple-600 py-4 font-medium text-white hover:bg-purple-500 transition-colors shadow-[0_0_20px_rgba(157,78,221,0.3)]">
                                Create Account
                            </button>
                        </form>

                        <div className="animate-element relative flex items-center justify-center">
                            <span className="w-full border-t border-gray-700"></span>
                            <span className="px-4 text-sm text-gray-500 bg-black absolute">Or continue with</span>
                        </div>

                        <button onClick={handleGoogleSignUp} className="animate-element w-full flex items-center justify-center gap-3 border border-gray-700 rounded-2xl py-4 text-white hover:bg-white/5 transition-colors">
                            <GoogleIcon />
                            Continue with Google
                        </button>

                        <p className="animate-element text-center text-sm text-gray-400">
                            Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); handleSignIn(); }} className="text-purple-400 hover:underline transition-colors">Sign In</a>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
