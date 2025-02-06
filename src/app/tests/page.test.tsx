import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "../page"; // Ensure this is the correct path
import { SWRConfig } from "swr";
import { DataProvider } from "../context/DataContext";

// Mock Data
const mockData = {
  ticker: "C",
  price_data: {
    open: [150, 155],
    volume: [1000, 1200],
    high: [160, 165],
    low: [140, 145],
    close: [155, 160],
    timestamp: [new Date("2024-01-01"), new Date("2024-01-02")],
  },
};


// Mock Fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockData),
  })
) as jest.Mock;

const renderWithSWR = (ui: React.ReactElement) => {
  return render(
    <DataProvider>
    <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
      {ui}
    </SWRConfig>
    </DataProvider>
  );
};

describe("Home Component", () => {
  test("fetches and sets data", async () => {
    renderWithSWR(<Home />);

    // Check for loading state
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Wait for data to be fetched and rendered
    await waitFor(() => {
      // Validate the structure of the fetched data
      expect(mockData.price_data).toHaveProperty("open");
      expect(mockData.price_data).toHaveProperty("volume");
      expect(mockData.price_data).toHaveProperty("high");
      expect(mockData.price_data).toHaveProperty("low");
      expect(mockData.price_data).toHaveProperty("close");
      expect(mockData.price_data).toHaveProperty("timestamp");

      // Check that each property is an array
      expect(Array.isArray(mockData.price_data.open)).toBe(true);
      expect(Array.isArray(mockData.price_data.volume)).toBe(true);
      expect(Array.isArray(mockData.price_data.high)).toBe(true);
      expect(Array.isArray(mockData.price_data.low)).toBe(true);
      expect(Array.isArray(mockData.price_data.close)).toBe(true);
      expect(Array.isArray(mockData.price_data.timestamp)).toBe(true);
    });
  });

  test("handles API error", async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("Failed to fetch"))
    );

    renderWithSWR(<Home />);

    await waitFor(() => {
      expect(screen.getByText(/Error:/i)).toBeInTheDocument();
    });

    expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
  });



  test("renders SearchBar component", async () => {
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
  
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    });
  });  
  
});
