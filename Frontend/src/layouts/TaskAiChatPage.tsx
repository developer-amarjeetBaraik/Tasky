import TaskAiChatBox from '@/components/TaskAiChatBox'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import TaskCard from '@/components/ui/TaskCard'
import useTaskFeatures from '@/hooks/useTaskFeatures'

const TaskAiChatPage = () => {
    const { taskAiChatsLoading, activatedAiTask } = useTaskFeatures()

    return (
        <div className="w-full grid grid-cols-[0.8fr_2fr] h-screen gap-4 p-4 ">
            {/* Left section */}
            <div className="grid grid-rows-[auto_1fr] gap-4">
                {/* Top-left: Task Card */}
                <div className="bg-gray-600 flex flex-col justify-center rounded-2xl shadow p-4 border border-gray-200">
                    {
                        taskAiChatsLoading || !activatedAiTask ? <LoadingSpinner /> : <>
                            <h2 className="text-lg font-semibold mb-2">Task Card</h2>
                            <TaskCard className='self-center' task={activatedAiTask} hideOptBtn />
                        </>
                    }

                </div>

                {/* Bottom-left: Task Notes */}
                <div className="bg-gray-600 flex flex-col flex-1 rounded-2xl shadow p-4 border border-gray-200 overflow-y-auto">
                    <h3 className="text-lg font-semibold mb-2">Task Notes</h3>
                    {
                        taskAiChatsLoading ? <LoadingSpinner /> : <div className='flex justify-center flex-1'>
                            <p className="text-sm text-gray-100">
                                Notes and additional information related to this task go here.
                            </p>
                        </div>
                    }
                </div>
            </div>

            {/* Right section: AI Chat */}
            <div className="bg-gray-600 max-h-[80%] rounded-2xl shadow p-4 border border-gray-200 flex justify-center flex-col">
                <TaskAiChatBox className='h-[80%]' />
            </div>
        </div>
    );
}

export default TaskAiChatPage
