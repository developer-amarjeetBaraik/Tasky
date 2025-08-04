import { cn } from '@/lib/utils'
import { useTheme } from './theme-provider'

const OptionBtn = ({ className }: { className?: string }) => {
    const { theme } = useTheme()
    return (<>
        <svg xmlns="http://www.w3.org/2000/svg" fill={theme === 'dark' ? 'white' : 'black'} className={cn(
            "p-1 w-[24px] h-[24px] rounded-full hover:bg-gray-400",
            className
        )} viewBox="0 0 16 16" height="16" width="16">
            <path d="M9.5 13a1.5 1.5 0 1 1 -3 0 1.5 1.5 0 0 1 3 0m0 -5a1.5 1.5 0 1 1 -3 0 1.5 1.5 0 0 1 3 0m0 -5a1.5 1.5 0 1 1 -3 0 1.5 1.5 0 0 1 3 0" strokeWidth="1"></path>
        </svg>
    </>
    )
}

export default OptionBtn
