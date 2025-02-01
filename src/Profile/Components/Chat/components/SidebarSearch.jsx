import React from "react";

function SidebarSearch({ searchTerm, setSearchTerm }) {
    return (
        <div className="mb-4">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search chats..."
                className="w-full p-2 bg-slate-800 rounded-md text-white placeholder-gray-400 focus:outline-none"
            />
        </div>
    );
}

export default SidebarSearch;
