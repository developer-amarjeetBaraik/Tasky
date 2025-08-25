import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PanelLeft, PanelRight } from "lucide-react";
import { cn } from "@/lib/utils";
import AddTaskCard from "./AddTaskCard";
import { useUserAuth } from "@/hooks/useUserAuth";
import { useBoardFeatures } from "@/hooks/useBoardFeatures";

type BoardSidebarType = {
    className?: string,
    collapseSidebar?: boolean,
    defaultOpen?: boolean,
    defaultTab?: "inbox" | "addTask",
    setIsSidebarCollapsed?: (collapseSidebar: boolean) => void
}

const BoardSidebar = ({ className, defaultOpen = true, defaultTab = 'inbox', collapseSidebar = false, setIsSidebarCollapsed }: BoardSidebarType) => {
    const { user } = useUserAuth()
    const { activeBoard } = useBoardFeatures()
    const [selectedTab, setSelectedTab] = useState<BoardSidebarType["defaultTab"]>(defaultTab)
    const toggleSidebar = () => {
        setIsSidebarCollapsed && setIsSidebarCollapsed(!collapseSidebar)
    };

    useEffect(() => {
        if (
            activeBoard?.admins?.some((item) => item._id !== user?._id)
        ) {
            setSelectedTab("inbox")
        }
    }, [selectedTab, collapseSidebar])

    {/* Sidebar */ }
    return (
        <div className={cn(
            'flex flex-col rounded-2xl border border-border overflow-hidden',
            "bg-[#c8d9f4] transition-all duration-300 ease-in-out",
            // "dark:bg-[linear-gradient(125deg,var(--tw-gradient-from),var(--tw-gradient-to))] from-[#192D4B] to-[#153059]",
            "dark:bg-[url(https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/bubble-dark.svg)]",
            (!defaultOpen || collapseSidebar) ? "w-16" : "w-70",
            className
        )}>
            <div className={cn(
                "h-14 flex items-center justify-between p-4 border-b bg-transparent-black",
            )}>
                <div className={cn(
                    "px-4 py-2 flex-1 bg-muted-foreground text-primary flex justify-between items-center border border-border rounded-lg dark:bg-gray-600",
                    "[&>input]:hidden",
                    "[&lable]:text-lg font-semibold",
                    (!defaultOpen || collapseSidebar) && "hidden"
                )}>
                    {/* inbox */}
                    <label className={cn(
                        "px-2 py-1 rounded-sm",
                        "hover:bg-muted",
                        selectedTab === 'inbox' && "bg-muted"
                    )} htmlFor="inbox">Inbox</label>
                    <input name="sidebarTab" onChange={() => setSelectedTab('inbox')} id="inbox" type="radio" />
                    {/* add task */}
                    <label className={cn(
                        "px-2 py-1 rounded-sm",
                        "hover:bg-muted",
                        selectedTab === 'addTask' && "bg-muted"
                    )} htmlFor="addTask">Add task</label>
                    <input name="sidebarTab" onChange={() => setSelectedTab('addTask')} id="addTask" type="radio" />
                </div>
                {setIsSidebarCollapsed && <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                    {(!defaultOpen || collapseSidebar) ? <PanelRight size={20} /> : <PanelLeft size={20} />}
                </Button>}
            </div>

            <div className={cn(
                "p-4 h-full overflow-y-auto",
                (!defaultOpen || collapseSidebar) && 'hidden'
            )}>
                {
                    activeBoard?.admins?.some((item) => item._id !== user?._id) || selectedTab === 'inbox' ? <>
                        Inbox
                    </> : <AddTaskCard />
                }
            </div>
        </div>
    );
};

export default BoardSidebar;
