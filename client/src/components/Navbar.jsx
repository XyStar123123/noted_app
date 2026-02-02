import { LogOut, PenTool, LayoutDashboard, ListChecks, History, UserCircle } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFlash } from "../context/FlashContext.jsx";
import LogoutModal from "./LogoutModal.jsx";
import { useState } from "react";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { showMessage } = useFlash();
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

    const handleLogoutConfirm = () => {
        localStorage.removeItem("noted_token");
        showMessage("Logged out successfully!", "success");
        setLogoutModalOpen(false);
        navigate("/");
        window.location.reload();
    };

    const navLinks = [
        { name: "Home", href: "/", icon: <LayoutDashboard size={20} /> },
        { name: "Todo", href: "/todo", icon: <ListChecks size={20} /> },
        { name: "History", href: "/history", icon: <History size={20} /> },
        { name: "Profile", href: "/profile", icon: <UserCircle size={20} /> },
    ];

    return (
        <>
            <LogoutModal
                isOpen={isLogoutModalOpen}
                onClose={() => setLogoutModalOpen(false)}
                onConfirm={handleLogoutConfirm}
            />

            {/* --- TOP NAVBAR (Logo & Logout only on Desktop) --- */}
            <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
                <header className="lg:max-w-3/4 m-auto py-4 px-5 flex items-center justify-between">

                    {/* Brand / Logo */}
                    <Link to="/" className="flex items-center gap-2 text-[#181818] group cursor-pointer">
                        <div className="bg-[#181818] p-1.5 rounded-lg group-hover:rotate-[-10deg] transition-transform duration-200">
                            <PenTool className="w-5 h-5 md:w-6 md:h-6 text-white stroke-[2.5px] rotate-[180deg]" />
                        </div>
                        <span className="text-xl md:text-2xl font-black tracking-tight">Noted</span>
                    </Link>

                    {/* Desktop Center Navigation */}
                    <nav className="hidden md:flex items-center gap-1 bg-gray-50 p-1 rounded-2xl border border-gray-100">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${isActive
                                        ? "bg-white text-[#181818] shadow-sm ring-1 ring-black/5"
                                        : "text-gray-500 hover:text-[#181818] hover:bg-white/50"
                                        }`}
                                >
                                    {link.icon}
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Desktop Logout Button */}
                    <button
                        onClick={() => setLogoutModalOpen(true)}
                        className="group flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-xl font-bold text-sm bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm"
                    >
                        <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </header>
            </div>

            {/* --- MOBILE BOTTOM NAVBAR (Visible only on small screens) --- */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 px-6 py-3 z-50 flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                {navLinks.map((link) => {
                    const isActive = location.pathname === link.href;
                    return (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={`flex flex-col items-center gap-1 transition-all duration-200 ${isActive ? "text-[#181818]" : "text-gray-400"
                                }`}
                        >
                            <div className={`p-2 rounded-xl transition-all ${isActive ? "bg-gray-100" : ""}`}>
                                {link.icon}
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest">{link.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </>
    );
};

export default Navbar;