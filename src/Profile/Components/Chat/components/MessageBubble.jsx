import React from "react";

function MessageBubble({ message, isSentByUser }) {
    return (
        <div
            className={`flex ${isSentByUser ? "justify-end" : "justify-start"
                } my-2`}
        >
            <div
                className={`max-w-[60%] p-3 rounded-lg ${isSentByUser ? "bg-slate-700 text-white" : "bg-slate-500 text-white"
                    }`}
            >
                {message.image && (
                    <img
                        src={message.image}
                        alt="attached"
                        className="mb-2 rounded-md max-w-full"
                    />
                )}
                <p>{message.text}</p>
                <p className="text-xs text-gray-400 mt-1 text-right">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
            </div>
        </div>
    );
}

export default MessageBubble;
