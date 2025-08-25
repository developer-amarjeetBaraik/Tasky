import { useUserAuth } from '@/hooks/useUserAuth'
import type { taskType, TaskContextType, callbackSuccessType, callbackErrorType } from '@/types'
import React, { createContext, useEffect, useState, type ReactNode } from 'react'
import useFormSchemas from '../schemas/useFormSchemas.tsx'
import { toast } from 'sonner'

export const TaskContext = createContext<TaskContextType | undefined>(undefined)

const TaskStore = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated } = useUserAuth()
    const { addTaskFormSchema } = useFormSchemas()
    const [tasks, setTasks] = useState<TaskContextType["tasks"] | null>(null)
    const [taskLoading, setTaskLoading] = useState<boolean>(true)

    // Fetch all tasks
    const fetchAllTasks: TaskContextType['fetchAllTasks'] = (boardId) => {
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
                        console.log(res.tasks)
                        setTasks(res.tasks)
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

    // Add task
    const addTaskOnServer: TaskContextType['addTaskOnServer'] = (boardId, taskInfo, callback) => {
        const formData = addTaskFormSchema.safeParse(taskInfo)
        if (!formData.success || !boardId || !taskInfo) {
            return callback({ error: formData.error, message: 'Something went wrong.' }, null)
        }


        fetch(`/api/board/${boardId}/task/create-task`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskInfo)
        }).then(res => res.json())
            .then(res => {
                if (res.statusCode === 201) {
                    callback(null, { message: res.message, res })
                } else {
                    callback(res, null)
                }
            })
            .catch(() => callback({ message: 'Something went wrong.' }, null))
    }

    // delete task
    const deleteTaskOnServer: TaskContextType['deleteTaskOnServer'] = (boardId, taskId, callback) => {
        fetch(`/api/board/${boardId}/task/${taskId}/delete-task`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(res => {
                callback(null, {message:'Deleted successfully',res:res})
            })
            .catch(err => {
                callback({
                    message: 'Someting went wrong', metaData: {
                        taskId: taskId
                    }
                }, null)
                console.log(err)
            })
    }

    // Change status
    const changeStatusOnServer: TaskContextType['changeStatusOnServer'] = (boardId, taskId, oldStatus, newStatus, callback) => {
        fetch(`/api/board/${boardId}/task/${taskId}/change-status?newStatus=${newStatus}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .catch(err => {
                callback({
                    message: "Faild to change status.", metaData: {
                        oldStatus,
                        taskId
                    }
                }, null)
                console.log(err)
            })
    }

    // Change status
    const changePriorityOnServer: TaskContextType['changePriorityOnServer'] = (boardId, taskId, newPriority, callback) => {
        fetch(`/api/board/${boardId}/task/${taskId}/change-priority?newPriority=${newPriority}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .catch(err => {
                callback({
                    message: "Faild to change priority.", metaData: {
                        taskId
                    }
                }, null)
                console.log(err)
            })
    }
    return (
        <TaskContext.Provider value={{ tasks, setTasks, taskLoading, fetchAllTasks, addTaskOnServer, deleteTaskOnServer, changeStatusOnServer, changePriorityOnServer }}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskStore
