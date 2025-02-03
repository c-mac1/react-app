"use client"; // Add this at the top as code running client side
import React from "react";
import { createContext, useContext, useState } from "react";
import { PriceData } from "../types/priceData";

interface DataContextType {
    data: PriceData | null;
    setData: (data: PriceData) => void;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children, value }: { children: React.ReactNode, value?: DataContextType }) => {
    const [data, setData] = useState<PriceData | null>(null);

    // If `value` is passed (for testing), use it; otherwise, use the internal state
     const contextValue = value || { data, setData };

    return (
    <DataContext.Provider value={contextValue}>
        {children}
    </DataContext.Provider>);
};


export const useDataContext = (): DataContextType => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useDataContext must be used within a DataProvider");
    }
    return context; 
};
