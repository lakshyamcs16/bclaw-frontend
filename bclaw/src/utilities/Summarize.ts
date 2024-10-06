import { ISummaryResponse } from "../types/Metadata";
import { API_BASE_URL, FETCH_TIMEOUT_DURATION_MS } from "./Constants";

/**
 * Fetches a summary of the document selected
 *
 * @param document_id - The document to summarize
 * @param jurisdiction - The jurisdiction to search in
 * @returns A promise that resolves to contain the url and summary of the document
 */
export const fetchDocumentSummary = async (
  document_id: string,
  jurisdiction: string,
): Promise<ISummaryResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/summarize/${jurisdiction}/${document_id}`,
    { signal: AbortSignal.timeout(FETCH_TIMEOUT_DURATION_MS) }
  );
  return await response.json();
};
