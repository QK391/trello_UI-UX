import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import DashboardIcon from "@mui/icons-material/Dashboard"
import BallotIcon from "@mui/icons-material/Ballot"
import AddToDriveIcon from "@mui/icons-material/AddToDrive"
import AutorenewIcon from "@mui/icons-material/Autorenew"
import EarbudsIcon from "@mui/icons-material/Earbuds"
import Avatar from "@mui/material/Avatar"
import AvatarGroup from "@mui/material/AvatarGroup"
import { Tooltip } from "@mui/material"
import Button from "@mui/material/Button"
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'

const MENU_STYLE = {
  color: "primary.main",
  bgcolor: "none",
  paddingX: "5px",
  borderRadius: "4px",
  "& .MuiSvgIcon-root": {
    color: "primary.main",
  },
};

function BoardBar() {
  return (
    <Box
      sx={{
        //backgroundColor: "primary.dark",
        width: "100%",
        height: (theme) => theme.trello.boardBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        paddingX: 2,
        overflowX: "auto",
        borderTop: "1px solid #00bfa5",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Chip
          sx={MENU_STYLE}
          icon={<DashboardIcon />}
          label="Trello Work"
          clickable
        />

        <Chip
          sx={MENU_STYLE}
          icon={<BallotIcon />}
          label="Public/private Works"
          clickable
        />

        <Chip
          sx={MENU_STYLE}
          icon={<AddToDriveIcon />}
          label="Add To Google Drive"
          clickable
        />

        <Chip
          sx={MENU_STYLE}
          icon={<AutorenewIcon />}
          label="Automations"
          clickable
        />

        <Chip
          sx={MENU_STYLE}
          icon={<EarbudsIcon />}
          label="Filters"
          clickable
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Button variant="outlined" startIcon={<PersonAddAltIcon/>}>Invite</Button>
        <AvatarGroup max={4} sx={{'&. .MuiAvatar-root': {
          width: 34,
          height: 34,
          fontSize: 16
        }}}>
          <Tooltip>
            <Avatar
              alt="Remy Sharp"
              src="https://scontent.fhan15-1.fna.fbcdn.net/v/t1.6435-9/116717799_2766609403627104_4257424577719615231_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=53a332&_nc_ohc=qi98NoJKqbMQ7kNvgFt4q5B&_nc_ht=scontent.fhan15-1.fna&oh=00_AYCy7fyiVlS7K5C-CIVuKbRxUp2DZpkgMvTduW9cPZJVKQ&oe=66B967FE"
            />
          </Tooltip>
          <Tooltip>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </Tooltip>
          <Tooltip>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/3.jpg" />
          </Tooltip>
          <Tooltip>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/4.jpg" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar;