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
  Box,
  Divider
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
      disableGutters
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-content-${ex.id}`}
        id={`panel-header-${ex.id}`}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          paddingRight: 1,
          backgroundColor: "black",       // sfondo nero pieno
          color: "white",                 // testo bianco se vuoi
          // rimuovi overlay / gradient e ombre fastidiose
          "&::before": {
            display: "none",
          },

        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 10% Handle */}
        <Box
          sx={{ flexBasis: "10%", display: "flex", justifyContent: "center" }}
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
        </Box>

        {/* 40% GIF */}
        <Box sx={{ flexBasis: "20%" }}>
          <img
            src={ex.exercise_library?.gif_url}
            alt={ex.exercise_library?.name}
            width={100}
            style={{ borderRadius: 6 }}
            onClick={(e) => e.stopPropagation()}
          />
        </Box>

        {/* 40% testo */}
        <Box
          sx={{
            flexBasis: "60%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: '0px 0px 0px 20px',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Typography
            variant="h1"
            sx={{ userSelect: "none", fontWeight: 600, lineHeight: "21px", mb: 1, fontSize: '16px' }}
          >
            {displayTitle.charAt(0).toUpperCase() + displayTitle.slice(1).toLowerCase()}
          </Typography>
          <Divider sx={{ mt: 0.5, mb: 1 }} />
          <Typography variant="caption" sx={{ opacity: 1 }}>
            <Typography
              variant="h1"
              sx={{ userSelect: "none", fontWeight: 400, lineHeight: "19px", mb: 0, fontSize: '14px' }}
            >
              <span style={{ color: '#cbff06' }}><b>{localFields.reps}x{localFields.sets}</b></span> | <em><b>{localFields.weight} kg/lbs</b></em>
            </Typography>

          </Typography>
        </Box>

        {/* 10% Expand icon (già gestita da prop expandIcon) */}
      </AccordionSummary>

      <AccordionDetails onClick={(e) => e.stopPropagation()}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "stretch",
            width: "100%",
          }}
        >
          <TextField
            label="Titolo Personalizzato"
            size="small"
            value={localFields.display_name}
            onChange={(e) => handleLocalChange("display_name", e.target.value)}
            fullWidth
          />
          <TextField
            label="Sets"
            type="number"
            size="small"
            value={localFields.sets}
            onChange={(e) => handleLocalChange("sets", e.target.value)}
            fullWidth
          />
          <TextField
            label="Reps"
            type="number"
            size="small"
            value={localFields.reps}
            onChange={(e) => handleLocalChange("reps", e.target.value)}
            fullWidth
          />
          <TextField
            label="Kg"
            type="number"
            size="small"
            value={localFields.weight}
            onChange={(e) => handleLocalChange("weight", e.target.value)}
            fullWidth
          />

          <Button variant="contained" color="primary" onClick={handleSave}>
            Salva
          </Button>

          <Button
            variant="outlined"
            color="error"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(ex.id);
            }}
          >
            Elimina
          </Button>
        </Box>
      </AccordionDetails>

    </Accordion>
  );
}
