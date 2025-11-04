import TaskAiChatBox from '@/components/TaskAiChatBox'
import TaskNote from '@/components/TaskNote'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import TaskCard from '@/components/ui/TaskCard'
import useTaskFeatures from '@/hooks/useTaskFeatures'
import { useUserAuth } from '@/hooks/useUserAuth'
import type { taskType } from '@/types'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const TaskAiChatPage = () => {
    const [activatedAiTask, setActivatedAiTask] = useState<taskType>()
    const [chats, setChats] = useState<[] | null>(null)
    const { taskAiChatsLoading, fetchTaskAiChat } = useTaskFeatures()
    const { user } = useUserAuth()
    const { taskId } = useParams()


    useEffect(() => {
        if (!taskId || !user) return
        fetchTaskAiChat(taskId, user?._id, (error, success) => {
            if (success) {
                console.log(success)
                setActivatedAiTask(success.task)
                setChats(success.chats)
            }
        })
    }, [])
    return (
        !activatedAiTask || !chats ? null :
            <div className="w-full grid grid-cols-[0.8fr_2fr] h-screen gap-4 p-4 ">
                {/* Left section */}
                <div className="grid grid-rows-[auto_1fr] gap-4">
                    {/* Top-left: Task Card */}
                    <div className="bg-gray-600 flex flex-col justify-center rounded-2xl shadow p-4 border border-gray-200">
                        {
                            taskAiChatsLoading ? <LoadingSpinner /> : <>
                                <h2 className="text-lg font-semibold mb-2">Task Card</h2>
                                <TaskCard className='self-center' task={activatedAiTask} hideOptBtn/>
                            </>
                        }

                    </div>

                    {/* Bottom-left: Task Notes */}
                    <div className="bg-gray-600 flex justify-center rounded-2xl shadow p-4 border border-gray-200 overflow-y-auto">
                        {
                            taskAiChatsLoading ? <LoadingSpinner /> : <>
                                <h3 className="text-lg font-semibold mb-2">Task Notes</h3>
                                <p className="text-sm text-gray-600">
                                    Notes and additional information related to this task go here.
                                </p>
                            </>
                        }
                    </div>
                </div>

                {/* Right section: AI Chat */}
                <div className="bg-gray-600 rounded-2xl shadow p-4 border border-gray-200 flex justify-center flex-col">
                    {taskAiChatsLoading ? <LoadingSpinner /> : <TaskAiChatBox />}
                </div>
            </div>
    );
}

export default TaskAiChatPage
