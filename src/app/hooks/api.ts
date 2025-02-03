import useSWR from "swr";
import { PriceData } from "../types/priceData";
import { environment } from "../env/env";

const API_URL = environment.API_URL;

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`API error: ${response.statusText}`);
  return response.json();
};

export function usePriceData() {
  const { data, error, mutate, isValidating } = useSWR(API_URL, fetcher);

  // Transform data into StockData format if available
    const priceData: PriceData | null = data ? data.price_data : null;

  return { priceData, error, mutate, isValidating };
}
