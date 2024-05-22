import React from "react";
import { Box } from "@mui/material";
import SearchResultsHeader from "./SearchResultsHeader";
import SearchResultItem, { SearchResultItemProps } from "./SearchResultItem";

interface SearchResultsProps {
  results: Array<SearchResultItemProps>;
  destination: string;
  startDate: string;
  endDate: string;
  groupSize: number;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  destination,
  startDate,
  endDate,
  groupSize,
}) => {
  return (
    <Box
      sx={{
        maxHeight: "600px",
        overflowY: "auto",
        width: "90%",
        margin: "auto",
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <SearchResultsHeader
        resultCount={results.length}
        destination={destination}
        startDate={startDate}
        endDate={endDate}
        groupSize={groupSize}
      />
      {results.map((item, index) => (
        <SearchResultItem
          key={index}
          image={item.image}
          name={item.name}
          rating={item.rating}
          destination={destination}
          price={item.price}
        />
      ))}
    </Box>
  );
};

export default SearchResults;
