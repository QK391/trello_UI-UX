/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Column from "./Columns/Column";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

// eslint-disable-next-line react/prop-types
function ListColumns({columns}) {
  return (
    <Box
      sx={{
        bgcolor: "inherit",
        width: "100%",
        height: "100%",
        display: "flex",
        overflowX: "auto",
        overflowY: "hidden",
        "&::-webkit-scrollbar-track": { m: 2 },
      }}
    >
      {columns?.map(column => 
         <Column key={column._id} column={column}/>
      )}
      <Box
        sx={{
          minWidth: "200px",
          maxWidth: "200px",
          mx: 2,
          borderRadius: "6px",
          height: "fit-content",
          bgcolor: "#333643",
        }}
      >
        <Button
          sx={{
            color: "white",
            width: "100%",
            justifyContent: "flex-start",
            pl: 2.5,
            py: 1,
          }}
          startIcon={<AddIcon />}
        >
          Add new column
        </Button>
      </Box>
    </Box>
  );
}

export default ListColumns;
