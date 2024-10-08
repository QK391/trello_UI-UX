import Box from "@mui/material/Box"
import ModeSelect from "~/components/ModeSelect/ModeSelect"
import AppsIcon from "@mui/icons-material/Apps"
import { ReactComponent as TrelloIcon } from "~/assets/trello.svg"
import SvgIcon from "@mui/material/SvgIcon"
import Typography from "@mui/material/Typography"
import WorksPaces from "./Menus/WorksPaces"
import Recent from "./Menus/Recent"
import Starred from "./Menus/Starred"
import Templates from "./Menus/Templates"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Badge from "@mui/material/Badge"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import Tooltip from "@mui/material/Tooltip"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import Profiles from "./Menus/Profiles"
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'

function AppBar() {
  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.trello.appBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        paddingX: 2
     //   overflowX: 'auto'
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <AppsIcon sx={{ color: "primary.main" }} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <SvgIcon
            component={TrelloIcon}
            inheritViewBox
            sx={{ color: "primary.main" }}
          />
          <Typography
            variant="span"
            sx={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "primary.main",
            }}
          >
            Trello
          </Typography>
        </Box>
        <Box sx={{ display: {xs: 'none', md: 'flex'}, gap: 1}}>
          <WorksPaces />
          <Recent />
          <Starred />
          <Templates />
          <Button variant="outlined" startIcon={<AddToPhotosIcon/>}>Create</Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <TextField
          id="outlined-search"
          label="Search"
          type="searh"
          size="small"
          sx = {{ minWidth: 120}}
        />
        <ModeSelect />
        <Tooltip title="Notification">
          <Badge color="secondary" variant="dot" sx={{ cursor: "pointer" }}>
            <NotificationsNoneIcon sx={{ color: "primary.main" }} />
          </Badge>
        </Tooltip>
        <Tooltip title="Help" sx={{ cursor: "pointer" }}>
          <HelpOutlineIcon sx={{ color: "primary.main" }} />
        </Tooltip>
        <Profiles />
      </Box>
    </Box>
  )
}

export default AppBar;
