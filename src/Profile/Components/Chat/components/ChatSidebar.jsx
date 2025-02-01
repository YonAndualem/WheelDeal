import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import ChatSidebarItem from "./ChatSidebarItem";

function ChatSidebar({ onSelectChat }) {
    const [chats, setChats] = useState([]);
    const { state } = useLocation();
    const { user } = useUser();
    const [activeChat, setActiveChat] = useState(null);

    const handleSelectChat = (chat) => {
        setActiveChat(chat);
        console.log("Selected Chat:", chat); // Debug: Verify `chat.image` is correctly passed
    };


    useEffect(() => {
        if (state?.ownerEmail) {
            setChats((prevChats) => {
                // Check if the chat already exists
                const exists = prevChats.some((chat) => chat.email === state.ownerEmail);
                if (exists) {
                    return prevChats; // Return the same list if the chat already exists
                }
                // Add the new chat if it doesn't exist
                const newChat = {
                    email: state.ownerEmail,
                    name: state.ownerName || "Unknown User",
                    image: state.ownerImage || "default-profile-image-url", // Add a fallback image
                };
                return [...prevChats, newChat];
            });
        }
    }, [state?.ownerEmail]);



    return (
        <div className="p-4">
            {chats.map((chat, index) => (
                <ChatSidebarItem
                    key={chat.email}
                    chat={chat}
                    isActive={activeChat?.email === chat.email} // Compare with active chat
                    onClick={() => {
                        setActiveChat(chat); // Set the clicked chat as active
                        onSelectChat(chat); // Notify parent about chat selection
                    }}
                />

            ))}
        </div>
    );
}

export default ChatSidebar;
