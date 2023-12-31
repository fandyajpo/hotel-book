import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { SortableItem } from "./SortImage";

function Test() {
  const [languages, setLanguages] = useState([
    "JavaScript",
    "Python",
    "TypeScript",
  ]);

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="p-3" style={{ width: "50%" }}>
        <h3>The best programming languages!</h3>
        <SortableContext
          items={languages}
          strategy={verticalListSortingStrategy}
        >
          {languages.map((language) => (
            <SortableItem key={language} id={language} />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );

  function handleDragEnd(event: any) {
    console.log("Drag end called");
    const { active, over } = event;
    console.log("ACTIVE: " + active.id);
    console.log("OVER :" + over.id);

    if (active.id !== over.id) {
      setLanguages((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);
        console.log(arrayMove(items, activeIndex, overIndex));
        return arrayMove(items, activeIndex, overIndex);
        // items: [2, 3, 1]   0  -> 2
        // [1, 2, 3] oldIndex: 0 newIndex: 2  -> [2, 3, 1]
      });
    }
  }
}

export default Test;
