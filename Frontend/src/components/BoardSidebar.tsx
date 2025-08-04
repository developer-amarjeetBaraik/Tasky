import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PanelLeft, PanelRight } from "lucide-react";
import { cn } from "@/lib/utils";

const BoardSidebar = ({ className }: { className?: string }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);

    {/* Sidebar */ }
    return (
        <div className={cn(
            'flex flex-col rounded-2xl border border-border overflow-hidden',
            "bg-[#c8d9f4] transition-all duration-300 ease-in-out",
            // "dark:bg-[linear-gradient(125deg,var(--tw-gradient-from),var(--tw-gradient-to))] from-[#192D4B] to-[#153059]",
            "dark:bg-[url(https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/bubble-dark.svg)]",
            isCollapsed ? "w-16" : "w-70",
        )}>
            <div className="h-14 flex items-center justify-between p-4 border-b bg-transparent-black">
                <span className={cn("text-lg font-semibold transition-opacity duration-500 ease-in", isCollapsed && "hidden")}>Add Task</span>
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                    {isCollapsed ? <PanelRight size={20} /> : <PanelLeft size={20} />}
                </Button>
            </div>

            <div className={cn(
                "p-4 space-y-2",
                isCollapsed && 'hidden'
            )}>
                whar
            </div>
        </div>
    );
};

export default BoardSidebar;
