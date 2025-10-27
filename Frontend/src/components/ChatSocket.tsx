import React, { useEffect, useState } from "react";
import { BoardSocket } from "../sockets/namespace/boardSocket";
import type { MessagePayload } from "../types.socket";

interface ChatRoomProps {
    room: string;
    username: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ room, username }) => {
    const [messages, setMessages] = useState<MessagePayload[]>([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        BoardSocket.connect();
        BoardSocket.joinRoom({ room, username });

        BoardSocket.on("new-message", (data: MessagePayload) => {
            setMessages((prev) => [...prev, data]);
        });

        BoardSocket.on("user-joined", (data) => {
            console.log("User joined:", data);
        });

        BoardSocket.on("user-left", (data) => {
            console.log("User left:", data);
        });

        return () => {
            BoardSocket.leaveRoom({ room, username });
            BoardSocket.disconnect();
        };
    }, [room, username]);

    const handleSend = () => {
        if (!input.trim()) return;
        BoardSocket.sendMessage({ room, username, message: input });
        setInput("");
    };

    return (
        <div className="chat-room">
            <h3>Room: {room}</h3>
            <div
                style={{
                    border: "1px solid #ccc",
                    height: 200,
                    overflowY: "auto",
                    padding: "10px",
                    marginBottom: "10px",
                }}
            >
                {messages.map((msg, i) => (
                    <p key={i}>
                        <strong>{msg.username}:</strong> {msg.message}
                    </p>
                ))}
            </div>

            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default ChatRoom;
