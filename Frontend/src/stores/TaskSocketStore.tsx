import { TaskAiSocket } from '@/sockets/namespace/taskAiSocket';
import type { TaskSocketContextType } from '@/types.socket';
import React, { createContext, useEffect } from 'react'

export const TaskSocketContext = createContext<TaskSocketContextType | undefined>(undefined)

const TaskSocketStore = ({ children }: { children: React.ReactNode }) => {

    // Socket events listeners
    useEffect(() => {
        // Connect task_ai name space
        TaskAiSocket.connect()

        // Task AI reply on chunks
        TaskAiSocket.on('task_ai_chunk_reply', (data) => {
            console.log(data)
        })

    }, []);

    // Fn for ai assistance in task
    const askTaskAi: TaskSocketContextType['askTaskAi'] = (taskId, prompt) => {
        console.log('askTaskAi invocked.')
        TaskAiSocket.newMessage({ taskId, prompt })
    }

    // useEffect(() => {
    //     console.log('useEffect invocked.')
    //     askTaskAi('68e7811200a9bbfdc9ab383e', 'i want to build this app.')
    // }, [])

    

    return (
        <TaskSocketContext.Provider value={{ askTaskAi }}>
            {children}
        </TaskSocketContext.Provider>
    )
}

export default TaskSocketStore
