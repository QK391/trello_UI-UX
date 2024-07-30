/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import { mapOrder } from "~/ultils/sorts";
import {
  DndContext,
  useSensor,
  useSensors,
  //PointerSensor,
  MouseSensor,
  TouchSensor
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

// eslint-disable-next-line react/prop-types
function BoardContent({ board }) {
  // const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, "_id");
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: { distance: 10 },
  // });
  const mouseSenser = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });
  const tuochSenser = useSensor(TouchSensor, {
    activationConstraint: {delay: 250, tolerance: 5},
  });
  // const sensors = useSensors(pointerSensor);
  const sensors = useSensors(mouseSenser, tuochSenser);

  const [orderebColumnsState, setOrderColumnState] = useState([]);
  useEffect(() => {
    setOrderColumnState(mapOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);
  const handleDragEnd = (event) => {
    console.log("handleDragEnd :", event);
    const { active, over } = event;

    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = orderebColumnsState.findIndex(
        (c) => c._id === active.id
      );
      const newIndex = orderebColumnsState.findIndex((c) => c._id === over.id);
      const dndOrderedColumns = arrayMove(
        orderebColumnsState,
        oldIndex,
        newIndex
      );
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

      // console.log('dndOrderedColumns:', dndOrderedColumns)
      // console.log('dndOrderedColumnsIds:', dndOrderedColumnsIds)
      setOrderColumnState(dndOrderedColumns);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box
        sx={{
          backgroundColor: "primary.main",
          width: "100%",
          height: (theme) => theme.trello.BoardContentHeight,
          display: "flex",
        }}
      >
        <ListColumns columns={orderebColumnsState} />
      </Box>
    </DndContext>
  );
}

export default BoardContent;
