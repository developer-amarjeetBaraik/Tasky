import React from 'react'

const TaskAiChatBox = () => {
    return (<>

        <h2 className="text-lg font-semibold mb-2">Task AI Assistant</h2>
        <div className="flex-1 overflow-y-auto bg-gray-50 rounded-lg p-3">
            {/* AI Chat messages go here */}
            <p className="text-gray-600 text-sm">Chat messages appear here...</p>
        </div>
        <div className="mt-3 flex items-center gap-2">
            <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Send
            </button>
        </div>
    </>
    )
}

export default TaskAiChatBox
