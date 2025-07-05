// src/components/WorkoutDetails/SortableExercise.jsx
import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SortableExercise({ ex, onChange, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({ id: ex.id });

  const [localFields, setLocalFields] = useState({
    sets: ex.sets || "",
    reps: ex.reps || "",
    weight: ex.weight || "",
    display_name: ex.display_name || "",
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: "12px",
    borderRadius: "8px",
  };

  const handleLocalChange = (field, value) => {
    setLocalFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onChange(ex.id, "sets", parseInt(localFields.sets) || 0, true);
    onChange(ex.id, "reps", parseInt(localFields.reps) || 0, true);
    onChange(ex.id, "weight", parseInt(localFields.weight) || 0, true);
    onChange(ex.id, "display_name", localFields.display_name || null, true);
  };

  const displayTitle =
    ex.display_name && ex.display_name.trim() !== ""
      ? ex.display_name
      : ex.exercise_library?.name;

  return (
    <Accordion
      ref={setNodeRef}
      sx={style}
      {...attributes}
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-content-${ex.id}`}
        id={`panel-header-${ex.id}`}
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton
          ref={setActivatorNodeRef}
          {...listeners}
          sx={{ cursor: "grab" }}
          onClick={(e) => e.stopPropagation()}
          {...attributes}
        >
          <DragIndicatorIcon />
        </IconButton>

        <img
          src={ex.exercise_library?.gif_url}
          alt={ex.exercise_library?.name}
          width={70}
          style={{ borderRadius: 6, marginRight: 10 }}
          onClick={(e) => e.stopPropagation()}
        />
        <Typography
          variant="subtitle1"
          onClick={(e) => e.stopPropagation()}
          sx={{ userSelect: "none", flexGrow: 1 }}
        >
          {displayTitle}
        </Typography>

        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(ex.id);
          }}
        >
          Elimina
        </Button>
      </AccordionSummary>

      <AccordionDetails onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <TextField
            label="Titolo Personalizzato"
            size="small"
            value={localFields.display_name}
            onChange={(e) => handleLocalChange("display_name", e.target.value)}
            sx={{ minWidth: 200 }}
          />
          <TextField
            label="Sets"
            type="number"
            size="small"
            value={localFields.sets}
            onChange={(e) => handleLocalChange("sets", e.target.value)}
          />
          <TextField
            label="Reps"
            type="number"
            size="small"
            value={localFields.reps}
            onChange={(e) => handleLocalChange("reps", e.target.value)}
          />
          <TextField
            label="Kg"
            type="number"
            size="small"
            value={localFields.weight}
            onChange={(e) => handleLocalChange("weight", e.target.value)}
          />

          <Button variant="contained" color="primary" onClick={handleSave}>
            Salva
          </Button>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
