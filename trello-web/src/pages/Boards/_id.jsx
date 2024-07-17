import Container from "@mui/material/Container";
import  AppBar from "~/components/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "../BoardContent/BoardContent.jsx";

function Board(){
    return (
        <Container
          disableGutters
          maxWidth={false}
          sx= {{ height: '100vh', background: '' }}
        >
          <AppBar/>
          <BoardBar/>
          <BoardContent/>
        </Container>
      );
}
export default Board;