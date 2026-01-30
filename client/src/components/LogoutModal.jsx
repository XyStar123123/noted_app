import {LogOut, X} from "lucide-react";

const LogoutModal = ({isOpen, onClose, onConfirm}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div
                className="relative bg-white w-full max-w-sm rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-all"
                >
                    <X size={20}/>
                </button>

                <div className="flex flex-col items-center text-center">
                    <div
                        className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 mb-6">
                        <LogOut size={32}/>
                    </div>

                    <h3 className="text-2xl font-black text-[#181818] mb-2">Sign Out?</h3>
                    <p className="text-gray-500 mb-8">
                        Are you sure you want to log out of your account?
                    </p>

                    <div className="flex w-full gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-4 px-6 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200"
                        >
                            Stay
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 py-4 px-6 rounded-xl font-bold bg-[#181818] text-white hover:bg-black transition-all shadow-lg shadow-gray-200"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;