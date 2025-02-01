import React from "react";

function ChatHeader({ activeChat }) {
    if (!activeChat) {
        return null; // If no chat is active, don't render the header
    }

    return (
        <div className="flex items-center bg-slate-900 p-4 shadow-md rounded-t-xl">
            {/* User Image */}
            <img
                src={activeChat.image || "https://via.placeholder.com/70"} // Fallback image
                alt={activeChat.name}
                className="w-[50px] h-[50px] rounded-full mr-3 object-cover"
            />
            {/* User Name */}
            <div>
                <h2 className="font-bold text-xl">{activeChat.name}</h2>
                <p className="text-gray-400 text-sm">Last seen recently</p>
            </div>
        </div>
    );
}

export default ChatHeader;
