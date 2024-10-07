import React from "react";
import { IDocuments } from "../types/Metadata";
import { BC_LAW_DOCUMENT_URL } from "../utilities/Constants";
import Tooltip from "../assets/tooltip/ToolTip";

interface SearchResultsProps {
  documents: IDocuments | null;
  cardClickHandler: React.MouseEventHandler<HTMLDivElement>;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  documents,
  cardClickHandler,
}) => {
  if (!documents || !documents.data || documents.data.total_pages === 0)
    return null;

  return (
    <>
      <h3 style={{ margin: "1em" }}>Click on the item to view summary</h3>
      {documents.data.data.map(({ title, document_id, index_id, location }) => (
        <Tooltip tooltipText="Click to Summarize" key={document_id} position="top">
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
        </Tooltip>
      ))}
    </>
  );
};

export default SearchResults;
