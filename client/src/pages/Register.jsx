import { PenTool, Mail, Lock, User, ArrowRight, Github } from "lucide-react";
import {useRegister} from "../hooks/useRegister.js";

const Register = () => {
    const { formData, handleChange, submitRegister, error } = useRegister();
    return (
        <>
            {/* Left Side: Branding/Visual (Fixed/Hidden on mobile) */}
            <div className="hidden lg:flex w-1/2 bg-[#181818] p-12 flex-col justify-between text-white">
                <div className="flex items-center gap-2">
                    <div className="bg-white p-1.5 rounded-lg">
                        <PenTool className="w-6 h-6 text-[#181818] stroke-[2.5px] rotate-[180deg]" />
                    </div>
                    <span className="text-2xl font-black tracking-tight">Noted</span>
                </div>

                <div>
                    <h2 className="text-5xl font-bold leading-tight mb-6">
                        Start your <br />
                        <span className="text-gray-500 font-serif italic text-4xl font-normal">productive</span> journey.
                    </h2>
                    <p className="text-gray-400 text-lg max-w-md">
                        Join thousands of users who have mastered their schedule with our minimal, speed-focused task tracker.
                    </p>
                </div>

                <div className="text-sm text-gray-500">
                    &copy; 2026 Noted Productivity Systems. All rights reserved.
                </div>
            </div>

            {/* Right Side: Scrollable Form Container */}
            <div className="w-full lg:w-1/2 h-screen overflow-y-auto bg-gray-50">
                <div className="min-h-full flex items-center justify-center p-8 lg:p-12">
                    <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl shadow-black/5">
                        <div className="mb-10 text-center lg:text-left">
                            <h1 className="text-3xl font-black text-[#181818] mb-2">Create Account</h1>
                            <p className="text-gray-500 font-medium">Join us and start organizing today.</p>
                        </div>

                        <form className="space-y-5" onSubmit={submitRegister}>
                            {error && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold border border-red-100 animate-in fade-in slide-in-from-top-1">
                                    {error}
                                </div>
                            )}
                            {/* Username Input */}
                            <div>
                                <label className="block text-xs font-bold text-[#181818] uppercase tracking-widest mb-2 px-1">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none transition-all focus:bg-white focus:border-[#181818] focus:ring-4 focus:ring-[#18181870]"
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div>
                                <label className="block text-xs font-bold text-[#181818] uppercase tracking-widest mb-2 px-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        type="email"
                                        placeholder="name@company.com"
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none transition-all focus:bg-white focus:border-[#181818] focus:ring-4 focus:ring-[#18181870]"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-xs font-bold text-[#181818] uppercase tracking-widest mb-2 px-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none transition-all focus:bg-white focus:border-[#181818] focus:ring-4 focus:ring-[#18181870]"
                                    />
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-xs font-bold text-[#181818] uppercase tracking-widest mb-2 px-1">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                                    <input
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none transition-all focus:bg-white focus:border-[#181818] focus:ring-4 focus:ring-[#18181870]"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#181818] text-white py-4 mt-2 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#2A2A2A] transition-all shadow-lg active:scale-[0.98]"
                            >
                                Create Account
                                <ArrowRight size={18} />
                            </button>
                        </form>

                        <div className="mt-8">
                            <div className="relative flex items-center justify-center mb-8">
                                <div className="w-full border-t border-gray-100"></div>
                                <span className="absolute bg-white px-4 text-xs text-gray-400 font-bold uppercase tracking-widest">Or sign up with</span>
                            </div>

                            <button className="w-full py-4 border border-gray-200 rounded-2xl flex items-center justify-center gap-3 font-bold text-[#181818] hover:bg-gray-50 transition-all active:scale-[0.98]">
                                <Github size={20} />
                                GitHub
                            </button>
                        </div>

                        <p className="mt-10 text-center text-gray-500 text-sm font-medium">
                            Already have an account? <a href="/login" className="text-[#181818] font-bold hover:underline">Sign In</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;