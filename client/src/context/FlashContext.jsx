import React, { createContext, useState, useContext, useCallback } from "react";

const FlashContext = createContext();

export const FlashProvider = ({ children }) => {
    const [flash, setFlash] = useState({ message: "", type: "success" });

    // useCallback prevents unnecessary re-renders
    const showMessage = useCallback((message, type = "success") => {
        setFlash({ message, type });
        // Auto-hide after 3 seconds
        setTimeout(() => {
            setFlash({ message: "", type: "success" });
        }, 3000);
    }, []);

    const clearMessage = () => setFlash({ message: "", type: "success" });

    return (
        <FlashContext.Provider value={{ flash, showMessage, clearMessage }}>
            {children}
        </FlashContext.Provider>
    );
};

export const useFlash = () => {
    const context = useContext(FlashContext);
    if (!context) {
        throw new Error("useFlash must be used within a FlashProvider");
    }
    return context;
};