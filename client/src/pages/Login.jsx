import { PenTool, Mail, Lock, ArrowRight, Github, Loader2 } from "lucide-react";
import { useLogin } from "../hooks/useLogin.js";

const Login = () => {
    const { formData, handleChange, submitLogin, error, isLoading } = useLogin();

    return (
        <>
            {/* Left Side: Branding (Remains the same) */}
            <div className="hidden lg:flex w-1/2 bg-[#181818] p-12 flex-col justify-between text-white">
                <div className="flex items-center gap-2">
                    <div className="bg-white p-1.5 rounded-lg">
                        <PenTool className="w-6 h-6 text-[#181818] stroke-[2.5px] rotate-[180deg]" />
                    </div>
                    <span className="text-2xl font-black tracking-tight">Noted</span>
                </div>
                <div>
                    <h2 className="text-5xl font-bold leading-tight mb-6">
                        Organize your <br />
                        <span className="text-gray-500 font-serif italic text-4xl font-normal">chaotic</span> thoughts.
                    </h2>
                    <p className="text-gray-400 text-lg max-w-md">The minimal todo-tracking app designed for clarity and speed.</p>
                </div>
                <div className="text-sm text-gray-500">&copy; 2026 Noted Productivity Systems.</div>
            </div>

            {/* Right Side: Login Form */}
            <div className={'w-full lg:w-1/2 overflow-auto bg-gray-50'}>
                <div className="min-h-full flex items-center justify-center p-8">
                    <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl shadow-black/5">
                        <div className="mb-10 text-center lg:text-left">
                            <h1 className="text-3xl font-black text-[#181818] mb-2">Welcome Back</h1>
                            <p className="text-gray-500 font-medium">Please enter your details to sign in.</p>
                        </div>

                        {/* Login Form with onSubmit */}
                        <form className="space-y-6" onSubmit={submitLogin}>
                            {error && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold border border-red-100 animate-in fade-in slide-in-from-top-1">
                                    {error}
                                </div>
                            )}

                            {/* Email Input */}
                            <div>
                                <label className="block text-xs font-bold text-[#181818] uppercase tracking-widest mb-2 px-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        type="email"
                                        required
                                        placeholder="name@company.com"
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none transition-all focus:bg-white focus:border-[#181818] focus:ring-4 focus:ring-[#18181870]"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-xs font-bold text-[#181818] uppercase tracking-widest mb-2 px-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none transition-all focus:bg-white focus:border-[#181818] focus:ring-4 focus:ring-[#18181870]"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm px-1">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 accent-[#181818] rounded border-gray-300" />
                                    <span className="text-gray-600 group-hover:text-black transition-colors font-medium">Remember me</span>
                                </label>
                                <a href="#" className="text-[#181818] font-bold hover:underline">Forgot Password?</a>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#181818] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#2A2A2A] transition-all shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                    <>
                                        Sign In
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-gray-500 text-sm font-medium">
                                Don't have an account? <a href="/register" className="text-[#181818] font-bold hover:underline">Create account</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;