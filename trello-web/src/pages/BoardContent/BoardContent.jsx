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
  TouchSensor,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import Column from "./ListColumns/Columns/Column";
import Card from "./ListColumns/Columns/ListCards/Card/Card";
import { arrayMove } from "@dnd-kit/sortable";
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

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
    activationConstraint: { delay: 250, tolerance: 5 },
  });
  // const sensors = useSensors(pointerSensor);
  const sensors = useSensors(mouseSenser, tuochSenser);

  const [orderebColumnsState, setOrderColumnState] = useState([]);
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);

  useEffect(() => {
    setOrderColumnState(mapOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);

  const handleDragStart = (event) => {
    // console.log("handleDragStart :", event);
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.column
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(event?.active?.data?.current);
  };
  console.log(activeDragItemId);
  console.log(activeDragItemType);
  console.log(activeDragItemData);

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
    setActiveDragItemId(null),
      activeDragItemType(null),
      activeDragItemData(null);
  };

  const dragAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0,5",
        },
      },
    }),
  };
  return (
    <DndContext
      onDragEnd={handleDragEnd}
      sensors={sensors}
      onDragStart={handleDragStart}
    >
      <Box
        sx={{
          backgroundColor: "primary.main",
          width: "100%",
          height: (theme) => theme.trello.BoardContentHeight,
          display: "flex",
        }}
      >
        <ListColumns columns={orderebColumnsState} />
        <DragOverlay dropAnimation = {dragAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <Card column={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  );
}

export default BoardContent;
