import useTaskFeatures from '@/hooks/useTaskFeatures'
import { useUserAuth } from '@/hooks/useUserAuth'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingSpinner from './ui/LoadingSpinner'
import { Button } from './ui/button'
import ChatMessageComponent from './ui/ChatMessageComponent'
import ChatTypingAnimation from './ui/ChatTypingAnimation'
import { cn } from '@/lib/utils'

const TaskAiChatBox = ({ className }: { className?: string }) => {
    const { taskAiChatsLoading, fetchTaskAiChat, setActivatedAiTask, aiTaskChats, setAiTaskChats, askTaskAi, taskAiThinking, taskAiChunkReply } = useTaskFeatures()
    const { user } = useUserAuth()
    const { taskId } = useParams()
    const chatInputRef = useRef<HTMLInputElement>(null)
    const [newMessage, setNewMessage] = useState<string | null>(null)

    // Fetching task ai chats
    useEffect(() => {
        if (!taskId || !user) return
        fetchTaskAiChat(taskId, user?._id, (error, success) => {
            if (success) {
                console.log(success)
                setActivatedAiTask(success.task)
                setAiTaskChats(success.chats)
            } else {
                console.log(error)
            }
        })
    }, [])

    const handleSendClick = () => {
        if (!taskId || !newMessage || newMessage?.length < 3) return
        setAiTaskChats((prev) => [...prev, { _id: 'unknown', message: newMessage, role: 'user', taskId, userId: user?._id ?? "", createdAt: new Date }])

        askTaskAi(taskId, newMessage)
    }

    useEffect(() => {
        console.log(taskAiChunkReply)
    }, [taskAiChunkReply])

    return (<>
        <div className={cn(
            className,
            'flex-1 overflow-visible',
            'flex flex-col'
        )}>
            <h2 className="text-lg font-semibold mb-2">Task AI Assistant</h2>
            <div className="overflow-y-auto bg-gray-800 rounded-lg p-3 flex flex-col gap-2 flex-1 custom-scrollbar">
                {/* AI Chat messages go here */}
                {
                    !aiTaskChats || taskAiChatsLoading ? <LoadingSpinner /> : <>
                        {
                            aiTaskChats?.length < 1 ? <p className="text-gray-50 text-sm">There is no chats to display.</p> : <>
                                {aiTaskChats.map((msg, index) => {
                                    return msg.message.length > 0 ? <ChatMessageComponent key={index} message={msg?.message} messageBy={msg?.role === "user" ? 'user' : 'other'} time={msg.createdAt} /> : null
                                })}
                                {
                                    taskAiThinking ? <ChatTypingAnimation /> : null
                                }
                                {taskAiChunkReply ? <ChatMessageComponent message={taskAiChunkReply} messageBy='other' time={new Date} /> : null}
                            </>
                        }
                    </>
                }
            </div>
            <div className="mt-3 flex items-center gap-2">
                <input
                    ref={chatInputRef}
                    onChange={() => setNewMessage(`${chatInputRef.current?.value}`)}
                    type="text"
                    placeholder="Type your newMessage..."
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <Button disabled={!newMessage || newMessage?.length < 3} onClick={handleSendClick} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Send
                </Button>
            </div>
        </div>
    </>
    )
}

export default TaskAiChatBox
