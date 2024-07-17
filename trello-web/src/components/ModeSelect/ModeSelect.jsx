import { useColorScheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ContrastIcon from "@mui/icons-material/Contrast";

function ModeSelect() {
    const { mode, setMode } = useColorScheme();
    const handleChange = (event) => {
      const selectMode = event.target.value;
      setMode(selectMode);
    };
  
    return (
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
        <Select
          labelId="label-select-dark-light-mode"
          id="select-dark-light-mode"
          value={mode}
          label="Mode"
          onChange={handleChange}
        >
          <MenuItem value="light">
            <LightModeIcon />
          </MenuItem>
          <MenuItem value="dark">
            <DarkModeIcon />
          </MenuItem>
          <MenuItem value="system">
            <ContrastIcon />
          </MenuItem>
        </Select>
      </FormControl>
    );
  }

export default ModeSelect