import React from "react";
import { IDocuments } from "../types/Metadata";
import { BC_LAW_DOCUMENT_URL } from "../utilities/Constants";

interface SearchResultsProps {
  documents: IDocuments | null;
  cardClickHandler: React.MouseEventHandler<HTMLDivElement>;
}

const SearchResults: React.FC<SearchResultsProps> = ({ documents, cardClickHandler }) => {
  if (!documents || !documents.data || documents.data.total_pages === 0) return null;

  return (
    <>
      {documents.data.data.map(({ title, document_id, index_id, location }) => (
        <div
          key={`${document_id}_${index_id}`}
          id={`${document_id}@@${index_id}@@${title}`}
          className="meta-container"
          onClick={cardClickHandler}
        >
          <h3>{title}</h3>
          <div>
            <a
              href={`${BC_LAW_DOCUMENT_URL}/document/id/complete/${index_id}/${document_id}`}
              rel="noreferrer"
              target="_blank"
              onClick={(e) => e.stopPropagation()}
            >
              {location}
            </a>
          </div>
        </div>
      ))}
    </>
  );
};

export default SearchResults;