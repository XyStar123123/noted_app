import { CheckCircle, XCircle, X } from "lucide-react";

const FlashMessage = ({ message, type, onClose }) => {
    if (!message) return null;

    return (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border transition-all animate-in fade-in slide-in-from-top-5 duration-300 ${
            type === "success"
                ? "bg-white border-green-100 text-green-600 shadow-green-100/50"
                : "bg-white border-red-100 text-red-600 shadow-red-100/50"
        }`}>
            {type === "success" ? <CheckCircle size={20} className="text-green-500" /> : <XCircle size={20} className="text-red-500" />}
            <p className="font-bold text-sm tracking-tight">{message}</p>
            <button onClick={onClose} className="ml-4 p-1 hover:bg-gray-50 rounded-full transition-colors">
                <X size={16} className="text-gray-400" />
            </button>
        </div>
    );
};

export default FlashMessage;