import BoardSidebar from '@/components/BoardSidebar'
import KanbanBoard from '@/components/KanbanBoard'
import AppLogo from '@/components/ui/AppLogo'
import { Button } from '@/components/ui/button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { ModeToggle } from '@/components/ui/mode-toggle'
import ProfileMenu from '@/components/ui/ProfileMenu'
import { useTheme } from '@/components/ui/theme-provider'
import { useBoardFeatures } from '@/hooks/useBoardFeatures'
import { NavLink } from 'react-router-dom'
import { Toaster } from 'sonner'

const BoardPage = () => {
    const { theme } = useTheme()
    const { boardLoading, activeBoard } = useBoardFeatures()
    return (<>
        <Toaster theme={theme} richColors />
        {boardLoading || !activeBoard ? <LoadingSpinner /> :
            <div className='-mt-2.5 w-full max-h-screen h-screen flex flex-col'>
                {/* board navbar */}
                <div className='mt-2.5 flex justify-between items-center'>
                    <AppLogo />
                    <span className='flex gap-2.5'>
                        <NavLink to='/dashboard'>
                            <Button>Dashboard</Button>
                        </NavLink>
                        <ModeToggle />
                        <ProfileMenu />
                    </span>
                </div>

                {/* kanban board div */}
                <div className='mt-2.5 pb-8 w-full flex-1 flex gap-2.5 overflow-y-auto'>
                    {/* add task div */}
                    <BoardSidebar />
                    {/* Kanban board */}
                    <KanbanBoard board={activeBoard} className=' flex-1' />
                </div>
            </div>}
    </>
    )
}

export default BoardPage
