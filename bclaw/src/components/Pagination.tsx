import { Button, ButtonGroup } from "@bcgov/design-system-react-components";
import React from "react";

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
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(selectedPage - halfVisible, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, pages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

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
        >
          First
        </Button>
      </div>
      <Button
        variant="secondary"
        onPress={() => setPage(selectedPage - 1)}
        isDisabled={selectedPage === 1}
      >
        Previous
      </Button>
      {getPageNumbers().map((pageNumber) => (
        <div className="page-btn">
          <Button
            key={pageNumber}
            variant={selectedPage === pageNumber ? "primary" : "secondary"}
            onPress={() => setPage(pageNumber)}
          >
            {pageNumber}
          </Button>
        </div>
      ))}
      <Button
        variant="secondary"
        onPress={() => setPage(selectedPage + 1)}
        isDisabled={selectedPage === pages}
      >
        Next
      </Button>
      <div className="page-btn">
        <Button
          variant="secondary"
          onPress={() => setPage(pages)}
          isDisabled={selectedPage === pages}
        >
          Last
        </Button>
      </div>
    </ButtonGroup>
  );
};

export default Pagination;
