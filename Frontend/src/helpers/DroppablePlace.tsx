import { useDroppable } from "@dnd-kit/core";
import React, { cloneElement } from "react";

function DroppablePlace({ id, children }: { id: string, children: React.ReactNode }) {
    const { setNodeRef } = useDroppable({
        id,
        disabled: false,
    });

    const childWithRef = React.isValidElement(children)
        ? cloneElement(children as React.ReactElement<any>, {
            ref: setNodeRef,
        }) : children


    return childWithRef
}


export default DroppablePlace