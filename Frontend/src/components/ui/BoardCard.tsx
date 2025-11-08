import type { board } from "@/types"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils' // shadcn utility function
import { useUserAuth } from '@/hooks/useUserAuth'
import { Button } from "./button"
import { useNavigate } from "react-router-dom"
import OptionBtn from "./OptionBtn"


export const BoardCard = ({ board, className, onClick }: { board: board, className?: string, onClick?: React.ReactEventHandler }) => {
    const navigate = useNavigate()
    const { user } = useUserAuth()
    return (
        <Card
            className={cn(
                'w-[300px] h-auto relative transition-all duration-300 ease-in-out overflow-hidden hover:shadow-lg group bg-cream-light dark:bg-card',
                'h-[150px] hover:h-[260px]',
                className
            )}
            onClick={onClick}
        >
            {/* three dots */}
            <div className="absolute top-1 right-1">
                <DropdownMenu>
                    <DropdownMenuTrigger onClick={(event) => event.stopPropagation()}>
                        <OptionBtn/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent onClick={(event)=> event.stopPropagation()} className="dark:bg-muted" align="end">
                        <DropdownMenuItem>
                            <Button className="w-full cursor-pointer" variant='default' onClick={()=>navigate(`/board/${board._id}`)}>Open</Button>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Button className="w-full cursor-pointer" variant='destructive'>Delete Board</Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {/* badges */}
            <div className="flex flex-wrap gap-1 absolute top-1 left-1">
                {/* Ownership badge */}
                {
                    user?._id === board.createdBy?._id ? <Badge className='bg-teal-400'>Own</Badge> : null
                }
                {/* Admin badge */}
                {
                    board?.admins?.map(i => (
                        i._id === user?._id ? <Badge key={i._id} className='bg-green-400' >Admin</Badge> : null
                    ))
                }
                {/* canEdit badge */}
                {
                    board?.canEdit?.map(i => (
                        i._id === user?._id ? <Badge key={i._id} variant="default">Can Edit</Badge> : null
                    ))
                }
            </div>

            <CardHeader>
                <CardTitle className="text-lg">{board.name}</CardTitle>
                <p className="text-sm text-muted-foreground truncate">{board._id}</p>
            </CardHeader>

            <CardContent className="space-y-2">
                <p className="text-sm line-clamp-2 group-hover:line-clamp-none">{board.description}</p>


                {/* Additional details shown only on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4 space-y-2">
                    {
                        <div className="text-xs text-muted-foreground">
                            <strong>Created by: </strong>{`${board.createdBy?.name}`}
                        </div>
                    }
                    {board.admins?.length && (
                        <div className="text-xs text-muted-foreground">
                            <strong>Admins:</strong>{' '}
                            {board.admins.map((admin) => admin.name).join(', ')}
                        </div>
                    )}
                    {board.createdAt && (
                        <div className="text-xs text-muted-foreground">
                            <strong>Created:</strong>{' '}
                            {new Date(board.createdAt).toLocaleDateString()}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
