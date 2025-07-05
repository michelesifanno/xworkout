// src/components/WorkoutDetails/ExerciseList.jsx
import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableExercise from "./SortableExercise";

import supabase from "../../supabase/client";

export default function ExerciseList({ items, setItems, onChange, onDelete }) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    const newItems = arrayMove(items, oldIndex, newIndex);
    setItems(newItems);
  try {
    // Aggiorna la posizione per TUTTI gli esercizi (consigliato per evitare incoerenze)
    for (let index = 0; index < newItems.length; index++) {
      const ex = newItems[index];
      const { error } = await supabase
        .from("user_exercises")
        .update({ position: index })
        .eq("id", ex.id)
        .eq("plan_id", ex.plan_id);
      if (error) throw error;
    }
  } catch (error) {
    console.error("Errore aggiornando l'ordine:", error.message);
    alert("Errore salvando l'ordine degli esercizi.");
  }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        {items.map((ex) => (
          <SortableExercise
            key={ex.id}
            ex={ex}
            onChange={onChange}
            onDelete={onDelete}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}
