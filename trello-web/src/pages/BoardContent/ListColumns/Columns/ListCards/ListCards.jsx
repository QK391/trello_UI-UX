/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Card from "./Card/Card";

function ListCards({ cards }) {
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
              ${theme.trello.columnFooterHeight} - ${
          theme.trello.columnHeaderHeight
        })`,
      }}
    >
      {cards?.map(card => <Card key={card._id} card={card}/>)}
    </Box>
  );
}
export default ListCards;
