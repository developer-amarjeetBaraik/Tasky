import { Avatar, AvatarFallback } from './avatar'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import type { boardUserType } from '@/types'
import MissingPropError from '@/errors/MissingPropError'

const UserAvatar = ({ user }: { user: boardUserType | undefined }) => {
    if (!user) {
        throw new MissingPropError("UserAvatar", "user")
    }
    return (
        <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
            <Tooltip>
                <TooltipTrigger>
                    <Avatar>
                        <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                    {
                        user.name
                    }
                </TooltipContent>
            </Tooltip>
        </div>
    )
}

export default UserAvatar
