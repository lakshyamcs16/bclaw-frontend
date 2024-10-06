import React from "react";
import { InlineAlert, Modal, TextField, Select } from "@bcgov/design-system-react-components";
import SearchIcon from "../assets/icons/SearchIcon";
import SearchResults from "../components/SearchResults";
import Summary from "../components/Summary";
import SearchLoader from "../components/SearchLoader";
import Pagination from "../components/Pagination";
import { useSearch } from "../hooks/useSearch";
import { useSummary } from "../hooks/useSummary";

const Search: React.FC = () => {
  const {
    query, setQuery,
    page,
    documents,
    error, setError,
    info, setInfo,
    isLoading,
    handleKeyEvent,
    handleSelect,
    handlePagination
  } = useSearch();

  const {
    isModalOpen, setIsModalOpen,
    summaryContent, setSummaryContent,
    isSummaryLoading,
    cardClickHandler
  } = useSummary();

  return (
    <div className="content-container">
      <div className="search-container">
        <TextField
          label="Enter a term to search the titles"
          type="search"
          className="input-container"
          size="medium"
          iconLeft={<SearchIcon width="12px" height="12px" />}
          isRequired
          minLength={1}
          maxLength={20}
          value={query}
          onChange={setQuery}
          onKeyUp={handleKeyEvent}
          aria-describedby="search-instructions"
        />
        <div className="search-results">
          <SearchResults
            documents={documents}
            cardClickHandler={cardClickHandler}
          />
          {renderPagination()}
          {error && (
            <InlineAlert
              description={error}
              onClose={() => setError(null)}
              variant="danger"
              isCloseable
            />
          )}
          {info && (
            <InlineAlert
              description={info}
              onClose={() => setInfo(null)}
              variant="info"
              isCloseable
            />
          )}
          {isLoading && <SearchLoader />}
        </div>
      </div>
      <div className="dropdown-container">
        <Select
          label="Select Jurisdiction"
          size="medium"
          items={[
            { id: "statreg", label: "Public Statutes and Regulations" },
            { id: "psl", label: "Private, Special and Local Statutes and Regulations" },
          ]}
          isRequired
          defaultSelectedKey="statreg"
          onSelectionChange={handleSelect}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        isDismissable
        shouldCloseOnInteractOutside={() => {
          setSummaryContent(null);
          setIsModalOpen(false);
          return true;
        }}
      >
        <Summary
          title={summaryContent?.title || ""}
          summary={summaryContent?.summary || ""}
          url={summaryContent?.url || ""}
          time_taken={summaryContent?.time_taken || 0}
          isSummaryLoading={isSummaryLoading}
        />
      </Modal>
    </div>
  );

  function renderPagination() {
    if (!documents || !documents.data || documents.data.total_pages === 0) return null;
    return (
      <Pagination
        pages={documents.data.total_pages}
        selectedPage={page}
        setPage={handlePagination}
      />
    );
  }
};

export default Search;