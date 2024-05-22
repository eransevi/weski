import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { DestinationItem } from '../types';

interface DestinationProps {
  value: DestinationItem | undefined;
  destinations: DestinationItem[];
  onChange: (event: SelectChangeEvent) => void;
}

const Destination: React.FC<DestinationProps> = ({ value, destinations, onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="destination-label">Destination</InputLabel>
      <Select labelId="destination-label" value={value?.name} onChange={onChange} label="Destination">
      {destinations.map(item => (
          <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Destination;
