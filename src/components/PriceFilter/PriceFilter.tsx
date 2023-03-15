import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import s from './style.module.scss';

interface PriceFilterProps {
  minPrice: number | null;
  maxPrice: number | null;
  setMinPrice: (val: number) => void;
  setMaxPrice: (val: number) => void;
  onKeyDown: (event: any) => void;
}

export const PriceFilter: React.FC<PriceFilterProps> = ({
  minPrice,
  setMinPrice,
  maxPrice,
  onKeyDown,
  setMaxPrice
}) => (
  <Box component="div">
    <FormLabel>Price</FormLabel>
    <Box component="div">
      <TextField
        id="min"
        {...(minPrice ? { value: minPrice } : {})}
        onChange={(e: any) =>
          e.target?.value >= 0 && setMinPrice(e.target?.value)
        }
        onKeyDown={onKeyDown}
        label="min"
        variant="filled"
        type="number"
        size="small"
        className={s.price}
      />
      <TextField
        id="max"
        {...(maxPrice ? { value: maxPrice } : {})}
        onChange={(e: any) =>
          e.target?.value >= 0 && setMaxPrice(e.target?.value)
        }
        onKeyDown={onKeyDown}
        label="max"
        variant="filled"
        type="number"
        size="small"
        className={s.price}
      />
    </Box>
  </Box>
);
