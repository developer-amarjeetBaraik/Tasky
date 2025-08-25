import { useParams } from 'react-router-dom'
import type { TaskContextType, taskType } from '@/types'
import { DndContext, DragOverlay, type DragEndEvent, type DragMoveEvent, type DragOverEvent, type DragStartEvent, type UniqueIdentifier } from '@dnd-kit/core'
import TaskCard from './TaskCard'
import DraggableItem from '@/helpers/DraggableItem'
import DroppablePlace from '@/helpers/DroppablePlace'
import useTaskFeatures from '@/hooks/useTaskFeatures'
import LoadingSpinner from './LoadingSpinner'
import OptionBtn from './OptionBtn'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const TaskCategoriesCards = ({ tasks }: { tasks: TaskContextType['tasks'] }) => {
    const { boardId } = useParams()
    const { fetchAllTasks, setTasks, taskLoading, changeStatusOnServer } = useTaskFeatures()
    const [isDraggingId, setIsDraggingId] = useState<UniqueIdentifier | null>(null)
    const [dragActiveTask, setDragActiveTask] = useState<taskType | null>(null)
    const [dropDisabled, setDropDisabled] = useState<boolean>(false)

    // Drag start handler
    function handleDragStart(event: DragStartEvent) {
        setIsDraggingId(event.active.id)
        setDragActiveTask(tasks?.[event.active.data.current?.sourceDroppableId]?.filter(item => item._id === event.active.id)[0]!)
    }

    // Drag over on droppable handler
    function handleDragOver(event: DragOverEvent) {
        if (event.active.data.current?.sourceDroppableId !== event.over?.id) {
            setDropDisabled(true)
        } else {
            setDropDisabled(false)
        }
    }

    // Drag move handler
    function handleDragMove(event: DragMoveEvent) {
        if (!event.over?.id) {
            setDropDisabled(true)
        } else if (dragActiveTask?.status === event.over?.id) {
            setDropDisabled(true)
        } else if (dragActiveTask?.status !== event.over?.id) {
            setDropDisabled(false)
        }
    }

    // Drag end handler
    async function handleDragEnd(event: DragEndEvent) {
        setIsDraggingId(null)
        setDragActiveTask(null)
        const draggedTaskId = event.active.id;
        const sourceContainerId = event.active.data.current?.sourceDroppableId;
        const destinationContainerId = event.over?.id;

        if (sourceContainerId === destinationContainerId) return

        if (!sourceContainerId || !destinationContainerId || !tasks) return;

        setTasks(prevTasks => {
            if (!prevTasks) return prevTasks;

            const sourceTasks = prevTasks[sourceContainerId] ?? [];
            const destTasks = prevTasks[destinationContainerId] ?? [];

            // Find the dragged task in the source array
            let draggedTask = sourceTasks.find(task => task._id === draggedTaskId);
            if (!draggedTask) return prevTasks;
            draggedTask.status = destinationContainerId.toString()


            return {
                ...prevTasks,
                [sourceContainerId]: sourceTasks.filter(task => task._id !== draggedTaskId), // remove from source
                [destinationContainerId]: [draggedTask, ...destTasks],                        // add to destination
            };
        });

        changeStatusOnServer(boardId, draggedTaskId.toString(), sourceContainerId, destinationContainerId.toString(), (error, success) => {
            if (error) {
                fetchAllTasks(boardId!)
                toast.error(`Faild to change the status of task id: ${error.metaData.taskId}`, {
                    richColors: true
                })
            }

            if (success) {
                return console.log(success)
            }
        })
    }

    return (
        taskLoading ? <LoadingSpinner className='w-full h-full' /> :
            /* Provided DndContext to use drag and drop functionality from dnd-kit */
            < DndContext
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}>
                <div className={cn(
                    'p-3 flex-1 pb-8 w-full h-full flex items-start justify-start gap-4 overflow-y-hidden',
                    dropDisabled && dragActiveTask ? 'cursor-not-allowed' : 'cursor-default'
                )}>
                    {
                        (Object.entries(tasks!)).map((i) => (
                            // category card
                            <DroppablePlace dropDisabled={dropDisabled} key={i[0]} id={i[0]}>
                                <div key={i[0]} className={cn(
                                    'p-1.5 max-h-full min-w-[270px] max-w-[280px] w-1/4 bg-[#F1F2F4] flex flex-col items-center gap-1.5 rounded-lg dark:bg-black',
                                )}>
                                    {/* categories header */}
                                    <div className='w-full px-1.5 flex justify-between items-center'>
                                        <span>{i[0]}</span>
                                        <OptionBtn />
                                    </div>
                                    <div className='p-1 min-h-10 w-full flex-1 flex flex-col items-center gap-1.5 overflow-y-auto overflow-x-hidden custom-scrollbar [&>div]:w-full'>
                                        {
                                            i[1]?.map((task) => (
                                                <DraggableItem isDraggingId={isDraggingId} containerId={i[0]} id={task._id} key={task._id}>
                                                    <TaskCard className='z-50' key={task._id} task={task} />
                                                </DraggableItem>
                                            ))
                                        }
                                    </div>
                                </div>
                            </DroppablePlace>
                        ))
                    }
                </div>
                {
                    dragActiveTask ? <DragOverlay
                        // className={cn(
                        //     'rotate-[8deg]'
                        // )}
                        dropAnimation={{
                            duration: 3000,
                            easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
                        }}>
                        <TaskCard className='cursor-grabbing' task={dragActiveTask} />
                    </DragOverlay> : null
                }

            </DndContext >
    )
}

export default TaskCategoriesCards
