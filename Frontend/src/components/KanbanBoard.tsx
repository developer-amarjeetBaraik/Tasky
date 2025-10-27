import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { cn } from "@/lib/utils"
import type { board } from "@/types"
import UsersAvatarHorizontal from "./ui/UsersAvatarHorizontal.tsx"
import useTaskFeatures from "@/hooks/useTaskFeatures.tsx"
import { useUserAuth } from "@/hooks/useUserAuth.tsx"
import TaskCategoriesCards from "./ui/TaskCategoriesCards.tsx"
import { useBoardFeatures } from "@/hooks/useBoardFeatures.tsx"
import { Button } from "./ui/button.tsx"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip.tsx"
import { Badge } from "./ui/badge.tsx"

type kanbanBoardComponentType = {
    className?: string,
    board: board,
    isSidebarCollapsed?: boolean,
    setIsSidebarCollapsed?: (isSidebarCollapsed: boolean) => void,
}

const KanbanBoard = ({ className, board, isSidebarCollapsed, setIsSidebarCollapsed }: kanbanBoardComponentType) => {
    const { boardId } = useParams()
    const { isAuthenticated, user } = useUserAuth()
    const {totalLiveBoardUser} = useBoardFeatures()
    const { tasks, fetchAllTasks } = useTaskFeatures()
    const { activeBoard } = useBoardFeatures()


    useEffect(() => {
        if (isAuthenticated && boardId) {
            fetchAllTasks(boardId)
        }
    }, [isAuthenticated, boardId])
    return (
        <div className={cn(
            'rounded-2xl flex flex-col border border-border overflow-hidden',
            // "bg-[linear-gradient(325deg,var(--tw-gradient-from),var(--tw-gradient-to))] from-[#9A4F82] to-[#504289]",
            // "dark:bg-[linear-gradient(325deg,var(--tw-gradient-from),var(--tw-gradient-to))] from-[#d2a2c3] to-[#a093d6]",
            "bg-[url(https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/rainbow.svg)]",
            className
        )}
        >
            {/* Header */}
            <div className="h-14 flex items-center justify-between p-4 border-b text-white bg-transparent-black">
                <div className={cn(
                    "header-left",
                    "text-lg font-semibold transition-opacity duration-500 ease-in"
                )}>
                    <div>
                        <span className="flex flex-col">
                            <h3 className="-mb-0.5 capitalize">{board.name}</h3>
                            <p className="text-[13px] font-extralight dark:text-cream-light">{board._id}</p>
                        </span>
                    </div>
                    <div>
                    </div>
                </div>
                <div className={cn(
                    "header-right"
                )}>

                    <div className="flex items-center gap-4">
                        {/* Live connected user count */}
                        <span className="relative">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ff0000" fill="none">
                                <circle cx="12" cy="12" r="2" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
                                <path d="M7.5 8C6.5 9 6 10.5 6 12C6 13.5 6.5 15 7.5 16" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M4.5 6C3 7.5 2 9.5 2 12C2 14.5 3 16.5 4.5 18" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M16.5 16C17.5 15 18 13.5 18 12C18 10.5 17.5 9 16.5 8" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M19.5 18C21 16.5 22 14.5 22 12C22 9.5 21 7.5 19.5 6" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center rounded-full text-xs">
                                    {totalLiveBoardUser}
                                </Badge>
                        </span>

                        {/* Add task button */}
                        {
                            activeBoard?.admins?.some((item) => item._id === user?._id) && isSidebarCollapsed && setIsSidebarCollapsed &&
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} size='icon'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="" color="#ffffff" fill="none">
                                            <path d="M18 15L18 22M21.5 18.5L14.5 18.5" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M7 16H11M7 11H15" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M6.5 3.5C4.9442 3.54667 4.01661 3.71984 3.37477 4.36227C2.49609 5.24177 2.49609 6.6573 2.49609 9.48836L2.49609 15.9944C2.49609 18.8255 2.49609 20.241 3.37477 21.1205C4.25345 22 5.66767 22 8.49609 22H11.5M15.4922 3.5C17.048 3.54667 17.9756 3.71984 18.6174 4.36228C19.4961 5.24177 19.4961 6.6573 19.4961 9.48836V12" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M6.49609 3.75C6.49609 2.7835 7.2796 2 8.24609 2H13.7461C14.7126 2 15.4961 2.7835 15.4961 3.75C15.4961 4.7165 14.7126 5.5 13.7461 5.5H8.24609C7.2796 5.5 6.49609 4.7165 6.49609 3.75Z" stroke="#141B34" strokeWidth="1.5" strokeLinejoin="round" />
                                        </svg>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    Add task
                                </TooltipContent>

                            </Tooltip>

                        }
                        {/* User avatar icons */}
                        <UsersAvatarHorizontal users={board.canEdit!} displayLimit={2} />
                    </div>
                </div>
            </div>
            {/* Kanban board */}
            <TaskCategoriesCards tasks={tasks} />

        </div>
    )
}

export default KanbanBoard
