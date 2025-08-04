import { useBoardFeatures } from '@/hooks/useBoardFeatures'
import { useUserAuth } from '@/hooks/useUserAuth'
import type { taskType, TaskContextType } from '@/types'
import React, { createContext, useEffect, useState, type ReactNode } from 'react'
import { toast } from 'sonner'

export const TaskContext = createContext<TaskContextType | undefined>(undefined)

const TaskStore = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated } = useUserAuth()
    const {activeBoard} = useBoardFeatures()
    const [tasks, setTasks] = useState<{ [key: string]: taskType[] | null } | null>(null)
    const [taskLoading, setTaskLoading] = useState<boolean>(true)

    const fetchAllTasks = (boardId: string) => {
        if (isAuthenticated) {
            setTaskLoading(true)

            fetch(`/api/board/${boardId}/task/all`, {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(res => res.json())
                .then(res => {
                    if (res.statusCode === 200) {
                        setTasks(res.tasks)
                        toast.success(res.message)
                    } else {
                        setTasks(null)
                        toast.error(res.message)
                    }
                }).catch(err => {
                    setTasks(null)
                    toast.error("Someting went wrong.")
                    console.log(err)
                }).finally(() => {
                    setTaskLoading(false)
                })
        }
    }
    return (
        <TaskContext.Provider value={{ tasks, taskLoading, fetchAllTasks }}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskStore
