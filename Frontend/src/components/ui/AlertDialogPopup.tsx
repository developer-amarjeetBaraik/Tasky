import React, { useState } from "react";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "./alert-dialog";
import type { AlertDialogPopupType } from "@/types";

const AlertDialogPopup: React.FC<AlertDialogPopupType> = ({
    open = false,
    onOpenChange,
    alertTitle,
    alertDescription,
    onCancel,
    onContinue,
    cancelBtnText,
    continueBtnText,
    continueVerient = "Default",
    children,
}) => {
    // If controlled, use controlled props; otherwise use internal state
    const [internalOpen, setInternalOpen] = useState(false);
    const isControlled = open !== undefined && onOpenChange !== undefined;

    const handleCancel = () => {
        onCancel?.();
        if (isControlled) {
            onOpenChange?.(false);
        } else {
            setInternalOpen(false);
        }

        // Immediate and persistent cleanup for cancel
        document.body.style.pointerEvents = '';
        requestAnimationFrame(() => {
            document.body.style.pointerEvents = '';
            setTimeout(() => document.body.style.pointerEvents = '', 100);
            setTimeout(() => document.body.style.pointerEvents = '', 300);
        });
    };

    const handleContinue = () => {
        onContinue?.();
        if (isControlled) {
            onOpenChange?.(false);
        } else {
            setInternalOpen(false);
        }

        document.body.style.pointerEvents = '';
        requestAnimationFrame(() => {
            document.body.style.pointerEvents = '';
            setTimeout(() => document.body.style.pointerEvents = '', 100);
            setTimeout(() => document.body.style.pointerEvents = '', 300);
        });
    };

    return (
        <AlertDialog
            open={isControlled ? open : internalOpen}
            onOpenChange={isControlled ? onOpenChange : setInternalOpen}
        >
            {/* Only render the trigger in uncontrolled mode */}
            {!isControlled && children && (
                <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            )}
            <AlertDialogContent data-no-drag>
                <AlertDialogHeader>
                    <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
                    {alertDescription && (
                        <AlertDialogDescription>
                            {alertDescription}
                        </AlertDialogDescription>
                    )}
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={handleCancel}
                    >
                        {cancelBtnText ?? "Cancel"}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleContinue}
                        className={
                            continueVerient === "Destructive"
                                ? "bg-red-400 hover:bg-red-500"
                                : undefined
                        }
                    >
                        {continueBtnText ?? "Continue"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AlertDialogPopup;
