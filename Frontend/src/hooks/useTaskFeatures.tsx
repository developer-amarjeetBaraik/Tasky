import { TaskSocketContext } from '@/stores/TaskSocketStore'
import { TaskContext } from '@/stores/TaskStore'
import { useContext } from 'react'

const useTaskFeatures = () => {
    const taskCtx = useContext(TaskContext)
    const TaskSocketCtx = useContext(TaskSocketContext)
    if (taskCtx === undefined) throw new Error("useTaskFeatures must be used within a TaskStore.")
    if (TaskSocketCtx === undefined) throw new Error("useTaskFeatures must be used within a TaskSocketStore.")
    return { ...taskCtx, ...TaskSocketCtx }
}

export default useTaskFeatures