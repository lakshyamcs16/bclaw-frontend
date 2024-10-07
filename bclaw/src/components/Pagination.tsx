import { Button, ButtonGroup } from "@bcgov/design-system-react-components";
import React from "react";

// Props interface for Pagination component
interface PageProps {
  pages: number;
  selectedPage: number;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PageProps> = ({
  pages,
  selectedPage = 0,
  setPage,
}) => {
  // Function to calculate and return the page numbers to be displayed
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    // Calculate the range of page numbers to display
    let startPage = Math.max(selectedPage - halfVisible, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, pages);

    // Adjust the range if we're near the beginning or end of the page list
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    // Generate the array of page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <ButtonGroup
      alignment="start"
      ariaLabel="Pagination for search results"
      orientation="horizontal"
    >
      <div className="page-btn">
        <Button
          variant="secondary"
          onPress={() => setPage(1)}
          isDisabled={selectedPage === 1}
          aria-label="Go to first page"
        >
          First
        </Button>
      </div>
      <Button
        variant="secondary"
        onPress={() => setPage(selectedPage - 1)}
        isDisabled={selectedPage === 1}
        aria-label="Go to previous page"
      >
        Previous
      </Button>
      {getPageNumbers().map((pageNumber) => (
        <div className="page-btn" key={pageNumber}>
          <Button
            variant={selectedPage === pageNumber ? "primary" : "secondary"}
            onPress={() => setPage(pageNumber)}
            aria-label={`Go to page ${pageNumber}`}
            aria-current={selectedPage === pageNumber ? "page" : undefined}
          >
            {pageNumber}
          </Button>
        </div>
      ))}
      <Button
        variant="secondary"
        onPress={() => setPage(selectedPage + 1)}
        isDisabled={selectedPage === pages}
        aria-label="Go to next page"
      >
        Next
      </Button>
      <div className="page-btn">
        <Button
          variant="secondary"
          onPress={() => setPage(pages)}
          isDisabled={selectedPage === pages}
          aria-label="Go to last page"
        >
          Last
        </Button>
      </div>
    </ButtonGroup>
  );
};

export default Pagination;