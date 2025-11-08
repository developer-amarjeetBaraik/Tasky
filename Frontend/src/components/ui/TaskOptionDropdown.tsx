import { type Dispatch, type SetStateAction } from 'react'
import AiIcon from '../../assets/AI.svg'
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
import type { taskOptionType, taskType } from '@/types'
import useTaskFeatures from '@/hooks/useTaskFeatures'
import { NavLink, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useBoardFeatures } from '@/hooks/useBoardFeatures'
import { useUserAuth } from '@/hooks/useUserAuth'
import SmallSpinner from './SmallSpinner'

const TaskOptionDropdown = ({ task, setIsDeleteAlertDialogOpen, setTaskOptionAction, deletingTask }: { task: taskType, setTaskOptionAction: Dispatch<SetStateAction<taskOptionType['actions']>>, setIsDeleteAlertDialogOpen: Dispatch<SetStateAction<boolean>>, deletingTask: boolean }) => {
    const { boardId } = useParams()
    const { user } = useUserAuth()
    const { isUserAdmin } = useBoardFeatures()
    const { setActiveTask, setTasks, changePriorityOnServer, fetchAllTasks } = useTaskFeatures()

    const priorityList = ['High', 'Medium', 'Low']

    // change task priority
    const handleChangePriority = (priority: string) => {
        setTasks(prevTasks => {
            if (!prevTasks) return prevTasks;

            const statusGroup = prevTasks[task?.status] ?? [];

            // Find the change task priority
            let taskToChange = statusGroup.find(t => t._id === task?._id);
            if (!taskToChange) return prevTasks;

            taskToChange.priority = priority

            return {
                ...prevTasks,
                [task?.status]: [taskToChange, ...statusGroup.filter(t => t._id !== task?._id)],
            };
        });
        changePriorityOnServer(boardId, task?._id, priority, (error) => {
            if (error) {
                fetchAllTasks(boardId!)
                toast.error(`${error.message}`, {
                    richColors: true
                })
            }
        })
    }

    // Ask Ai onSelect handler
    const handleAskAiOnSelect = () => {
        setTaskOptionAction('ask-task-ai')
        setActiveTask(task)
    }

    return (<>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <OptionBtn />
            </DropdownMenuTrigger>
            <DropdownMenuContent data-no-drag className='min-w-50' align='end'>
                {/* Ask AI */}
                <NavLink to={`/task/${task?._id}/ai-assistant`}>
                    <DropdownMenuItem onSelect={handleAskAiOnSelect}>
                        <span className='w-full flex justify-between items-center'>
                            <img src={AiIcon} alt="" className='h-7' />
                            Ask AI
                        </span>
                    </DropdownMenuItem>
                </NavLink>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Edit Task</DropdownMenuLabel>
                {
                    isUserAdmin || task?.createdBy._id === user?._id ? <DropdownMenuGroup>
                        {/* Change title */}
                        <DropdownMenuItem onSelect={() => setTaskOptionAction('change-title')}>
                            Change Title
                        </DropdownMenuItem>
                        {/* Change description */}
                        <DropdownMenuItem onSelect={() => setTaskOptionAction('change-description')}>
                            Change Description
                        </DropdownMenuItem>
                        {/* Change priority */}
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                Change Priority
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                {priorityList.map(p => (
                                    p === task?.priority ? null :
                                        <DropdownMenuItem
                                            key={p}
                                            onSelect={() => handleChangePriority(p)}
                                        >
                                            {p}
                                        </DropdownMenuItem>
                                ))}
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        {/* Assign someone */}
                        {
                            isUserAdmin && <DropdownMenuItem onSelect={() => setTaskOptionAction('assign-someone')}>
                                Assign Someone
                            </DropdownMenuItem>
                        }

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