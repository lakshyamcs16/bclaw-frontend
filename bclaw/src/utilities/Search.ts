import { IDocuments } from "../types/Metadata";
import { API_BASE_URL, FETCH_TIMEOUT_DURATION_MS } from "./Constants";

/**
 * Fetches a list of documents that matches the search term
 *
 * @param jurisdiction - The jurisdiction to search in
 * @param query - The term to search
 * @param page  - The page number
 * @returns A promise that resolves to an array of documents metadata
 */
export const fetchDocumentsMetadata = async (
  jurisdiction: string,
  query: string,
  page: number
): Promise<IDocuments> => {
  const response = await fetch(
    `${API_BASE_URL}/search/${jurisdiction}?query=${query}&page=${page}`,
    { signal: AbortSignal.timeout(FETCH_TIMEOUT_DURATION_MS) }
  );
  return await response.json();
};
