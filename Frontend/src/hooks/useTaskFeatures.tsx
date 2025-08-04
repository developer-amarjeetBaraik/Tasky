import { TaskContext } from '@/stores/TaskStore'
import React, { useContext } from 'react'

const useTaskFeatures = () => {
    const context = useContext(TaskContext)
    if (context === undefined) throw new Error("useTaskFeatures must be used within a TaskStore.")
    return context
}

export default useTaskFeatures
