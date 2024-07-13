//import { BorderColor } from "@mui/icons-material";
import { teal, deepOrange, cyan, orange } from "@mui/material/colors";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: "58px",
    boardBarHeight: "68px",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange,
      },
    },
  },
  dark: {
    palette: {
      primary: cyan,
      secondary: orange,
    },
  },
  components: {
    MuiCssBaseline:{
      styleOverrides:{
       body: {
        '*::-webkit-scrollbar':{
          with: '80px',
          height: '8px'
        },
        '*::-webkit-scrollbar-thumb':{
          backgroundColor: 'A0937D',
          borderRadius: '8px'
        },
        '*::-webkit-scrollbar-thumb:hover':{
          backgroundColor: '50B498',
          borderRadius: '8px'
        }
       }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({theme}) => ({
          color: theme.palette.primary.main,
          fontSize: "0.875rem",
        })
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            color: theme.palette.primary.main,
            fontSize: "0.875rem",
            ".MuiOutLinedInput-notcheOutLine": {
              BorderColor: theme.palette.primary.light,
            },
            "&:hover": {
              ".MuiOutLinedInput-notcheOutLine": {
                BorderColor: theme.palette.primary.main,
              }
            },
            '& fieldset': '1px important'
          };
        },
      },
    },
  },
});

export default theme;
