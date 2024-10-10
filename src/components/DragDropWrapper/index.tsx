import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProps,
  OnDragEndResponder,
} from "react-beautiful-dnd";

const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  if (!enabled) {
    return null;
  }
  return <Droppable {...props}>{children}</Droppable>;
};

const DragDropWrapper = ({
  children,
  onDragEnd,
}: {
  children: React.ReactNode;
  onDragEnd: OnDragEndResponder;
}) => {
  return <DragDropContext {...{ onDragEnd }}>{children}</DragDropContext>;
};

DragDropWrapper.Droppable = function DragDropWrapperDroppable({
  children,
  droppableId,
  type = "group",
}: {
  children: React.ReactNode;
  droppableId: string;
  type?: string;
}) {
  return (
    <StrictModeDroppable droppableId={droppableId} type={type}>
      {provided => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {children}
          {provided.placeholder}
        </div>
      )}
    </StrictModeDroppable>
  );
};

DragDropWrapper.Draggable = function DragDropWrapperDraggable({
  children,
  draggableId,
  index,
}: {
  children: React.ReactNode;
  draggableId: string;
  index: number;
}) {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {provided => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
};

export default DragDropWrapper;
