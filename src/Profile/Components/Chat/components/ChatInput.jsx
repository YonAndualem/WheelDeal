import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { AiOutlinePaperClip } from "react-icons/ai";
import { storage } from "../../../../../Configs/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function ChatInput({ onSendMessage }) {
    const [message, setMessage] = useState("");
    const [imageFile, setImageFile] = useState(null);

    const handleImageUpload = async () => {
        if (!imageFile) return null;

        try {
            const fileName = `chat_${Date.now()}`;
            const storageRef = ref(storage, `chatImages/${fileName}`);
            await uploadBytes(storageRef, imageFile);
            const downloadURL = await getDownloadURL(storageRef);
            return downloadURL;
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    };

    const handleSendMessage = async () => {
        if (!message.trim() && !imageFile) return; // Prevent empty messages

        const imageUrl = await handleImageUpload();
        onSendMessage({
            text: message.trim() || null,
            image: imageUrl || null,
            timestamp: new Date().toISOString(),
        });

        setMessage("");
        setImageFile(null);
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setImageFile(e.target.files[0]);
        }
    };

    return (
        <div className="flex items-center gap-3 p-3 bg-slate-900 rounded-lg">
            {/* Attach Icon */}
            <label className="cursor-pointer">
                <AiOutlinePaperClip className="text-2xl text-white" />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </label>

            {/* Text Input */}
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 bg-slate-800 text-white rounded-md focus:outline-none"
            />

            {/* Send Button */}
            <button
                onClick={handleSendMessage}
                className="p-2 bg-slate-700 rounded-full hover:bg-slate-600"
            >
                <FiSend className="text-white text-lg" />
            </button>
        </div>
    );
}

export default ChatInput;
