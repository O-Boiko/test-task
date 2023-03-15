import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Zoom } from '../SVG';
import s from './styles.module.scss';

interface SearchProps {
  value: string;
  onChange: (event: any) => void;
  onKeyDown: (event: any) => void;
}
export const Search: React.FC<SearchProps> = ({
  value,
  onChange,
  onKeyDown
}) => {
  return (
    <TextField
      id="search-input"
      label="Search"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      variant="outlined"
      type="text"
      size="small"
      fullWidth={true}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Zoom className={s.icon} />
          </InputAdornment>
        )
      }}
    />
  );
};
