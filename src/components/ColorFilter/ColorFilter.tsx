import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { Color } from '../../store/products/types';

interface ColorFilterProps {
  colors: Color[];
  setColors: (e: Color[]) => void;
}
export const ColorFilter: React.FC<ColorFilterProps> = ({
  colors,
  setColors
}) => (
  <Box component="div">
    <FormLabel>Color</FormLabel>
    <FormGroup>
      {Object.values(Color).map((color) => (
        <FormControlLabel
          onChange={(e: any) => {
            const colorsFilter = e.target?.checked
              ? [color, ...colors]
              : colors.filter((e: Color) => e !== color);
            setColors(colorsFilter);
          }}
          control={<Checkbox />}
          label={color}
          key={color}
        />
      ))}
    </FormGroup>
  </Box>
);
