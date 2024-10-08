/* eslint-disable react/prop-types */
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Card as MuiCard } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import CommentIcon from "@mui/icons-material/Comment";
import AttachmentIcon from "@mui/icons-material/Attachment";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// eslint-disable-next-line react/prop-types
function Card({ card }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: card._id, data: { ...card } });

  const dndCardStyle = {
    touchAction: "none",
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid #2ecc71' : undefined,


  };
  const showuldShowCardActions = () => {
    return (
      !!card?.memberIds?.length ||
      !!card?.comments?.length ||
      !!card?.attachemts?.length
    );
  };
  return (
    <MuiCard
    ref={setNodeRef}
    style={dndCardStyle}
    {...attributes}
    {...listeners}

      sx={{
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba: (0, 0, 0, 0.2)",
        overflow: "unset",
        display: card ?. FE_PlacehoderCard ? "none": "block"
      }}
    >
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} />}
      <CardContent
        sx={{
          p: 1.5,
          "&:last-child": { p: 1.5 },
        }}
      >
        <Typography>{card?.title}</Typography>
      </CardContent>
      {showuldShowCardActions() && (
        <CardActions sx={{ p: "0 4px 8px 4px" }}>
          {!!card?.memberIds?.length && (
            <Button size="small" startIcon={<GroupIcon />}>
              {card?.memberIds?.length}
            </Button>
          )}

          {!!card?.comments?.length && (
            <Button size="small" startIcon={<CommentIcon />}>
              {card?.comments?.length}
            </Button>
          )}

          {!!card?.attachemts?.length && (
            <Button size="small" startIcon={<AttachmentIcon />}>
              {card?.attachemts?.length}
            </Button>
          )}
        </CardActions>
      )}
    </MuiCard>
  );
}
export default Card;
