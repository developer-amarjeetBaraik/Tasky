import { useUserAuth } from '@/hooks/useUserAuth'
import type { TaskContextType } from '@/types'
import { createContext, useState, type ReactNode } from 'react'
import useFormSchemas from '../schemas/useFormSchemas.tsx'
import { toast } from 'sonner'

export const TaskContext = createContext<TaskContextType | undefined>(undefined)

const TaskStore = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated } = useUserAuth()
    const { addTaskFormSchema } = useFormSchemas()
    const [activeTask, setActiveTask] = useState<TaskContextType['activeTask']>(null)
    const [tasks, setTasks] = useState<TaskContextType["tasks"] | null>(null)
    const [taskLoading, setTaskLoading] = useState<boolean>(true)
    const [activatedAiTask, setActivatedAiTask] = useState<TaskContextType['activatedAiTask']>()
    const [aiTaskChats, setAiTaskChats] = useState<TaskContextType['aiTaskChats']>([])
    const [taskAiChatsLoading, setTaskAiChatsLoading] = useState<TaskContextType["taskAiChatsLoading"]>(true)

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
                callback(null, { message: 'Deleted successfully', res: res })
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

    // Change title
    const changeTitleOnServer: TaskContextType['changeTitleOnServer'] = (boardId, taskId, oldTitle, newTitle, callback) => {
        const isValidTitle = addTaskFormSchema.pick({ title: true }).safeParse({ 'title': newTitle })
        if (!isValidTitle.success) {
            return callback({ message: 'Invalid task title input.' }, null)
        }

        fetch(`/api/board/${boardId}/task/${taskId}/change-title?newTitle=${isValidTitle.data.title}&oldTilte=${oldTitle}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(res => {
                if (res.statusCode === 200) {
                    return callback(null, { message: 'Task title changed sucessfully.', res })
                }
                callback({ message: res.message, res }, null)
            }).catch(err => {
                console.log(err)
                callback({ message: 'Someting went wrong with task title change.' }, null)
            })
    }

    // Change description
    const changeDescriptionOnServer: TaskContextType['changeDescriptionOnServer'] = (boardId, taskId, oldDescription, newDescription, callback) => {
        const isValidDescription = addTaskFormSchema.pick({ description: true }).safeParse({ 'description': newDescription })
        if (!isValidDescription.success) {
            return callback({ message: 'Invalid task description input.' }, null)
        }

        fetch(`/api/board/${boardId}/task/${taskId}/change-description?newDescription=${isValidDescription.data.description}&oldDescription=${oldDescription}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(res => {
                if (res.statusCode === 200) {
                    return callback(null, { message: 'Task description changed sucessfully.', res })
                }
                callback({ message: res.message, res }, null)
            }).catch(err => {
                console.log(err)
                callback({ message: 'Someting went wrong with task description change.' }, null)
            })
    }

    // Change task assigned
    const assignSomeoneOnServer: TaskContextType['assignSomeoneOnServer'] = (boardId, taskId, assginTo, callback) => {
        fetch(`/api/board/${boardId}/task/${taskId}/assign-to?assignTo=${assginTo}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.statusCode === 200) {
                    return callback(null, { message: 'Task assigned to someone sucessfully.', res })
                }
                callback({ message: res.message, res }, null)
            }).catch(err => {
                console.log(err)
                callback({ message: 'Someting went wrong with assigning task to somesome.' }, null)
            })
    }

    // Get task Ai chats
    const fetchTaskAiChat: TaskContextType['fetchTaskAiChat'] = (taskId, userId, callback) => {
        setTaskAiChatsLoading(true)
        try {
            fetch(`/api/ai/task/ai-chats?taskId=${taskId}&userId=${userId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(res => res.json())
                .then(res => {
                    setTaskAiChatsLoading(false)
                    if (res.statusCode === 200) {
                        callback(null, { task: res.task, chats: res.chats })
                    } else {
                        callback({ res, message: "Something went wrong." }, null)
                    }
                })
                .catch(err => {
                    setTaskAiChatsLoading(false)
                    console.log(err)
                    callback({ message: "Something went wrong." }, null)
                })
        } catch (error) {
            setTaskAiChatsLoading(false)
            console.log(error)
            callback({ message: "Something went wrong." }, null)
        }
    }

    return (
        <TaskContext.Provider value={{ activeTask, setActiveTask, tasks, setTasks, taskLoading, fetchAllTasks, addTaskOnServer, deleteTaskOnServer, changeStatusOnServer, changePriorityOnServer, changeTitleOnServer, changeDescriptionOnServer, assignSomeoneOnServer, taskAiChatsLoading, fetchTaskAiChat, activatedAiTask, setActivatedAiTask, aiTaskChats, setAiTaskChats }}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskStore
