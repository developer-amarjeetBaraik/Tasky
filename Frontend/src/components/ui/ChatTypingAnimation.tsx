const ChatTypingAnimation = ({ variant = 'bold' }: { variant?: 'thin' | 'bold' | 'ai-thinking' }) => {
    return (
        <>{
            variant === "thin" ? <div className="flex items-center gap-1 text-neutral-200 italic">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-100">.</span>
                <span className="animate-bounce delay-200">.</span>
            </div> : variant === 'bold' ? <div className="flex items-end gap-1 px-3 py-2">
                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" />
            </div> : variant === 'ai-thinking' ? <div className="text-sm italic text-neutral-400 px-3 py-2 animate-pulse">
                AI is thinking...
            </div> : null
        }
        </>
    )
}

export default ChatTypingAnimation
