import Box from "@mui/material/Box";
import Card from "./Card/Card";

function ListCards() {
  return (
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
              ${theme.trello.columnFooterHeight} - ${theme.trello.columnHeaderHeight})`,
      }}
    >
        <Card/>
        <Card temporaryHideMedia/>
        <Card temporaryHideMedia/>
        <Card temporaryHideMedia/>

    </Box>
  );
}
export default ListCards;
