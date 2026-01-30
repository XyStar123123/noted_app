import { LogOut, PenTool, LayoutDashboard, ListChecks, UserCircle } from "lucide-react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { useFlash } from "../context/FlashContext.jsx";
import LogoutModal from "./LogoutModal.jsx";
import {useState} from "react";

const Navbar = () => {
    // Helper to simulate path detection (you'd use useLocation() in a real app)
    const location = useLocation()
    const navigate = useNavigate()
    const { showMessage } = useFlash()

    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

    const handleLogoutConfirm = () => {
        localStorage.removeItem("noted_token");
        showMessage("Logged out successfully. See you next time!", "success");
        setLogoutModalOpen(false);

        // Use navigate for a clean exit
        navigate("/");
        // If your app needs a refresh to reset the private route logic:
        window.location.reload();
    };

    const navLinks = [
        { name: "Home", href: "/", icon: <LayoutDashboard size={18} /> },
        { name: "Todo", href: "/todo", icon: <ListChecks size={18} /> },
        { name: "Profile", href: "/profile", icon: <UserCircle size={18} /> },
    ];

    return (
        <>
            <LogoutModal
                isOpen={isLogoutModalOpen}
                onClose={() => setLogoutModalOpen(false)}
                onConfirm={handleLogoutConfirm}
            />
            <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
                <header className="max-w-3/4 m-auto py-4 px-5 flex items-center justify-between">

                    {/* Brand / Logo */}
                    <div className="flex items-center gap-2 text-[#181818] group cursor-pointer">
                        <div className="bg-[#181818] p-1.5 rounded-lg group-hover:rotate-[-10deg] transition-transform duration-200">
                            <PenTool className="w-6 h-6 text-white stroke-[2.5px] rotate-[180deg]" />
                        </div>
                        <span className="text-2xl font-black tracking-tight">Noted</span>
                    </div>

                    {/* Navigation Links */}
                    <nav className="hidden md:flex items-center gap-1 bg-gray-50 p-1 rounded-2xl border border-gray-100">
                        {navLinks.map((link) => {
                            const isActive = location === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                                        isActive
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

                    {/* Logout Action */}
                    <button
                        onClick={() => setLogoutModalOpen(true)}
                        className="group flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm shadow-red-100"
                    >
                        <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Logout</span>
                    </button>

                </header>
            </div>
        </>
    );
};

export default Navbar;