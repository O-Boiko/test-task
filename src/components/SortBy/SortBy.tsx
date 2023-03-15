import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { SortBy } from '../../store/products/types';

export const SortByRadioGroup: React.FC<{
  sortByCallback: (value: SortBy | null) => void;
}> = ({ sortByCallback }) => (
  <FormControl>
    <RadioGroup row aria-labelledby="sorting" name="sorting">
      <FormControlLabel
        value={SortBy.IncreasingPrice}
        control={<Radio />}
        label="Price Low to High"
        onChange={(e: any) =>
          sortByCallback(e.target.checked ? SortBy.IncreasingPrice : null)
        }
      />
      <FormControlLabel
        value={SortBy.DecreasingPrice}
        control={<Radio />}
        label="Price High ti Low"
        onChange={(e: any) =>
          sortByCallback(e.target.checked ? SortBy.DecreasingPrice : null)
        }
      />
      <FormControlLabel
        value={SortBy.Rating}
        control={<Radio />}
        label="Popular first"
        onChange={(e: any) =>
          sortByCallback(e.target.checked ? SortBy.Rating : null)
        }
      />
    </RadioGroup>
  </FormControl>
);
