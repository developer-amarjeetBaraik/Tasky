import { cn, toLocalDateOnly } from '@/lib/utils'
import type { taskType } from '@/types'
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

const TaskCard = ({ task }: { task: taskType }) => {
    const { user } = useUserAuth()
    return (
        <Card className={cn(
            "p-4 w-full bg-[#FFFFFF] dark:bg-muted",
            "gap-2 cursor-default"
        )}>
            {/* badges */}
            <div className='-mt-2 w-full flex justify-end items-center gap-1'>
                {task.assignedTo._id === user?._id && <>
                    <Tooltip>
                        <TooltipTrigger>
                            <Badge className='bg-green-300'>For you</Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                            Assigned to you.
                        </TooltipContent>
                    </Tooltip>
                </>}
                {task.priority && <>
                    <Tooltip>
                        <TooltipTrigger>
                            <Badge className={cn(
                                task.priority === 'High' ? 'bg-green-400' : task.priority === 'Medium' ? 'bg-blue-500' : 'bg-white'
                            )}>{task.priority}</Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                            {task.priority} priority task.
                        </TooltipContent>
                    </Tooltip>
                </>}
                {task.createdBy._id === user?._id && <>
                    <Tooltip>
                        <TooltipTrigger>
                            <Badge variant='outline'>By you</Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                            Created by you.
                        </TooltipContent>
                    </Tooltip>
                </>}
            </div>
            <CardTitle className='w-full'>
                {task.title.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
            </CardTitle>
            <CardDescription className='w-full line-clamp-2 hover:line-clamp-none'>
                {task.description} ohasd iasodhf asidhf ashdifh asdjfi ashdfi asdhfias dfih sadhfosahdfi saidfhia  asdoif hioashf ihsdf  hasidf
            </CardDescription>
            <div className='text-sm'>
                {/* Assigned to */}
                <Tooltip>
                    <TooltipTrigger>
                        <span className='text-[13px]'>Assigned to: </span>
                        <span className='text-[15px] font-semibold'>{task.assignedTo.name}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                        Assigned to {task.assignedTo._id === user?._id ? 'you.' : task.assignedTo.name}
                    </TooltipContent>
                </Tooltip>
            </div>
            <CardDescription className='[&>div]:flex [&>div]:gap-1 [&_p]:text-primary [&_span]:text-[13px] [&_p]:text-[15px] [&_p]:font-semibold'>
                <div>
                    <span>Last Updated: </span>
                    <p>{toLocalDateOnly(task.updatedAt)}</p></div>
                <div>
                    <span>Last Updated by: </span>
                    <p>{task.lastEditedBy.name}</p></div>
                <div>
                    <span>Created at: </span>
                    <p>{toLocalDateOnly(task.createdAt)}</p></div>
                <div>
                    <span>Created by: </span>
                    <p>{task.createdBy.name}</p></div>
            </CardDescription>
        </Card >
    )
}

export default TaskCard
