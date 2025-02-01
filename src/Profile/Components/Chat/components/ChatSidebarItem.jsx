import React from "react";

function ChatSidebarItem({ chat, onClick, isActive }) {
    return (
        <div
            className={`flex items-center gap-4 p-4 cursor-pointer ${isActive ? 'bg-slate-700' : 'hover:bg-slate-600'
                }`}
            onClick={onClick}
        >
            <img
                src={chat.image}
                alt={`${chat.name}'s profile`}
                className="w-12 h-12 rounded-full"
            />
            <div className="flex flex-col">
                <h2 className="font-medium text-lg">{chat.name}</h2>
                <p className="text-sm text-gray-400">{chat.email}</p>
            </div>
        </div>
    );
}


export default ChatSidebarItem;
