import BoardSidebar from '@/components/BoardSidebar'
import KanbanBoard from '@/components/KanbanBoard'
import AppLogo from '@/components/ui/AppLogo'
import { Button } from '@/components/ui/button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { ModeToggle } from '@/components/ui/mode-toggle'
import ProfileMenu from '@/components/ui/ProfileMenu'
import { useBoardFeatures } from '@/hooks/useBoardFeatures'
import { useUserAuth } from '@/hooks/useUserAuth'
import { BoardSocket } from '@/sockets/namespace/boardSocket'
import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

const BoardPage = () => {
    const { boardId } = useParams()
    const { boardLoading, activeBoard, isConnectedToBoradSocket, joinBoardRoom } = useBoardFeatures()
    const { user } = useUserAuth()
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

    // joining room
    useEffect(() => {
        if (!boardId || !user) return

        !isConnectedToBoradSocket && joinBoardRoom(boardId)

        // handle when user change tab or close browser
        const handlevisibilitychange = () => {
            if (document.hidden) {
                BoardSocket.leaveRoom({ boardId, userId: user?._id })
            }

            if (!document.hidden && !isConnectedToBoradSocket) {
                console.log('invocked')
                joinBoardRoom(boardId)
            }
        }

        // event listener for user change tab or close browser
        window.addEventListener('visibilitychange', handlevisibilitychange)

        return () => {
            window.removeEventListener('visibilitychange', handlevisibilitychange)
        }
    }, [])

    return (<>
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
                    <BoardSidebar defaultTab='inbox' collapseSidebar={isSidebarCollapsed} setIsSidebarCollapsed={setIsSidebarCollapsed} />
                    {/* Kanban board */}
                    <KanbanBoard board={activeBoard} isSidebarCollapsed={isSidebarCollapsed} setIsSidebarCollapsed={setIsSidebarCollapsed} className=' flex-1' />
                </div>
            </div>}
    </>
    )
}

export default BoardPage
