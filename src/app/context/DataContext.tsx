"use client"; // Add this at the top as code running client side

import React, { createContext, useContext, useState } from "react";
import { PriceData } from "../types/priceData";

interface DataContextType {
    data: PriceData | null;
    setData: (data: PriceData) => void;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<PriceData | null>(null);

    return (
    <DataContext.Provider value={{ data, setData }}>
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
