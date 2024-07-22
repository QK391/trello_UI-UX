/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import { mapOrder } from "~/ultils/sorts";

// eslint-disable-next-line react/prop-types
function BoardContent({ board }) {
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        width: "100%",
        height: (theme) => theme.trello.BoardContentHeight,
        display: "flex",
      }}
    >
      <ListColumns columns= {orderedColumns}/>
    </Box>
  );
}

export default BoardContent;
