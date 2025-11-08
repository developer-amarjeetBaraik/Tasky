const ChatMessageComponent = ({ message, messageBy, time }: { message: string, messageBy: 'user' | 'other', time: Date }) => {
    return (
        <div className={`flex ${messageBy === 'user' ? "justify-end" : "justify-start"} mb-2`}>
            <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-sm
          ${messageBy === 'user'
                        ? "bg-indigo-600 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
            >
                <p className="whitespace-pre-wrap">{message}</p>
                <div className={`text-[10px] mt-1 ${messageBy === 'user' ? "text-indigo-200" : "text-gray-500"} text-right`}>
                    {new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
            </div>
        </div>
    );
}

export default ChatMessageComponent
