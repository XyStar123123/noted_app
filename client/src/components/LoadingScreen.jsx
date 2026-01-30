import { PenTool } from "lucide-react";

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 z-[999] bg-gray-50/80 backdrop-blur-md flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center">
                {/* Outer Spinning Ring */}
                <div className="w-24 h-24 border-4 border-gray-200 border-t-[#181818] rounded-full animate-spin"></div>

                {/* Centered Logo Box */}
                <div className="absolute bg-[#181818] p-4 rounded-2xl shadow-2xl animate-pulse">
                    <PenTool
                        className="w-8 h-8 text-white stroke-[2.5px] rotate-[180deg]"
                    />
                </div>
            </div>

            {/* Loading Text */}
            <div className="mt-8 flex flex-col items-center">
                <span className="text-xl font-black text-[#181818] tracking-tight">Noted</span>
                <p className="text-gray-400 text-sm font-medium mt-1 animate-bounce">
                    Organizing your thoughts...
                </p>
            </div>
        </div>
    );
};

export default LoadingScreen;