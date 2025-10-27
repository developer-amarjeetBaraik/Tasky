import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import type { CustomDialogType } from "@/types";
import { Button } from "./button";
import SmallSpinner from "./SmallSpinner";
import { cn } from "@/lib/utils";

const CustomDialog: React.FC<CustomDialogType> = ({
    open = false,
    onOpenChange,
    trigger,
    title,
    description,
    onContinue,
    disableContinueBtn=false,
    continueLoadingState = false,
    continueBtnText,
    continueVerient = "Default",
    children,
}) => {
    // If controlled, use controlled props; otherwise use internal state
    const [internalOpen, setInternalOpen] = useState(false);
    const isControlled = open !== undefined && onOpenChange !== undefined;
    const [continueBtnLoadingState, setContinueBtnLoadingState] = useState(continueLoadingState)

    const cleanupOverlay = () => {
        // Clean up any overlay issues
        document.body.style.pointerEvents = '';
        requestAnimationFrame(() => {
            document.body.style.pointerEvents = '';
            setTimeout(() => document.body.style.pointerEvents = '', 100);
            setTimeout(() => document.body.style.pointerEvents = '', 300);
        });
    }

    const handleOpenChange = (newOpen: boolean) => {
        // Don't allow closing if loading
        if (continueBtnLoadingState && !newOpen) {
            return;
        }

        if (isControlled) {
            onOpenChange?.(newOpen);
        } else {
            setInternalOpen(newOpen);
        }

        if (!newOpen) {
            cleanupOverlay();
        }
    }

    const handleCancel = () => {
        // Don't allow cancel if loading
        if (continueBtnLoadingState) return;

        if (isControlled) {
            onOpenChange?.(false);
        } else {
            setInternalOpen(false);
        }
        cleanupOverlay();
    }

    const handleContinue = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // Prevent multiple clicks if already loading
        if (continueBtnLoadingState) return;

        setContinueBtnLoadingState(true)

        try {
            await onContinue?.();

            // Close dialog after successful operation
            if (isControlled) {
                onOpenChange?.(false);
            } else {
                setInternalOpen(false);
            }

        } catch (error) {
            console.error('Continue action failed:', error);
            // Don't close dialog on error - let user try again
        } finally {
            setContinueBtnLoadingState(false)
            cleanupOverlay();
        }
    };

    return (
        <Dialog
            open={isControlled ? open : internalOpen}
            onOpenChange={handleOpenChange}
        >
            {/* Only render the trigger in uncontrolled mode */}
            {!isControlled && trigger && (
                <DialogTrigger asChild>{trigger}</DialogTrigger>
            )}
            <DialogContent data-no-drag>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && (
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>
                {children}
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            onClick={handleCancel}
                            variant="outline"
                            disabled={continueBtnLoadingState} // Disable cancel during loading
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={handleContinue}
                        disabled={continueBtnLoadingState || disableContinueBtn} // Disable button during loading
                        className={cn(
                            'flex justify-between items-center gap-1',
                            continueVerient === "Destructive"
                                ? "bg-red-400 hover:bg-red-500"
                                : undefined,
                        )}
                    >
                        {continueBtnLoadingState ? (
                            <>
                                <SmallSpinner />
                                <span>Loading...</span>
                            </>
                        ) : (
                            continueBtnText ?? "Continue"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CustomDialog;