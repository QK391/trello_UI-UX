import Container from "@mui/material/Container";
import  AppBar from "~/components/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "../BoardContent/BoardContent.jsx";
import { mockData } from "~/apis/mock-data";

function Board(){
    return (
        <Container
          disableGutters
          maxWidth={false}
          sx= {{ height: '100vh', background: '' }}
        >
          <AppBar/>
          <BoardBar board = {mockData?.board}/>
          <BoardContent board = {mockData?.board}/>
        </Container>
      );
}
export default Board;