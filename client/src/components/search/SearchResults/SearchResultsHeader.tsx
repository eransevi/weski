import React from 'react';
import { Box, Typography } from '@mui/material';

interface SearchResultsHeaderProps {
  resultCount: number;
  destination: string;
  startDate: string;
  endDate: string;
  groupSize: number;
}

const SearchResultsHeader: React.FC<SearchResultsHeaderProps> = ({
  resultCount,
  destination,
  startDate,
  endDate,
  groupSize,
}) => {
  return (
    <Box sx={{ marginBottom: '20px' }}>
      <Typography variant="h4" component="h2">
        Select your ski trip
      </Typography>
      <Typography variant="subtitle1" component="p">
        {resultCount} results for {destination} from {startDate} to {endDate} for a group of {groupSize}
      </Typography>
    </Box>
  );
};

export default SearchResultsHeader;
