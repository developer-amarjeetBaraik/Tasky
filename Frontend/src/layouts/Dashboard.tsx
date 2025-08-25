import AppLogo from "@/components/ui/AppLogo"
import { ModeToggle } from "@/components/ui/mode-toggle"
import ProfileMenu from "@/components/ui/ProfileMenu"
import { BoardCard } from "@/components/ui/BoardCard"
import { useNavigate } from "react-router-dom"
import { useBoardFeatures } from "@/hooks/useBoardFeatures"
import { useTheme } from "@/components/ui/theme-provider"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import TextLogoConstructor from "@/components/ui/TextLogoConstructor"

const Dashboard = () => {
    const navigate = useNavigate()
    const { theme } = useTheme()
    const { boardLoading, boards } = useBoardFeatures()
    return (
        <div className="w-full h-full min-h-screen flex flex-col">
            <div className="flex justify-between items-center">
                <AppLogo />
                <span className="text-xl font-inter">Access your boards.</span>
                <span className="flex justify-between items-center gap-2.5">
                    <ModeToggle />
                    <ProfileMenu />
                </span>
            </div>
            {/* board cards */}
            {
                boards ? <div className="mt-4 flex gap-2.5 flex-wrap">
                    {
                        boards?.map(board => (
                            <BoardCard key={board._id} className="cursor-pointer" board={board} onClick={() => navigate(`/board/${board._id}`)} />
                        ))
                    }
                </div> : <div className="text-2xl flex-1 flex justify-center items-center">
                    {
                        boardLoading ? <LoadingSpinner /> : <p>There is no boards yet! create your first board.</p>
                    }

                </div>
            }

        </div>
    )
}

export default Dashboard
