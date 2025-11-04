import type React from 'react'
import { cn, toLocalDateOnly } from '@/lib/utils'
import type { taskOptionType, taskType } from '@/types'
import {
    Card,
    CardDescription,
    CardTitle
} from './card'
import { Badge } from './badge'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from './tooltip'
import { useUserAuth } from '@/hooks/useUserAuth'
import TaskOptionDropdown from './TaskOptionDropdown'
import AlertDialogPopup from './AlertDialogPopup'
import { useEffect, useState } from 'react'
import useTaskFeatures from '@/hooks/useTaskFeatures'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import TaskDialogBoxes from './TaskDialogBoxes'

const TaskCard = ({ task, className, style, hideOptBtn = false }: { task: taskType, className?: string, style?: React.CSSProperties, hideOptBtn?: boolean }) => {
    const { boardId } = useParams()
    const { user } = useUserAuth()
    const { setTasks, deleteTaskOnServer } = useTaskFeatures()
    const [deletingTask, setDeletingTask] = useState(false)
    const [isDeleteAlertDialogOpen, setIsDeleteAlertDialogOpen] = useState(false)
    const [taskOptionAction, setTaskOptionAction] = useState<taskOptionType['actions']>('none')

    if (!task) return null


    // delete task
    const handleDeleteTask = () => {
        setDeletingTask(true)

        deleteTaskOnServer(boardId, task?._id, (error, success) => {
            if (success) {
                setTasks(prevTasks => {
                    if (!prevTasks) return prevTasks;

                    const statusGroup = prevTasks[task?.status] ?? [];

                    return {
                        ...prevTasks,
                        [task?.status]: [...statusGroup.filter(t => t._id !== task?._id)],
                    };
                });
            }
            if (error) {
                toast.error(error.message, {
                    richColors: true
                })
            }
            setDeletingTask(false)
        })
    }
    return (
        <Card className={cn(
            "max-w-[250px]",
            "group p-4 w-full bg-[#FFFFFF] dark:bg-muted",
            "gap-2",
            className
        )} style={style}>
            {/* badges */}
            <div className='-mt-2 w-full flex justify-end items-center gap-1'>
                {task?.assignedTo?._id === user?._id && <>
                    <Tooltip>
                        <TooltipTrigger>
                            <Badge className='bg-green-300'>For you</Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                            Assigned to you.
                        </TooltipContent>
                    </Tooltip>
                </>}
                {task?.priority && <>
                    <Tooltip>
                        <TooltipTrigger>
                            <Badge className={cn(
                                task?.priority === 'High' ? 'bg-green-400' : task?.priority === 'Medium' ? 'bg-blue-500' : 'bg-white'
                            )}>{task?.priority}</Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                            {task?.priority} priority task.
                        </TooltipContent>
                    </Tooltip>
                </>}
                {task?.createdBy._id === user?._id && <>
                    <Tooltip>
                        <TooltipTrigger>
                            <Badge variant='outline'>By you</Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                            Created by you.
                        </TooltipContent>
                    </Tooltip>
                </>}
                {/* task options */}
                {hideOptBtn ? null : <TaskOptionDropdown deletingTask={deletingTask} setTaskOptionAction={setTaskOptionAction} setIsDeleteAlertDialogOpen={setIsDeleteAlertDialogOpen} task={task} />}

                {/* Delete task alert dialog box popup */}
                <AlertDialogPopup data-no-drag open={isDeleteAlertDialogOpen} onOpenChange={setIsDeleteAlertDialogOpen} alertTitle='Are you absolutely sure?' alertDescription='This action cannot be undone. This will permanently delete this task.' continueVerient='Destructive' continueBtnText='Delete' onContinue={handleDeleteTask} />

                {/* Dialog boxes for edit task */}
                <TaskDialogBoxes setTaskOptionAction={setTaskOptionAction} task={task} action={taskOptionAction} />
            </div>
            {/* title */}
            <CardTitle className='w-full'>
                {task?.title.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
            </CardTitle>
            {/* description */}
            <CardDescription className='w-full line-clamp-3 hover:line-clamp-none'>
                {task?.description}
            </CardDescription>
            <div className='text-sm'>
                {/* Assigned to */}
                <Tooltip>
                    <TooltipTrigger>
                        <span className='text-[13px]'>Assigned to: </span>
                        <span className='text-[15px]'>{task?.assignedTo?.name}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                        Assigned to {task?.assignedTo?._id === user?._id ? 'you.' : task?.assignedTo?.name}
                    </TooltipContent>
                </Tooltip>
            </div>
            <CardDescription className='[&>div]:flex [&>div]:gap-1 [&_p]:text-primary [&_span]:text-[13px] [&_p]:text-[15px] [&_p]:font-semibold hidden group-hover:block'>
                <div>
                    <span>Last Updated: </span>
                    <p>{toLocalDateOnly(task?.updatedAt)}</p></div>
                <div>
                    <span>Last Updated by: </span>
                    <p>{task?.lastEditedBy?.name}</p></div>
                <div>
                    <span>Created at: </span>
                    <p>{toLocalDateOnly(task?.createdAt)}</p></div>
                <div>
                    <span>Created by: </span>
                    <p>{task?.createdBy.name}</p></div>
            </CardDescription>
        </Card >
    )
}

export default TaskCard
