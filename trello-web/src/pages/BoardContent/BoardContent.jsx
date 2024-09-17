/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import { mapOrder } from "~/ultils/sorts";
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  closestCenter,
  pointerWithin,
  rectIntersection,
  getFirstCollision,
} from "@dnd-kit/core";
import Column from "./ListColumns/Columns/Column";
import Card from "./ListColumns/Columns/ListCards/Card/Card";
import { arrayMove } from "@dnd-kit/sortable";
//import { cloneDeep } from "lodash";

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
  const touchSenser = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 5 },
  });
  // const sensors = useSensors(pointerSensor);
  const sensors = useSensors(mouseSenser, touchSenser);
  const [orderebColumns, setOrderedColumns] = useState([]);

  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null);
  const lastOverId = useRef(null);
  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);

  //Timf column theo cardId
  const findColumnByCardId = (cardId) => {
    return orderebColumns.find((column) =>
      column?.cards?.map((card) => card._id)?.includes(cardId)
    );
  };

  //fucnt chung sử lý
  const moveCardBetweenDiferencesColumns = (
    over,
    active,
    overColumn,
    overCardId,
    activeColumn,
    activeDringCardId,
    activeDringCardData
  ) => {
    setOrderedColumns((prevColumns) => {
      const overCardIndex = overColumn?.cards?.findIndex(
        (card) => card._id === overCardId
      );
      let newCardIndex;

      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;

      const modifier = isBelowOverItem ? 1 : 0;
      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards?.length + 1;

      const nextColumns = cloneDeep(prevColumns);
      const nextActiverColumn = nextColumns.find(
        (column) => column._id === activeColumn._id
      );
      const nextoverColumn = nextColumns.find(
        (column) => column._id === overColumn._id
      );

      if (nextActiverColumn) {
        nextActiverColumn.cards = nextActiverColumn.cards.filter(
          (card) => card._id !== activeDringCardId
        );
        //Cap nhat lai mang
        nextActiverColumn.cardOderIds = nextActiverColumn.cards.map(
          (card) => card._id
        );
      }
      if (nextoverColumn) {
        nextoverColumn.cards = nextoverColumn.cards.filter(
          (card) => card._id !== activeDringCardId
        );
        const rebuild_activeDringCardData = {
          ...activeDringCardData,
          columnId: nextoverColumn._id,
        };
        nextoverColumn.cards = nextoverColumn.cards.toSpliced(
          newCardIndex,
          0,
          rebuild_activeDringCardData
        );
        nextoverColumn.cardOderIds = nextoverColumn.cards.map(
          (card) => card._id
        );
      }
      return nextColumns;
    });
  };
  //Triger kéo thả phần tử
  const handleDragStart = (event) => {
    // console.log("handleDragStart :", event);
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(event?.active?.data?.current);
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id));
    }
  };

  //Triger trong quá kéo thả phần tử
  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;
    const { active, over } = event;

    if (!active || !over) return;
    const {
      id: activeDringCardId,
      data: { current: activeDringCardData },
    } = active;
    const { id: overCardId } = over;
    //timf 2 column theo card
    const activeColumn = findColumnByCardId(activeDringCardId);
    const overColumn = findColumnByCardId(overCardId);

    if (!activeColumn || !overColumn) return;

    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDiferencesColumns(
        over,
        active,
        overColumn,
        overCardId,
        activeColumn,
        activeDringCardId,
        activeDringCardData
      );
    }
  };

  const handleDragEnd = (event) => {
    // console.log("handleDragEnd :", event);
    const { active, over } = event;

    if (!active || !over) return;

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDringCardId,
        data: { current: activeDringCardData },
      } = active;
      const { id: overCardId } = over;
      //timf 2 column theo card
      const activeColumn = findColumnByCardId(activeDringCardId);
      const overColumn = findColumnByCardId(overCardId);

      if (!activeColumn || !overColumn) return;

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDiferencesColumns(
          over,
          active,
          overColumn,
          overCardId,
          activeColumn,
          activeDringCardId,
          activeDringCardData
        );
      } else {
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(
          (c) => c._id === activeDragItemId
        );
        const newCardIndex = overColumn?.cards?.findIndex(
          (c) => c._id === overCardId
        );
        const dndOrderedCards = arrayMove(
          oldColumnWhenDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
        );
        setOrderedColumns((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns);
          const targetColumn = nextColumns.find(
            (column) => column._id === overColumn._id
          );

          targetColumn.cards = dndOrderedCards;
          targetColumn.columnOrderIds = dndOrderedCards.map((card) => card._id);
          console.log("targetColumn :", targetColumn);
          return nextColumns;
        });
      }
    }
    //Sử lý kéo thả column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        const oldColumnIndex = orderedColumns.findIndex(
          (c) => c._id === active.id
        );
        const newColumnIndex = orderedColumns.findIndex(
          (c) => c._id === over.id
        );
        const dndOrderedColumns = arrayMove(
          orderedColumns,
          oldColumnIndex,
          newColumnIndex
        );
        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

        // console.log('dndOrderedColumns:', dndOrderedColumns)
        // console.log('dndOrderedColumnsIds:', dndOrderedColumnsIds)
        setOrderedColumns(dndOrderedColumns);
      }
    }

    //Đưa về giá trị null ban đầu
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnWhenDraggingCard(null);
  };

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0,5",
        },
      },
    }),
  };
  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args });
      }
      const poiterIntersections = pointerWithin(args);
      const intersections = !!poiterIntersections?.length
        ? poiterIntersections
        : rectIntersection(args);
      let overId = getFirstCollision(intersections, "id");

      if (overId) {
        const checkColumn = orderebColumns.find(
          (column) => column._id === overId
        );
        if (checkColumn) {
         // console.log('overId before:', overId)
          overId = closestCenter({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) => {
                return (
                  container.id !== overId &&
                  checkColumn?.cardOderIds?.includes(container.id)
                );
              }
            )
          })[0]?.id
          // console.log('overId after', overId)
        }
        lastOverId.current = overId;
        return [{ id: overId }];
      }
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeDragItemType, orderebColumns]
  );
  return (
    <DndContext
      sensors={sensors}
      //collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          backgroundColor: "primary.main",
          width: "100%",
          height: (theme) => theme.trello.BoardContentHeight,
          display: "flex",
        }}
      >
        <ListColumns columns={orderebColumns} />
        <DragOverlay dropAnimation={customDropAnimation}>
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
