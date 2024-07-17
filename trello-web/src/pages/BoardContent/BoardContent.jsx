import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
//import theme from "~/theme";

function BoardContent() {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        width: "100%",
        height: (theme) => theme.trello.BoardContentHeight,
        display: "flex",
      }}
    >
      <ListColumns/>
    </Box>
  );
}

export default BoardContent;
