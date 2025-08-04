import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { cn } from "@/lib/utils"
import type { board } from "@/types"
import UsersAvatarHorizontal from "./ui/UsersAvatarHorizontal.tsx"
import useTaskFeatures from "@/hooks/useTaskFeatures.tsx"
import { useUserAuth } from "@/hooks/useUserAuth.tsx"
import TaskCategoriesCards from "./ui/TaskCategoriesCards.tsx"
import { useBoardFeatures } from "@/hooks/useBoardFeatures.tsx"

const KanbanBoard = ({ className, board }: { className?: string, board: board }) => {
    const { boardId } = useParams()
    const { isAuthenticated } = useUserAuth()
    const { tasks, fetchAllTasks } = useTaskFeatures()
    const {activeBoard} = useBoardFeatures()

    useEffect(()=>{
        console.log(activeBoard)
    },[activeBoard])

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
        )}>
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

                    <div className="flex gap-2.5">
                        {/* <UsersAvatar user={board.canEdit?.[0] ?? {} as userObjectType} /> */}
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
