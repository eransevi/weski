import React, { useEffect, useState } from "react";
import { Box, Button, Container } from "@mui/material";
import Destination from "./Destination";
import GroupSize from "./GroupSize";
import StartEndDate from "./StartEndDate";
import { DestinationItem, HotelsAPIQuery } from "../types";
import logo from "../../../assets/logo.svg";
import destinationItems from "../../../assets/destinations";

interface SearchBarProps {
  onSearch: (query: HotelsAPIQuery) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [destination, setDestination] = useState<DestinationItem>();
  const [groupSize, setGroupSize] = useState<number>(4);
  const [startDate, setStartDate] = useState<Date | null>(new Date("03/04/2025"));
  const [endDate, setEndDate] = useState<Date | null>(new Date("03/11/2025"));
  const [isSearchDisabled, setIsSearchDisabled] = useState<boolean>(true);

  useEffect(() => {
    // Check if all required fields have values
    if (destination && groupSize && startDate && endDate) {
      setIsSearchDisabled(false);
    } else {
      setIsSearchDisabled(true);
    }
  }, [destination, groupSize, startDate, endDate]);

  const handleSearch = () => {
    const query: HotelsAPIQuery = {
      ski_site: 1, // TODO: get proper ski site id from selected destination
      from_date: (startDate as Date).toLocaleDateString("en-US"),
      to_date: (endDate as Date).toLocaleDateString("en-US"),
      group_size: groupSize,
    };
    onSearch(query);
  };

  return (
    <Container maxWidth="lg" sx={{ width: "90%", marginTop: "20px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
          backgroundColor: "#f0f0f0",
          borderRadius: "8px",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ height: "40px", marginRight: "20px" }}
        />
        <Box sx={{ flex: 1, marginRight: "20px" }}>
          <Destination
            value={destination}
            destinations={destinationItems}
            onChange={(e: any) => setDestination(e.target.value)}
          />
        </Box>
        <Box sx={{ flex: 1, marginRight: "20px" }}>
          <GroupSize
            value={groupSize}
            onChange={(e: any) => setGroupSize(e.target.value)}
          />
        </Box>
        <Box sx={{ flex: 1, marginRight: "20px" }}>
          <StartEndDate
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={isSearchDisabled}
        >
          Search
        </Button>
      </Box>
    </Container>
  );
};

export default SearchBar;
