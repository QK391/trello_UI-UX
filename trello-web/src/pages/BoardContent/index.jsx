import React from "react"
import Box from "@mui/material/Box"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Divider from "@mui/material/Divider"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import Typography from "@mui/material/Typography"
import ContentCut from "@mui/icons-material/ContentCut"
import DeleteIcon from "@mui/icons-material/Delete"
import ContentCopy from "@mui/icons-material/ContentCopy"
import ContentPaste from "@mui/icons-material/ContentPaste"
import Cloud from "@mui/icons-material/Cloud"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import Tooltip from "@mui/material/Tooltip"
import LibraryAddIcon from "@mui/icons-material/LibraryAdd"
import Button from "@mui/material/Button"
import DragHandleIcon from "@mui/icons-material/DragHandle"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Card from "@mui/material/Card"
import GroupIcon from "@mui/icons-material/Group"
import CommentIcon from "@mui/icons-material/Comment"
import AttachmentIcon from "@mui/icons-material/Attachment"
//import theme from "~/theme";

const COLUMN_HEADER_HEIGHT = "50px"
const COLUMN_FOOTER_HEIGHT = "56px"

function BoardContent() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        width: "100%",
        height: (theme) => theme.trello.BoardContentHeight,
        display: "flex",
      }}
    >
      <Box
        sx={{
          minWidth: "300px",
          maxWidth: "300px",
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
          ml: 2,
          borderRadius: "6px",
          height: "fit-content",
          maxHeight: (theme) =>
            `calc(${theme.trello.BoardContentHeight} - ${theme.spacing(5)})`,
        }}
      >
        <Box
          sx={{
            height: COLUMN_HEADER_HEIGHT,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontWeight: "bold", cursor: "pointer" }}>
            Column Title
          </Typography>
          <Box>
            <Tooltip title="More options">
              <KeyboardArrowDownIcon
                sx={{ cursor: "pointer" }}
                id="basic-colunm-dropdown"
                aria-controls={open ? "basic-menu-colunm-dropdown" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id="basic-menu-colunm-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-colunm-dropdown",
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <LibraryAddIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add new cards</ListItemText>
              </MenuItem>

              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>

              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Coppy</ListItemText>
              </MenuItem>

              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <DeleteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            overflowX: "hidden",
            overflowY: "auto",
            maxHeight: (theme) => `calc(${
              theme.trello.BoardContentHeight
            } - ${theme.spacing(5)} -
            ${COLUMN_FOOTER_HEIGHT} - ${COLUMN_HEADER_HEIGHT})`,
          }}
        >
          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba: (0, 0, 0, 0.2)",
              overflow: "unset",
            }}
          >
            <CardMedia
              sx={{ height: 140 }}
              image="https://mui.com/static/images/cards/paella.jpg"
              title="green iguana"
            />
            <CardContent
              sx={{
                p: 1.5,
                "&:last-child": { p: 1.5 },
              }}
            >
              <Typography>Lizard</Typography>
            </CardContent>
            <CardActions sx={{ p: "0 4px 8px 4px" }}>
              <Button size="small" startIcon={<GroupIcon />}>
                20
              </Button>
              <Button size="small" startIcon={<CommentIcon />}>
                20
              </Button>
              <Button size="small" startIcon={<AttachmentIcon />}>
                20
              </Button>
            </CardActions>
          </Card>

          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba: (0, 0, 0, 0.2)",
              overflow: "unset",
            }}
          >
            <CardMedia sx={{ cursor: "pointer" }} />
            <CardContent
              sx={{
                p: 1.5,
                "&:last-child": { p: 1.5 },
              }}
            >
              <Typography> Card Item </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba: (0, 0, 0, 0.2)",
              overflow: "unset",
            }}
          >
            <CardMedia sx={{ cursor: "pointer" }} />
            <CardContent
              sx={{
                p: 1.5,
                "&:last-child": { p: 1.5 },
              }}
            >
              <Typography> Card Item </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba: (0, 0, 0, 0.2)",
              overflow: "unset",
            }}
          >
            <CardMedia sx={{ cursor: "pointer" }} />
            <CardContent
              sx={{
                p: 1.5,
                "&:last-child": { p: 1.5 },
              }}
            >
              <Typography> Card Item </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba: (0, 0, 0, 0.2)",
              overflow: "unset",
            }}
          >
            <CardMedia sx={{ cursor: "pointer" }} />
            <CardContent
              sx={{
                p: 1.5,
                "&:last-child": { p: 1.5 },
              }}
            >
              <Typography> Card Item </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box
          sx={{
            height: COLUMN_FOOTER_HEIGHT,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button startIcon={<LibraryAddIcon />}>Add new card</Button>
          <Tooltip title="Brag to move">
            <DragHandleIcon sx={{ cursor: "pointer" }} />
          </Tooltip>
        </Box>
      </Box>
    </Box>
  )
}

export default BoardContent