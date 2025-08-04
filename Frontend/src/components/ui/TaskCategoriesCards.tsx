import type { TaskContextType } from '@/types'
import TaskCard from './TaskCard'
import useTaskFeatures from '@/hooks/useTaskFeatures'
import LoadingSpinner from './LoadingSpinner'
import { useTheme } from './theme-provider'
import OptionBtn from './OptionBtn'

const TaskCategoriesCards = ({ tasks }: { tasks: TaskContextType['tasks'] }) => {
    const { taskLoading } = useTaskFeatures()
    return (
        taskLoading ? <LoadingSpinner className='w-full h-full' /> :
            <div className='p-3 flex-1 pb-8 w-full h-full flex items-start justify-start gap-4 overflow-y-hidden'>
                {
                    (Object.entries(tasks!)).map((i) => (
                        // category card
                        <div key={i[0]} className='p-1.5 h-full min-w-[270px] max-w-[280px] w-1/4 bg-[#F1F2F4] flex flex-col items-center gap-1.5 rounded-lg dark:bg-black'>
                            {/* categories header */}
                            <div className='w-full px-1.5 flex justify-between items-center'>
                                <span>{i[0]}</span>
                                <OptionBtn/>
                            </div>
                            <div className='p-1 w-full flex-1 flex flex-col items-center gap-1.5 overflow-y-auto custom-scrollbar'>
                                {
                                    i[1]?.map((task) => (
                                        <TaskCard key={task._id} task={task} />
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
    )
}

export default TaskCategoriesCards
