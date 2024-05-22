import React from 'react';
import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'

interface StartEndDateProps {
  startDate: any;
  endDate: any; //Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
}

const StartEndDate: React.FC<StartEndDateProps> = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={onStartDateChange}
          // renderInput={(params: any) => <TextField {...params} fullWidth />}
        />
        <Box sx={{ mx: 2 }}> to </Box>
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={onEndDateChange}
          // renderInput={(params: any) => <TextField {...params} fullWidth />}
        />
      </Box>
      </LocalizationProvider>
  );
};

export default StartEndDate;
