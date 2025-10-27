import type { TaskSocketContextType } from '@/types'
import React, { createContext } from 'react'

export const TaskSocketContext = createContext<TaskSocketContextType | undefined>(undefined)

const TaskSocketStore = ({ children }: { children: React.ReactNode }) => {
    return (
        <TaskSocketContext.Provider value={{}}>
            {children}
        </TaskSocketContext.Provider>
    )
}

export default TaskSocketStore
