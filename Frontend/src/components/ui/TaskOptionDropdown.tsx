import { useState, type Dispatch, type SetStateAction } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from './dropdown-menu'
import OptionBtn from './OptionBtn'
import type { taskType } from '@/types'
import useTaskFeatures from '@/hooks/useTaskFeatures'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useBoardFeatures } from '@/hooks/useBoardFeatures'
import { useUserAuth } from '@/hooks/useUserAuth'
import SmallSpinner from './SmallSpinner'

const TaskOptionDropdown = ({ task, setIsDeleteAlertDialogOpen, deletingTask }: { task: taskType, setIsDeleteAlertDialogOpen: Dispatch<SetStateAction<boolean>>, deletingTask: boolean }) => {
    const { boardId } = useParams()
    const { user } = useUserAuth()
    const { isUserAdmin } = useBoardFeatures()
    const { setTasks, changePriorityOnServer, fetchAllTasks } = useTaskFeatures()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const priorityList = ['High', 'Medium', 'Low']

    // change task priority
    const handleChangePriority = (priority: string) => {
        setTasks(prevTasks => {
            if (!prevTasks) return prevTasks;

            const statusGroup = prevTasks[task.status] ?? [];

            // Find the change task priority
            let taskToChange = statusGroup.find(t => t._id === task._id);
            if (!taskToChange) return prevTasks;

            taskToChange.priority = priority

            return {
                ...prevTasks,
                [task.status]: [taskToChange, ...statusGroup.filter(t => t._id !== task._id)],
            };
        });
        changePriorityOnServer(boardId, task._id, priority, (error, success) => {
            if (error) {
                fetchAllTasks(boardId!)
                toast.error(`${error.message}`, {
                    richColors: true
                })
            }
        })
    }

    return (<>
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger>
                <OptionBtn />
            </DropdownMenuTrigger>
            <DropdownMenuContent data-no-drag className='min-w-50' align='end'>
                <DropdownMenuLabel>Edit Task</DropdownMenuLabel>
                {
                    isUserAdmin || task.createdBy._id === user?._id ? <DropdownMenuGroup>
                        {/* Change title */}
                        <DropdownMenuItem>
                            Change Title
                        </DropdownMenuItem>
                        {/* Change priority */}
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                Change Priority
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                {priorityList.map(p => (
                                    p === task.priority ? null :
                                        <DropdownMenuItem
                                            key={p}
                                            onSelect={() => handleChangePriority(p)}
                                        >
                                            {p}
                                        </DropdownMenuItem>
                                ))}
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        
                        <DropdownMenuSeparator />
                        {/* Delete task */}
                        <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => setIsDeleteAlertDialogOpen(true)}
                        >
                            {deletingTask ? <SmallSpinner /> : 'Delete Task'}
                        </DropdownMenuItem>
                    </DropdownMenuGroup> : null
                }
            </DropdownMenuContent>
        </DropdownMenu>
    </>

    )
}

export default TaskOptionDropdown