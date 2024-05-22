import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface GroupSizeProps {
  value: number;
  onChange: (event: SelectChangeEvent) => void;
}

const GroupSize: React.FC<GroupSizeProps> = ({ value, onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="group-size-label">Group Size</InputLabel>
      <Select labelId="group-size-label" value={value.toString()} onChange={onChange} label="Group Size">
        {Array.from({ length: 10 }, (_, i) => (
          <MenuItem key={i + 1} value={i + 1}>
            {i + 1}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default GroupSize;
