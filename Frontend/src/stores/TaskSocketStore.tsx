import { TaskAiSocket } from '@/sockets/namespace/taskAiSocket';
import type { TaskSocketContextType } from '@/types.socket';
import React, { createContext, useEffect, useState } from 'react'

export const TaskSocketContext = createContext<TaskSocketContextType | undefined>(undefined)

const TaskSocketStore = ({ children }: { children: React.ReactNode }) => {
    const [taskAiThinking, setTaskAiThinking] = useState<TaskSocketContextType['taskAiThinking']>(false)
    const [taskAiChunkReply, setTaskAiChunkReply] = useState<TaskSocketContextType['taskAiChunkReply']>()
    const [aiTaskChats, setAiTaskChats] = useState<TaskSocketContextType['aiTaskChats']>([])

    // Socket events listeners
    useEffect(() => {
        // Connect task_ai name space
        TaskAiSocket.connect()

        // Task AI reply on chunks
        TaskAiSocket.on('task_ai_chunk_reply', (data) => {
            console.log(data)
            setAiTaskChats((prev) => {
                let updated = [...prev]
                let lastMsg = updated[updated.length - 1]
                if (lastMsg.role === 'other') {
                    lastMsg.message += data?.chunkReply
                }
                return updated
            })
            setTaskAiThinking(false)
        })

        // Task AI thinking
        TaskAiSocket.on('task_ai_thinking', () => {
            setTaskAiThinking(true)
        })

        // Task AI finished thinking
        TaskAiSocket.on('task_ai_finished_thinking', () => {
            setTaskAiThinking(false)
        })

        return () => {
            TaskAiSocket.off('task_ai_chunk_reply')
        }
    }, []);

    // Fn for ai assistance in task
    const askTaskAi: TaskSocketContextType['askTaskAi'] = (taskId, prompt) => {
        // blank dummy ai reponse
        setAiTaskChats((prev) => [...prev, { _id: 'unknown', message: '', role: 'other', taskId, userId: 'unknown', createdAt: new Date }])

        console.log('askTaskAi invocked.')
        TaskAiSocket.newMessage({ taskId, prompt })
    }

    return (
        <TaskSocketContext.Provider value={{ askTaskAi, taskAiThinking, taskAiChunkReply,setTaskAiChunkReply, aiTaskChats, setAiTaskChats }}>
            {children}
        </TaskSocketContext.Provider>
    )
}

export default TaskSocketStore
