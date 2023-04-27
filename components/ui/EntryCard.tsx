import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Entry } from "../../interfaces";
import { FC, DragEvent, useContext } from "react";
import { UIContext } from "../../context/ui";
import { useRouter } from "next/router";
import { dateFunctions } from "../../utils";

interface Props {
  entry: Entry;
}
export const EntryCard: FC<Props> = ({ entry }) => {

  const { startDragging , endDragging}  = useContext(UIContext);
  const router  = useRouter();
  const onDragStart = (event: DragEvent) => {
    //console.log(event);
    event.dataTransfer.setData("text", entry._id);
    startDragging()
  };

  const onDragEnd = () => {
    //Todo: cancelar ondrag
    endDragging();
  };

  const onClick = () =>{
    router.push(`/entries/${entry._id}`)
  }

  return (
    <Card
      onClick={onClick}
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: "flex", justifyContent: "end", padding: "3px 5px" }}
        >
          <Typography>{dateFunctions.getFormatDistanceToNow(entry.createdAt)}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
