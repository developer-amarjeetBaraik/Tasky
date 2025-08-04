import { Avatar, AvatarFallback } from './avatar'
import type { boardUserType } from '@/types'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'
import { cn } from '@/lib/utils'
import { useTheme } from './theme-provider'

const UsersAvatarHorizontal = ({ users, displayLimit, hideMoreBtn }: { users: Array<boardUserType> | undefined, displayLimit?: number, hideMoreBtn?: boolean }) => {
    const { theme } = useTheme()
    const totalUser = users?.length
    if (displayLimit && displayLimit < users?.length!) {
        users = users?.slice(0, displayLimit)
    }
    return (
        <div className={cn(
            "*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale",
            "text-black dark:text-white"
        )}>
            {
                users?.map((user) => (
                    <Tooltip key={user._id}>
                        <TooltipTrigger>
                            <Avatar>
                                <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                            {user.name}
                        </TooltipContent>
                    </Tooltip>
                ))
            }
            {
                (totalUser! > displayLimit!) && !hideMoreBtn ? <Tooltip>
                    <TooltipTrigger>
                        <Avatar>
                            <AvatarFallback><svg xmlns="http://www.w3.org/2000/svg" className='p-2' fill={theme === 'light' ? "#000000" : 'white'} width="800px" height="800px" viewBox="0 0 24 24"><path d="M12,10a2,2,0,1,1-2,2A2,2,0,0,1,12,10ZM4,14a2,2,0,1,0-2-2A2,2,0,0,0,4,14Zm16-4a2,2,0,1,0,2,2A2,2,0,0,0,20,10Z" /></svg></AvatarFallback>
                        </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                        More users
                    </TooltipContent>
                </Tooltip> : null
            }
        </div>
    )
}

export default UsersAvatarHorizontal
