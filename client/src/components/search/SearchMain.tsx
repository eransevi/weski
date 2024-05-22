import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar/SearchBar";
import SearchResults from "./SearchResults/SearchResults";
import { Container } from "@mui/material";
import { handleSearch } from "../../api/hotelsApi";
import { HotelsQueryApiResponse } from "./types";
import { SearchResultItemProps } from "./SearchResults/SearchResultItem";

const SearchMain: React.FC = () => {
  const [destination, setDestination] = useState<string>('La Plagne');
  const [startDate, setStartDate] = useState<string>('03/04/2025');
  const [endDate, setEndDate] = useState<string>('03/11/2025');
  const [groupSize, setGroupSize] = useState<number>(4);

  const sampleSearchResultItemProps = [
    {
      image:
        'https://www.powderwhite.com/managed_images/properties/main_images/NIN_chalet-nina-3.jpg"',
      name: "Chalet Nina",
      rating: "3",
      destination: "La Plagne",
      price: "273.34",
    },
    {
      image:
        "https://www.powderwhite.com/managed_images/properties/main_images/STABAN56_gallery-banyan.jpg",
      name: "Hotel Banyan",
      rating: "5",
      destination: "La Plagne",
      price: "328.34",
    },
  ];
  const [results, setResults] = useState<Array<SearchResultItemProps>>(
    sampleSearchResultItemProps
  );

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000");

    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
      const newResult: HotelsQueryApiResponse = JSON.parse(event.data);
      const searchResults = processResults(newResult);
      setResults((prevResults) => [...prevResults, ...searchResults]);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // return () => {
    //   ws.close();
    // };
  }, []);

  const processResults = (
    results: HotelsQueryApiResponse
  ): Array<SearchResultItemProps> => {
    return results.body.accommodations.map((result) => {
      return {
        image: result.HotelDescriptiveContent.Images[0].URL,
        name: result.HotelName,
        rating: result.HotelInfo.Rating,
        destination: "", // TODO: Expose destination from SearchBar (or convert from hotel position),
        price: result.PricesInfo.AmountAfterTax,
      };
    });
  };

  const onSearchHandler = async (query: any) => {
      setDestination(query.ski_site);
      setStartDate(query.from_date);
      setEndDate(query.to_date);
      setGroupSize(query.group_size);

      handleSearch(query);
  };

  return (
    <Container>
      <SearchBar onSearch={onSearchHandler} />
      <SearchResults
        results={results}
        destination={destination}
        startDate={startDate}
        endDate={endDate}
        groupSize={groupSize}
      />
    </Container>
  );
};

export default SearchMain;
