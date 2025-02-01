import React from "react";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

function ChatSection({ activeChat, messages, onSendMessage, onAttachImage }) {
    if (!activeChat) {
        return (
            <div className="flex items-center justify-center h-full text-gray-400">
                Select a chat to start messaging
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            {/* Chat Header */}
            <ChatHeader activeChat={activeChat} />

            {/* Messages Section */}
            <div className="flex-grow overflow-y-auto p-4">
                {messages.map((msg, index) => (
                    <MessageBubble
                        key={index}
                        message={msg}
                        isMine={msg.sender === activeChat.myEmail} // Adjust based on your structure
                    />
                ))}
            </div>

            {/* Chat Input */}
            <ChatInput onSendMessage={onSendMessage} onAttachImage={onAttachImage} />
        </div>
    );
}

export default ChatSection;
