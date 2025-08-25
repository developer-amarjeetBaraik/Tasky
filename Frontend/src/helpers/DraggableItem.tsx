import { useDraggable, type UniqueIdentifier } from "@dnd-kit/core";

function DraggableItem({ id, containerId, isDraggingId, children }: { id: string, containerId: string, isDraggingId: UniqueIdentifier | null, children: React.ReactNode }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
        data: {
            sourceDroppableId: containerId,
        },
    });

    const isDragging = isDraggingId === id

    const style = {
        opacity: isDragging ? 0 : undefined,
        cursor: isDragging ? "grabbing" : "grab",
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
    };

    // Custom listeners that check for exclusion
    const customListeners = {
        ...listeners,
        onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => {
            if ((e.target as Element)?.closest('[data-no-drag]')) {
                e.preventDefault()
                e.stopPropagation()
                return
            }
            listeners?.onPointerDown?.(e)
        },
        onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => {
            if ((e.target as Element)?.closest('[data-no-drag]')) {
                e.preventDefault()
                e.stopPropagation()
                return
            }
            listeners?.onMouseDown?.(e)
        },
        // Add these additional handlers
        onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => {
            if ((e.target as Element)?.closest('[data-no-drag]')) {
                e.preventDefault()
                e.stopPropagation()
                return
            }
            listeners?.onTouchStart?.(e)
        },
        onDragStart: (e: React.DragEvent<HTMLDivElement>) => {
            if ((e.target as Element)?.closest('[data-no-drag]')) {
                e.preventDefault()
                e.stopPropagation()
                return
            }
            listeners?.onDragStart?.(e)
        }
    }

    return (
        <div ref={setNodeRef} {...customListeners} {...attributes} style={style}>
            {children}
        </div>
    );
}


export default DraggableItem