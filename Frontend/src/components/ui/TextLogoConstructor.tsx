import { cn } from '@/lib/utils'

const TextLogoConstructor = ({ className, text }: { className?: String, text: string }) => {
    return (
        <p className={cn("font-vibur text-black text-4xl whitespace-pre dark:text-white", className)}>{text}</p>
    )
}

export default TextLogoConstructor
