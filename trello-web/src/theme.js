import { teal, deepOrange, cyan, orange } from "@mui/material/colors"
import { experimental_extendTheme as extendTheme } from "@mui/material/styles"
//import BoardContent from "./pages/BoardContent"

const APP_BAR_HEIGHT = '50px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT } - ${BOARD_BAR_HEIGHT})`

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    BoardContentHeight: BOARD_CONTENT_HEIGHT
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
          }
        }
      }
    }
  }
})

export default theme;
