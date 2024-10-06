import { Button, ButtonGroup } from "@bcgov/design-system-react-components";
import React from "react";

interface PageProps {
    pages: number;
    selectedPage: number;
    setPage: Function;
}

const Pagination: React.FC<PageProps> = ({ pages, selectedPage, setPage }) => {

    return (
        <ButtonGroup
            alignment="start"
            ariaLabel="Buttons for pages from search result"
            orientation="horizontal"
        >
            {[...Array(pages).keys()].map((v) => (
                <Button 
                    key={v + 1}
                    variant={selectedPage === v + 1 ? "primary" : "secondary"}
                    onPress={() => setPage(v + 1)}
                >
                    {v + 1}
                </Button>
            ))}
        </ButtonGroup>
    );
}

export default Pagination;