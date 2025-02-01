import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ChatSidebar from "./components/ChatSidebar";
import ChatSection from "./components/ChatSection";

function Chat() {
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const location = useLocation();

    const handleSelectChat = (chat) => {
        setSelectedChat(chat);
        setMessages(chat.messages || []);
    };

    return (
        <div className="flex h-screen bg-slate-900 text-white">
            {/* Sidebar */}
            <div className="w-1/3 border-r border-slate-700">
                <ChatSidebar onSelectChat={handleSelectChat} />
            </div>

            {/* Chat Section */}
            <div className="flex-1">
                {selectedChat ? (
                    <ChatSection
                        activeChat={activeChat} // Pass activeChat here
                        messages={messages} // Ensure messages are passed too
                        onSendMessage={handleSendMessage} // Callback for sending messages
                        onAttachImage={handleAttachImage} // Callback for attaching images
                    />

                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        <p>Select a chat to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Chat;
