import { History as HistoryIcon, Trash2, CheckCircle, AlertCircle, Trash, Loader2, Calendar } from "lucide-react";
import { useHistory } from "../hooks/useHistory.js";

const History = () => {
    const { history, loading, deleteHistoryItem } = useHistory();

    const getReasonStyle = (reason) => {
        switch (reason) {
            case 'completed': return "bg-green-50 text-green-600 border-green-100";
            case 'expired': return "bg-red-50 text-red-600 border-red-100";
            case 'created': return "bg-blue-50 text-blue-600 border-blue-100"; // New style
            default: return "bg-gray-50 text-gray-600 border-gray-100";
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader2 className="animate-spin text-gray-300" size={40} />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50/50 p-8">
            <div className="md:max-w-3/4 m-auto">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-[#181818] flex items-center gap-3">
                        <HistoryIcon className="text-gray-400" /> Activity History
                    </h1>
                    <p className="text-gray-500">View your journey and past task outcomes.</p>
                </header>

                {history.length > 0 ? (
                    <div className="grid gap-4">
                        {history.map((item) => (
                            <HistoryCard
                                key={item._id}
                                item={item}
                                onRemove={deleteHistoryItem}
                                getStyle={getReasonStyle}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyHistory />
                )}
            </div>
        </main>
    );
};

// Sub-component for cleaner mapping
const HistoryCard = ({ item, onRemove, getStyle }) => (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group transition-all hover:border-gray-200">
        <div className="flex items-center gap-4">
            <div className={`p-2 rounded-full border ${getStyle(item.archiveReason)}`}>
                {item.archiveReason === 'completed' ? <CheckCircle size={18} /> :
                    item.archiveReason === 'expired' ? <AlertCircle size={18} /> : <Trash size={18} />}
            </div>
            <div>
                <h3 className="font-bold text-[#181818]">{item.title}</h3>
                <div className="flex items-center gap-3 mt-1 text-gray-400">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded">
                        {item.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs">
                        <Calendar size={12} />
                        {new Date(item.archivedAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                    </span>
                </div>
            </div>
        </div>

        <div className="flex items-center gap-4">
            <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase border ${getStyle(item.archiveReason)}`}>
                {item.archiveReason}
            </span>
            <button
                onClick={() => onRemove(item._id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            >
                <Trash2 size={18} />
            </button>
        </div>
    </div>
);

const EmptyHistory = () => (
    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center m-auto mb-4">
            <HistoryIcon className="text-gray-300" />
        </div>
        <p className="text-gray-400 font-medium">Your history is currently empty.</p>
    </div>
);

export default History;